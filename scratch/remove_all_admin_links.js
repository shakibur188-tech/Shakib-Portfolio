const fs = require('fs');
const path = require('path');

function removeAdminLinks(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const p = path.join(dir, f);
    if (f.startsWith('.') || f === 'node_modules' || f === 'scratch' || f === 'admin.html' || f === 'admin.js' || f === 'admin.css' || f === 'data' || f === 'api' || f === 'assets') continue;
    if (fs.statSync(p).isDirectory()) {
      removeAdminLinks(p);
    } else if (f.endsWith('.html')) {
      let content = fs.readFileSync(p, 'utf8');
      let original = content;

      // Pattern 1: <div class="pt-2"><a href="/admin"...>Admin CMS Portal 🔐</a></div>
      content = content.replace(/<div class="pt-2">\s*<a href="\/admin"[^>]*>[\s\S]*?<\/a>\s*<\/div>/gi, '');

      // Pattern 2: <div>© 2026 Md. Shakibur Rahaman. All rights reserved. • <a href="/admin" target="_blank" class="text-[#0066FF] font-bold">Admin Portal 🔐</a></div>
      content = content.replace(/•\s*<a href="\/admin"[^>]*>[\s\S]*?<\/a>/gi, '');

      // Pattern 3: general <a href="/admin"...>Admin...</a> inside footer if any left
      content = content.replace(/<div>\s*<a href="\/admin"[^>]*>[\s\S]*?<\/a>\s*<\/div>/gi, '');

      if (content !== original) {
        fs.writeFileSync(p, content, 'utf8');
        console.log('Cleaned admin links in:', p);
      }
    }
  }
}

removeAdminLinks('.');
console.log('Admin link removal complete.');
