const fs = require('fs');
const path = require('path');

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (!filePath.includes('.git') && !filePath.includes('node_modules')) {
        getFiles(filePath, fileList);
      }
    } else if (filePath.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const files = getFiles('.');
console.log('Total HTML files:', files.length);

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const m = content.match(/<div id="mobileMenu"[\s\S]*?<\/div>/i);
  if (m) {
    console.log(`--- ${f} ---`);
    console.log(m[0].trim());
  }
}
