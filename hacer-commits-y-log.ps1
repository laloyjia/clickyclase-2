# ════════════════════════════════════════════════════════════════════
#  hacer-commits-y-log.ps1 — variante con log para pegarle a Claude
#  Hace lo mismo que hacer-commits.ps1 pero deja todo el output en
#  commits-log.txt para que puedas pegarme las últimas líneas.
# ════════════════════════════════════════════════════════════════════

$repo = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $repo
$log = Join-Path $repo "commits-log.txt"
"" | Out-File $log

# Re-uso del script principal capturando la salida
& (Join-Path $repo "hacer-commits.ps1") *>&1 | Tee-Object -FilePath $log -Append

Write-Host ""
Write-Host "Log completo guardado en: $log" -ForegroundColor Green
Write-Host "Abrelo y pegale las ultimas 20 lineas a Claude si quieres revisar." -ForegroundColor DarkGray
