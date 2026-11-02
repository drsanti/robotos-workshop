#Requires -Version 5.1
<#
.SYNOPSIS
  Stage a student drop: curriculum from this repo + prebuilt robotos (+ optional sim).

.EXAMPLE
  .\packs\assemble.ps1 -RobotosDist C:\dist\robotos-v0.3.0-windows-x64 `
    -WheelPath C:\dist\robotos-0.3.0-py3-none-win_amd64.whl `
    -OutDir C:\drops\robotos-workshop-windows-x64
#>
param(
  [Parameter(Mandatory = $true)]
  [string] $RobotosDist,

  [Parameter(Mandatory = $true)]
  [string] $WheelPath,

  [string] $SimDist = "",

  # Optional: path to serial-bridge.exe / serial-bridge (copied into robotos pack bin/)
  [string] $SerialBridge = "",

  [Parameter(Mandatory = $true)]
  [string] $OutDir,

  # Prefer a filled per-OS NOTES. If empty and -OsArch set, uses packs/NOTES.<OsArch>.txt
  # Fallback: packs/NOTES.template.txt
  [string] $NotesTemplate = "",

  # Optional OS label: windows-x64 | macos-arm64 | linux-x64
  # Also selects packs/NOTES.<OsArch>.txt when -NotesTemplate is omitted
  [string] $OsArch = ""
)

$ErrorActionPreference = "Stop"
$RepoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")

function Copy-Tree($Src, $Dst) {
  if (-not (Test-Path $Src)) { throw "Missing: $Src" }
  New-Item -ItemType Directory -Force -Path $Dst | Out-Null
  Copy-Item -Path (Join-Path $Src "*") -Destination $Dst -Recurse -Force
}

if (Test-Path $OutDir) {
  throw "OutDir already exists: $OutDir (refuse to overwrite)"
}

New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
Write-Host "Staging curriculum → $OutDir"

foreach ($name in @("README.md", "SETUP.md", ".gitignore")) {
  $src = Join-Path $RepoRoot $name
  if (Test-Path $src) {
    Copy-Item $src (Join-Path $OutDir $name) -Force
  }
}
$vsCode = Join-Path $RepoRoot ".vscode"
if (Test-Path $vsCode) {
  Copy-Tree $vsCode (Join-Path $OutDir ".vscode")
}
Copy-Tree (Join-Path $RepoRoot "docs") (Join-Path $OutDir "docs")
Copy-Tree (Join-Path $RepoRoot "labs") (Join-Path $OutDir "labs")
$scripts = Join-Path $RepoRoot "scripts"
if (Test-Path $scripts) {
  Copy-Tree $scripts (Join-Path $OutDir "scripts")
}
# Drop bytecode caches if present (dev machines often have them under labs/)
Get-ChildItem -Path (Join-Path $OutDir "labs") -Recurse -Directory -Filter "__pycache__" -ErrorAction SilentlyContinue |
  Remove-Item -Recurse -Force -ErrorAction SilentlyContinue

$code = Join-Path $OutDir "code"
New-Item -ItemType Directory -Force -Path $code | Out-Null

$robName = Split-Path -Leaf (Resolve-Path $RobotosDist)
Write-Host "Copy robotos pack $robName"
Copy-Tree $RobotosDist (Join-Path $code $robName)

if (-not (Test-Path $WheelPath)) { throw "Missing wheel: $WheelPath" }
Copy-Item $WheelPath (Join-Path $code (Split-Path -Leaf $WheelPath)) -Force

if ($SerialBridge) {
  if (-not (Test-Path $SerialBridge)) { throw "Missing serial-bridge: $SerialBridge" }
  $binDir = Join-Path (Join-Path $code $robName) "bin"
  Write-Host "Copy serial-bridge → $binDir"
  Copy-Item $SerialBridge $binDir -Force
}

if ($SimDist) {
  $simName = Split-Path -Leaf (Resolve-Path $SimDist)
  Write-Host "Copy sim pack $simName"
  Copy-Tree $SimDist (Join-Path $code $simName)
}

if (-not $NotesTemplate) {
  if ($OsArch) {
    $autoNotes = Join-Path $PSScriptRoot ("NOTES.{0}.txt" -f $OsArch)
    if (Test-Path $autoNotes) {
      $NotesTemplate = $autoNotes
      Write-Host "NOTES auto-selected for -OsArch $OsArch → $autoNotes"
    }
  }
}
$notesSrc = if ($NotesTemplate) { $NotesTemplate } else { Join-Path $PSScriptRoot "NOTES.template.txt" }
if (-not (Test-Path $notesSrc)) { throw "Missing NOTES template: $notesSrc" }
Copy-Item $notesSrc (Join-Path $code "NOTES.txt") -Force
Write-Host "NOTES.txt ← $notesSrc"
if ($OsArch) {
  "OS/arch stamp: $OsArch" | Set-Content (Join-Path $code "OS_ARCH.txt") -Encoding utf8
}
Write-Host "Prefer: -OsArch windows-x64|macos-arm64|linux-x64 (auto NOTES.*.txt) or -NotesTemplate."
Write-Host "After unzip on macOS/Linux: chmod +x code/robotos-v*/bin/* code/robotos-sim-v*/robotos-sim (see LAYOUT.md)."

Write-Host "Done. Zip $OutDir for students when ready."
Write-Host "Tree:"
Get-ChildItem $OutDir -Recurse -Depth 2 | Select-Object -ExpandProperty FullName
