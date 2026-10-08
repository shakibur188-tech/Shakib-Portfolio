const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../offers/ecommerce.html');
let html = fs.readFileSync(filePath, 'utf8');

// Replace 1ম বছর ফ্রি / ১ম বছর ফ্রি / 1ম বছরের
html = html.replace(/1ম বছর ফ্রি/g, 'প্রথম বছর ফ্রি');
html = html.replace(/১ম বছর ফ্রি/g, 'প্রথম বছর ফ্রি');
html = html.replace(/1ম বছরের জন্য/g, 'প্রথম বছরের জন্য');
html = html.replace(/১ম বছরের জন্য/g, 'প্রথম বছরের জন্য');

fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully updated 1ম বছর ফ্রি -> প্রথম বছর ফ্রি');
