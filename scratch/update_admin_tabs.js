const fs = require('fs');
const path = require('path');

const adminJsPath = path.join(__dirname, '../admin.js');
let c = fs.readFileSync(adminJsPath, 'utf8');

if (!c.includes("'tab-offers':")) {
  c = c.replace(
    "'tab-overview': { title: 'Dashboard Overview', sub: 'Real-time performance metrics, services, and live web portals.' },",
    "'tab-overview': { title: 'Dashboard Overview', sub: 'Real-time performance metrics, services, and live web portals.' },\n    'tab-offers': { title: 'Special Offers & Packages CMS', sub: 'Add, edit, reorder, or remove growth packages and EMI sprint cards on /offers.' },"
  );
  fs.writeFileSync(adminJsPath, c, 'utf8');
  console.log('Successfully updated titleMap in admin.js!');
} else {
  console.log('Already includes tab-offers in titleMap');
}
