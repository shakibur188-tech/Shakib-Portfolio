const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// 1. UPDATE styles.css
const newStylesCss = `/* ==========================================================================
   Md. Shakibur Rahaman - Strategic Lead & Digital Architect
   LUXURY "MONESTRA / AROUNDA" EMERALD & BRUNSWICK GREEN THEME
   Palette: #0C4137 (Brunswick Green), #06D6A0 (Emerald), #E6FBF6 (Polar Mint)
   Font: Strictly Plus Jakarta Sans
   ========================================================================== */

@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

:root {
  --primary: #06D6A0;
  --primary-hover: #05B386;
  --primary-glow: rgba(6, 214, 160, 0.35);
  --primary-subtle: rgba(6, 214, 160, 0.12);

  --secondary: #0C4137;
  --secondary-glow: rgba(12, 65, 55, 0.25);
  
  --polar: #E6FBF6;
  --polar-glow: rgba(230, 251, 246, 0.6);

  --text-dark: #08201A;
  --text-body: #3D5A53;
  --text-muted: #73968E;

  --bg-canvas: #F4FBF8;
  --bg-card: #FFFFFF;
  --bg-glass: rgba(255, 255, 255, 0.92);

  --border-subtle: #D7EFE9;
  --border-glass: rgba(6, 214, 160, 0.18);
  --border-highlight: rgba(6, 214, 160, 0.5);

  --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
}

*, *::before, *::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 5rem;
  background-color: var(--bg-canvas);
}

body {
  font-family: var(--font-sans);
  background-color: var(--bg-canvas);
  color: var(--text-dark);
  overflow-x: hidden !important;
  letter-spacing: -0.015em;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
}

::selection {
  background-color: var(--primary);
  color: #041C16;
}

/* TOP SCROLL PROGRESS BAR */
#scrollProgressBar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3.5px;
  width: 0%;
  background: linear-gradient(90deg, #0C4137 0%, #06D6A0 50%, #E6FBF6 100%);
  z-index: 99999;
  box-shadow: 0 1px 12px rgba(6, 214, 160, 0.7);
  transition: width 0.08s linear;
  pointer-events: none;
}

/* ANIMATED AROUNDA / MONESTRA AURORA CANVAS */
#ambientCanvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -2;
  pointer-events: none;
}

.ambient-mesh-glow {
  position: fixed;
  inset: 0;
  background: 
    radial-gradient(at 20% 15%, rgba(6, 214, 160, 0.14) 0px, transparent 55%),
    radial-gradient(at 80% 20%, rgba(12, 65, 55, 0.18) 0px, transparent 50%),
    radial-gradient(at 50% 65%, rgba(230, 251, 246, 0.35) 0px, transparent 60%),
    radial-gradient(at 15% 85%, rgba(6, 214, 160, 0.12) 0px, transparent 50%);
  filter: blur(55px);
  pointer-events: none;
  z-index: -3;
}

/* MORPHY GLASSMORPHIC CARDS */
.morphy-card {
  background: #FFFFFF;
  border: 1px solid var(--border-subtle);
  border-radius: 28px;
  box-shadow: 0 10px 30px -10px rgba(12, 65, 55, 0.06), 0 2px 8px rgba(6, 214, 160, 0.03);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
}

.morphy-card:hover {
  border-color: var(--border-highlight);
  box-shadow: 0 20px 45px -12px rgba(6, 214, 160, 0.22), 0 0 24px -4px var(--primary-glow);
  transform: translateY(-4px);
}

.morphy-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  border-radius: 9999px;
  background: #FFFFFF;
  border: 1px solid var(--border-subtle);
  font-size: 12px;
  font-weight: 700;
  color: var(--text-dark);
  box-shadow: 0 4px 14px -3px rgba(12, 65, 55, 0.06);
  transition: all 0.25s ease;
}

.morphy-tag-primary {
  background: #E6FBF6;
  border: 1px solid rgba(6, 214, 160, 0.35);
  color: #0C4137;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 5px 14px;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

/* ==========================================================================
   ULTRA-ATTRACTIVE ANIMATED BUTTON SYSTEM
   ========================================================================== */
.btn-morphy-primary,
.btn-editorial-primary,
.btn-primary-animated {
  position: relative !important;
  display: inline-flex;
  align-items: center !important;
  justify-content: center !important;
  gap: 10px !important;
  padding: 14px 32px !important;
  border-radius: 9999px !important;
  background: linear-gradient(135deg, #06D6A0 0%, #05B386 100%) !important;
  color: #041C16 !important;
  font-size: 12.5px !important;
  font-weight: 800 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.06em !important;
  border: 1.5px solid rgba(230, 251, 246, 0.6) !important;
  box-shadow: 0 8px 24px -4px rgba(6, 214, 160, 0.45), 0 0 16px rgba(6, 214, 160, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.6) !important;
  cursor: pointer !important;
  text-decoration: none !important;
  overflow: hidden !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
  z-index: 1 !important;
}

/* Continuous Light Sweep Animation */
.btn-morphy-primary::after,
.btn-editorial-primary::after,
.btn-primary-animated::after {
  content: '' !important;
  position: absolute !important;
  top: -50% !important;
  left: -80% !important;
  width: 55% !important;
  height: 200% !important;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent) !important;
  transform: rotate(25deg) !important;
  animation: btnSweep 3.2s cubic-bezier(0.4, 0, 0.2, 1) infinite !important;
  pointer-events: none !important;
  z-index: 2 !important;
}

@keyframes btnSweep {
  0% { left: -80%; }
  35% { left: 130%; }
  100% { left: 130%; }
}

.btn-morphy-primary:hover,
.btn-editorial-primary:hover,
.btn-primary-animated:hover {
  transform: translateY(-3px) scale(1.03) !important;
  box-shadow: 0 16px 36px -4px rgba(6, 214, 160, 0.65), 0 0 28px rgba(6, 214, 160, 0.45), inset 0 1px 3px rgba(255, 255, 255, 0.8) !important;
  color: #041C16 !important;
}

.btn-morphy-primary:active,
.btn-editorial-primary:active,
.btn-primary-animated:active {
  transform: translateY(0px) scale(0.97) !important;
}

.btn-morphy-primary i,
.btn-primary-animated i {
  transition: transform 0.25s ease !important;
}

.btn-morphy-primary:hover i.fa-arrow-right,
.btn-primary-animated:hover i.fa-arrow-right {
  transform: translateX(4px) !important;
}

/* SECONDARY OUTLINE ANIMATED BUTTON */
.btn-morphy-outline,
.btn-editorial-outline,
.btn-secondary-animated {
  position: relative !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 10px !important;
  padding: 13px 30px !important;
  border-radius: 9999px !important;
  background: rgba(255, 255, 255, 0.95) !important;
  color: #0C4137 !important;
  font-size: 12.5px !important;
  font-weight: 800 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.06em !important;
  border: 1.5px solid #D7EFE9 !important;
  box-shadow: 0 4px 16px -2px rgba(12, 65, 55, 0.06) !important;
  cursor: pointer !important;
  text-decoration: none !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.btn-morphy-outline:hover,
.btn-editorial-outline:hover,
.btn-secondary-animated:hover {
  border-color: #06D6A0 !important;
  color: #0C4137 !important;
  background: #E6FBF6 !important;
  transform: translateY(-2.5px) scale(1.02) !important;
  box-shadow: 0 10px 28px -4px rgba(6, 214, 160, 0.25), 0 0 16px rgba(6, 214, 160, 0.15) !important;
}

.btn-morphy-outline:active,
.btn-secondary-animated:active {
  transform: translateY(0px) scale(0.97) !important;
}

/* ==========================================================================
   HERO INFOGRAPHIC NETWORK
   ========================================================================== */
.hero-infographic-container {
  position: relative !important;
  width: 100% !important;
  max-width: 680px !important;
  height: 380px !important;
  margin: 0 auto !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

@media (max-width: 640px) {
  .hero-infographic-container {
    height: 320px !important;
  }
}

.hero-center-aura {
  position: absolute !important;
  width: 340px !important;
  height: 340px !important;
  border-radius: 50% !important;
  background: radial-gradient(circle, rgba(6, 214, 160, 0.28) 0%, rgba(12, 65, 55, 0.18) 50%, transparent 70%) !important;
  filter: blur(40px) !important;
  pointer-events: none !important;
  z-index: 1 !important;
  animation: pulseAura 5s ease-in-out infinite alternate !important;
}

@keyframes pulseAura {
  0% { transform: scale(0.92); opacity: 0.7; }
  100% { transform: scale(1.12); opacity: 1; }
}

.hero-center-node {
  position: relative !important;
  width: 110px !important;
  height: 110px !important;
  border-radius: 50% !important;
  background: linear-gradient(135deg, #06D6A0 0%, #0C4137 100%) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  color: #FFFFFF !important;
  font-size: 42px !important;
  box-shadow: 0 16px 36px -6px rgba(6, 214, 160, 0.5), 0 0 0 10px rgba(6, 214, 160, 0.12) !important;
  z-index: 10 !important;
  animation: floatSlow 4s ease-in-out infinite alternate !important;
}

@keyframes floatSlow {
  0% { transform: translateY(0); }
  100% { transform: translateY(-8px); }
}

.satellite-node {
  position: absolute !important;
  width: 52px !important;
  height: 52px !important;
  border-radius: 16px !important;
  background: #FFFFFF !important;
  border: 1px solid var(--border-subtle) !important;
  box-shadow: 0 10px 25px -5px rgba(12, 65, 55, 0.08) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 20px !important;
  color: #0C4137 !important;
  z-index: 15 !important;
  transition: all 0.3s ease !important;
}

.satellite-node:hover {
  transform: scale(1.15) !important;
  border-color: var(--primary) !important;
  color: #06D6A0 !important;
  box-shadow: 0 14px 30px -4px rgba(6, 214, 160, 0.3) !important;
}

.hero-float-chip {
  position: absolute !important;
  background: #FFFFFF !important;
  border: 1px solid var(--border-subtle) !important;
  border-radius: 9999px !important;
  padding: 8px 18px !important;
  box-shadow: 0 12px 30px -6px rgba(12, 65, 55, 0.08) !important;
  z-index: 16 !important;
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  font-size: 12px !important;
  font-weight: 700 !important;
  color: var(--text-dark) !important;
}

/* FLOATING DASHBOARD WIDGET */
.morphy-dashboard-widget {
  position: relative;
  width: 100%;
  max-width: 460px;
  margin: 0 auto;
}

.dash-main-card {
  background: #FFFFFF;
  border: 1px solid var(--border-subtle);
  border-radius: 28px;
  padding: 28px;
  box-shadow: 0 20px 50px -15px rgba(6, 214, 160, 0.15), 0 4px 12px rgba(12, 65, 55, 0.04);
}

.dash-bar-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  height: 120px;
  padding-top: 10px;
}

.dash-bar-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.dash-bar-fill {
  width: 100%;
  max-width: 28px;
  background: #D7EFE9;
  border-radius: 8px;
  transition: all 0.4s ease;
}

.dash-bar-fill.active {
  background: linear-gradient(180deg, #06D6A0 0%, #0C4137 100%);
  box-shadow: 0 4px 14px rgba(6, 214, 160, 0.4);
}

.dash-bar-label {
  font-size: 10.5px;
  font-weight: 700;
  color: var(--text-muted);
}

.dash-float-pill-1 {
  position: absolute;
  top: -16px;
  right: -16px;
  background: #FFFFFF;
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  padding: 10px 16px;
  box-shadow: 0 10px 25px -4px rgba(12, 65, 55, 0.08);
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 10;
  animation: floatSlow 3.5s ease-in-out infinite alternate;
}

.dash-float-pill-2 {
  position: absolute;
  bottom: -20px;
  left: -20px;
  background: #FFFFFF;
  border: 1px solid var(--border-subtle);
  border-radius: 18px;
  padding: 12px 18px;
  box-shadow: 0 12px 30px -4px rgba(12, 65, 55, 0.10);
  z-index: 10;
  animation: floatSlow 4.5s ease-in-out infinite alternate 1s;
}

/* GROWTH PILL MATRIX */
.growth-matrix-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.matrix-cross-pill {
  width: 140px;
  height: 64px;
  border-radius: 9999px;
  border: 1.5px dashed #CBD5E1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #73968E;
  font-size: 14px;
  letter-spacing: 8px;
  background: rgba(244, 251, 248, 0.6);
}

.matrix-metric-pill-white {
  background: #FFFFFF;
  border: 1px solid var(--border-subtle);
  border-radius: 9999px;
  padding: 16px 36px;
  box-shadow: 0 8px 24px -4px rgba(12, 65, 55, 0.05);
  display: flex;
  align-items: center;
  gap: 14px;
}

.matrix-metric-pill-blue {
  background: linear-gradient(135deg, #0C4137 0%, #06D6A0 100%);
  border-radius: 9999px;
  padding: 16px 36px;
  box-shadow: 0 10px 30px -4px rgba(6, 214, 160, 0.45);
  display: flex;
  align-items: center;
  gap: 14px;
  color: #FFFFFF;
}

@media (max-width: 640px) {
  .matrix-cross-pill { display: none; }
  .matrix-metric-pill-white,
  .matrix-metric-pill-blue {
    width: 100%;
    justify-content: center;
    padding: 14px 24px;
  }
}

/* ==========================================================================
   PROJECT FILTER BUTTONS
   ========================================================================== */
.filter-btn {
  display: inline-flex !important;
  align-items: center !important;
  padding: 10px 22px !important;
  border-radius: 9999px !important;
  background: #FFFFFF !important;
  border: 1.5px solid #D7EFE9 !important;
  color: #3D5A53 !important;
  font-size: 12px !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
  box-shadow: 0 2px 8px rgba(12, 65, 55, 0.04) !important;
  text-decoration: none !important;
}

.filter-btn:hover {
  border-color: #06D6A0 !important;
  color: #0C4137 !important;
  transform: translateY(-1.5px) !important;
  box-shadow: 0 6px 16px -2px rgba(6, 214, 160, 0.2) !important;
}

.filter-btn.active {
  background: linear-gradient(135deg, #06D6A0 0%, #05B386 100%) !important;
  border-color: #06D6A0 !important;
  color: #041C16 !important;
  box-shadow: 0 8px 22px -3px rgba(6, 214, 160, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.5) !important;
  transform: translateY(-1px) !important;
}

/* RESPONSIVE HEADER NAVIGATION & MOBILE MENU */
@media (max-width: 1023.98px) {
  #navbar .nav-cta-btn,
  #navbar .btn-morphy-primary.nav-cta-btn,
  #navbar > div > div > a.btn-morphy-primary {
    display: none !important;
  }
}

#mobileMenu {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

#mobileMenu.hidden {
  display: none !important;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 16px;
  border-radius: 14px;
  font-size: 13.5px;
  font-weight: 700;
  color: #2D4A43;
  transition: all 0.2s ease;
  background: transparent;
  border: 1px solid transparent;
}

.mobile-nav-link:hover,
.mobile-nav-link:active {
  background: rgba(6, 214, 160, 0.1);
  color: #0C4137;
  border-color: rgba(6, 214, 160, 0.25);
  transform: translateX(3px);
}

.mobile-nav-link.active {
  background: linear-gradient(135deg, rgba(6, 214, 160, 0.15) 0%, rgba(230, 251, 246, 0.4) 100%);
  color: #0C4137;
  font-weight: 800;
  border-color: rgba(6, 214, 160, 0.35);
}
`;

fs.writeFileSync(path.join(rootDir, 'styles.css'), newStylesCss, 'utf8');

// 2. UPDATE admin.css
const adminCssPath = path.join(rootDir, 'admin.css');
if (fs.existsSync(adminCssPath)) {
  let adminCss = fs.readFileSync(adminCssPath, 'utf8');
  adminCss = adminCss
    .replace(/#0066FF/gi, '#06D6A0')
    .replace(/#0052FF/gi, '#05B386')
    .replace(/#0B0F19/gi, '#08201A')
    .replace(/#F8FAFC/gi, '#F4FBF8')
    .replace(/#FAFCFF/gi, '#F4FBF8')
    .replace(/rgba\(0,\s*102,\s*255,/gi, 'rgba(6, 214, 160,');
  fs.writeFileSync(adminCssPath, adminCss, 'utf8');
}

// 3. UPDATE app.js and services/service-page.js (Ambient Canvas Engine)
function updateCanvasAnimation(filePath) {
  if (!fs.existsSync(filePath)) return;
  let code = fs.readFileSync(filePath, 'utf8');

  // Replace Canvas sky and cloud drawing logic with Luminous Emerald & Brunswick Aurora Mesh
  const oldCanvasBlockRegex = /function initAmbientBackground\(\)[\s\S]*?requestAnimationFrame\(render\);\s*\}/m;
  const newCanvasBlock = `function initAmbientBackground() {
  const canvas = document.getElementById('ambientCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initOrbs();
  }, { passive: true });

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  }, { passive: true });

  // Monestra & Arounda Luminous Emerald Aurora Mesh Orbs
  let orbs = [];
  function initOrbs() {
    orbs = [];
    const count = width > 768 ? 9 : 5;
    const colors = [
      { r: 6, g: 214, b: 160 },    // Luminous Emerald (#06D6A0)
      { r: 12, g: 65, b: 55 },     // Brunswick Green (#0C4137)
      { r: 230, g: 251, b: 246 },  // Polar Mint (#E6FBF6)
      { r: 5, g: 179, b: 134 }     // Mint Glow (#05B386)
    ];

    for (let i = 0; i < count; i++) {
      const col = colors[i % colors.length];
      orbs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 220 + 140,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        color: col,
        alpha: Math.random() * 0.22 + 0.12,
        phase: Math.random() * Math.PI * 2
      });
    }
  }
  initOrbs();

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Smooth mouse parallax
    mouse.x += (mouse.targetX - mouse.x) * 0.04;
    mouse.y += (mouse.targetY - mouse.y) * 0.04;

    // 1. Subtle Polar Mint canvas background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, 'rgba(244, 251, 248, 0.98)');
    bgGrad.addColorStop(0.5, 'rgba(235, 249, 244, 0.92)');
    bgGrad.addColorStop(1, 'rgba(244, 251, 248, 0.98)');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Render drifting luminous Aurora Orbs
    orbs.forEach(orb => {
      orb.phase += 0.008;
      orb.x += orb.vx + Math.sin(orb.phase) * 0.25;
      orb.y += orb.vy + Math.cos(orb.phase) * 0.25;

      // Wrap around bounds softly
      if (orb.x < -orb.r) orb.x = width + orb.r;
      if (orb.x > width + orb.r) orb.x = -orb.r;
      if (orb.y < -orb.r) orb.y = height + orb.r;
      if (orb.y > height + orb.r) orb.y = -orb.r;

      const parallaxX = (mouse.x - width / 2) * 0.03;
      const parallaxY = (mouse.y - height / 2) * 0.03;
      const ox = orb.x + parallaxX;
      const oy = orb.y + parallaxY;

      const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.r);
      grad.addColorStop(0, \`rgba(\${orb.color.r}, \${orb.color.g}, \${orb.color.b}, \${orb.alpha})\`);
      grad.addColorStop(0.6, \`rgba(\${orb.color.r}, \${orb.color.g}, \${orb.color.b}, \${orb.alpha * 0.4})\`);
      grad.addColorStop(1, \`rgba(\${orb.color.r}, \${orb.color.g}, \${orb.color.b}, 0)\`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(ox, oy, orb.r, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}`;

  if (oldCanvasBlockRegex.test(code)) {
    code = code.replace(oldCanvasBlockRegex, newCanvasBlock);
  }

  // Also replace any residual blue hexes in JS
  code = code
    .replace(/#0066FF/gi, '#06D6A0')
    .replace(/#0052FF/gi, '#05B386')
    .replace(/rgba\(0,\s*102,\s*255,/gi, 'rgba(6, 214, 160,')
    .replace(/rgba\(0,\s*82,\s*255,/gi, 'rgba(5, 179, 134,');

  fs.writeFileSync(filePath, code, 'utf8');
}

updateCanvasAnimation(path.join(rootDir, 'app.js'));
updateCanvasAnimation(path.join(rootDir, 'services', 'service-page.js'));

// 4. FUNCTION TO UPDATE HTML FILES
function updateHtmlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Tailwind configuration replacement
  const tailwindRegex = /tailwind\.config\s*=\s*\{[\s\S]*?theme:\s*\{[\s\S]*?extend:\s*\{[\s\S]*?colors:\s*\{[\s\S]*?\}\s*\}\s*\}\s*\}/m;
  const newTailwindConfig = `tailwind.config = {
      theme: {
        extend: {
          colors: {
            palette: {
              olive: '#06D6A0',
              forest: '#0C4137',
              slate: '#06D6A0',
              mist: '#73968E',
              stone: '#D7EFE9',
              emerald: '#06D6A0',
              brunswick: '#0C4137',
              polar: '#E6FBF6'
            },
            canvas: '#F4FBF8'
          },
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            display: ['"Plus Jakarta Sans"', 'sans-serif'],
            mono: ['"Plus Jakarta Sans"', 'monospace']
          }
        }
      }
    }`;

  if (tailwindRegex.test(content)) {
    content = content.replace(tailwindRegex, newTailwindConfig);
  }

  // Replace Hex Colors and Classes across HTML
  content = content
    // Primary electric blue to Monestra Emerald
    .replace(/#0066FF/gi, '#06D6A0')
    .replace(/#0052FF/gi, '#05B386')
    .replace(/#003ECC/gi, '#0C4137')
    .replace(/#0040C1/gi, '#0C4137')
    .replace(/#004BD6/gi, '#0C4137')
    .replace(/#00D2FF/gi, '#E6FBF6')
    
    // Background canvas
    .replace(/#FAFCFF/gi, '#F4FBF8')
    .replace(/#F8FAFC/gi, '#EDF9F5')
    
    // Dark texts/accents
    .replace(/#0B0F19/gi, '#08201A')
    
    // Borders
    .replace(/#E2E8F0/gi, '#D7EFE9')
    .replace(/#F1F5F9/gi, '#E2F4EF')
    
    // RGBAs
    .replace(/rgba\(0,\s*102,\s*255,/gi, 'rgba(6, 214, 160,')
    .replace(/rgba\(0,\s*82,\s*255,/gi, 'rgba(5, 179, 134,')
    .replace(/rgba\(0,\s*210,\s*255,/gi, 'rgba(230, 251, 246,')
    .replace(/rgba\(120,\s*0,\s*255,/gi, 'rgba(12, 65, 55,')
    .replace(/rgba\(11,\s*15,\s*25,/gi, 'rgba(8, 32, 26,');

  fs.writeFileSync(filePath, content, 'utf8');
}

// Find all HTML files recursively
function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.git') return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = getHtmlFiles(rootDir);
htmlFiles.forEach(file => {
  updateHtmlFile(file);
  console.log('Updated:', path.relative(rootDir, file));
});

console.log('\\n✅ Full Monestra / Arounda Emerald & Brunswick Green Theme Successfully Applied!');
