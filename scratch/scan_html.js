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
console.log('Total HTML files:', htmlFiles.length);

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const hasNavTestimonial = content.includes('desktop-nav-link') && content.includes('/testimonials.html');
  const hasMobileTestimonial = content.includes('mobile-link') && content.includes('/testimonials.html');
  const has15 = content.includes('15 Web Projects');
  if (hasNavTestimonial || hasMobileTestimonial || has15) {
    console.log(file, { hasNavTestimonial, hasMobileTestimonial, has15 });
  }
});
