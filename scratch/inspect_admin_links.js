const fs = require('fs');
const path = require('path');

function getMatches(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const p = path.join(dir, f);
    if (f.startsWith('.') || f === 'node_modules' || f === 'scratch' || f === 'admin.html' || f === 'admin.js' || f === 'admin.css' || f === 'data' || f === 'api' || f === 'assets') continue;
    if (fs.statSync(p).isDirectory()) {
      getMatches(p);
    } else if (f.endsWith('.html') || f.endsWith('.js')) {
      const lines = fs.readFileSync(p, 'utf8').split('\n');
      lines.forEach((line, i) => {
        if (/Admin CMS Portal|href=["']\/admin["']/i.test(line)) {
          console.log(`${p}:${i+1} -> ${line.trim()}`);
        }
      });
    }
  }
}

getMatches('.');
