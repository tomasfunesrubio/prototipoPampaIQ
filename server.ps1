$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8081/")
$listener.Start()
Write-Host "Listening on http://localhost:8081/"
while ($listener.IsListening) {
    $context = $listener.GetContext()
    $response = $context.Response
    $file = $context.Request.Url.LocalPath.TrimStart('/')
    if ($file -eq "") { $file = "diagnose.html" }
    try {
        if (Test-Path $file) {
            $bytes = [System.IO.File]::ReadAllBytes($file)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
        }
    } catch {
        $response.StatusCode = 500
    }
    $response.Close()
}
