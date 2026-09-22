const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== '.agents') {
        results = results.concat(getHtmlFiles(full));
      }
    } else if (file.endsWith('.html')) {
      results.push(full);
    }
  });
  return results;
}

const htmlFiles = getHtmlFiles('.');
htmlFiles.forEach(file => {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('15 Web Projects') || line.includes('15 web project')) {
      console.log(`${file}:${idx + 1}: ${line.trim()}`);
    }
  });
});
