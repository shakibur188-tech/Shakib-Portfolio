const fs = require('fs');
let c = fs.readFileSync('case-study.html', 'utf8');
c = c.replace(/<a href="\/admin"[^>]*>Admin<\/a>/g, '');
fs.writeFileSync('case-study.html', c, 'utf8');
console.log('Successfully removed admin link from case-study.html');
