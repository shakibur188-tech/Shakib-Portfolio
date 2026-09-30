const fs = require('fs');
const path = require('path');

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (!filePath.includes('.git') && !filePath.includes('node_modules') && !filePath.includes('scratch')) {
        getFiles(filePath, fileList);
      }
    } else if (filePath.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = getFiles('.');
console.log('Processing HTML files:', htmlFiles.length);

for (const file of htmlFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;

  // 1. Ensure the desktop Book Consultation button in header uses hidden lg:inline-flex so it never shows on mobile/tablet
  if (content.includes('class="btn-morphy-primary text-xs hidden md:inline-flex"')) {
    content = content.replace('class="btn-morphy-primary text-xs hidden md:inline-flex"', 'class="btn-morphy-primary text-xs hidden lg:inline-flex"');
    modified = true;
  }

  // 2. Clean mobileMenu: remove Consultation link and ensure proper links for Home, About, Services, Projects, Experience, Offers
  // Match mobileMenu block
  const mobileMenuRegex = /<div id="mobileMenu"[\s\S]*?<\/div>/i;
  const match = content.match(mobileMenuRegex);
  if (match) {
    const oldMenu = match[0];
    
    // Determine active link if any based on file path
    let activePage = '';
    const normFile = file.replace(/\\/g, '/');
    if (normFile === 'index.html') activePage = 'home';
    else if (normFile.startsWith('about')) activePage = 'about';
    else if (normFile.startsWith('services')) activePage = 'services';
    else if (normFile.startsWith('projects')) activePage = 'projects';
    else if (normFile.startsWith('experience')) activePage = 'experience';
    else if (normFile.startsWith('offers')) activePage = 'offers';

    const getLinkClass = (page) => {
      if (page === activePage) {
        return 'mobile-link block text-sm font-semibold text-[#0066FF] font-bold';
      }
      return 'mobile-link block text-sm font-semibold text-[#334155]';
    };

    const newMenu = `<div id="mobileMenu" class="hidden lg:hidden bg-white/98 backdrop-blur-2xl border-b border-[#E2E8F0] px-5 py-6 space-y-3 shadow-2xl">
      <a href="/" class="${getLinkClass('home')}">Home</a>
      <a href="/about" class="${getLinkClass('about')}">About</a>
      <a href="/services" class="${getLinkClass('services')}">Services</a>
      <a href="/projects" class="${getLinkClass('projects')}">Projects</a>
      <a href="/experience" class="${getLinkClass('experience')}">Experience</a>
      <a href="/offers" class="${getLinkClass('offers')}">Offers</a>
    </div>`;

    if (oldMenu !== newMenu) {
      content = content.replace(oldMenu, newMenu);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
