# Download OpenAPI spec bypassing certificate validation
$ProgressPreference = 'SilentlyContinue'

# Create certificate policy that trusts all certificates
$certPolicy = @"
using System.Net;
using System.Security.Cryptography.X509Certificates;
public class TrustAllCertsPolicy : ICertificatePolicy {
    public bool CheckValidationResult(
        ServicePoint srvPoint,
        X509Certificate certificate,
        WebRequest request,
        int certificateProblem) {
        return true;
    }
}
"@

Add-Type -TypeDefinition $certPolicy -ErrorAction SilentlyContinue
[System.Net.ServicePointManager]::CertificatePolicy = New-Object TrustAllCertsPolicy

# Set TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# Download the spec
try {
    # Try the swagger endpoint first
    $uri = 'https://localhost:7160/swagger/v1/swagger.json'
    Write-Host "Attempting to download from: $uri"
    $spec = Invoke-WebRequest -Uri $uri -UseBasicParsing
    $spec.Content | Out-File "d:\Dev\Incubator\.NET-Template\clients\generation\openapi-spec.json" -Encoding UTF8
    Write-Host "OpenAPI spec downloaded successfully"
    Write-Host "File size: $((Get-Item 'd:\Dev\Incubator\.NET-Template\clients\generation\openapi-spec.json').Length) bytes"
} catch {
    Write-Host "Error downloading spec: $($_.Exception.Message)"
    Write-Host "Trying alternative endpoint..."
    try {
        $uri = 'https://localhost:7160/api/openapi/v1.json'
        Write-Host "Attempting: $uri"
        $spec = Invoke-WebRequest -Uri $uri -UseBasicParsing
        $spec.Content | Out-File "d:\Dev\Incubator\.NET-Template\clients\generation\openapi-spec.json" -Encoding UTF8
        Write-Host "Downloaded from alternative endpoint"
    } catch {
        Write-Host "Error on alternative endpoint: $($_.Exception.Message)"
        exit 1
    }
}
