const fs = require('fs');
const path = require('path');

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const p = path.join(dir, f);
    if (f.startsWith('.') || f === 'node_modules' || f === 'scratch' || f === 'admin.html' || f === 'admin.js' || f === 'admin.css' || f === 'data' || f === 'api' || f === 'assets') continue;
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (f.endsWith('.html') || f.endsWith('.js')) {
      const content = fs.readFileSync(p, 'utf8');
      if (/Admin CMS Portal/i.test(content) || /href=["']\/admin["']/i.test(content)) {
        console.log('Found in:', p);
      }
    }
  }
}

walk('.');
