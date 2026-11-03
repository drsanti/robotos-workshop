#Requires -Version 5.1
<#
.SYNOPSIS
  Fail if Mermaid fences would bomb in Mermaid 11 (esp. sequence ';' labels).
  Optionally mermaid.parse sequenceDiagrams when %TEMP%\mmdparse has mermaid installed.
#>
$ErrorActionPreference = 'Stop'
$EbookDir = Split-Path $PSScriptRoot -Parent
$WorkshopRoot = Split-Path $EbookDir -Parent
$fail = 0

function Bad($m) { Write-Host "FAIL  $m" -ForegroundColor Red; $script:fail++ }
function Ok($m) { Write-Host "PASS  $m" -ForegroundColor Green }

# Source of truth only (staged ebook/src can lag until stage-content runs)
$roots = @(
  (Join-Path $WorkshopRoot 'docs\ebook\chapters'),
  (Join-Path $WorkshopRoot 'labs')
) | Where-Object { Test-Path $_ }

$fenceRe = [regex]'(?ms)```mermaid\s*\r?\n(.*?)```'
$en = [char]0x2013
$em = [char]0x2014
$arrR = [char]0x2192
$arrL = [char]0x2190

$files = @(
  foreach ($r in $roots) {
    Get-ChildItem $r -Recurse -Filter '*.md' -File | ForEach-Object { $_.FullName }
  }
)

$seqCount = 0
$flowCount = 0

foreach ($path in $files) {
  $rel = $path.Substring($WorkshopRoot.Length).TrimStart('\', '/')
  $text = [System.IO.File]::ReadAllText($path)
  foreach ($m in $fenceRe.Matches($text)) {
    $d = $m.Groups[1].Value
    $isSeq = $d -match '(?m)^\s*sequenceDiagram\b'
    if ($isSeq) { $seqCount++ }
    elseif ($d -match '(?m)^\s*(?:flowchart|graph)\b') { $flowCount++ }

    if ($d.IndexOf($en) -ge 0 -or $d.IndexOf($em) -ge 0) {
      Bad "$rel : en/em dash in mermaid fence (use ASCII -)"
    }
    if ($d.IndexOf($arrR) -ge 0 -or $d.IndexOf($arrL) -ge 0) {
      Bad "$rel : Unicode arrow in mermaid fence (use -> or <-)"
    }

    if (-not $isSeq) { continue }

    foreach ($line in ($d -split '\r?\n')) {
      if ($line -match '^\s*(?:Note\s+over\b|[A-Za-z0-9_]+(?:-->>?|->>?))') {
        $idx = $line.IndexOf(':')
        if ($idx -ge 0 -and $line.Substring($idx + 1).Contains(';')) {
          Bad "$rel : semicolon in sequence label (Mermaid 11): $($line.Trim())"
        }
      }
      if ($line -match '^\s*(?:participant|actor)\s+\w+\s+as\s+(?!")[^"\r\n]*[+\/]') {
        Bad "$rel : unquoted participant alias with + or /: $($line.Trim())"
      }
    }
  }
}

Ok "scanned md=$($files.Count) sequenceDiagram=$seqCount flowchart/graph=$flowCount"

$parseDir = Join-Path $env:TEMP 'mmdparse'
$chapterDir = Join-Path $WorkshopRoot 'docs\ebook\chapters'
if ((Test-Path (Join-Path $parseDir 'node_modules\mermaid\package.json')) -and (Test-Path $chapterDir)) {
  # Script must live under parseDir so Node resolves `mermaid` from that package root.
  $tmp = Join-Path $parseDir 'workshop-ebook-mmd-parse.mjs'
  @'
import mermaid from "mermaid";
import fs from "fs";
import path from "path";

const dir = process.argv[2];
const fence = /```mermaid\s*\n([\s\S]*?)```/g;
let fail = 0, ok = 0;
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".md"))) {
  const text = fs.readFileSync(path.join(dir, f), "utf8");
  let m; let i = 0;
  while ((m = fence.exec(text))) {
    i++;
    const d = m[1];
    if (!/^\s*sequenceDiagram/m.test(d)) continue;
    try {
      await mermaid.parse(d);
      ok++;
    } catch (e) {
      fail++;
      console.error("PARSE_FAIL", f, "#" + i, String(e.str || e.message || e).split("\n")[0]);
    }
  }
}
console.log("parse_ok=" + ok + " parse_fail=" + fail);
process.exit(fail ? 1 : 0);
'@ | Set-Content -Path $tmp -Encoding utf8

  Push-Location $parseDir
  try {
    $out = & node .\workshop-ebook-mmd-parse.mjs $chapterDir 2>&1
    $code = $LASTEXITCODE
    $out | ForEach-Object { Write-Host $_ }
    if ($code -ne 0) { Bad 'mermaid.parse failed on one or more sequenceDiagrams' }
    else { Ok 'mermaid.parse sequenceDiagrams OK' }
  }
  finally {
    Pop-Location
  }
}
else {
  Write-Host 'INFO  skip mermaid.parse (install once: cd %TEMP%\mmdparse && npm i mermaid@11)'
}

$bookDir = Join-Path $EbookDir 'book'
if (Test-Path $bookDir) {
  $dashPages = 0
  Get-ChildItem $bookDir -Recurse -Filter '*.html' | ForEach-Object {
    $t = [System.IO.File]::ReadAllText($_.FullName)
    foreach ($b in [regex]::Matches($t, '(?s)class="language-mermaid"[^>]*>(.*?)</code>')) {
      if ($b.Groups[1].Value.IndexOf($en) -ge 0 -or $b.Groups[1].Value.IndexOf($em) -ge 0) {
        $dashPages++
      }
    }
  }
  if ($dashPages -gt 0) { Bad "built HTML language-mermaid still has en/em dash ($dashPages)" }
  else { Ok 'built HTML language-mermaid has no en/em dash' }
}
else {
  Write-Host 'INFO  book/ not built yet — HTML dash check skipped'
}

if ($fail -eq 0) {
  Write-Host ''
  Write-Host 'MERMAID CHECK PASSED' -ForegroundColor Green
  exit 0
}
Write-Host ''
Write-Host "$fail MERMAID CHECK(S) FAILED" -ForegroundColor Red
exit 1
