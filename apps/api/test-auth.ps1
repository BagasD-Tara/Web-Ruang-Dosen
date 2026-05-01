$headers = @{ "Content-Type" = "application/json" }

Write-Host "=== TEST 1: Register Dosen ==="
$registerBody = '{"name":"Dosen Test","email":"dosen@test.com","password":"password123","role":"LECTURER"}'
$registerResult = Invoke-RestMethod -Uri "http://localhost:3001/auth/register" -Method Post -Headers $headers -Body $registerBody
$registerResult | ConvertTo-Json
Write-Host ""

Write-Host "=== TEST 2: Login Dosen ==="
$loginBody = '{"email":"dosen@test.com","password":"password123"}'
$loginResult = Invoke-RestMethod -Uri "http://localhost:3001/auth/login" -Method Post -Headers $headers -Body $loginBody
$loginResult | ConvertTo-Json
Write-Host ""

Write-Host "=== TEST 3: Login Salah Password ==="
try {
    $wrongBody = '{"email":"dosen@test.com","password":"salah"}'
    Invoke-RestMethod -Uri "http://localhost:3001/auth/login" -Method Post -Headers $headers -Body $wrongBody
} catch {
    Write-Host "Error (expected): $($_.Exception.Message)"
}

Write-Host ""
Write-Host "=== TEST 4: Register Email Duplikat ==="
try {
    Invoke-RestMethod -Uri "http://localhost:3001/auth/register" -Method Post -Headers $headers -Body $registerBody
} catch {
    Write-Host "Error (expected): $($_.Exception.Message)"
}
