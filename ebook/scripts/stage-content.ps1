#Requires -Version 5.1
<#
.SYNOPSIS
  Stage ebook chapters + lab sheets into ebook/src, and write SUMMARY.md.
#>
$ErrorActionPreference = 'Stop'

# PSScriptRoot = workshop/ebook/scripts
$EbookDir = Split-Path $PSScriptRoot -Parent
$WorkshopRoot = Split-Path $EbookDir -Parent
$SrcDir = Join-Path $EbookDir 'src'
$ChaptersSrc = Join-Path $WorkshopRoot 'docs\ebook\chapters'
$ChaptersDest = Join-Path $SrcDir 'chapters'
$GenDir = Join-Path $SrcDir 'generated'
$script:MermaidFence = [string]::new([char]96, 3) # three backticks

$ChapterMeta = [ordered]@{
  'ch00-setup-your-machine.md' = 'Ch.0 — Setup your machine'
  'ch01-graph-nodes-topics.md' = 'Ch.1 — Graph, nodes, topics'
  'ch02-twist-control.md'      = 'Ch.2 — Twist & control ownership'
  'ch03-odometry-scan.md'      = 'Ch.3 — Odometry & scan'
  'ch04-board-on-graph.md'     = 'Ch.4 — Board on the graph'
  'ch05-feedback-control.md'   = 'Ch.5 — Feedback vs open loop'
  'ch06-services.md'           = 'Ch.6 — Services'
  'ch07-actions.md'            = 'Ch.7 — Actions'
  'ch08-wall-follow-fsm.md'    = 'Ch.8 — Wall follow & FSM'
  'ch09-bags-evidence.md'      = 'Ch.9 — Bags & evidence'
  'ch10-params-lifecycle.md'   = 'Ch.10 — Parameters & lifecycle'
  'ch11-digital-twin.md'       = 'Ch.11 — Digital twin'
  'ch12-observe-qos.md'        = 'Ch.12 — Observe, debug & QoS'
  'ch13-tf-frames.md'          = 'Ch.13 — Frames & TF'
}

function Insert-AfterFirstHeading([string]$Body, [string]$Insert) {
  $m = [regex]::Match($Body, '(?m)^#\s+.+$')
  if (-not $m.Success) {
    return $Insert + $Body
  }
  $end = $m.Index + $m.Length
  return $Body.Substring(0, $end) + "`n" + $Insert + $Body.Substring($end)
}

function Repair-MermaidDiagram([string]$Diagram) {
  # Mermaid treats '#' as a line comment — CSS/DOM ids like span#count break parsers.
  $d = [regex]::Replace($Diagram, '(?<=\w)#(?=[A-Za-z_])', ' id=')
  $d = [regex]::Replace($d, '(?<=[\s\[\(\/])#(?=[A-Za-z_])', 'id=')
  # Unicode punctuation that breaks Mermaid 11 sequence/flow parsers
  $d = $d -replace [char]0x2013, '-' -replace [char]0x2014, '-'   # en/em dash
  $d = $d -replace [char]0x2192, '->' -replace [char]0x2190, '<-' # arrows
  # Quote unquoted participant aliases that contain + or /
  $d = [regex]::Replace(
    $d,
    '(?m)^(\s*(?:participant|actor)\s+\w+\s+as\s+)(?!")([^"\r\n]*[+\/][^"\r\n]*)$',
    { param($m) $m.Groups[1].Value + '"' + $m.Groups[2].Value.Trim() + '"' }
  )
  # Sequence messages: ';' ends a statement in Mermaid 11 — replace in label text
  $d = [regex]::Replace(
    $d,
    '(?m)^(\s*(?:Note\s+over\s+[^\n:]+|[A-Za-z0-9_]+(?:-->>?|->>?)[A-Za-z0-9_]+)\s*:\s*)(.+)$',
    {
      param($m)
      $m.Groups[1].Value + ($m.Groups[2].Value -replace ';', ',')
    }
  )
  return $d
}

function Protect-MermaidFences([string]$Body) {
  return [regex]::Replace(
    $Body,
    ($script:MermaidFence + 'mermaid\s*\n([\s\S]*?)' + $script:MermaidFence),
    {
      param($m)
      $diagram = Repair-MermaidDiagram ($m.Groups[1].Value.Trim())
      return ($script:MermaidFence + 'mermaid' + "`n" + $diagram + "`n" + $script:MermaidFence)
    },
    [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
  )
}

function Write-Utf8NoBom([string]$Path, [string]$Text) {
  $dir = Split-Path $Path -Parent
  if (-not (Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
  }
  if (-not $Text.EndsWith("`n")) { $Text += "`n" }
  [System.IO.File]::WriteAllText($Path, $Text, [System.Text.UTF8Encoding]::new($false))
}

function Get-LabShortId([string]$FolderName) {
  if ($FolderName -match '^(mw|wh|hw)-\d+') { return $Matches[0] }
  return $FolderName
}

function New-LabRunBlock {
  param(
    [string]$TrackId,
    [string]$LabId,
    [string]$FolderName,
    [string]$RelSource
  )
  $lines = New-Object System.Collections.Generic.List[string]
  $lines.Add('')
  $lines.Add('<div class="ebook-run">')
  $lines.Add('')
  $trackTitle = switch ($TrackId) {
    'mw' { 'Middleware' }
    'wh' { 'Warehouse' }
    'hw' { 'Hardware' }
    default { $TrackId }
  }
  $lines.Add("**Track:** ``$TrackId`` ($trackTitle) · **Lab:** ``$LabId`` · **Folder:** ``$FolderName``")
  $lines.Add('')
  $lines.Add('```text')
  $lines.Add("# from workshop root")
  $lines.Add("scripts\run.cmd $LabId")
  $lines.Add("# Unix: ./scripts/run $LabId")
  if ($TrackId -eq 'hw') {
    $lines.Add('# prerequisite: scripts/start-bridge running; sim closed')
  }
  elseif ($TrackId -eq 'wh') {
    $lines.Add('# prerequisite: warehouse sim running (scripts/start-here)')
  }
  $lines.Add('```')
  $lines.Add('')
  $lines.Add("<p class=`"ebook-source`"><strong>Source:</strong> <code>$RelSource</code></p>")
  $lines.Add('')
  $lines.Add('</div>')
  $lines.Add('')
  return ($lines -join "`n")
}

function Repair-LabLinks {
  param(
    [string]$Body,
    [string]$TrackId
  )
  # Sibling labs: ../wh-01-drive-twist/ or ../wh-01-drive-twist/README.md
  $body = [regex]::Replace(
    $Body,
    '\]\(\.\./((?:mw|wh|hw)-\d+[a-z0-9-]*)(?:/README\.md)?/?\)',
    "](../../generated/$TrackId/`$1/index.md)"
  )
  # Cross-track ../../wh/... or ../../../labs/wh/...
  $body = [regex]::Replace(
    $body,
    '\]\(\.\./\.\./(?:labs/)?((mw|wh|hw)/((?:mw|wh|hw)-\d+[a-z0-9-]*))(?:/README\.md)?/?\)',
    {
      param($m)
      $part = $m.Groups[2].Value
      $folder = $m.Groups[3].Value
      return "](../../generated/$part/$folder/index.md)"
    }
  )
  # Ebook chapter links from labs → staged chapters
  $body = [regex]::Replace(
    $body,
    '\]\(\.\./\.\./\.\./docs/ebook/chapters/(ch\d+[a-z0-9-]*)\.md\)',
    '](../../../chapters/$1.md)'
  )
  $body = [regex]::Replace(
    $body,
    '\]\(\.\./\.\./docs/ebook/chapters/(ch\d+[a-z0-9-]*)\.md\)',
    '](../../../chapters/$1.md)'
  )
  # Soften SETUP / theory links to repo-relative prose paths (outside ebook tree)
  $body = $body -replace '\]\(\.\./\.\./\.\./SETUP\.md\)', '](../../../../SETUP.md)'
  $body = $body -replace '\]\(\.\./\.\./SETUP\.md\)', '](../../../../SETUP.md)'
  return $body
}

function Repair-ChapterLinks([string]$Body) {
  # Sibling chapters
  $body = [regex]::Replace(
    $Body,
    '\]\(\./(ch\d+[a-z0-9-]*)\.md\)',
    ']($1.md)'
  )
  # Lab sheet links from chapters → generated
  $body = [regex]::Replace(
    $body,
    '\]\(\.\./\.\./\.\./labs/((mw|wh|hw)/((?:mw|wh|hw)-\d+[a-z0-9-]*))(?:/README\.md)?/?\)',
    {
      param($m)
      $part = $m.Groups[2].Value
      $folder = $m.Groups[3].Value
      return "](../generated/$part/$folder/index.md)"
    }
  )
  $body = [regex]::Replace(
    $body,
    '\]\(\.\./\.\./labs/((mw|wh|hw)/((?:mw|wh|hw)-\d+[a-z0-9-]*))(?:/README\.md)?/?\)',
    {
      param($m)
      $part = $m.Groups[2].Value
      $folder = $m.Groups[3].Value
      return "](../generated/$part/$folder/index.md)"
    }
  )
  return $body
}

function Repair-OverviewLinks([string]$Body) {
  # labs/README.md → track hubs / lab pages
  $body = [regex]::Replace(
    $Body,
    '\]\((mw|wh|hw)/((?:mw|wh|hw)-\d+[a-z0-9-]*)(?:/README\.md)?/?\)',
    ']($1/$2/index.md)'
  )
  $body = $body -replace '\]\(mw/?\)', '](../tracks/mw.md)'
  $body = $body -replace '\]\(wh/?\)', '](../tracks/wh.md)'
  $body = $body -replace '\]\(hw/README\.md\)', '](hw/index.md)'
  $body = $body -replace '\]\(hw/?\)', '](hw/index.md)'
  $body = $body -replace '\]\(common/README\.md\)', '](common/index.md)'
  $body = $body -replace '\]\(common/?\)', '](common/index.md)'
  $body = $body -replace '\]\(\.\./docs/lab-outline\.md\)', '](../../../docs/lab-outline.md)'
  return $body
}

function Get-TrackLabDirs([string]$SourceDir, [string]$TrackId) {
  # Every practice lab folder under the track (must have README.md).
  return @(
    Get-ChildItem $SourceDir -Directory |
      Where-Object {
        $_.Name -match "^$TrackId-\d+" -and
        (Test-Path (Join-Path $_.FullName 'README.md'))
      } |
      Sort-Object Name
  )
}

function Add-ChecklistAppendix {
  param(
    [string]$Body,
    [string]$LabDir,
    [string]$RelChecklist
  )
  $checklist = Join-Path $LabDir 'CHECKLIST.md'
  if (-not (Test-Path $checklist)) {
    return $Body
  }
  $ck = [System.IO.File]::ReadAllText($checklist)
  $ck = $ck -replace "`r`n", "`n" -replace "`r", "`n"
  # Drop duplicate H1 if present; nest under appendix heading
  $ck = [regex]::Replace($ck, '(?m)^#\s+', '### ')
  $appendix = @"

---

## Checklist

<p class="ebook-source"><strong>Source:</strong> <code>$RelChecklist</code></p>

$ck
"@
  if (-not $Body.EndsWith("`n")) { $Body += "`n" }
  return $Body + $appendix
}

# --- reset staged trees ---
if (Test-Path $ChaptersDest) { Remove-Item $ChaptersDest -Recurse -Force }
if (Test-Path $GenDir) { Remove-Item $GenDir -Recurse -Force }
New-Item -ItemType Directory -Path $ChaptersDest -Force | Out-Null
New-Item -ItemType Directory -Path $GenDir -Force | Out-Null

$summary = New-Object System.Collections.Generic.List[string]
$summary.Add('# Summary')
$summary.Add('')
$summary.Add('[Introduction](introduction.md)')
$summary.Add('[Reading order](reading-order.md)')
$summary.Add('')

$chapterCount = 0
$labCount = 0
$checklistCount = 0
$missing = New-Object System.Collections.Generic.List[string]
$discoveredLabs = New-Object System.Collections.Generic.List[string]

# --- chapters ---
$summary.Add('# Chapters')

if (-not (Test-Path $ChaptersSrc)) {
  throw "missing chapters folder: $ChaptersSrc"
}

$chapterFiles = @(Get-ChildItem $ChaptersSrc -File -Filter 'ch*.md' | Sort-Object Name)
foreach ($cf in $chapterFiles) {
  $body = [System.IO.File]::ReadAllText($cf.FullName)
  $body = $body -replace "`r`n", "`n" -replace "`r", "`n"
  $body = Repair-ChapterLinks $body
  $body = Protect-MermaidFences $body
  $dest = Join-Path $ChaptersDest $cf.Name
  Write-Utf8NoBom $dest $body

  $title = if ($ChapterMeta.Contains($cf.Name)) { $ChapterMeta[$cf.Name] } else { $cf.BaseName }
  $summary.Add("- [$title](chapters/$($cf.Name))")
  $chapterCount++
}
$summary.Add('')

# --- labs overview + common (must be in ebook) ---
$LabsRoot = Join-Path $WorkshopRoot 'labs'
$summary.Add('# Labs')

$labsIndexSrc = Join-Path $LabsRoot 'README.md'
if (-not (Test-Path $labsIndexSrc)) { throw "missing $labsIndexSrc" }
$labsIndexBody = [System.IO.File]::ReadAllText($labsIndexSrc)
$labsIndexBody = $labsIndexBody -replace "`r`n", "`n" -replace "`r", "`n"
$labsIndexBody = Repair-OverviewLinks $labsIndexBody
$labsIndexBody = Protect-MermaidFences $labsIndexBody
$labsIndexRun = @"

<div class="ebook-run">

**Section:** ``labs/`` · all practice labs live under ``mw/``, ``wh/``, ``hw/``

``````text
scripts\run.cmd list
# Unix: ./scripts/run list
``````

<p class="ebook-source"><strong>Source:</strong> <code>labs/README.md</code></p>

</div>

"@
  $labsIndexRun = $labsIndexRun.Replace("``````", '```')
$labsIndexOut = Insert-AfterFirstHeading -Body $labsIndexBody -Insert $labsIndexRun
Write-Utf8NoBom (Join-Path $GenDir 'labs-index.md') $labsIndexOut
$summary.Add('- [Labs overview](generated/labs-index.md)')

$commonSrc = Join-Path $LabsRoot 'common\README.md'
if (-not (Test-Path $commonSrc)) { throw "missing $commonSrc" }
$commonBody = [System.IO.File]::ReadAllText($commonSrc)
$commonBody = $commonBody -replace "`r`n", "`n" -replace "`r", "`n"
$commonBody = Protect-MermaidFences $commonBody
$commonRun = @"

<div class="ebook-run">

**Section:** ``labs/common`` · shared helpers (students do not edit)

``````text
# imported by starters via labs.common.*
# see this page for the bootstrap sys.path block
``````

<p class="ebook-source"><strong>Source:</strong> <code>labs/common/README.md</code></p>

</div>

"@
$commonRun = $commonRun.Replace("``````", '```')
$commonOut = Insert-AfterFirstHeading -Body $commonBody -Insert $commonRun
Write-Utf8NoBom (Join-Path $GenDir 'common\index.md') $commonOut
$summary.Add('- [Shared helpers (`labs.common`)](generated/common/index.md)')
$summary.Add('')

# --- lab tracks (every labs/{mw,wh,hw}/<id>-* folder with README.md) ---
$tracks = @(
  @{ Id = 'mw'; Title = 'Middleware labs'; SourceDir = (Join-Path $LabsRoot 'mw'); Hub = 'tracks/mw.md' },
  @{ Id = 'wh'; Title = 'Warehouse labs'; SourceDir = (Join-Path $LabsRoot 'wh'); Hub = 'tracks/wh.md' },
  @{
    Id        = 'hw'
    Title     = 'Hardware labs'
    SourceDir = (Join-Path $LabsRoot 'hw')
    Hub       = 'generated/hw/index.md'
    TrackReadme = (Join-Path $LabsRoot 'hw\README.md')
  }
)

foreach ($t in $tracks) {
  if (-not (Test-Path $t.SourceDir)) {
    throw "missing track folder: $($t.SourceDir)"
  }

  $summary.Add("# $($t.Title)")

  # Stage track-level README when present (HW); else curated hub
  if ($t.ContainsKey('TrackReadme') -and $t.TrackReadme -and (Test-Path $t.TrackReadme)) {
    $trackBody = [System.IO.File]::ReadAllText($t.TrackReadme)
    $trackBody = $trackBody -replace "`r`n", "`n" -replace "`r", "`n"
    $trackBody = Repair-LabLinks -Body $trackBody -TrackId $t.Id
    $trackBody = Repair-OverviewLinks $trackBody
    $trackBody = Protect-MermaidFences $trackBody
    $trackRun = @"

<div class="ebook-run">

**Track:** ``$($t.Id)`` · board labs via serial-bridge

``````text
scripts\start-bridge.cmd
scripts\run.cmd hw-01
# Unix: ./scripts/start-bridge.sh && ./scripts/run hw-01
``````

<p class="ebook-source"><strong>Source:</strong> <code>labs/$($t.Id)/README.md</code></p>

</div>

"@
    $trackRun = $trackRun.Replace("``````", '```')
    $trackOut = Insert-AfterFirstHeading -Body $trackBody -Insert $trackRun
    Write-Utf8NoBom (Join-Path $GenDir "$($t.Id)\index.md") $trackOut
    $summary.Add("- [$($t.Title)]($($t.Hub))")
  }
  else {
    $summary.Add("- [$($t.Title)]($($t.Hub))")
  }

  $labs = Get-TrackLabDirs -SourceDir $t.SourceDir -TrackId $t.Id
  if ($labs.Count -eq 0) {
    throw "no lab folders found under $($t.SourceDir) (expected $($t.Id)-NN-*)"
  }

  # Also fail loudly if a numbered folder exists without README
  $orphanDirs = @(
    Get-ChildItem $t.SourceDir -Directory |
      Where-Object {
        $_.Name -match "^$($t.Id)-\d+" -and
        -not (Test-Path (Join-Path $_.FullName 'README.md'))
      }
  )
  foreach ($o in $orphanDirs) {
    $missing.Add("labs/$($t.Id)/$($o.Name)/README.md")
  }

  foreach ($lab in $labs) {
    $readme = Join-Path $lab.FullName 'README.md'
    $relSource = "labs/$($t.Id)/$($lab.Name)/README.md"
    $genExMd = Join-Path $GenDir "$($t.Id)\$($lab.Name)\index.md"
    $labId = Get-LabShortId $lab.Name
    $title = $lab.Name
    $discoveredLabs.Add("$($t.Id)/$($lab.Name)")

    $body = [System.IO.File]::ReadAllText($readme)
    $body = $body -replace "`r`n", "`n" -replace "`r", "`n"
    $body = Repair-LabLinks -Body $body -TrackId $t.Id
    $body = Protect-MermaidFences $body
    $run = New-LabRunBlock -TrackId $t.Id -LabId $labId -FolderName $lab.Name -RelSource $relSource
    $out = Insert-AfterFirstHeading -Body $body -Insert $run
    $relChecklist = "labs/$($t.Id)/$($lab.Name)/CHECKLIST.md"
    $beforeCk = $out
    $out = Add-ChecklistAppendix -Body $out -LabDir $lab.FullName -RelChecklist $relChecklist
    if ($out -ne $beforeCk) { $checklistCount++ }
    Write-Utf8NoBom $genExMd $out
    $summary.Add("  - [$title](generated/$($t.Id)/$($lab.Name)/index.md)")
    $labCount++
  }
  $summary.Add('')
}

$summaryPath = Join-Path $SrcDir 'SUMMARY.md'
Write-Utf8NoBom $summaryPath (($summary -join "`n") + "`n")

$manifest = [ordered]@{
  generated_utc     = (Get-Date).ToUniversalTime().ToString('o')
  chapters          = $chapterCount
  labs              = $labCount
  checklists        = $checklistCount
  discovered_labs   = @($discoveredLabs)
  missing_readmes   = @($missing)
}
$manifestPath = Join-Path $GenDir 'manifest.json'
($manifest | ConvertTo-Json) | Set-Content -Path $manifestPath -Encoding utf8

Write-Host "Staged $chapterCount chapters -> $ChaptersDest"
Write-Host "Staged $labCount lab pages (+ labs index, common, hw track) -> $GenDir"
Write-Host "Appended $checklistCount CHECKLIST.md files"
if ($missing.Count -gt 0) {
  Write-Host "FAIL missing READMEs ($($missing.Count)):"
  $missing | ForEach-Object { Write-Host "  $_" }
  throw "coverage failed: $($missing.Count) lab folder(s) missing README.md"
}

$fail = 0
foreach ($t in $tracks) {
  foreach ($lab in (Get-TrackLabDirs -SourceDir $t.SourceDir -TrackId $t.Id)) {
    $expect = Join-Path $GenDir "$($t.Id)\$($lab.Name)\index.md"
    if (-not (Test-Path $expect)) {
      Write-Host "FAIL no generated page for $($t.Id)/$($lab.Name)"
      $fail++
    }
    if ($summary -notcontains "  - [$($lab.Name)](generated/$($t.Id)/$($lab.Name)/index.md)" -and
        -not (($summary -join "`n") -match [regex]::Escape("generated/$($t.Id)/$($lab.Name)/index.md"))) {
      Write-Host "FAIL SUMMARY missing $($t.Id)/$($lab.Name)"
      $fail++
    }
  }
}
# Hard requirement: every discovered lab is listed
$sumText = $summary -join "`n"
foreach ($id in $discoveredLabs) {
  if ($sumText -notmatch [regex]::Escape("generated/$id/index.md")) {
    Write-Host "FAIL SUMMARY missing generated/$id/index.md"
    $fail++
  }
}
foreach ($key in $ChapterMeta.Keys) {
  $expect = Join-Path $ChaptersDest $key
  if (-not (Test-Path $expect)) {
    Write-Host "FAIL missing staged chapter $key"
    $fail++
  }
}
if (-not (Test-Path (Join-Path $GenDir 'labs-index.md'))) { Write-Host 'FAIL labs-index'; $fail++ }
if (-not (Test-Path (Join-Path $GenDir 'common\index.md'))) { Write-Host 'FAIL common index'; $fail++ }
if (-not (Test-Path (Join-Path $GenDir 'hw\index.md'))) { Write-Host 'FAIL hw track README'; $fail++ }
if ($fail -gt 0) {
  throw "coverage failed: $fail item(s) missing pages"
}
Write-Host "Coverage OK ($labCount/$labCount labs)"
