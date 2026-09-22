const fs = require('fs');

// Check index.html
const indexHtml = fs.readFileSync('index.html', 'utf8');

// Check that projectsGrid exists in index.html
const hasProjectsGrid = indexHtml.includes('id="projectsGrid"');
console.log('index.html has #projectsGrid:', hasProjectsGrid);

// Check that buttons link to /projects.html
const hasViewAllBtn = indexHtml.includes('href="/projects.html"');
console.log('index.html links to /projects.html:', hasViewAllBtn);

// Check app.js renderWebProjects slicing
const appJs = fs.readFileSync('app.js', 'utf8');
const hasSlice6 = appJs.includes('projects.slice(0, 6)');
console.log('app.js slices to first 6 projects:', hasSlice6);

// Check that projects.html exists and has projects
const projectsHtml = fs.readFileSync('projects.html', 'utf8');
const hasFullGrid = projectsHtml.includes('id="fullProjectsGrid"');
console.log('projects.html has #fullProjectsGrid:', hasFullGrid);

// Check content.json menu items
const content = JSON.parse(fs.readFileSync('data/content.json', 'utf8'));
const menuLabels = (content.menu.items || []).map(i => i.label);
console.log('Current menu items in data/content.json:', menuLabels);

const hasTestimonialsInMenu = menuLabels.includes('Testimonials');
console.log('Testimonials in menu:', hasTestimonialsInMenu);

const projectsLabel = (content.menu.items || []).find(i => i.id === 'nav-projects')?.label;
console.log('Projects nav label:', projectsLabel);
