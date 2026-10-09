const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// 1. REWRITE styles.css WITH 100% MONESTRA / AROUNDA DARK LUXURY EMERALD DESIGN SYSTEM
const luxuryDarkStylesCss = `/* ==========================================================================
   Md. Shakibur Rahaman - Strategic Lead & Digital Architect
   MONESTRA & AROUNDA LUXURY DARK EMERALD & BRUNSWICK GREEN THEME
   100% Pure Design Reference Match:
   - Deep Luxury Obsidian Base: #03100D -> #051F19
   - Brunswick Green: #0C4137
   - Electric Radiant Emerald: #06D6A0
   - Polar Mint Frost / Ice White: #E6FBF6
   - Pure High-Contrast White: #FFFFFF
   ========================================================================== */

@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

:root {
  --primary: #06D6A0;
  --primary-hover: #05B386;
  --primary-glow: rgba(6, 214, 160, 0.45);
  --primary-subtle: rgba(6, 214, 160, 0.12);

  --secondary: #0C4137;
  --secondary-glow: rgba(12, 65, 55, 0.35);
  
  --polar: #E6FBF6;
  --polar-glow: rgba(230, 251, 246, 0.25);

  --text-dark: #FFFFFF;
  --text-main: #E6FBF6;
  --text-body: #A3CEC5;
  --text-muted: #6E9B91;

  --bg-canvas: #03100D;
  --bg-dark: #041612;
  --bg-card: rgba(12, 65, 55, 0.38);
  --bg-card-hover: rgba(12, 65, 55, 0.6);
  --bg-glass: rgba(5, 31, 25, 0.75);

  --border-subtle: rgba(230, 251, 246, 0.12);
  --border-glass: rgba(6, 214, 160, 0.25);
  --border-highlight: rgba(6, 214, 160, 0.6);

  --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
}

*, *::before, *::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 5rem;
  background-color: var(--bg-canvas);
  color-scheme: dark;
}

body {
  font-family: var(--font-sans);
  background-color: var(--bg-canvas);
  color: var(--text-main);
  overflow-x: hidden !important;
  letter-spacing: -0.015em;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
}

::selection {
  background-color: var(--primary);
  color: #03100D;
}

/* TOP SCROLL PROGRESS BAR */
#scrollProgressBar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3.5px;
  width: 0%;
  background: linear-gradient(90deg, #0C4137 0%, #06D6A0 60%, #E6FBF6 100%);
  z-index: 99999;
  box-shadow: 0 0 16px rgba(6, 214, 160, 0.8), 0 0 6px #06D6A0;
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
    radial-gradient(circle at 50% 90%, rgba(6, 214, 160, 0.32) 0%, transparent 60%),
    radial-gradient(circle at 20% 25%, rgba(12, 65, 55, 0.55) 0%, transparent 50%),
    radial-gradient(circle at 85% 30%, rgba(6, 214, 160, 0.2) 0%, transparent 55%),
    radial-gradient(circle at 50% 45%, rgba(12, 65, 55, 0.4) 0%, transparent 65%);
  filter: blur(60px);
  pointer-events: none;
  z-index: -3;
}

/* AROUNDA & MONESTRA FROSTED GLASSMORPHIC CARDS */
.morphy-card {
  background: rgba(12, 65, 55, 0.32);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(230, 251, 246, 0.12);
  border-radius: 28px;
  box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(230, 251, 246, 0.15);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
}

.morphy-card:hover {
  background: rgba(12, 65, 55, 0.48);
  border-color: var(--border-highlight);
  box-shadow: 0 25px 60px -10px rgba(0, 0, 0, 0.6), 0 0 35px -5px var(--primary-glow), inset 0 1px 2px rgba(6, 214, 160, 0.3);
  transform: translateY(-4px);
}

.morphy-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  border-radius: 9999px;
  background: rgba(230, 251, 246, 0.08);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(230, 251, 246, 0.18);
  font-size: 12px;
  font-weight: 700;
  color: var(--polar);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.25s ease;
}

.morphy-pill:hover {
  background: rgba(6, 214, 160, 0.16);
  border-color: var(--primary);
  color: #FFFFFF;
  box-shadow: 0 0 20px rgba(6, 214, 160, 0.35);
}

.morphy-tag-primary {
  background: rgba(6, 214, 160, 0.12);
  border: 1px solid rgba(6, 214, 160, 0.35);
  backdrop-filter: blur(12px);
  color: var(--primary);
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 6px 16px;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  box-shadow: 0 0 18px rgba(6, 214, 160, 0.2);
}

/* ==========================================================================
   ULTRA-ATTRACTIVE ANIMATED BUTTON SYSTEM (AROUNDA / MONESTRA STYLE)
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
  color: #031410 !important;
  font-size: 12.5px !important;
  font-weight: 800 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.06em !important;
  border: 1.5px solid rgba(255, 255, 255, 0.7) !important;
  box-shadow: 0 8px 30px rgba(6, 214, 160, 0.5), 0 0 22px rgba(6, 214, 160, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.8) !important;
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
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent) !important;
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
  box-shadow: 0 16px 40px rgba(6, 214, 160, 0.7), 0 0 35px rgba(6, 214, 160, 0.5), inset 0 1px 3px rgba(255, 255, 255, 0.9) !important;
  color: #031410 !important;
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

/* SECONDARY FROSTED OUTLINE BUTTON (AROUNDA PILL STYLE) */
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
  background: rgba(230, 251, 246, 0.08) !important;
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
  color: #E6FBF6 !important;
  font-size: 12.5px !important;
  font-weight: 800 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.06em !important;
  border: 1.5px solid rgba(230, 251, 246, 0.22) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3) !important;
  cursor: pointer !important;
  text-decoration: none !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.btn-morphy-outline:hover,
.btn-editorial-outline:hover,
.btn-secondary-animated:hover {
  border-color: #06D6A0 !important;
  color: #FFFFFF !important;
  background: rgba(6, 214, 160, 0.18) !important;
  transform: translateY(-2.5px) scale(1.02) !important;
  box-shadow: 0 10px 30px -4px rgba(6, 214, 160, 0.35), 0 0 20px rgba(6, 214, 160, 0.2) !important;
}

.btn-morphy-outline:active,
.btn-secondary-animated:active {
  transform: translateY(0px) scale(0.97) !important;
}

/* ==========================================================================
   HERO INFOGRAPHIC NETWORK (DARK MONESTRA CORE)
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
  width: 360px !important;
  height: 360px !important;
  border-radius: 50% !important;
  background: radial-gradient(circle, rgba(6, 214, 160, 0.4) 0%, rgba(12, 65, 55, 0.3) 50%, transparent 70%) !important;
  filter: blur(45px) !important;
  pointer-events: none !important;
  z-index: 1 !important;
  animation: pulseAura 5s ease-in-out infinite alternate !important;
}

@keyframes pulseAura {
  0% { transform: scale(0.92); opacity: 0.75; }
  100% { transform: scale(1.15); opacity: 1; }
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
  box-shadow: 0 0 50px rgba(6, 214, 160, 0.6), 0 0 0 10px rgba(6, 214, 160, 0.15) !important;
  border: 2px solid rgba(255, 255, 255, 0.6) !important;
  z-index: 10 !important;
  animation: floatSlow 4s ease-in-out infinite alternate !important;
}

@keyframes floatSlow {
  0% { transform: translateY(0); }
  100% { transform: translateY(-8px); }
}

.satellite-node {
  position: absolute !important;
  width: 54px !important;
  height: 54px !important;
  border-radius: 18px !important;
  background: rgba(12, 65, 55, 0.5) !important;
  backdrop-filter: blur(16px) !important;
  border: 1px solid rgba(230, 251, 246, 0.2) !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 20px !important;
  color: #06D6A0 !important;
  z-index: 15 !important;
  transition: all 0.3s ease !important;
}

.satellite-node:hover {
  transform: scale(1.18) !important;
  border-color: #06D6A0 !important;
  background: rgba(6, 214, 160, 0.25) !important;
  color: #FFFFFF !important;
  box-shadow: 0 0 25px rgba(6, 214, 160, 0.5) !important;
}

.hero-float-chip {
  position: absolute !important;
  background: rgba(12, 65, 55, 0.6) !important;
  backdrop-filter: blur(16px) !important;
  border: 1px solid rgba(230, 251, 246, 0.2) !important;
  border-radius: 9999px !important;
  padding: 9px 20px !important;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4) !important;
  z-index: 16 !important;
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  font-size: 12px !important;
  font-weight: 700 !important;
  color: #E6FBF6 !important;
}

/* FLOATING DASHBOARD WIDGET */
.morphy-dashboard-widget {
  position: relative;
  width: 100%;
  max-width: 460px;
  margin: 0 auto;
}

.dash-main-card {
  background: rgba(12, 65, 55, 0.4);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(230, 251, 246, 0.15);
  border-radius: 28px;
  padding: 28px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(230, 251, 246, 0.15);
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
  background: rgba(230, 251, 246, 0.12);
  border-radius: 8px;
  transition: all 0.4s ease;
}

.dash-bar-fill.active {
  background: linear-gradient(180deg, #06D6A0 0%, #0C4137 100%);
  box-shadow: 0 0 18px rgba(6, 214, 160, 0.5);
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
  background: rgba(12, 65, 55, 0.7);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(230, 251, 246, 0.2);
  border-radius: 16px;
  padding: 10px 16px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
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
  background: rgba(12, 65, 55, 0.7);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(230, 251, 246, 0.2);
  border-radius: 18px;
  padding: 12px 18px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
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
  border: 1.5px dashed rgba(230, 251, 246, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6E9B91;
  font-size: 14px;
  letter-spacing: 8px;
  background: rgba(12, 65, 55, 0.2);
}

.matrix-metric-pill-white {
  background: rgba(12, 65, 55, 0.45);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(230, 251, 246, 0.18);
  border-radius: 9999px;
  padding: 16px 36px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  gap: 14px;
  color: #FFFFFF;
}

.matrix-metric-pill-blue {
  background: linear-gradient(135deg, #0C4137 0%, #06D6A0 100%);
  border-radius: 9999px;
  padding: 16px 36px;
  box-shadow: 0 10px 35px rgba(6, 214, 160, 0.4);
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
  background: rgba(12, 65, 55, 0.3) !important;
  backdrop-filter: blur(16px) !important;
  border: 1.5px solid rgba(230, 251, 246, 0.15) !important;
  color: #A3CEC5 !important;
  font-size: 12px !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3) !important;
  text-decoration: none !important;
}

.filter-btn:hover {
  border-color: #06D6A0 !important;
  color: #FFFFFF !important;
  background: rgba(6, 214, 160, 0.15) !important;
  transform: translateY(-1.5px) !important;
  box-shadow: 0 6px 20px rgba(6, 214, 160, 0.3) !important;
}

.filter-btn.active {
  background: linear-gradient(135deg, #06D6A0 0%, #05B386 100%) !important;
  border-color: #06D6A0 !important;
  color: #031410 !important;
  box-shadow: 0 8px 25px rgba(6, 214, 160, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.6) !important;
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
  background: rgba(4, 22, 18, 0.95);
  backdrop-filter: blur(24px);
  border-top: 1px solid rgba(230, 251, 246, 0.12);
}

#mobileMenu.hidden {
  display: none !important;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 18px;
  border-radius: 14px;
  font-size: 13.5px;
  font-weight: 700;
  color: #B4DCD2;
  transition: all 0.2s ease;
  background: transparent;
  border: 1px solid transparent;
}

.mobile-nav-link:hover,
.mobile-nav-link:active {
  background: rgba(6, 214, 160, 0.12);
  color: #06D6A0;
  border-color: rgba(6, 214, 160, 0.3);
  transform: translateX(3px);
}

.mobile-nav-link.active {
  background: linear-gradient(135deg, rgba(6, 214, 160, 0.2) 0%, rgba(12, 65, 55, 0.4) 100%);
  color: #06D6A0;
  font-weight: 800;
  border-color: rgba(6, 214, 160, 0.4);
}
`;

fs.writeFileSync(path.join(rootDir, 'styles.css'), luxuryDarkStylesCss, 'utf8');

// 2. UPDATE app.js and services/service-page.js (Dark luxury Aurora canvas)
function updateCanvasAnimation(filePath) {
  if (!fs.existsSync(filePath)) return;
  let code = fs.readFileSync(filePath, 'utf8');

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

  // Monestra & Arounda Luxury Dark Emerald Aurora Mesh Orbs
  let orbs = [];
  function initOrbs() {
    orbs = [];
    const count = width > 768 ? 8 : 5;
    const colors = [
      { r: 6, g: 214, b: 160 },    // Luminous Emerald (#06D6A0)
      { r: 12, g: 65, b: 55 },     // Brunswick Green (#0C4137)
      { r: 4, g: 179, b: 134 },    // Deep Mint Glow (#04B386)
      { r: 18, g: 90, b: 76 }      // Dark Pine (#125A4C)
    ];

    for (let i = 0; i < count; i++) {
      const col = colors[i % colors.length];
      orbs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 260 + 160,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        color: col,
        alpha: Math.random() * 0.28 + 0.15,
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

    // 1. Monestra Deep Obsidian & Brunswick Green Canvas Base
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#03100D');
    bgGrad.addColorStop(0.5, '#051F19');
    bgGrad.addColorStop(1, '#020C0A');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Render drifting luminous Aurora Orbs with Arounda lighting
    orbs.forEach(orb => {
      orb.phase += 0.007;
      orb.x += orb.vx + Math.sin(orb.phase) * 0.25;
      orb.y += orb.vy + Math.cos(orb.phase) * 0.25;

      // Wrap around bounds softly
      if (orb.x < -orb.r) orb.x = width + orb.r;
      if (orb.x > width + orb.r) orb.x = -orb.r;
      if (orb.y < -orb.r) orb.y = height + orb.r;
      if (orb.y > height + orb.r) orb.y = -orb.r;

      const parallaxX = (mouse.x - width / 2) * 0.035;
      const parallaxY = (mouse.y - height / 2) * 0.035;
      const ox = orb.x + parallaxX;
      const oy = orb.y + parallaxY;

      const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.r);
      grad.addColorStop(0, \`rgba(\${orb.color.r}, \${orb.color.g}, \${orb.color.b}, \${orb.alpha})\`);
      grad.addColorStop(0.5, \`rgba(\${orb.color.r}, \${orb.color.g}, \${orb.color.b}, \${orb.alpha * 0.45})\`);
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
  fs.writeFileSync(filePath, code, 'utf8');
}

updateCanvasAnimation(path.join(rootDir, 'app.js'));
updateCanvasAnimation(path.join(rootDir, 'services', 'service-page.js'));

// 3. FUNCTION TO UPDATE HTML PAGES FOR FULL DARK LUXURY MONESTRA THEME
function updateHtmlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Tailwind configuration
  const tailwindRegex = /tailwind\.config\s*=\s*\{[\s\S]*?theme:\s*\{[\s\S]*?extend:\s*\{[\s\S]*?colors:\s*\{[\s\S]*?\}\s*\}\s*\}\s*\}/m;
  const newTailwindConfig = `tailwind.config = {
      theme: {
        extend: {
          colors: {
            palette: {
              olive: '#06D6A0',
              forest: '#0C4137',
              slate: '#06D6A0',
              mist: '#6E9B91',
              stone: 'rgba(230, 251, 246, 0.12)',
              emerald: '#06D6A0',
              brunswick: '#0C4137',
              polar: '#E6FBF6',
              canvas: '#03100D',
              card: 'rgba(12, 65, 55, 0.35)'
            },
            canvas: '#03100D'
          },
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            bengali: ['"Hind Siliguri"', '"Plus Jakarta Sans"', 'sans-serif'],
            display: ['"Plus Jakarta Sans"', 'sans-serif'],
            mono: ['"Plus Jakarta Sans"', 'monospace']
          }
        }
      }
    }`;

  if (tailwindRegex.test(content)) {
    content = content.replace(tailwindRegex, newTailwindConfig);
  }

  // Replace light background body and containers with luxury dark emerald
  content = content
    // Body background
    .replace(/bg-\[#FAFCFF\]/gi, 'bg-[#03100D]')
    .replace(/bg-\[#F4FBF8\]/gi, 'bg-[#03100D]')
    .replace(/bg-\[#F8FAFC\]/gi, 'bg-[#041612]')
    .replace(/bg-\[#EDF9F5\]/gi, 'bg-[#051F19]')
    .replace(/bg-canvas/gi, 'bg-[#03100D]')
    
    // Replace light white container sections with dark frosted panels
    .replace(/bg-white(?=[\s"'])/g, 'bg-[#0C4137]/35 backdrop-blur-xl')
    .replace(/bg-\[#FFFFFF\]/gi, 'bg-[#0C4137]/35 backdrop-blur-xl')
    
    // Text colors - make high contrast polar white & emerald
    .replace(/text-\[#0B0F19\]/gi, 'text-white')
    .replace(/text-\[#08201A\]/gi, 'text-white')
    .replace(/text-\[#334155\]/gi, 'text-[#DDF6F0]')
    .replace(/text-\[#475569\]/gi, 'text-[#A3CEC5]')
    .replace(/text-\[#64748B\]/gi, 'text-[#7EADA3]')
    
    // Border colors - make soft glowing dark border
    .replace(/border-\[#E2E8F0\]/gi, 'border-[#E6FBF6]/15')
    .replace(/border-\[#D7EFE9\]/gi, 'border-[#E6FBF6]/15')
    .replace(/border-\[#F1F5F9\]/gi, 'border-[#E6FBF6]/10')
    .replace(/border-\[#E2F4EF\]/gi, 'border-[#E6FBF6]/10')
    .replace(/border-slate-200/gi, 'border-[#E6FBF6]/15')
    .replace(/divide-\[#F1F5F9\]/gi, 'divide-[#E6FBF6]/10')
    .replace(/divide-\[#E2F4EF\]/gi, 'divide-[#E6FBF6]/10')
    
    // Navbar styling
    .replace(/bg-white\/80/gi, 'bg-[#03100D]/80')
    .replace(/bg-white\/90/gi, 'bg-[#03100D]/90')
    .replace(/bg-white\/95/gi, 'bg-[#03100D]/95')
    
    // Lightbox and modal
    .replace(/bg-black\/60/gi, 'bg-black/80')
    .replace(/bg-black\/70/gi, 'bg-black/85');

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
  console.log('Applied Dark Luxury Emerald Theme to:', path.relative(rootDir, file));
});

console.log('\\n✅ 100% Monestra / Arounda Dark Luxury Emerald & Brunswick Green Design System Applied!');
