$ErrorActionPreference = 'Stop'
$Port = 3000
$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path

$connections = @(Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue)
foreach ($connection in $connections) {
  $process = Get-CimInstance Win32_Process -Filter "ProcessId = $($connection.OwningProcess)"
  $commandLine = [string]$process.CommandLine
  $isProjectProcess = $commandLine -like "*$projectRoot*" -and ($commandLine -match 'vite|npm|node')

  if (-not $isProjectProcess) {
    throw "Port $Port is used by another process (PID $($connection.OwningProcess)). Stop it manually before restarting this project."
  }

  Write-Host "Stopping project dev process PID $($connection.OwningProcess) on port $Port..."
  Stop-Process -Id $connection.OwningProcess -Force
}

Start-Sleep -Milliseconds 300
Write-Host "Starting Vite at http://127.0.0.1:$Port/"
npm run dev -- --host 127.0.0.1 --strictPort
