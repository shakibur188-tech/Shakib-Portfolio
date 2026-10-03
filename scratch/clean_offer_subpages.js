const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// 1. UPDATE offers/ecommerce.html
const ecomPath = path.join(rootDir, 'offers', 'ecommerce.html');
if (fs.existsSync(ecomPath)) {
  let ecom = fs.readFileSync(ecomPath, 'utf8');

  // Remove switcher tabs from hero
  const switcherRegex = /<!--\s*View Switcher Tabs[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/i;
  ecom = ecom.replace(switcherRegex, `</div>\n  </section>`);

  // Remove comparison matrix table and mobile scroll indicator
  const tableSectionRegex = /<!--\s*1\.\s*COMPARISON MATRIX TABLE VIEW[\s\S]*?<!--\s*2\.\s*CARD GRID VIEW/i;
  ecom = ecom.replace(tableSectionRegex, `<!-- 1. CARD GRID VIEW`);

  // Ensure card grid is always visible (remove hidden class if present on pricingCardsView)
  ecom = ecom.replace('id="pricingCardsView" class="hidden grid', 'id="pricingCardsView" class="grid');
  ecom = ecom.replace('id="pricingCardsView" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4', 'id="pricingCardsView" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4');

  fs.writeFileSync(ecomPath, ecom, 'utf8');
  console.log('Updated offers/ecommerce.html to pure card layout!');
}

// 2. UPDATE offers/service-platform.html
const servicePath = path.join(rootDir, 'offers', 'service-platform.html');
if (fs.existsSync(servicePath)) {
  let svc = fs.readFileSync(servicePath, 'utf8');

  const switcherRegex = /<!--\s*View Switcher Tabs[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/i;
  svc = svc.replace(switcherRegex, `</div>\n  </section>`);

  const tableSectionRegex = /<!--\s*1\.\s*COMPARISON MATRIX TABLE VIEW[\s\S]*?<!--\s*2\.\s*CARD GRID VIEW/i;
  if (svc.match(tableSectionRegex)) {
    svc = svc.replace(tableSectionRegex, `<!-- 1. CARD GRID VIEW`);
  }

  svc = svc.replace('id="pricingCardsView" class="hidden grid', 'id="pricingCardsView" class="grid');

  fs.writeFileSync(servicePath, svc, 'utf8');
  console.log('Updated offers/service-platform.html to pure card layout!');
}

// 3. UPDATE offers/portfolio.html
const portPath = path.join(rootDir, 'offers', 'portfolio.html');
if (fs.existsSync(portPath)) {
  let port = fs.readFileSync(portPath, 'utf8');

  const switcherRegex = /<!--\s*View Switcher Tabs[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/i;
  port = port.replace(switcherRegex, `</div>\n  </section>`);

  const tableSectionRegex = /<!--\s*1\.\s*COMPARISON MATRIX TABLE VIEW[\s\S]*?<!--\s*2\.\s*CARD GRID VIEW/i;
  if (port.match(tableSectionRegex)) {
    port = port.replace(tableSectionRegex, `<!-- 1. CARD GRID VIEW`);
  }

  port = port.replace('id="pricingCardsView" class="hidden grid', 'id="pricingCardsView" class="grid');

  fs.writeFileSync(portPath, port, 'utf8');
  console.log('Updated offers/portfolio.html to pure card layout!');
}
