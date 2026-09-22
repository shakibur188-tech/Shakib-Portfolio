const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== '.agents' && file !== 'scratch') {
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
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // 1. Remove desktop nav testimonial links
  content = content.replace(/\s*<a href="\/testimonials\.html" class="desktop-nav-link[^"]*">\s*Testimonials\s*<\/a>/g, '');

  // 2. Remove mobile nav testimonial link or replace with Contact if inside a 6-item grid
  // First, in about.html, contact.html, projects.html, testimonials.html:
  const mobileTestimonialCard = /<a href="\/testimonials\.html" class="mobile-link flex items-center gap-2 p-2\.5 rounded-xl[^"]*">\s*<i class="fa-solid fa-star[^"]*"><\/i>\s*<span>Testimonials<\/span>\s*<\/a>/g;
  if (mobileTestimonialCard.test(content)) {
    content = content.replace(mobileTestimonialCard, `<a href="/contact.html" class="mobile-link flex items-center gap-2 p-2.5 rounded-xl bg-[#F8F9F6] border border-[#70805D]/15 text-xs font-bold text-[#1C2B1B] hover:bg-[#F1F4EE]">
          <i class="fa-solid fa-envelope text-[#70805D]"></i>
          <span>Contact</span>
        </a>`);
  }

  // Next, in services/*.html and case-studies.html:
  content = content.replace(/\s*<a href="\/testimonials\.html" class="mobile-link block text-sm font-semibold[^"]*">\s*Testimonials\s*<\/a>/g, '');
  content = content.replace(/\s*<a href="\/testimonials\.html" class="block px-3 py-2 rounded-lg text-sm font-semibold text-\[#2A3B27\] hover:bg-\[#70805D\]\/10">\s*Testimonials\s*<\/a>/g, '');

  // 3. Replace "15 Web Projects" with "Projects" in mobile links and footer links
  content = content.replace(/>15 Web Projects<\/a>/g, '>Projects</a>');
  content = content.replace(/<!-- 15 Web Projects Grid -->/g, '<!-- Projects Grid -->');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Successfully updated:', file);
  }
});

// Update admin.html placeholder & textarea
let adminContent = fs.readFileSync('admin.html', 'utf8');
let adminOriginal = adminContent;
adminContent = adminContent.replace('placeholder="e.g. View 15 Web Projects"', 'placeholder="e.g. View Projects"');
adminContent = adminContent.replace('across 9 services, 15 web projects, and client impact...', 'across 9 services, web projects, and client impact...');
if (adminContent !== adminOriginal) {
  fs.writeFileSync('admin.html', adminContent, 'utf8');
  console.log('Updated admin.html placeholders');
}
