const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../offers/ecommerce.html');
let html = fs.readFileSync(filePath, 'utf8');

// Map Bengali digits to English digits
const b2e = {
  '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
  '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'
};

html = html.replace(/[০-৯]/g, match => b2e[match]);

fs.writeFileSync(filePath, html, 'utf8');
console.log('Converted all Bengali numerals to standard numbers in offers/ecommerce.html');
