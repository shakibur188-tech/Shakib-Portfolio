const fs = require('fs');
const path = require('path');

const files = [
  'index.html',
  'about.html',
  'services.html',
  'projects.html',
  'case-studies.html',
  'case-study.html',
  'contact.html',
  'testimonials.html',
  'services/index.html',
  'services/graphics-design.html',
  'services/web-development.html',
  'services/social-media-marketing.html',
  'services/public-relations.html',
  'services/google-ads.html',
  'services/event-activation.html'
];

let updatedCount = 0;

files.forEach(relPath => {
  const filePath = path.join(__dirname, '..', relPath);
  if (!fs.existsSync(filePath)) {
    console.log('File not found:', filePath);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Desktop Nav Update
  if (!content.includes('href="/offers.html"') && !content.includes('href="/offers"')) {
    // Desktop Nav
    const desktopCaseStudiesRegex = /(<a\s+href="\/case-studies\.html"[^>]*>Case Studies<\/a>)/;
    if (desktopCaseStudiesRegex.test(content)) {
      content = content.replace(desktopCaseStudiesRegex, '$1\n        <a href="/offers.html" class="desktop-nav-link hover:text-[#70805D] transition-colors">Offers</a>');
    }

    // Mobile Menu Grid (Icon cards)
    const mobileCaseStudyCardRegex = /(<a\s+href="\/case-studies\.html"[^>]*class="mobile-link[^"]*"[^>]*>[\s\S]*?<span>Case Studies<\/span>\s*<\/a>)/;
    if (mobileCaseStudyCardRegex.test(content)) {
      const mobileOfferLink = '\n        <a href="/offers.html" class="mobile-link flex items-center gap-2 p-2.5 rounded-xl bg-[#F8F9F6] border border-[#70805D]/15 text-xs font-bold text-[#1C2B1B] hover:bg-[#F1F4EE]">\n          <i class="fa-solid fa-tags text-[#70805D]"></i>\n          <span>Offers</span>\n        </a>';
      content = content.replace(mobileCaseStudyCardRegex, '$1' + mobileOfferLink);
    } else {
      // Simple mobile menu link
      const simpleMobileCaseStudyRegex = /(<a\s+href="\/case-studies\.html"[^>]*class="mobile-link[^"]*"[^>]*>Case Studies<\/a>)/;
      if (simpleMobileCaseStudyRegex.test(content)) {
        content = content.replace(simpleMobileCaseStudyRegex, '$1\n      <a href="/offers.html" class="mobile-link block text-sm font-semibold text-[#4D614A] hover:text-[#70805D]">Offers</a>');
      }
    }

    // Footer Quick Links
    const footerCaseStudiesRegex = /(<div[^>]*>\s*<a\s+href="\/case-studies\.html"[^>]*>Case Studies<\/a>\s*<\/div>)/;
    if (footerCaseStudiesRegex.test(content)) {
      content = content.replace(footerCaseStudiesRegex, '$1\n            <div><a href="/offers.html" class="hover:text-white transition-colors">Growth Offers &amp; Sprints</a></div>');
    }
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log('Successfully updated nav in:', relPath);
  } else {
    console.log('No change needed or already updated:', relPath);
  }
});

console.log('Total files updated:', updatedCount);
