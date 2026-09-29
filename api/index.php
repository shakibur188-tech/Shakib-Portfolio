<?php
/**
 * Shakibur CMS - Universal PHP API Bridge
 * Provides zero-config REST API endpoints for standard cPanel, Apache, and LiteSpeed hosting.
 * Handles Content CRUD, Inquiries/Leads persistence, Auth, and Backups using the JSON flat-file database.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Cache-Control');
header('Cache-Control: no-store, no-cache, must-revalidate');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$rootDir = dirname(__DIR__);
$dataDir = $rootDir . '/data';
$backupsDir = $dataDir . '/backups';
$contentFile = $dataDir . '/content.json';
$rootContent = $rootDir . '/content.json';
$leadsFile = $dataDir . '/leads.json';
$authFile = $dataDir . '/auth.json';
$configFile = $dataDir . '/config.json';
$defaultContentFile = $dataDir . '/default_content.json';
$llmsFile = $rootDir . '/llms.txt';
$aiAssetsDir = $rootDir . '/assets/ai';

// Ensure data, backup, and AI assets directories exist
if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0755, true);
}
if (!is_dir($backupsDir)) {
    @mkdir($backupsDir, 0755, true);
}
if (!is_dir($aiAssetsDir)) {
    @mkdir($aiAssetsDir, 0755, true);
}

// Request path parsing
$requestUri = $_SERVER['REQUEST_URI'] ?? '/';
$parsedPath = parse_url($requestUri, PHP_URL_PATH);
$method = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');

// Normalize path: strip subfolder if hosted in subdirectory
$scriptName = dirname($_SERVER['SCRIPT_NAME']);
if ($scriptName !== '/' && $scriptName !== '\\' && strpos($parsedPath, $scriptName) === 0) {
    $parsedPath = substr($parsedPath, strlen($scriptName));
}
// Normalize /api/...
$path = preg_replace('#^/api#', '', $parsedPath);
$path = '/' . ltrim($path, '/');

// Helpers
function sendJson($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

function getJsonBody() {
    $raw = file_get_contents('php://input');
    if (empty($raw)) return [];
    $parsed = json_decode($raw, true);
    return is_array($parsed) ? $parsed : [];
}

function hashPassword($password, $salt) {
    return hash('sha256', $salt . $password);
}

function getAuthData($authFile) {
    if (file_exists($authFile)) {
        $content = file_get_contents($authFile);
        $data = json_decode($content, true);
        if (is_array($data)) return $data;
    }
    $defaultSalt = 'shakibur_secure_salt_892347';
    $defaultHash = hashPassword('admin1234', $defaultSalt);
    $defaultAuth = [
        'username' => 'admin',
        'salt' => $defaultSalt,
        'passwordHash' => $defaultHash,
        'sessions' => []
    ];
    @file_put_contents($authFile, json_encode($defaultAuth, JSON_PRETTY_PRINT));
    return $defaultAuth;
}

function verifyAuthHeader($authFile) {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    $token = trim(preg_replace('/^Bearer\s+/i', '', $authHeader));
    if (!$token) return false;

    $authData = getAuthData($authFile);
    $sessions = $authData['sessions'] ?? [];
    $now = time() * 1000;

    foreach ($sessions as $s) {
        if (($s['token'] ?? '') === $token) {
            if (isset($s['expiresAt']) && $now > $s['expiresAt']) {
                return false;
            }
            return $s;
        }
    }
    return false;
}

// -------------------------------------------------------------
// 1. CONTENT ENDPOINTS (/api/content)
// -------------------------------------------------------------
if ($path === '/content') {
    if ($method === 'GET') {
        if (file_exists($contentFile)) {
            echo file_get_contents($contentFile);
            exit;
        } elseif (file_exists($rootContent)) {
            echo file_get_contents($rootContent);
            exit;
        }
        sendJson(['error' => 'Content not found'], 404);
    }

    if ($method === 'PUT' || $method === 'POST') {
        $session = verifyAuthHeader($authFile);
        if (!$session) {
            sendJson(['error' => 'Unauthorized. Please login.'], 401);
        }

        $rawBody = file_get_contents('php://input');
        if (empty($rawBody)) {
            sendJson(['error' => 'Empty payload'], 400);
        }

        $parsed = json_decode($rawBody, true);
        if (!is_array($parsed)) {
            sendJson(['error' => 'Invalid JSON'], 400);
        }

        // Backup current version
        if (file_exists($contentFile)) {
            $backupFile = $backupsDir . '/content_backup_' . time() . '.json';
            @copy($contentFile, $backupFile);
        }

        // Save to data/content.json and root content.json
        @file_put_contents($contentFile, $rawBody);
        @file_put_contents($rootContent, $rawBody);

        // Auto-sync llms.txt if present
        if (!empty($parsed['seo']['aiSeo']['llmsTxtContent'])) {
            @file_put_contents($llmsFile, $parsed['seo']['aiSeo']['llmsTxtContent']);
        }

        sendJson([
            'success' => true,
            'message' => 'Site content updated and published live!'
        ]);
    }
}

// -------------------------------------------------------------
// 2. RESET ENDPOINTS (/api/reset, /api/content/reset)
// -------------------------------------------------------------
if ($path === '/reset' || $path === '/content/reset') {
    if ($method === 'POST') {
        $session = verifyAuthHeader($authFile);
        if (!$session) {
            sendJson(['error' => 'Unauthorized'], 401);
        }

        if (file_exists($defaultContentFile)) {
            $def = file_get_contents($defaultContentFile);
            @file_put_contents($contentFile, $def);
            @file_put_contents($rootContent, $def);
        }
        sendJson(['success' => true, 'message' => 'Content reset to default.']);
    }
}

// -------------------------------------------------------------
// 3. AUTH ENDPOINTS (/api/auth/...)
// -------------------------------------------------------------
if ($path === '/auth/login' && $method === 'POST') {
    $body = getJsonBody();
    $username = $body['username'] ?? '';
    $password = $body['password'] ?? '';
    $authData = getAuthData($authFile);

    if (empty($password) || (!empty($username) && $username !== ($authData['username'] ?? 'admin'))) {
        sendJson(['error' => 'Invalid username or password'], 401);
    }

    $inputHash = hashPassword($password, $authData['salt'] ?? '');
    if ($inputHash !== ($authData['passwordHash'] ?? '')) {
        sendJson(['error' => 'Invalid password'], 401);
    }

    $token = bin2hex(random_bytes(32));
    $expiresAt = (time() + 7 * 86400) * 1000;

    $authData['sessions'] = $authData['sessions'] ?? [];
    $authData['sessions'][] = [
        'token' => $token,
        'username' => $authData['username'] ?? 'admin',
        'createdAt' => time() * 1000,
        'expiresAt' => $expiresAt
    ];
    @file_put_contents($authFile, json_encode($authData, JSON_PRETTY_PRINT));

    sendJson([
        'success' => true,
        'token' => $token,
        'username' => $authData['username'] ?? 'admin',
        'expiresAt' => $expiresAt
    ]);
}

if (($path === '/auth/verify' || $path === '/auth/status') && $method === 'GET') {
    $session = verifyAuthHeader($authFile);
    if (!$session) {
        sendJson(['authenticated' => false, 'valid' => false], 401);
    }
    sendJson(['authenticated' => true, 'valid' => true, 'username' => $session['username'] ?? 'admin']);
}

if ($path === '/auth/logout' && $method === 'POST') {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    $token = trim(preg_replace('/^Bearer\s+/i', '', $authHeader));

    if ($token) {
        $authData = getAuthData($authFile);
        $authData['sessions'] = array_filter($authData['sessions'] ?? [], function($s) use ($token) {
            return ($s['token'] ?? '') !== $token;
        });
        @file_put_contents($authFile, json_encode($authData, JSON_PRETTY_PRINT));
    }
    sendJson(['success' => true, 'message' => 'Logged out']);
}

if ($path === '/auth/change-password' && $method === 'POST') {
    $session = verifyAuthHeader($authFile);
    if (!$session) {
        sendJson(['error' => 'Unauthorized'], 401);
    }

    $body = getJsonBody();
    $current = $body['currentPassword'] ?? '';
    $new = $body['newPassword'] ?? '';
    $authData = getAuthData($authFile);

    if (strlen($new) < 6) {
        sendJson(['error' => 'New password must be at least 6 characters'], 400);
    }

    $currentHash = hashPassword($current, $authData['salt'] ?? '');
    if ($currentHash !== ($authData['passwordHash'] ?? '')) {
        sendJson(['error' => 'Current password is incorrect'], 400);
    }

    $authData['passwordHash'] = hashPassword($new, $authData['salt'] ?? '');
    // Keep only active session
    $authData['sessions'] = array_filter($authData['sessions'] ?? [], function($s) use ($session) {
        return ($s['token'] ?? '') === ($session['token'] ?? '');
    });
    @file_put_contents($authFile, json_encode($authData, JSON_PRETTY_PRINT));

    sendJson(['success' => true, 'message' => 'Password updated successfully']);
}

// -------------------------------------------------------------
// 4. LEADS ENDPOINTS (/api/leads)
// -------------------------------------------------------------
if ($path === '/leads') {
    if ($method === 'GET') {
        $session = verifyAuthHeader($authFile);
        if (!$session) {
            sendJson(['error' => 'Unauthorized'], 401);
        }

        if (file_exists($leadsFile)) {
            echo file_get_contents($leadsFile);
            exit;
        }
        sendJson([]);
    }

    if ($method === 'POST') {
        $body = getJsonBody();
        $leads = [];
        if (file_exists($leadsFile)) {
            $existing = json_decode(file_get_contents($leadsFile), true);
            if (is_array($existing)) $leads = $existing;
        }

        if (isset($body[0]) && is_array($body[0])) {
            // Bulk array save
            $leads = $body;
        } else {
            // Single lead insertion
            $body['id'] = 'lead_' . time() . '_' . rand(1000, 9999);
            $body['date'] = date('c');
            $body['status'] = 'new';
            array_unshift($leads, $body);
        }

        @file_put_contents($leadsFile, json_encode($leads, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

        sendJson([
            'success' => true,
            'message' => 'Inquiry received. Md. Shakibur Rahaman will contact you shortly!',
            'leadId' => $body['id'] ?? null
        ], 201);
    }
}

// Delete single lead (/api/leads/{id})
if (strpos($path, '/leads/') === 0 && $method === 'DELETE') {
    $session = verifyAuthHeader($authFile);
    if (!$session) {
        sendJson(['error' => 'Unauthorized'], 401);
    }

    $leadId = substr($path, strlen('/leads/'));
    $leads = [];
    if (file_exists($leadsFile)) {
        $existing = json_decode(file_get_contents($leadsFile), true);
        if (is_array($existing)) $leads = $existing;
    }

    $leads = array_values(array_filter($leads, function($l) use ($leadId) {
        return ($l['id'] ?? '') !== $leadId;
    }));

    @file_put_contents($leadsFile, json_encode($leads, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    sendJson(['success' => true, 'message' => 'Lead deleted']);
}

// -------------------------------------------------------------
// 5. BACKUP & RESTORE (/api/backup, /api/restore)
// -------------------------------------------------------------
if ($path === '/backup' && $method === 'GET') {
    $session = verifyAuthHeader($authFile);
    if (!$session) {
        sendJson(['error' => 'Unauthorized'], 401);
    }

    $c = file_exists($contentFile) ? json_decode(file_get_contents($contentFile), true) : [];
    $l = file_exists($leadsFile) ? json_decode(file_get_contents($leadsFile), true) : [];

    sendJson([
        'version' => '2.0.0',
        'exportedAt' => date('c'),
        'content' => $c,
        'leads' => $l
    ]);
}

if ($path === '/restore' && $method === 'POST') {
    $session = verifyAuthHeader($authFile);
    if (!$session) {
        sendJson(['error' => 'Unauthorized'], 401);
    }

    $body = getJsonBody();
    if (!empty($body['content'])) {
        $raw = json_encode($body['content'], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        @file_put_contents($contentFile, $raw);
        @file_put_contents($rootContent, $raw);
    }
    if (!empty($body['leads']) && is_array($body['leads'])) {
        @file_put_contents($leadsFile, json_encode($body['leads'], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    }
    sendJson(['success' => true, 'message' => 'Backup restored successfully']);
}

// -------------------------------------------------------------
// 6. OPENAI SUITE (/api/ai/status, /api/ai/config, /api/ai/generate, /api/ai/image)
// -------------------------------------------------------------
function getPhpAppConfig($configFile) {
    if (file_exists($configFile)) {
        $data = json_decode(file_get_contents($configFile), true);
        if (is_array($data)) {
            return [
                'openaiApiKey' => $data['openaiApiKey'] ?? '',
                'openaiBaseUrl' => $data['openaiBaseUrl'] ?? 'https://api.xkiro.com/v1',
                'openaiTextModel' => $data['openaiTextModel'] ?? 'qwen/qwen3.8-max:free',
                'openaiImageModel' => $data['openaiImageModel'] ?? 'dall-e-3'
            ];
        }
    }
    return [
        'openaiApiKey' => getenv('OPENAI_API_KEY') ?: '',
        'openaiBaseUrl' => getenv('OPENAI_BASE_URL') ?: 'https://api.xkiro.com/v1',
        'openaiTextModel' => 'qwen/qwen3.8-max:free',
        'openaiImageModel' => 'dall-e-3'
    ];
}

// AI Status
if ($path === '/ai/status' && $method === 'GET') {
    $session = verifyAuthHeader($authFile);
    if (!$session) sendJson(['error' => 'Unauthorized'], 401);

    $cfg = getPhpAppConfig($configFile);
    $key = trim($cfg['openaiApiKey'] ?? '');
    $hasKey = strlen($key) > 0;
    $masked = $hasKey ? (strlen($key) > 8 ? substr($key, 0, 6) . '...' . substr($key, -4) : '••••••••') : '';

    sendJson([
        'configured' => $hasKey,
        'maskedKey' => $masked,
        'baseUrl' => $cfg['openaiBaseUrl'] ?? 'https://api.xkiro.com/v1',
        'textModel' => $cfg['openaiTextModel'] ?? 'qwen/qwen3.8-max:free',
        'imageModel' => $cfg['openaiImageModel'] ?? 'dall-e-3'
    ]);
}

// AI Config Save
if ($path === '/ai/config' && $method === 'POST') {
    $session = verifyAuthHeader($authFile);
    if (!$session) sendJson(['error' => 'Unauthorized'], 401);

    $body = getJsonBody();
    $cfg = getPhpAppConfig($configFile);

    if (isset($body['baseUrl'])) {
        $cleanBase = rtrim(trim($body['baseUrl']), '/');
        $cfg['openaiBaseUrl'] = $cleanBase ?: 'https://api.xkiro.com/v1';
    }
    if (isset($body['apiKey'])) {
        $newKey = trim($body['apiKey']);
        if ($newKey !== '') $cfg['openaiApiKey'] = $newKey;
    }
    if (!empty($body['textModel'])) $cfg['openaiTextModel'] = trim($body['textModel']);
    if (!empty($body['imageModel'])) $cfg['openaiImageModel'] = trim($body['imageModel']);

    @file_put_contents($configFile, json_encode($cfg, JSON_PRETTY_PRINT));
    sendJson([
        'success' => true,
        'message' => 'AI API settings saved successfully!',
        'configured' => !empty($cfg['openaiApiKey']),
        'baseUrl' => $cfg['openaiBaseUrl'],
        'textModel' => $cfg['openaiTextModel']
    ]);
}

// AI Text & Idea Generation
if ($path === '/ai/generate' && $method === 'POST') {
    $session = verifyAuthHeader($authFile);
    if (!$session) sendJson(['error' => 'Unauthorized'], 401);

    $cfg = getPhpAppConfig($configFile);
    $apiKey = trim($cfg['openaiApiKey'] ?? '');

    $body = getJsonBody();
    $prompt = trim($body['prompt'] ?? '');
    $systemPrompt = trim($body['systemPrompt'] ?? 'You are an elite Creative Director and Brand Strategist for Md. Shakibur Rahaman.');
    $model = !empty($body['model']) ? $body['model'] : ($cfg['openaiTextModel'] ?? 'qwen/qwen3.8-max:free');
    $temp = isset($body['temperature']) ? floatval($body['temperature']) : 0.7;
    $rawBaseUrl = !empty($body['baseUrl']) ? $body['baseUrl'] : ($cfg['openaiBaseUrl'] ?? 'https://api.xkiro.com/v1');
    $cleanBaseUrl = rtrim($rawBaseUrl, '/');
    $endpoint = (substr($cleanBaseUrl, -17) === '/chat/completions') ? $cleanBaseUrl : $cleanBaseUrl . '/chat/completions';

    if (!$prompt) sendJson(['error' => 'Prompt cannot be empty.'], 400);

    $payload = json_encode([
        'model' => $model,
        'messages' => [
            ['role' => 'system', 'content' => $systemPrompt],
            ['role' => 'user', 'content' => $prompt]
        ],
        'temperature' => $temp
    ]);

    $headers = ['Content-Type: application/json'];
    if (!empty($apiKey)) {
        $headers[] = 'Authorization: Bearer ' . $apiKey;
        $headers[] = 'x-api-key: ' . $apiKey;
    }

    $ch = curl_init($endpoint);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $payload,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_TIMEOUT => 60
    ]);

    $resp = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err = curl_error($ch);
    curl_close($ch);

    if ($err) sendJson(['error' => 'cURL Error: ' . $err], 502);

    $parsed = json_decode($resp, true);
    if ($httpCode >= 200 && $httpCode < 300) {
        $text = $parsed['choices'][0]['message']['content'] ?? '';
        sendJson(['success' => true, 'text' => $text, 'model' => $model]);
    } else {
        $msg = $parsed['error']['message'] ?? ($parsed['message'] ?? 'AI API request failed (HTTP ' . $httpCode . ')');
        sendJson(['error' => $msg], 502);
    }
}

// AI Image Generation (DALL-E 3)
if ($path === '/ai/image' && $method === 'POST') {
    $session = verifyAuthHeader($authFile);
    if (!$session) sendJson(['error' => 'Unauthorized'], 401);

    $cfg = getPhpAppConfig($configFile);
    $apiKey = trim($cfg['openaiApiKey'] ?? '');

    $body = getJsonBody();
    $prompt = trim($body['prompt'] ?? '');
    $model = !empty($body['model']) ? $body['model'] : ($cfg['openaiImageModel'] ?? 'dall-e-3');
    $size = $body['size'] ?? '1024x1024';
    $rawBaseUrl = !empty($body['baseUrl']) ? $body['baseUrl'] : 'https://api.openai.com/v1';
    $cleanBaseUrl = rtrim($rawBaseUrl, '/');
    $endpoint = (substr($cleanBaseUrl, -19) === '/images/generations') ? $cleanBaseUrl : $cleanBaseUrl . '/images/generations';

    if (!$prompt) sendJson(['error' => 'Image prompt cannot be empty.'], 400);

    $payload = json_encode([
        'model' => $model,
        'prompt' => $prompt,
        'n' => 1,
        'size' => $size
    ]);

    $headers = ['Content-Type: application/json'];
    if (!empty($apiKey)) {
        $headers[] = 'Authorization: Bearer ' . $apiKey;
    }

    $ch = curl_init($endpoint);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $payload,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_TIMEOUT => 90
    ]);

    $resp = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err = curl_error($ch);
    curl_close($ch);

    if ($err) sendJson(['error' => 'cURL Error: ' . $err], 502);

    $parsed = json_decode($resp, true);
    if ($httpCode >= 200 && $httpCode < 300) {
        $remoteUrl = $parsed['data'][0]['url'] ?? '';
        $revised = $parsed['data'][0]['revised_prompt'] ?? $prompt;

        // Try downloading image locally
        $localWebUrl = $remoteUrl;
        if ($remoteUrl) {
            $imgName = 'ai_img_' . time() . '_' . bin2hex(random_bytes(3)) . '.png';
            $dest = $aiAssetsDir . '/' . $imgName;
            $imgData = @file_get_contents($remoteUrl);
            if ($imgData) {
                @file_put_contents($dest, $imgData);
                $localWebUrl = '/assets/ai/' . $imgName;
            }
        }

        sendJson([
            'success' => true,
            'url' => $localWebUrl,
            'remoteUrl' => $remoteUrl,
            'revisedPrompt' => $revised
        ]);
    } else {
        $msg = $parsed['error']['message'] ?? 'Image request failed';
        sendJson(['error' => $msg], 502);
    }
}

// Fallback 404
sendJson(['error' => 'Endpoint not found', 'path' => $path], 404);
