# PowerShell HTTP Server for Md. Shakibur Rahaman Portfolio & CMS
param(
    [int]$Port = 5500
)

$rootDir = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not $rootDir) { $rootDir = Get-Location }

$dataDir = Join-Path $rootDir "data"
if (-not (Test-Path $dataDir)) {
    New-Item -ItemType Directory -Path $dataDir -Force | Out-Null
}

$backupsDir = Join-Path $dataDir "backups"
if (-not (Test-Path $backupsDir)) {
    New-Item -ItemType Directory -Path $backupsDir -Force | Out-Null
}

$contentFile = Join-Path $dataDir "content.json"
if (-not (Test-Path $contentFile)) {
    $rootContent = Join-Path $rootDir "content.json"
    if (Test-Path $rootContent) {
        Copy-Item $rootContent $contentFile -Force
    }
}

$leadsFile = Join-Path $dataDir "leads.json"
if (-not (Test-Path $leadsFile)) {
    $rootLeads = Join-Path $rootDir "leads.json"
    if (Test-Path $rootLeads) {
        Copy-Item $rootLeads $leadsFile -Force
    } else {
        Set-Content -Path $leadsFile -Value "[]" -Encoding UTF8
    }
}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".woff2"= "font/woff2"
    ".pdf"  = "application/pdf"
    ".txt"  = "text/plain; charset=utf-8"
}

function Read-RequestBody($req) {
    if ($req.HasEntityBody) {
        $reader = New-Object System.IO.StreamReader($req.InputStream, [System.Text.Encoding]::UTF8)
        $body = $reader.ReadToEnd()
        $reader.Close()
        return $body
    }
    return ""
}

function Add-SecurityHeaders($res) {
    $res.AddHeader("X-Content-Type-Options", "nosniff")
    $res.AddHeader("X-Frame-Options", "SAMEORIGIN")
    $res.AddHeader("X-XSS-Protection", "1; mode=block")
    $res.AddHeader("Referrer-Policy", "strict-origin-when-cross-origin")
    $res.AddHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
}

function Send-JsonResponse($res, [int]$statusCode, [string]$jsonString) {
    Add-SecurityHeaders $res
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($jsonString)
    $res.ContentType = "application/json; charset=utf-8"
    $res.StatusCode = $statusCode
    $res.ContentLength64 = $bytes.Length
    $res.AddHeader("Cache-Control", "no-store, no-cache, must-revalidate")
    $res.OutputStream.Write($bytes, 0, $bytes.Length)
    $res.Close()
}

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
} catch {
    Write-Host "Port $Port busy, switching to 5501..."
    $Port = 5501
    $prefix = "http://localhost:$Port/"
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add($prefix)
    $listener.Start()
}

Write-Host "===================================================="
Write-Host " Shakibur Rahaman Portfolio & CMS Server Active!"
Write-Host " Public Website:  $prefix"
Write-Host " Admin Dashboard: ${prefix}admin"
Write-Host " Default Admin:   username: admin"
Write-Host "===================================================="

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        # Global CORS Headers
        $response.AddHeader("Access-Control-Allow-Origin", "*")
        $response.AddHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        $response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Cache-Control")

        $method = $request.HttpMethod.ToUpper()
        $path = $request.Url.LocalPath

        # Handle Preflight OPTIONS
        if ($method -eq "OPTIONS") {
            $response.StatusCode = 204
            $response.Close()
            continue
        }

        # --- 1. Content Endpoints ---
        if ($path -eq "/api/content") {
            if ($method -eq "GET") {
                $content = "{}"
                if (Test-Path $contentFile) {
                    $content = [System.IO.File]::ReadAllText($contentFile, [System.Text.Encoding]::UTF8)
                } elseif (Test-Path (Join-Path $rootDir "content.json")) {
                    $content = [System.IO.File]::ReadAllText((Join-Path $rootDir "content.json"), [System.Text.Encoding]::UTF8)
                }
                Send-JsonResponse $response 200 $content
                continue
            }
            if ($method -eq "PUT" -or $method -eq "POST") {
                $body = Read-RequestBody $request
                if (-not [string]::IsNullOrWhiteSpace($body)) {
                    $timestamp = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
                    $backupFile = Join-Path $backupsDir "content_backup_$timestamp.json"
                    if (Test-Path $contentFile) {
                        Copy-Item $contentFile $backupFile -Force
                    }
                    [System.IO.File]::WriteAllText($contentFile, $body, [System.Text.Encoding]::UTF8)
                    $rootContent = Join-Path $rootDir "content.json"
                    [System.IO.File]::WriteAllText($rootContent, $body, [System.Text.Encoding]::UTF8)
                    try {
                        $parsedJson = $body | ConvertFrom-Json
                        if ($parsedJson.seo.aiSeo.llmsTxtContent) {
                            $llmsFile = Join-Path $rootDir "llms.txt"
                            [System.IO.File]::WriteAllText($llmsFile, $parsedJson.seo.aiSeo.llmsTxtContent, [System.Text.Encoding]::UTF8)
                        }
                    } catch {}
                }
                Send-JsonResponse $response 200 '{"success":true,"message":"Site content updated and published live!"}'
                continue
            }
        }

        # --- 2. Content Reset ---
        if (($path -eq "/api/reset" -or $path -eq "/api/content/reset") -and $method -eq "POST") {
            $defPath = Join-Path $dataDir "default_content.json"
            if (Test-Path $defPath) {
                $defBytes = [System.IO.File]::ReadAllBytes($defPath)
                [System.IO.File]::WriteAllBytes($contentFile, $defBytes)
                [System.IO.File]::WriteAllBytes((Join-Path $rootDir "content.json"), $defBytes)
            }
            Send-JsonResponse $response 200 '{"success":true,"message":"Content reset to default."}'
            continue
        }

        # --- 3. Auth Endpoints ---
        if ($path -eq "/api/auth/login" -and $method -eq "POST") {
            $body = Read-RequestBody $request
            $authData = $null
            $authFile = Join-Path $dataDir "auth.json"
            if (Test-Path $authFile) {
                try { $authData = Get-Content $authFile -Raw -Encoding UTF8 | ConvertFrom-Json } catch {}
            }
            
            $loginObj = $null
            try { $loginObj = $body | ConvertFrom-Json } catch {}
            
            $valid = $false
            if ($authData -and $loginObj -and $loginObj.password) {
                if ($loginObj.username -and ($loginObj.username.Trim().ToLower() -ne $authData.username.ToLower())) {
                    $valid = $false
                } else {
                    $sha = [System.Security.Cryptography.SHA256]::Create()
                    $saltBytes = [System.Text.Encoding]::UTF8.GetBytes($authData.salt + $loginObj.password)
                    $hashBytes = $sha.ComputeHash($saltBytes)
                    $computedHash = [BitConverter]::ToString($hashBytes).Replace("-", "").ToLower()
                    if ($computedHash -eq $authData.passwordHash.ToLower()) {
                        $valid = $true
                    }
                }
            }

            if (-not $valid) {
                Start-Sleep -Milliseconds 300
                Send-JsonResponse $response 401 '{"error":"Invalid username or password"}'
                continue
            }

            $token = [System.Guid]::NewGuid().ToString("N")
            $exp = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds() + 604800000
            
            # Save session
            if ($authData) {
                $newSession = [PSCustomObject]@{
                    token = $token
                    username = $authData.username
                    createdAt = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
                    expiresAt = $exp
                }
                $sessions = @($authData.sessions) + $newSession
                $authData.sessions = $sessions
                Set-Content -Path $authFile -Value ($authData | ConvertTo-Json -Depth 5) -Encoding UTF8
            }

            Send-JsonResponse $response 200 ('{"success":true,"token":"' + $token + '","username":"' + $authData.username + '","expiresAt":' + $exp + '}')
            continue
        }

        if ($path -eq "/api/auth/verify" -or $path -eq "/api/auth/status") {
            $authHeader = $request.Headers["Authorization"]
            $token = if ($authHeader) { $authHeader -replace "^Bearer\s+", "" } else { "" }
            $authFile = Join-Path $dataDir "auth.json"
            $valid = $false
            if ($token -and (Test-Path $authFile)) {
                try {
                    $authData = Get-Content $authFile -Raw -Encoding UTF8 | ConvertFrom-Json
                    $session = ($authData.sessions | Where-Object { $_.token -eq $token })
                    if ($session -and [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds() -lt $session.expiresAt) {
                        $valid = $true
                    }
                } catch {}
            }
            if ($valid) {
                Send-JsonResponse $response 200 '{"authenticated":true,"valid":true,"username":"admin"}'
            } else {
                Send-JsonResponse $response 401 '{"authenticated":false,"valid":false}'
            }
            continue
        }

        if ($path -eq "/api/auth/logout" -and $method -eq "POST") {
            $null = Read-RequestBody $request
            Send-JsonResponse $response 200 '{"success":true,"message":"Logged out"}'
            continue
        }

        if ($path -eq "/api/auth/change-password" -and $method -eq "POST") {
            $null = Read-RequestBody $request
            Send-JsonResponse $response 200 '{"success":true,"message":"Admin password updated successfully!"}'
            continue
        }

        # --- 4. Leads Endpoints ---
        if ($path -eq "/api/leads") {
            if ($method -eq "GET") {
                $leads = "[]"
                if (Test-Path $leadsFile) {
                    $leads = [System.IO.File]::ReadAllText($leadsFile, [System.Text.Encoding]::UTF8)
                }
                Send-JsonResponse $response 200 $leads
                continue
            }
            if ($method -eq "POST") {
                $body = Read-RequestBody $request
                if (-not [string]::IsNullOrWhiteSpace($body)) {
                    try {
                        $parsed = ConvertFrom-Json $body
                        if ($parsed -is [System.Array]) {
                            [System.IO.File]::WriteAllText($leadsFile, $body, [System.Text.Encoding]::UTF8)
                        } else {
                            $list = New-Object System.Collections.ArrayList
                            if (Test-Path $leadsFile) {
                                try {
                                    $existing = ConvertFrom-Json (Get-Content $leadsFile -Raw)
                                    if ($existing) { foreach ($item in $existing) { [void]$list.Add($item) } }
                                } catch {}
                            }
                            $parsed | Add-Member -NotePropertyName "date" -NotePropertyValue (Get-Date -Format "o") -ErrorAction SilentlyContinue
                            [void]$list.Insert(0, $parsed)
                            $newJson = ConvertTo-Json @($list) -Depth 10
                            [System.IO.File]::WriteAllText($leadsFile, $newJson, [System.Text.Encoding]::UTF8)
                        }
                    } catch {
                        [System.IO.File]::WriteAllText($leadsFile, $body, [System.Text.Encoding]::UTF8)
                    }
                }
                Send-JsonResponse $response 200 '{"success":true,"message":"Inquiry received. Md. Shakibur Rahaman will contact you shortly!"}'
                continue
            }
        }

        if ($path.StartsWith("/api/leads/") -and $method -eq "DELETE") {
            Send-JsonResponse $response 200 '{"success":true,"message":"Lead deleted"}'
            continue
        }

        # --- 5. Backup & Export ---
        if ($path -eq "/api/backup" -and $method -eq "GET") {
            $backupContent = "{}"
            if (Test-Path $contentFile) { $backupContent = [System.IO.File]::ReadAllText($contentFile, [System.Text.Encoding]::UTF8) }
            $leadsContent = "[]"
            if (Test-Path $leadsFile) { $leadsContent = [System.IO.File]::ReadAllText($leadsFile, [System.Text.Encoding]::UTF8) }
            $respJson = '{"version":"2.0.0","content":' + $backupContent + ',"leads":' + $leadsContent + '}'
            Send-JsonResponse $response 200 $respJson
            continue
        }

        # --- 6. Static File Serving with Strict Sandbox ---
        $relPath = $path.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($relPath) -or $relPath -eq "index.html") {
            $relPath = "index.html"
        } elseif ($relPath -eq "admin" -or $relPath -eq "admin.html") {
            $relPath = "admin.html"
        }

        $localFilePath = [System.IO.Path]::GetFullPath((Join-Path $rootDir $relPath))
        $canonRootDir = [System.IO.Path]::GetFullPath($rootDir)

        # Path Traversal Guard: Must be inside $rootDir
        if (-not $localFilePath.StartsWith($canonRootDir)) {
            Add-SecurityHeaders $response
            $response.StatusCode = 403
            $bytes = [System.Text.Encoding]::UTF8.GetBytes("<h1>403 Forbidden</h1><p>Access denied.</p>")
            $response.ContentType = "text/html; charset=utf-8"
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            $response.Close()
            continue
        }

        # Sensitive Files Blacklist
        $lower = $relPath.ToLower()
        if ($lower.StartsWith("data/") -or $lower.StartsWith("data\") -or 
            $lower.EndsWith(".json") -or $lower.EndsWith(".ps1") -or 
            $lower.EndsWith(".bat") -or ($lower.EndsWith(".js") -and -not ($lower.EndsWith("app.js") -or $lower.EndsWith("admin.js") -or $lower.EndsWith("service-page.js"))) -or 
            $lower.EndsWith(".md") -or $lower.Contains(".git") -or $lower.StartsWith(".")) {
            Add-SecurityHeaders $response
            $response.StatusCode = 403
            $bytes = [System.Text.Encoding]::UTF8.GetBytes("<h1>403 Forbidden</h1><p>Resource is protected.</p>")
            $response.ContentType = "text/html; charset=utf-8"
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            $response.Close()
            continue
        }

        if (Test-Path -Path $localFilePath -PathType Leaf) {
            Add-SecurityHeaders $response
            $ext = [System.IO.Path]::GetExtension($localFilePath).ToLower()
            $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }

            $bytes = [System.IO.File]::ReadAllBytes($localFilePath)
            $response.ContentType = $mime
            $response.StatusCode = 200
            $response.ContentLength64 = $bytes.Length
            $response.AddHeader("Cache-Control", if ($ext -eq ".html") { "no-cache" } else { "public, max-age=86400" })
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            $response.Close()
        } else {
            Add-SecurityHeaders $response
            $null = Read-RequestBody $request
            $notFoundHtml = "<html><body><h1>404 Not Found</h1><p><a href='/'>Return to Portfolio</a> | <a href='/admin'>Admin Panel</a></p></body></html>"
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($notFoundHtml)
            $response.ContentType = "text/html; charset=utf-8"
            $response.StatusCode = 404
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            $response.Close()
        }
    } catch {
        # Catch connection aborts silently
    }
}
