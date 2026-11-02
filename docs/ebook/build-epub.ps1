#Requires -Version 5.1
<#
.SYNOPSIS
  Build student EPUB from docs/ebook/chapters (optional mermaid-filter).

.EXAMPLE
  .\docs\ebook\build-epub.ps1
  .\docs\ebook\build-epub.ps1 -OutFile D:\drops\robotos-workshop-ebook.epub
#>
param(
  [string] $OutFile = ""
)

$ErrorActionPreference = "Stop"
$Root = Resolve-Path (Join-Path $PSScriptRoot "..\..")
Set-Location $Root

$chapters = Get-ChildItem (Join-Path $Root "docs\ebook\chapters\ch*.md") |
  Sort-Object Name |
  ForEach-Object { $_.FullName }

if (-not $chapters) { throw "No chapters under docs/ebook/chapters/ch*.md" }

$drops = Join-Path $Root "drops"
New-Item -ItemType Directory -Force -Path $drops | Out-Null
if (-not $OutFile) {
  $OutFile = Join-Path $drops "robotos-workshop-ebook.epub"
}

$pandoc = Get-Command pandoc -ErrorAction SilentlyContinue
if (-not $pandoc) {
  throw "pandoc not found on PATH. Install https://pandoc.org/ and retry."
}

$filterArgs = @()
$mf = Get-Command mermaid-filter -ErrorAction SilentlyContinue
if ($mf) {
  Write-Host "Using mermaid-filter: $($mf.Source)"
  $filterArgs = @("-F", "mermaid-filter")
} else {
  Write-Host "mermaid-filter not on PATH — Mermaid fences will appear as code in the EPUB."
  Write-Host "Install: npm install -g mermaid-filter   (see docs/ebook/PUBLISHING.md)"
}

$meta = @(
  "--metadata", "title=robotos Workshop",
  "--metadata", "author=Robotos Workshop",
  "--toc", "--toc-depth=2"
)

& pandoc @chapters @filterArgs @meta -o $OutFile
Write-Host "Wrote $OutFile"
