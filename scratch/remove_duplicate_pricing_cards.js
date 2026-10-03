const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const files = [
  path.join(rootDir, 'offers', 'ecommerce.html'),
  path.join(rootDir, 'offers', 'service-platform.html'),
  path.join(rootDir, 'offers', 'portfolio.html')
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  // Match and remove <!-- 2. SECONDARY CARD GRID VIEW --> ... <div id="pricingCardsView" ... </div> (including its closing tag)
  const cardsRegex = /<!--\s*(?:2\.\s*SECONDARY\s*|1\.\s*)?CARD GRID VIEW[\s\S]*?<div id="pricingCardsView"[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/i;
  
  if (content.match(cardsRegex)) {
    content = content.replace(cardsRegex, `</div>\n  </section>`);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Successfully removed pricingCardsView from ${path.basename(file)}`);
  } else {
    // Alternate regex
    const altRegex = /<div id="pricingCardsView"[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/i;
    if (content.match(altRegex)) {
      content = content.replace(altRegex, `</div>\n  </section>`);
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Successfully removed pricingCardsView (alt regex) from ${path.basename(file)}`);
    } else {
      console.log(`Could not find pricingCardsView in ${path.basename(file)}`);
    }
  }
}
