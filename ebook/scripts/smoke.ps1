#Requires -Version 5.1
<#
.SYNOPSIS
  Smoke-check robotos Workshop Ebook: rebuild, coverage, markers.
#>
$ErrorActionPreference = 'Stop'
$EbookDir = Split-Path $PSScriptRoot -Parent
$WorkshopRoot = Split-Path $EbookDir -Parent
$LabsRoot = Join-Path $WorkshopRoot 'labs'
$fail = 0

function Ok($m) { Write-Host "PASS  $m" -ForegroundColor Green }
function Bad($m) { Write-Host "FAIL  $m" -ForegroundColor Red; $script:fail++ }

function Get-TrackLabDirs([string]$SourceDir, [string]$TrackId) {
  return @(
    Get-ChildItem $SourceDir -Directory |
      Where-Object {
        $_.Name -match "^$TrackId-\d+" -and
        (Test-Path (Join-Path $_.FullName 'README.md'))
      } |
      Sort-Object Name
  )
}

Write-Host "=== build (includes check-mermaid) ==="
& (Join-Path $PSScriptRoot 'build.ps1')
if ($LASTEXITCODE -ne 0) { Bad 'build.ps1 failed'; Write-Host "$fail EBOOK SMOKE CHECK(S) FAILED" -ForegroundColor Red; exit 1 }

$index = Join-Path $EbookDir 'book\index.html'
if (Test-Path $index) { Ok 'book/index.html exists' } else { Bad 'book/index.html missing' }

# Discover expected labs from filesystem (source of truth)
$expected = New-Object System.Collections.Generic.List[string]
foreach ($id in @('mw', 'wh', 'hw')) {
  foreach ($lab in (Get-TrackLabDirs (Join-Path $LabsRoot $id) $id)) {
    $expected.Add("$id/$($lab.Name)")
  }
}
Ok "filesystem labs=$($expected.Count)"

$manifest = Join-Path $EbookDir 'src\generated\manifest.json'
if (Test-Path $manifest) {
  $m = Get-Content $manifest -Raw | ConvertFrom-Json
  Ok "manifest chapters=$($m.chapters) labs=$($m.labs) checklists=$($m.checklists)"
  if ($m.chapters -lt 14) { Bad "expected >= 14 chapters, got $($m.chapters)" }
  if ($m.labs -ne $expected.Count) {
    Bad "manifest labs=$($m.labs) but filesystem has $($expected.Count)"
  }
  if ($m.checklists -ne $expected.Count) {
    Bad "expected checklist appendix on every lab ($($expected.Count)), got $($m.checklists)"
  }
}
else {
  Bad 'manifest.json missing'
}

foreach ($id in $expected) {
  $md = Join-Path $EbookDir "src\generated\$($id.Replace('/', '\'))\index.md"
  $html = Join-Path $EbookDir "book\generated\$($id.Replace('/', '\'))\index.html"
  if (-not (Test-Path $md)) { Bad "missing staged $id"; continue }
  if (-not (Test-Path $html)) { Bad "missing html $id"; continue }
}
Ok 'all filesystem labs have staged MD + HTML'

# Overview pages
foreach ($p in @(
    'src\generated\labs-index.md',
    'book\generated\labs-index.html',
    'src\generated\common\index.md',
    'book\generated\common\index.html',
    'src\generated\hw\index.md',
    'book\generated\hw\index.html'
  )) {
  if (Test-Path (Join-Path $EbookDir $p)) { Ok $p }
  else { Bad "missing $p" }
}

$ch0 = Join-Path $EbookDir 'book\chapters\ch00-setup-your-machine.html'
if (Test-Path $ch0) { Ok 'ch00 html built' } else { Bad 'ch00 html missing' }

$mw0 = Join-Path $EbookDir 'book\generated\mw\mw-00-getting-started\index.html'
if (Test-Path $mw0) {
  $t = Get-Content $mw0 -Raw
  if ($t -match 'ebook-run' -and $t -match 'run\.cmd mw-00') { Ok 'run callout on mw-00' }
  else { Bad 'run callout missing on mw-00' }
  if ($t -match 'Checklist' -or $t -match 'CHECKLIST') { Ok 'checklist appendix on mw-00' }
  else { Bad 'checklist appendix missing on mw-00' }
}
else {
  Bad 'mw-00 html missing'
}

$hw0 = Join-Path $EbookDir 'book\generated\hw\hw-00-board-connect\index.html'
if (Test-Path $hw0) {
  $t = Get-Content $hw0 -Raw
  if ($t -match 'start-bridge') { Ok 'hw run callout mentions start-bridge' }
  else { Bad 'hw run callout missing start-bridge note' }
}
else {
  Bad 'hw-00 html missing'
}

$sum = Get-Content (Join-Path $EbookDir 'src\SUMMARY.md') -Raw
if ($sum -match 'Labs overview' -and $sum -match 'Shared helpers') {
  Ok 'SUMMARY has labs overview + common'
}
else {
  Bad 'SUMMARY missing labs overview/common'
}
if ($sum -match 'Middleware labs' -and $sum -match 'Warehouse labs' -and $sum -match 'Hardware labs') {
  Ok 'SUMMARY has mw, wh, hw'
}
else {
  Bad 'SUMMARY missing track entries'
}
foreach ($id in $expected) {
  if ($sum -notmatch [regex]::Escape("generated/$id/index.md")) {
    Bad "SUMMARY missing $id"
  }
}
Ok 'SUMMARY lists every filesystem lab'
if ($sum -match 'ch00-setup-your-machine') { Ok 'SUMMARY has chapters' }
else { Bad 'SUMMARY missing chapters' }
if ($sum -match 'INSTRUCTOR|\.instructor') { Bad 'instructor path leaked into SUMMARY' }
else { Ok 'no instructor leak in SUMMARY' }

if ($fail -eq 0) {
  Write-Host ''
  Write-Host 'ALL EBOOK SMOKE CHECKS PASSED' -ForegroundColor Green
  exit 0
}
Write-Host ''
Write-Host "$fail EBOOK SMOKE CHECK(S) FAILED" -ForegroundColor Red
exit 1
