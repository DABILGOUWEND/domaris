# ==== DEPLOYMENT SCRIPT FOR DOMARIS (SCP VERSION, WINDOWS COMPATIBLE) ====

$remoteUser = "root"
$remoteHost = "72.61.160.87"
$remotePath = "/var/www/domaris-app/html"

Write-Host "🚀 Build Angular en cours..." -ForegroundColor Cyan

# 1. Build Angular en production
ng build --configuration=production
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur dans le build Angular. Arrêt du script." -ForegroundColor Red
    exit 1
}

Write-Host "✔️ Build réussi !" -ForegroundColor Green

# 2. Nettoyage du dossier distant
Write-Host "🧹 Nettoyage du dossier distant..." -ForegroundColor Yellow
ssh "$remoteUser@$remoteHost" "rm -rf $remotePath/*"

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors du nettoyage distant. Vérifie ton accès SSH." -ForegroundColor Red
    exit 1
}

# 3. Copier le build via SCP
Write-Host "🚀 Déploiement sur le VPS..." -ForegroundColor Cyan

scp -r "./dist/domaris-app/browser/*" "$remoteUser@$remoteHost`:$remotePath/"

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors de la copie SCP. Déploiement échoué." -ForegroundColor Red
    exit 1
}

Write-Host "🎉 Déploiement terminé avec succès !" -ForegroundColor Green
