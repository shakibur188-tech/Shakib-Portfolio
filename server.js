const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const url = require('url');

const PORT = parseInt(process.env.PORT, 10) || 5500;
const DIR = __dirname;
const DATA_DIR = path.join(DIR, 'data');
const BACKUPS_DIR = path.join(DATA_DIR, 'backups');

const CONTENT_FILE = path.join(DATA_DIR, 'content.json');
const AUTH_FILE = path.join(DATA_DIR, 'auth.json');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const CONFIG_FILE = path.join(DATA_DIR, 'config.json');
const FORMS_FILE = path.join(DATA_DIR, 'forms.json');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'form_submissions.json');
const AI_ASSETS_DIR = path.join(DIR, 'assets', 'ai');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(BACKUPS_DIR)) {
  fs.mkdirSync(BACKUPS_DIR, { recursive: true });
}
if (!fs.existsSync(AI_ASSETS_DIR)) {
  fs.mkdirSync(AI_ASSETS_DIR, { recursive: true });
}

// Forms & Submissions Helpers
function getForms() {
  if (fs.existsSync(FORMS_FILE)) {
    try {
      const raw = fs.readFileSync(FORMS_FILE, 'utf8').replace(/^\uFEFF/, '');
      return JSON.parse(raw);
    } catch (e) {
      console.error('Error reading forms file:', e);
      return [];
    }
  }
  return [];
}

function saveForms(forms) {
  fs.writeFileSync(FORMS_FILE, JSON.stringify(forms, null, 2), 'utf8');
}

function getFormSubmissions() {
  if (fs.existsSync(SUBMISSIONS_FILE)) {
    try {
      const raw = fs.readFileSync(SUBMISSIONS_FILE, 'utf8').replace(/^\uFEFF/, '');
      return JSON.parse(raw);
    } catch (e) {
      console.error('Error reading submissions file:', e);
      return [];
    }
  }
  return [];
}

function saveFormSubmissions(subs) {
  fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(subs, null, 2), 'utf8');
}

// Config Helpers (for OpenAI API key & defaults)
function getAppConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const raw = fs.readFileSync(CONFIG_FILE, 'utf8').replace(/^\uFEFF/, '');
      const parsed = JSON.parse(raw);
      return {
        openaiApiKey: parsed.openaiApiKey || '',
        openaiBaseUrl: parsed.openaiBaseUrl || 'https://api.xkiro.com/v1',
        openaiTextModel: parsed.openaiTextModel || 'qwen/qwen3.8-max:free',
        openaiImageModel: parsed.openaiImageModel || 'dall-e-3'
      };
    }
  } catch (e) {
    console.error('Error reading config file:', e);
  }
  return {
    openaiApiKey: process.env.OPENAI_API_KEY || '',
    openaiBaseUrl: process.env.OPENAI_BASE_URL || 'https://api.xkiro.com/v1',
    openaiTextModel: 'qwen/qwen3.8-max:free',
    openaiImageModel: 'dall-e-3'
  };
}

function saveAppConfig(cfg) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(cfg, null, 2), 'utf8');
}

// Helpers for Crypto & Auth
function hashPassword(password, salt) {
  return crypto.createHash('sha256').update(salt + password).digest('hex');
}

function verifyPasswordHash(inputPassword, salt, expectedHash) {
  if (!inputPassword || !salt || !expectedHash) return false;
  const inputHash = hashPassword(inputPassword, salt);
  const inputBuf = Buffer.from(inputHash, 'utf8');
  const expectedBuf = Buffer.from(expectedHash, 'utf8');
  if (inputBuf.length !== expectedBuf.length) {
    return false;
  }
  return crypto.timingSafeEqual(inputBuf, expectedBuf);
}

function generateSalt() {
  return crypto.randomBytes(16).toString('hex');
}

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

// In-Memory Login Brute-Force Rate Limiter
const loginAttempts = new Map(); // ip -> { count, firstAttempt, lockedUntil }

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress || '127.0.0.1';
}

function checkLoginRateLimit(ip) {
  const now = Date.now();
  const record = loginAttempts.get(ip);
  if (!record) return { allowed: true };

  if (record.lockedUntil) {
    if (now < record.lockedUntil) {
      const minsLeft = Math.ceil((record.lockedUntil - now) / 60000);
      return {
        allowed: false,
        error: `Security lock active due to repeated failed logins. Please try again in ${minsLeft} minute(s).`
      };
    } else {
      loginAttempts.delete(ip);
      return { allowed: true };
    }
  }

  return { allowed: true };
}

function recordLoginFailure(ip) {
  const now = Date.now();
  const record = loginAttempts.get(ip) || { count: 0, firstAttempt: now };

  if (now - record.firstAttempt > 15 * 60 * 1000) {
    record.count = 0;
    record.firstAttempt = now;
  }

  record.count += 1;
  if (record.count >= 5) {
    record.lockedUntil = now + 15 * 60 * 1000; // 15 minute lock
  }
  loginAttempts.set(ip, record);
}

function recordLoginSuccess(ip) {
  loginAttempts.delete(ip);
}

// Hardened Security Headers
const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': "default-src 'self' 'unsafe-inline' https: http: data: blob:;"
};

function applySecurityHeaders(res) {
  for (const [header, val] of Object.entries(SECURITY_HEADERS)) {
    res.setHeader(header, val);
  }
}

// Initialize Auth DB if missing
function getAuthData() {
  try {
    if (fs.existsSync(AUTH_FILE)) {
      const raw = fs.readFileSync(AUTH_FILE, 'utf8').replace(/^\uFEFF/, '');
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error reading auth file:', e);
  }
  const defaultSalt = generateSalt();
  const defaultHash = hashPassword('admin1234', defaultSalt);
  const defaultAuth = {
    username: 'admin',
    salt: defaultSalt,
    passwordHash: defaultHash,
    sessions: []
  };
  fs.writeFileSync(AUTH_FILE, JSON.stringify(defaultAuth, null, 2), 'utf8');
  return defaultAuth;
}

function saveAuthData(data) {
  fs.writeFileSync(AUTH_FILE, JSON.stringify(data, null, 2), 'utf8');
}

function verifyAuth(req) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!token) return false;

  const authData = getAuthData();
  const session = (authData.sessions || []).find(s => s.token === token);
  if (!session) return false;

  // Check 7-day expiration
  if (Date.now() > session.expiresAt) {
    authData.sessions = authData.sessions.filter(s => s.token !== token);
    saveAuthData(authData);
    return false;
  }
  return session;
}

// Content Helpers
function getContent() {
  if (fs.existsSync(CONTENT_FILE)) {
    try {
      const raw = fs.readFileSync(CONTENT_FILE, 'utf8').replace(/^\uFEFF/, '');
      return JSON.parse(raw);
    } catch (e) {
      console.error('Error reading content file:', e);
    }
  }
  // Fallback to root content.json if present
  const rootContent = path.join(DIR, 'content.json');
  if (fs.existsSync(rootContent)) {
    try {
      const raw = fs.readFileSync(rootContent, 'utf8').replace(/^\uFEFF/, '');
      const data = JSON.parse(raw);
      fs.writeFileSync(CONTENT_FILE, JSON.stringify(data, null, 2), 'utf8');
      return data;
    } catch (e) {}
  }
  return {};
}

function saveContent(data) {
  // Backup previous version
  try {
    if (fs.existsSync(CONTENT_FILE)) {
      const backupPath = path.join(BACKUPS_DIR, `content_backup_${Date.now()}.json`);
      fs.copyFileSync(CONTENT_FILE, backupPath);
      // Keep only last 10 backups
      const files = fs.readdirSync(BACKUPS_DIR).map(f => path.join(BACKUPS_DIR, f));
      if (files.length > 10) {
        files.sort((a, b) => fs.statSync(a).mtimeMs - fs.statSync(b).mtimeMs);
        while (files.length > 10) {
          fs.unlinkSync(files.shift());
        }
      }
    }
  } catch (err) {
    console.warn('Backup creation note:', err.message);
  }

  fs.writeFileSync(CONTENT_FILE, JSON.stringify(data, null, 2), 'utf8');
  // Also keep root content.json in sync
  try {
    fs.writeFileSync(path.join(DIR, 'content.json'), JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {}
  // Keep llms.txt in sync if present
  try {
    if (data.seo && data.seo.aiSeo && data.seo.aiSeo.llmsTxtContent) {
      fs.writeFileSync(path.join(DIR, 'llms.txt'), data.seo.aiSeo.llmsTxtContent, 'utf8');
    }
  } catch (e) {}
}

// Leads Helpers
function getLeads() {
  if (fs.existsSync(LEADS_FILE)) {
    try {
      const raw = fs.readFileSync(LEADS_FILE, 'utf8').replace(/^\uFEFF/, '');
      return JSON.parse(raw);
    } catch (e) {
      return [];
    }
  }
  return [];
}

function saveLeads(leads) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf8');
}

// ==========================================
// OpenAI API Client Helpers (Supports xkiro, official OpenAI & custom OpenAI-compatible gateways)
// ==========================================
function callOpenAIChat(apiKey, model, messages, temperature = 0.7, baseUrl = 'https://api.xkiro.com/v1') {
  return new Promise((resolve) => {
    const payload = JSON.stringify({
      model: model || 'qwen/qwen3.8-max:free',
      messages,
      temperature
    });

    try {
      const cleanBase = (baseUrl || 'https://api.xkiro.com/v1').trim().replace(/\/+$/, '');
      const endpoint = cleanBase.endsWith('/chat/completions') ? cleanBase : `${cleanBase}/chat/completions`;
      const targetUrl = new URL(endpoint);
      const isHttps = targetUrl.protocol === 'https:';
      const client = isHttps ? https : http;

      const headers = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      };
      if (apiKey && apiKey.trim()) {
        headers['Authorization'] = `Bearer ${apiKey.trim()}`;
        headers['x-api-key'] = apiKey.trim();
      }

      const options = {
        hostname: targetUrl.hostname,
        port: targetUrl.port || (isHttps ? 443 : 80),
        path: targetUrl.pathname + targetUrl.search,
        method: 'POST',
        headers,
        timeout: 60000
      };

      const req = client.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            if (res.statusCode >= 200 && res.statusCode < 300) {
              const content = parsed.choices?.[0]?.message?.content || '';
              resolve({ success: true, text: content, usage: parsed.usage });
            } else {
              const errMsg = parsed.error?.message || parsed.message || `API Error (HTTP ${res.statusCode}): ${data.substring(0, 300)}`;
              resolve({ success: false, error: errMsg });
            }
          } catch (e) {
            resolve({ success: false, error: `Failed to parse API response (${res.statusCode}): ` + data.substring(0, 300) });
          }
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({ success: false, error: 'API request timed out (60s).' });
      });

      req.on('error', (err) => {
        resolve({ success: false, error: 'Network request error: ' + err.message });
      });

      req.write(payload);
      req.end();
    } catch (urlErr) {
      resolve({ success: false, error: 'Invalid API Base URL: ' + urlErr.message });
    }
  });
}

function callOpenAIImage(apiKey, model, prompt, size = '1024x1024', quality = 'standard', baseUrl = 'https://api.openai.com/v1') {
  return new Promise((resolve) => {
    const payload = JSON.stringify({
      model: model || 'dall-e-3',
      prompt,
      n: 1,
      size,
      quality
    });

    try {
      const cleanBase = (baseUrl || 'https://api.openai.com/v1').trim().replace(/\/+$/, '');
      const endpoint = cleanBase.endsWith('/images/generations') ? cleanBase : `${cleanBase}/images/generations`;
      const targetUrl = new URL(endpoint);
      const isHttps = targetUrl.protocol === 'https:';
      const client = isHttps ? https : http;

      const headers = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      };
      if (apiKey && apiKey.trim()) {
        headers['Authorization'] = `Bearer ${apiKey.trim()}`;
      }

      const options = {
        hostname: targetUrl.hostname,
        port: targetUrl.port || (isHttps ? 443 : 80),
        path: targetUrl.pathname + targetUrl.search,
        method: 'POST',
        headers,
        timeout: 90000
      };

      const req = client.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', async () => {
          try {
            const parsed = JSON.parse(data);
            if (res.statusCode >= 200 && res.statusCode < 300) {
              const remoteUrl = parsed.data?.[0]?.url;
              const revisedPrompt = parsed.data?.[0]?.revised_prompt || prompt;

              // Automatically download and store in assets/ai/ so image never expires!
              if (remoteUrl) {
                const filename = `ai_img_${Date.now()}_${crypto.randomBytes(4).toString('hex')}.png`;
                const localPath = path.join(AI_ASSETS_DIR, filename);
                const localWebUrl = `/assets/ai/${filename}`;

                try {
                  await downloadFile(remoteUrl, localPath);
                  resolve({ success: true, url: localWebUrl, remoteUrl, revisedPrompt });
                } catch (dlErr) {
                  resolve({ success: true, url: remoteUrl, remoteUrl, revisedPrompt });
                }
              } else {
                resolve({ success: false, error: 'No image URL returned by API.' });
              }
            } else {
              const errMsg = parsed.error?.message || `API Image Error (HTTP ${res.statusCode}): ${data.substring(0, 300)}`;
              resolve({ success: false, error: errMsg });
            }
          } catch (e) {
            resolve({ success: false, error: 'Failed to parse API response: ' + e.message });
          }
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({ success: false, error: 'Image generation timed out (90s).' });
      });

      req.on('error', (err) => {
        resolve({ success: false, error: 'Network request error: ' + err.message });
      });

      req.write(payload);
      req.end();
    } catch (urlErr) {
      resolve({ success: false, error: 'Invalid Image API Base URL: ' + urlErr.message });
    }
  });
}

function downloadFile(fileUrl, destPath) {
  return new Promise((resolve, reject) => {
    https.get(fileUrl, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download image, status code: ${res.statusCode}`));
      }
      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close(resolve);
      });
      fileStream.on('error', (err) => {
        fs.unlink(destPath, () => reject(err));
      });
    }).on('error', reject);
  });
}

// Request JSON body parser
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 10 * 1024 * 1024) { // 10MB limit
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body.trim()) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

// Response helpers
function jsonResponse(res, statusCode, data) {
  applySecurityHeaders(res);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8'
};

// Global Process Error Handlers
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});

const server = http.createServer(async (req, res) => {
  let parsedUrl;
  try {
    parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
  } catch (e) {
    parsedUrl = { pathname: req.url };
  }
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    applySecurityHeaders(res);
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  // ==========================================
  // REST API ROUTING
  // ==========================================

  // --- Tunnel Status ---
  if (pathname === '/api/tunnel' && method === 'GET') {
    return jsonResponse(res, 200, {
      active: !!currentTunnelUrl,
      url: currentTunnelUrl,
      adminUrl: currentTunnelUrl ? `${currentTunnelUrl}/admin` : null
    });
  }

  // --- Auth: Login (With Brute-Force Rate Limiting & Timing Attack Protection) ---
  if (pathname === '/api/auth/login' && method === 'POST') {
    const clientIp = getClientIp(req);
    const rateCheck = checkLoginRateLimit(clientIp);
    if (!rateCheck.allowed) {
      return jsonResponse(res, 429, { error: rateCheck.error });
    }

    try {
      const body = await parseJsonBody(req);
      const { username, password } = body;
      const authData = getAuthData();

      // 300ms artificial delay to thwart automated high-speed brute force
      await new Promise(r => setTimeout(r, 300));

      if (!password || (username && username.trim().toLowerCase() !== authData.username.toLowerCase())) {
        recordLoginFailure(clientIp);
        return jsonResponse(res, 401, { error: 'Invalid username or password' });
      }

      const isValid = verifyPasswordHash(password, authData.salt, authData.passwordHash);
      if (!isValid) {
        recordLoginFailure(clientIp);
        return jsonResponse(res, 401, { error: 'Invalid username or password' });
      }

      recordLoginSuccess(clientIp);

      const token = generateToken();
      const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days

      authData.sessions = authData.sessions || [];
      authData.sessions.push({
        token,
        username: authData.username,
        createdAt: Date.now(),
        expiresAt
      });
      saveAuthData(authData);

      return jsonResponse(res, 200, {
        success: true,
        token,
        username: authData.username,
        expiresAt
      });
    } catch (e) {
      return jsonResponse(res, 400, { error: e.message });
    }
  }

  // --- Auth: Verify & Status ---
  if ((pathname === '/api/auth/verify' || pathname === '/api/auth/status') && method === 'GET') {
    const session = verifyAuth(req);
    if (!session) {
      return jsonResponse(res, 401, { authenticated: false, valid: false });
    }
    return jsonResponse(res, 200, {
      authenticated: true,
      valid: true,
      username: session.username
    });
  }

  // --- Auth: Logout ---
  if (pathname === '/api/auth/logout' && method === 'POST') {
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    if (token) {
      const authData = getAuthData();
      authData.sessions = (authData.sessions || []).filter(s => s.token !== token);
      saveAuthData(authData);
    }
    return jsonResponse(res, 200, { success: true, message: 'Logged out' });
  }

  // --- Auth: Change Password (Timing-Safe + Fresh Cryptographic Salt) ---
  if (pathname === '/api/auth/change-password' && method === 'POST') {
    const session = verifyAuth(req);
    if (!session) return jsonResponse(res, 401, { error: 'Unauthorized' });

    try {
      const body = await parseJsonBody(req);
      const { currentPassword, newPassword } = body;
      const authData = getAuthData();

      if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 8) {
        return jsonResponse(res, 400, { error: 'New password must be at least 8 characters long for security' });
      }

      const isValidCurrent = verifyPasswordHash(currentPassword, authData.salt, authData.passwordHash);
      if (!isValidCurrent) {
        return jsonResponse(res, 400, { error: 'Current password is incorrect' });
      }

      // Generate a fresh random cryptographic salt for the updated password
      const newSalt = generateSalt();
      authData.salt = newSalt;
      authData.passwordHash = hashPassword(newPassword, newSalt);
      // Invalidate all other sessions for security
      authData.sessions = (authData.sessions || []).filter(s => s.token === session.token);
      saveAuthData(authData);

      return jsonResponse(res, 200, { success: true, message: 'Password updated successfully with fresh cryptographic salt' });
    } catch (e) {
      return jsonResponse(res, 400, { error: e.message });
    }
  }

  // --- Content: GET (Public & Admin) ---
  if (pathname === '/api/content' && method === 'GET') {
    const content = getContent();
    return jsonResponse(res, 200, content);
  }

  // --- Content: PUT (Admin only) ---
  if (pathname === '/api/content' && method === 'PUT') {
    const session = verifyAuth(req);
    if (!session) return jsonResponse(res, 401, { error: 'Unauthorized. Please login.' });

    try {
      const newContent = await parseJsonBody(req);
      if (!newContent || typeof newContent !== 'object' || Array.isArray(newContent)) {
        return jsonResponse(res, 400, { error: 'Invalid content format' });
      }
      saveContent(newContent);
      return jsonResponse(res, 200, {
        success: true,
        message: 'Site content updated and published live!'
      });
    } catch (e) {
      return jsonResponse(res, 400, { error: e.message });
    }
  }

  // --- Content: Reset to Default ---
  if ((pathname === '/api/content/reset' || pathname === '/api/reset') && method === 'POST') {
    const session = verifyAuth(req);
    if (!session) return jsonResponse(res, 401, { error: 'Unauthorized' });

    try {
      const defaultContentPath = path.join(DIR, 'data', 'default_content.json');
      if (fs.existsSync(defaultContentPath)) {
        const defaultContent = JSON.parse(fs.readFileSync(defaultContentPath, 'utf8'));
        saveContent(defaultContent);
        return jsonResponse(res, 200, { success: true, message: 'Content reset to default.' });
      }
      return jsonResponse(res, 200, { success: true, message: 'Current content retained.' });
    } catch (e) {
      return jsonResponse(res, 500, { error: e.message });
    }
  }

  // --- Leads: POST (Public submit inquiry - Validated & Sanitized) ---
  if (pathname === '/api/leads' && method === 'POST') {
    try {
      const leadData = await parseJsonBody(req);
      let leads = getLeads();

      // If array passed from admin sync:
      if (Array.isArray(leadData)) {
        const session = verifyAuth(req);
        if (!session) return jsonResponse(res, 401, { error: 'Unauthorized' });
        saveLeads(leadData);
        return jsonResponse(res, 200, { success: true });
      }

      // Validate & sanitize public input
      const rawName = String(leadData.name || '').trim();
      const rawEmail = String(leadData.email || '').trim();
      const rawPhone = String(leadData.phone || '').trim();
      const rawService = String(leadData.services || leadData.service || leadData.sector || 'General Inquiry').trim();
      const rawBudget = String(leadData.budget || 'Custom Budget').trim();
      const rawMessage = String(leadData.message || '').trim();

      if (!rawName || rawName.length > 100) {
        return jsonResponse(res, 400, { error: 'Please provide a valid name (max 100 characters).' });
      }
      if (!rawEmail || rawEmail.length > 150 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail)) {
        return jsonResponse(res, 400, { error: 'Please provide a valid email address.' });
      }
      if (rawPhone.length > 40) {
        return jsonResponse(res, 400, { error: 'Phone number exceeds 40 characters.' });
      }
      if (rawMessage.length > 4000) {
        return jsonResponse(res, 400, { error: 'Message exceeds 4000 characters.' });
      }

      const newLead = {
        id: 'lead-' + Date.now() + '-' + crypto.randomBytes(4).toString('hex'),
        createdAt: new Date().toISOString(),
        date: new Date().toISOString(),
        name: rawName,
        email: rawEmail,
        phone: rawPhone,
        service: rawService,
        services: rawService,
        sector: rawService,
        budget: rawBudget,
        message: rawMessage,
        status: 'new'
      };

      leads.unshift(newLead);
      saveLeads(leads);

      return jsonResponse(res, 201, {
        success: true,
        message: 'Inquiry received securely. Md. Shakibur Rahaman will contact you shortly!',
        leadId: newLead.id
      });
    } catch (e) {
      return jsonResponse(res, 400, { error: e.message });
    }
  }

  // --- Leads: GET (Admin only) ---
  if (pathname === '/api/leads' && method === 'GET') {
    const session = verifyAuth(req);
    if (!session) return jsonResponse(res, 401, { error: 'Unauthorized' });

    const leads = getLeads();
    return jsonResponse(res, 200, leads);
  }

  // --- Leads: DELETE (Admin only) ---
  if (pathname.startsWith('/api/leads/') && method === 'DELETE') {
    const session = verifyAuth(req);
    if (!session) return jsonResponse(res, 401, { error: 'Unauthorized' });

    const leadId = pathname.replace('/api/leads/', '');
    let leads = getLeads();
    leads = leads.filter(l => l.id !== leadId);
    saveLeads(leads);
    return jsonResponse(res, 200, { success: true, message: 'Lead deleted' });
  }

  // ==========================================
  // CUSTOM FORM BUILDER & SUBMISSIONS API
  // ==========================================

  // --- Forms: GET All Forms & Templates (Admin: all, Public: active only) ---
  if (pathname === '/api/forms' && method === 'GET') {
    const forms = getForms();
    const session = verifyAuth(req);
    if (session) {
      return jsonResponse(res, 200, forms);
    }
    // Public: only active forms
    const activeForms = forms.filter(f => f.isActive !== false);
    return jsonResponse(res, 200, activeForms);
  }

  // --- Forms: GET Single Form by ID or Slug (Public) ---
  if (pathname.startsWith('/api/forms/') && !pathname.includes('/submissions') && !pathname.includes('/submit') && method === 'GET') {
    const formId = decodeURIComponent(pathname.replace('/api/forms/', '').trim());
    const forms = getForms();
    const form = forms.find(f => f.id === formId || f.slug === formId);
    if (!form) {
      return jsonResponse(res, 404, { error: 'Form not found or has been removed.' });
    }
    return jsonResponse(res, 200, { success: true, form });
  }

  // --- Forms: POST Create / Update Form (Admin only) ---
  if (pathname === '/api/forms' && method === 'POST') {
    const session = verifyAuth(req);
    if (!session) return jsonResponse(res, 401, { error: 'Unauthorized' });

    try {
      const formData = await parseJsonBody(req);
      if (!formData || typeof formData !== 'object') {
        return jsonResponse(res, 400, { error: 'Invalid form configuration' });
      }

      const forms = getForms();
      let formId = formData.id;
      if (!formId || formId.startsWith('tpl-')) {
        // Creating new custom form or spawning from template
        formId = 'form-' + Date.now() + '-' + crypto.randomBytes(3).toString('hex');
      }

      const formIndex = forms.findIndex(f => f.id === formId);
      const updatedForm = {
        id: formId,
        title: String(formData.title || 'Untitled Custom Form').trim(),
        slug: String(formData.slug || formId).trim().toLowerCase().replace(/[^a-z0-9-_]/g, '-'),
        category: String(formData.category || 'General').trim(),
        description: String(formData.description || '').trim(),
        submitText: String(formData.submitText || 'Submit').trim(),
        successMessage: String(formData.successMessage || 'Thank you! Your submission has been received.').trim(),
        notificationEmail: String(formData.notificationEmail || '').trim(),
        redirectUrl: String(formData.redirectUrl || '').trim(),
        fields: Array.isArray(formData.fields) ? formData.fields : [],
        isTemplate: false,
        isActive: formData.isActive !== false,
        updatedAt: new Date().toISOString(),
        createdAt: formData.createdAt || new Date().toISOString()
      };

      if (formIndex >= 0) {
        forms[formIndex] = updatedForm;
      } else {
        forms.unshift(updatedForm);
      }

      saveForms(forms);
      return jsonResponse(res, 200, {
        success: true,
        message: 'Form successfully saved!',
        form: updatedForm
      });
    } catch (e) {
      return jsonResponse(res, 400, { error: e.message });
    }
  }

  // --- Forms: DELETE Form (Admin only) ---
  if (pathname.startsWith('/api/forms/') && !pathname.includes('/submissions') && !pathname.includes('/submit') && method === 'DELETE') {
    const session = verifyAuth(req);
    if (!session) return jsonResponse(res, 401, { error: 'Unauthorized' });

    const formId = decodeURIComponent(pathname.replace('/api/forms/', '').trim());
    let forms = getForms();
    const targetForm = forms.find(f => f.id === formId);

    if (!targetForm) {
      return jsonResponse(res, 404, { error: 'Form not found' });
    }

    // Filter out the form
    forms = forms.filter(f => f.id !== formId);
    saveForms(forms);
    return jsonResponse(res, 200, { success: true, message: 'Form deleted successfully' });
  }

  // --- Forms: POST Submit User Response (Public with Anti-Spam & Validation) ---
  if (pathname.match(/^\/api\/forms\/([^\/]+)\/submit$/) && method === 'POST') {
    const formId = decodeURIComponent(pathname.match(/^\/api\/forms\/([^\/]+)\/submit$/)[1].trim());
    const forms = getForms();
    const form = forms.find(f => f.id === formId || f.slug === formId);

    if (!form || form.isActive === false) {
      return jsonResponse(res, 404, { error: 'This form is currently inactive or not available.' });
    }

    try {
      const payload = await parseJsonBody(req);

      // Anti-Spam Honeypot check
      if (payload._honeypot || payload.hp_field) {
        // Silently accept without saving to thwart bot discovery
        return jsonResponse(res, 200, { success: true, message: form.successMessage });
      }

      const clientIp = getClientIp(req);
      const responses = {};

      // Validate required fields based on form schema
      for (const field of form.fields || []) {
        const val = payload[field.id];
        if (field.required) {
          if (val === undefined || val === null || (typeof val === 'string' && val.trim() === '') || (Array.isArray(val) && val.length === 0)) {
            return jsonResponse(res, 400, { error: `The field "${field.label}" is required.` });
          }
        }
        if (val !== undefined && val !== null) {
          if (Array.isArray(val)) {
            responses[field.id] = val.map(v => String(v).substring(0, 1000));
          } else if (typeof val === 'string') {
            responses[field.id] = val.substring(0, 4000).trim();
          } else {
            responses[field.id] = val;
          }
        }
      }

      const newSubmission = {
        id: 'sub-' + Date.now() + '-' + crypto.randomBytes(4).toString('hex'),
        formId: form.id,
        formTitle: form.title,
        createdAt: new Date().toISOString(),
        clientIp,
        data: responses,
        status: 'unread'
      };

      const submissions = getFormSubmissions();
      submissions.unshift(newSubmission);
      saveFormSubmissions(submissions);

      return jsonResponse(res, 201, {
        success: true,
        message: form.successMessage || 'Thank you! Your submission has been received.',
        submissionId: newSubmission.id,
        redirectUrl: form.redirectUrl || null
      });
    } catch (e) {
      return jsonResponse(res, 400, { error: e.message });
    }
  }

  // --- Forms: GET Submissions (Admin only) ---
  if (pathname === '/api/forms/submissions' && method === 'GET') {
    const session = verifyAuth(req);
    if (!session) return jsonResponse(res, 401, { error: 'Unauthorized' });

    const urlParams = parsedUrl.searchParams || new URLSearchParams();
    const filterFormId = urlParams.get('formId');

    let submissions = getFormSubmissions();
    if (filterFormId) {
      submissions = submissions.filter(s => s.formId === filterFormId);
    }
    return jsonResponse(res, 200, submissions);
  }

  // --- Forms: DELETE Individual Submission (Admin only) ---
  if (pathname.startsWith('/api/forms/submissions/') && method === 'DELETE') {
    const session = verifyAuth(req);
    if (!session) return jsonResponse(res, 401, { error: 'Unauthorized' });

    const subId = decodeURIComponent(pathname.replace('/api/forms/submissions/', '').trim());
    let submissions = getFormSubmissions();
    submissions = submissions.filter(s => s.id !== subId);
    saveFormSubmissions(submissions);
    return jsonResponse(res, 200, { success: true, message: 'Submission deleted' });
  }

  // --- Forms: GET Export Submissions as CSV (Admin only) ---
  if (pathname === '/api/forms/submissions/export' && method === 'GET') {
    const session = verifyAuth(req);
    if (!session) return jsonResponse(res, 401, { error: 'Unauthorized' });

    const urlParams = parsedUrl.searchParams || new URLSearchParams();
    const filterFormId = urlParams.get('formId');

    let submissions = getFormSubmissions();
    if (filterFormId) {
      submissions = submissions.filter(s => s.formId === filterFormId);
    }

    // Generate CSV
    let csv = '\uFEFF"Submission ID","Form Title","Form ID","Submitted At","IP Address","Responses"\r\n';
    submissions.forEach(sub => {
      const respStr = JSON.stringify(sub.data || {}).replace(/"/g, '""');
      csv += `"${sub.id}","${(sub.formTitle || '').replace(/"/g, '""')}","${sub.formId}","${sub.createdAt}","${sub.clientIp || ''}","${respStr}"\r\n`;
    });

    res.writeHead(200, {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="form_submissions_${Date.now()}.csv"`
    });
    return res.end(csv);
  }

  // --- Backup & Export ---
  if (pathname === '/api/backup' && method === 'GET') {
    const session = verifyAuth(req);
    if (!session) return jsonResponse(res, 401, { error: 'Unauthorized' });

    const backup = {
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      content: getContent(),
      leads: getLeads(),
      forms: getForms(),
      formSubmissions: getFormSubmissions()
    };
    return jsonResponse(res, 200, backup);
  }

  // --- Restore ---
  if (pathname === '/api/restore' && method === 'POST') {
    const session = verifyAuth(req);
    if (!session) return jsonResponse(res, 401, { error: 'Unauthorized' });

    try {
      const data = await parseJsonBody(req);
      if (data.content) saveContent(data.content);
      if (data.leads && Array.isArray(data.leads)) saveLeads(data.leads);
      if (data.forms && Array.isArray(data.forms)) saveForms(data.forms);
      if (data.formSubmissions && Array.isArray(data.formSubmissions)) saveFormSubmissions(data.formSubmissions);
      return jsonResponse(res, 200, { success: true, message: 'Backup restored successfully' });
    } catch (e) {
      return jsonResponse(res, 400, { error: e.message });
    }
  }

  // ==========================================
  // OpenAI API Suite Endpoints (Supports xkiro, OpenAI & custom gateways)
  // ==========================================

  // --- AI: Status & Configuration ---
  if (pathname === '/api/ai/status' && method === 'GET') {
    const session = verifyAuth(req);
    if (!session) return jsonResponse(res, 401, { error: 'Unauthorized' });

    const cfg = getAppConfig();
    const key = (cfg.openaiApiKey || '').trim();
    const hasKey = key.length > 0;
    const maskedKey = hasKey 
      ? (key.length > 8 ? key.substring(0, 6) + '...' + key.slice(-4) : '••••••••')
      : '';

    return jsonResponse(res, 200, {
      configured: hasKey,
      maskedKey,
      baseUrl: cfg.openaiBaseUrl || 'https://api.xkiro.com/v1',
      textModel: cfg.openaiTextModel || 'qwen/qwen3.8-max:free',
      imageModel: cfg.openaiImageModel || 'dall-e-3'
    });
  }

  // --- AI: Save / Update Key & Settings ---
  if (pathname === '/api/ai/config' && method === 'POST') {
    const session = verifyAuth(req);
    if (!session) return jsonResponse(res, 401, { error: 'Unauthorized' });

    try {
      const body = await parseJsonBody(req);
      const cfg = getAppConfig();

      if (body.baseUrl !== undefined) {
        const cleanBase = String(body.baseUrl || '').trim().replace(/\/+$/, '');
        cfg.openaiBaseUrl = cleanBase || 'https://api.xkiro.com/v1';
      }
      if (body.apiKey !== undefined) {
        const newKey = String(body.apiKey || '').trim();
        // Allow updating key or setting new key
        if (newKey) cfg.openaiApiKey = newKey;
      }
      if (body.textModel) cfg.openaiTextModel = String(body.textModel).trim();
      if (body.imageModel) cfg.openaiImageModel = String(body.imageModel).trim();

      saveAppConfig(cfg);
      return jsonResponse(res, 200, {
        success: true,
        message: 'AI API settings saved successfully!',
        configured: !!(cfg.openaiApiKey && cfg.openaiApiKey.length > 0),
        baseUrl: cfg.openaiBaseUrl,
        textModel: cfg.openaiTextModel
      });
    } catch (e) {
      return jsonResponse(res, 400, { error: e.message });
    }
  }

  // --- AI: Text & Idea Generation (Copywriting, Brainstorming, Strategies) ---
  if (pathname === '/api/ai/generate' && method === 'POST') {
    const session = verifyAuth(req);
    if (!session) return jsonResponse(res, 401, { error: 'Unauthorized' });

    const cfg = getAppConfig();

    try {
      const body = await parseJsonBody(req);
      const prompt = String(body.prompt || '').trim();
      const systemPrompt = String(body.systemPrompt || 'You are an elite Creative Director, Copywriting Architect, and Brand Strategist working with Md. Shakibur Rahaman. Deliver clear, high-impact, refined, production-ready copy.').trim();
      const model = body.model || cfg.openaiTextModel || 'qwen/qwen3.8-max:free';
      const temperature = typeof body.temperature === 'number' ? body.temperature : 0.7;
      const baseUrl = body.baseUrl || cfg.openaiBaseUrl || 'https://api.xkiro.com/v1';

      if (!prompt) {
        return jsonResponse(res, 400, { error: 'Prompt cannot be empty.' });
      }

      const messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ];

      const result = await callOpenAIChat(cfg.openaiApiKey, model, messages, temperature, baseUrl);
      if (result.success) {
        return jsonResponse(res, 200, {
          success: true,
          text: result.text,
          model,
          usage: result.usage
        });
      } else {
        return jsonResponse(res, 502, {
          error: result.error || 'AI API request failed'
        });
      }
    } catch (e) {
      return jsonResponse(res, 500, { error: e.message });
    }
  }

  // --- AI: Image Generation (DALL-E 3) with Auto-Download to Assets ---
  if (pathname === '/api/ai/image' && method === 'POST') {
    const session = verifyAuth(req);
    if (!session) return jsonResponse(res, 401, { error: 'Unauthorized' });

    const cfg = getAppConfig();

    try {
      const body = await parseJsonBody(req);
      const prompt = String(body.prompt || '').trim();
      const model = body.model || cfg.openaiImageModel || 'dall-e-3';
      const size = body.size || '1024x1024';
      const quality = body.quality || 'standard';
      // Image API base URL: custom or OpenAI
      const baseUrl = body.baseUrl || cfg.openaiBaseUrl || 'https://api.openai.com/v1';

      if (!prompt) {
        return jsonResponse(res, 400, { error: 'Image prompt cannot be empty.' });
      }

      const result = await callOpenAIImage(cfg.openaiApiKey, model, prompt, size, quality, baseUrl);
      if (result.success) {
        return jsonResponse(res, 200, {
          success: true,
          url: result.url,
          remoteUrl: result.remoteUrl,
          revisedPrompt: result.revisedPrompt,
          model,
          size
        });
      } else {
        return jsonResponse(res, 502, {
          error: result.error || 'Image Generation request failed'
        });
      }
    } catch (e) {
      return jsonResponse(res, 500, { error: e.message });
    }
  }

  // ==========================================
  // STATIC FILE SERVING WITH STRICT JAIL & SENSITIVE FILE GUARD
  // ==========================================

  // Decode URI component safely
  let safePath = pathname;
  try {
    safePath = decodeURIComponent(pathname);
  } catch (e) {
    safePath = pathname;
  }

  // Strip null bytes
  safePath = safePath.replace(/\0/g, '');

  if (safePath === '/' || safePath === '/index.html') {
    safePath = '/index.html';
  } else if (safePath === '/admin' || safePath === '/admin.html') {
    safePath = '/admin.html';
  } else if (safePath === '/about' || safePath === '/about/' || safePath === '/about.html') {
    safePath = '/about.html';
  } else if (safePath === '/projects' || safePath === '/projects/' || safePath === '/projects.html') {
    safePath = '/projects.html';
  } else if (safePath === '/testimonials' || safePath === '/testimonials/' || safePath === '/testimonials.html') {
    safePath = '/testimonials.html';
  } else if (safePath === '/contact' || safePath === '/contact/' || safePath === '/contact.html') {
    safePath = '/contact.html';
  } else if (safePath === '/services' || safePath === '/services/' || safePath === '/services.html') {
    safePath = '/services.html';
  } else if (safePath === '/case-studies' || safePath === '/case-studies/' || safePath === '/case-studies.html') {
    safePath = '/case-studies.html';
  } else if (safePath === '/offers' || safePath === '/offers/' || safePath === '/offers.html') {
    safePath = '/offers.html';
  } else if (safePath === '/form' || safePath === '/form.html' || safePath.startsWith('/form/')) {
    safePath = '/form.html';
  }

  // Normalize path and resolve canonical absolute path
  const normalizedPath = path.normalize(safePath).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.resolve(DIR, '.' + normalizedPath);

  // 1. Directory Traversal Guard (Path must be strictly inside DIR)
  if (!filePath.startsWith(DIR + path.sep) && filePath !== DIR) {
    applySecurityHeaders(res);
    res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end('<h1>403 Forbidden</h1><p>Access outside web root is denied.</p>');
  }

  // 2. Sensitive Files & Directories Blacklist
  const rel = path.relative(DIR, filePath).toLowerCase();
  const forbiddenPatterns = [
    /^data([\/\\]|$)/i,                  // Anything inside or pointing to data/
    /(^|[\/\\])\./,                     // Any dot-file or hidden directory (.git, .env, .htaccess, etc.)
    /auth\.json$/i,                     // auth.json anywhere
    /leads\.json$/i,                    // leads.json anywhere
    /forms\.json$/i,                    // forms.json anywhere
    /form_submissions\.json$/i,         // form_submissions.json anywhere
    /server\.js$/i,                     // backend server
    /serve\.ps1$/i,                     // backend powershell script
    /test_cms\.js$/i,                   // test scripts
    /\.bat$/i,                          // batch files
    /package(-lock)?\.json$/i,          // node packages
    /\.md$/i,                           // internal documentation
    /\.log$/i                           // server logs
  ];

  const isForbidden = forbiddenPatterns.some(p => p.test(rel));
  if (isForbidden) {
    applySecurityHeaders(res);
    res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end('<h1>403 Forbidden</h1><p>Access to this system resource is protected.</p>');
  }

  // Verify file exists and is a regular file (or directory with index.html)
  fs.stat(filePath, (statErr, stats) => {
    let targetFilePath = filePath;
    if (!statErr && stats && stats.isDirectory()) {
      const idxPath = path.join(filePath, 'index.html');
      if (fs.existsSync(idxPath)) {
        targetFilePath = idxPath;
      } else {
        statErr = new Error('No index file found');
      }
    }

    if (statErr || !fs.existsSync(targetFilePath) || !fs.statSync(targetFilePath).isFile()) {
      applySecurityHeaders(res);
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end('<h1>404 Not Found</h1><p><a href="/">Return to Portfolio</a> | <a href="/admin">Admin Panel</a></p>');
    }

    const ext = path.extname(targetFilePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    applySecurityHeaders(res);
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': (ext === '.html' || ext === '.js' || ext === '.css' || ext === '.json') ? 'no-cache, no-store, must-revalidate' : 'public, max-age=3600'
    });

    const stream = fs.createReadStream(targetFilePath);
    stream.on('error', () => {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Internal Server Error');
    });
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Shakibur Rahaman Portfolio & CMS Server Active!`);
  console.log(`🌐 Public Website:  http://localhost:${PORT}/`);
  console.log(`🔐 Admin Dashboard: http://localhost:${PORT}/admin`);
  console.log(`🔑 Default Admin:   username: admin | password: shakibur2026`);
  console.log(`====================================================`);

  // Start automated Cloudflare Tunnel
  startCloudflareTunnel();
});

/* ==========================================================================
   Automated Persistent Cloudflare Tunnel Manager
   ========================================================================== */
const cp = require('child_process');
let cloudflareProcess = null;
let currentTunnelUrl = null;

function startCloudflareTunnel() {
  const cfBinary = path.join(DIR, 'cloudflared.exe');
  if (!fs.existsSync(cfBinary)) {
    console.log('[Cloudflare] Binary not found at', cfBinary);
    return;
  }

  console.log('[Cloudflare] Initiating persistent quick tunnel...');
  try {
    cloudflareProcess = cp.spawn(cfBinary, [
      'tunnel',
      '--url', `http://localhost:${PORT}`,
      '--protocol', 'http2',
      '--no-autoupdate'
    ], {
      cwd: DIR,
      stdio: ['pipe', 'pipe', 'pipe']
    });

    const urlRegex = /https:\/\/[a-z0-9\-]+\.trycloudflare\.com/i;

    function parseOutput(chunk) {
      const str = chunk.toString();
      const match = str.match(urlRegex);
      if (match && match[0] && match[0] !== currentTunnelUrl) {
        currentTunnelUrl = match[0];
        console.log(`\n====================================================`);
        console.log(`🌐 CLOUDFLARE LIVE URL ESTABLISHED!`);
        console.log(`🔗 Public Site: ${currentTunnelUrl}`);
        console.log(`⚙️ Admin Panel: ${currentTunnelUrl}/admin`);
        console.log(`====================================================\n`);
        try {
          fs.writeFileSync(path.join(DATA_DIR, 'live_tunnel_url.txt'), currentTunnelUrl, 'utf8');
        } catch (e) {}
      }
    }

    cloudflareProcess.stdout.on('data', parseOutput);
    cloudflareProcess.stderr.on('data', parseOutput);

    cloudflareProcess.on('close', (code) => {
      console.log(`[Cloudflare] Tunnel exited with code ${code}. Auto-reconnecting in 4s...`);
      cloudflareProcess = null;
      setTimeout(startCloudflareTunnel, 4000);
    });

    cloudflareProcess.on('error', (err) => {
      console.error('[Cloudflare] Process error:', err.message);
    });
  } catch (err) {
    console.error('[Cloudflare] Failed to launch tunnel:', err.message);
  }
}

