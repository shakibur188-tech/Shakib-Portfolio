const http = require('http');
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

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(BACKUPS_DIR)) {
  fs.mkdirSync(BACKUPS_DIR, { recursive: true });
}

// Helpers for Crypto & Auth
function hashPassword(password, salt) {
  return crypto.createHash('sha256').update(salt + password).digest('hex');
}

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Initialize Auth DB if missing
function getAuthData() {
  try {
    if (fs.existsSync(AUTH_FILE)) {
      return JSON.parse(fs.readFileSync(AUTH_FILE, 'utf8'));
    }
  } catch (e) {
    console.error('Error reading auth file:', e);
  }
  const defaultSalt = 'shakibur_secure_salt_892347';
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
      return JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf8'));
    } catch (e) {
      console.error('Error reading content file:', e);
    }
  }
  // Fallback to root content.json if present
  const rootContent = path.join(DIR, 'content.json');
  if (fs.existsSync(rootContent)) {
    try {
      const data = JSON.parse(fs.readFileSync(rootContent, 'utf8'));
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
}

// Leads Helpers
function getLeads() {
  if (fs.existsSync(LEADS_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));
    } catch (e) {
      return [];
    }
  }
  return [];
}

function saveLeads(leads) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf8');
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
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
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
  '.pdf': 'application/pdf'
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

  // --- Auth: Login ---
  if (pathname === '/api/auth/login' && method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const { username, password } = body;
      const authData = getAuthData();

      if (!password || (username && username !== authData.username)) {
        return jsonResponse(res, 401, { error: 'Invalid username or password' });
      }

      const inputHash = hashPassword(password, authData.salt);
      if (inputHash !== authData.passwordHash) {
        return jsonResponse(res, 401, { error: 'Invalid password' });
      }

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

  // --- Auth: Change Password ---
  if (pathname === '/api/auth/change-password' && method === 'POST') {
    const session = verifyAuth(req);
    if (!session) return jsonResponse(res, 401, { error: 'Unauthorized' });

    try {
      const body = await parseJsonBody(req);
      const { currentPassword, newPassword } = body;
      const authData = getAuthData();

      if (!newPassword || newPassword.length < 6) {
        return jsonResponse(res, 400, { error: 'New password must be at least 6 characters' });
      }

      const currentHash = hashPassword(currentPassword, authData.salt);
      if (currentHash !== authData.passwordHash) {
        return jsonResponse(res, 400, { error: 'Current password is incorrect' });
      }

      authData.passwordHash = hashPassword(newPassword, authData.salt);
      // Invalidate other sessions
      authData.sessions = authData.sessions.filter(s => s.token === session.token);
      saveAuthData(authData);

      return jsonResponse(res, 200, { success: true, message: 'Password updated successfully' });
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

  // --- Leads: POST (Public submit inquiry) ---
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

      const newLead = {
        id: 'lead-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
        createdAt: new Date().toISOString(),
        date: new Date().toISOString(),
        name: (leadData.name || 'Anonymous Inquiry').trim(),
        email: (leadData.email || '').trim(),
        phone: (leadData.phone || '').trim(),
        service: leadData.service || leadData.sector || 'General Growth Consultation',
        sector: leadData.sector || leadData.service || 'General Growth Consultation',
        budget: leadData.budget || 'Custom Budget',
        message: (leadData.message || '').trim(),
        status: 'new'
      };

      leads.unshift(newLead);
      saveLeads(leads);

      return jsonResponse(res, 201, {
        success: true,
        message: 'Inquiry received. Md. Shakibur Rahaman will contact you shortly!',
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

  // --- Backup & Export ---
  if (pathname === '/api/backup' && method === 'GET') {
    const session = verifyAuth(req);
    if (!session) return jsonResponse(res, 401, { error: 'Unauthorized' });

    const backup = {
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      content: getContent(),
      leads: getLeads()
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
      return jsonResponse(res, 200, { success: true, message: 'Backup restored successfully' });
    } catch (e) {
      return jsonResponse(res, 400, { error: e.message });
    }
  }

  // ==========================================
  // STATIC FILE SERVING
  // ==========================================

  let filePath;
  if (pathname === '/' || pathname === '/index.html') {
    filePath = path.join(DIR, 'index.html');
  } else if (pathname === '/admin' || pathname === '/admin.html') {
    filePath = path.join(DIR, 'admin.html');
  } else {
    filePath = path.join(DIR, pathname);
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1><p><a href="/">Return to Portfolio</a> | <a href="/admin">Admin Panel</a></p>');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Server Error: ' + err.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Shakibur Rahaman Portfolio & CMS Server Active!`);
  console.log(`🌐 Public Website:  http://localhost:${PORT}/`);
  console.log(`🔐 Admin Dashboard: http://localhost:${PORT}/admin`);
  console.log(`🔑 Default Admin:   username: admin | password: admin1234`);
  console.log(`====================================================`);
});
