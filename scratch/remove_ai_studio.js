const fs = require('fs');
const path = require('path');

// 1. Clean admin.html
const adminHtmlPath = path.join(__dirname, '../admin.html');
let adminHtml = fs.readFileSync(adminHtmlPath, 'utf8');

// Remove sidebar navigation button
adminHtml = adminHtml.replace(/\s*<button class="nav-item" data-tab="tab-aistudio">[\s\S]*?<\/button>/gi, '');

// Remove the section tab-aistudio
adminHtml = adminHtml.replace(/<!-- TAB: AI STUDIO & OPENAI SUITE -->[\s\S]*?<\/section>/gi, '');

fs.writeFileSync(adminHtmlPath, adminHtml, 'utf8');
console.log('Removed AI Studio from admin.html');

// 2. Clean admin.js
const adminJsPath = path.join(__dirname, '../admin.js');
let adminJs = fs.readFileSync(adminJsPath, 'utf8');

// Remove loadAiStudioStatus() calls
adminJs = adminJs.replace(/\s*await loadAiStudioStatus\(\);/gi, '');

// Remove tab-aistudio from titleMap
adminJs = adminJs.replace(/\s*'tab-aistudio':\s*\{[^}]*\},/gi, '');

fs.writeFileSync(adminJsPath, adminJs, 'utf8');
console.log('Cleaned AI Studio from admin.js');
