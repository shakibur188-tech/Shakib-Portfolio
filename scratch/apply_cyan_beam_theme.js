const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// 1. REWRITE styles.css WITH EXACT GRADIENT BEAM & GLASS CARDS THEME
const cyanBeamStylesCss = `/* ==========================================================================
   Md. Shakibur Rahaman - Strategic Lead & Digital Architect
   HIGH-TECH PRISMATIC CYAN & OCEANIC TEAL LIGHT-BEAM THEME
   100% Faithful Match to Reference Image:
   - Deep Oceanic Teal / Navy Base: #061B27 -> #0B354A
   - Mid Vibrant Teal: #195B78 -> #47A5C2
   - Radiant Ice Cyan Beam: #A2E3EE -> #D8F6FB -> #FFFFFF
   - High-Precision Horizontal Scanline Grid Overlay
   - Ultra-Refined Frosted Glass Cards (backdrop-filter: blur(24px))
   ========================================================================== */

@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

:root {
  --primary: #38BDF8;
  --primary-hover: #0284C7;
  --primary-glow: rgba(56, 189, 248, 0.45);
  --primary-subtle: rgba(56, 189, 248, 0.15);

  --secondary: #0B354A;
  --secondary-glow: rgba(11, 53, 74, 0.5);
  
  --beam-light: #D8F6FB;
  --beam-glow: rgba(216, 246, 251, 0.6);

  --text-dark: #FFFFFF;
  --text-main: #E0F7FA;
  --text-body: #B2DFEB;
  --text-muted: #74A8BA;

  --bg-canvas: #061B27;
  --bg-dark: #071E2B;
  --bg-card: rgba(11, 53, 74, 0.42);
  --bg-card-hover: rgba(15, 68, 94, 0.6);
  --bg-glass: rgba(7, 30, 43, 0.78);

  --border-subtle: rgba(216, 246, 251, 0.14);
  --border-glass: rgba(56, 189, 248, 0.3);
  --border-highlight: rgba(56, 189, 248, 0.75);

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
  background-color: #061B27;
  background-image: 
    repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(255, 255, 255, 0.038) 3px, rgba(255, 255, 255, 0.038) 4px),
    linear-gradient(135deg, 
      #061824 0%, 
      #092A3B 18%, 
      #134D69 32%, 
      #3592B0 46%, 
      #D5F5FA 51.5%, 
      #5CAECC 57%, 
      #15536F 70%, 
      #0A2C3D 85%, 
      #05151F 100%
    );
  background-attachment: fixed;
  background-size: cover;
  color: var(--text-main);
  overflow-x: hidden !important;
  letter-spacing: -0.015em;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
}

::selection {
  background-color: var(--primary);
  color: #061824;
}

/* TOP SCROLL PROGRESS BAR */
#scrollProgressBar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3.5px;
  width: 0%;
  background: linear-gradient(90deg, #0B354A 0%, #38BDF8 50%, #D8F6FB 100%);
  z-index: 99999;
  box-shadow: 0 0 16px rgba(56, 189, 248, 0.8), 0 0 6px #38BDF8;
  transition: width 0.08s linear;
  pointer-events: none;
}

/* AMBIENT CANVAS & LIGHT STREAK GLOW */
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
    radial-gradient(circle at 50% 50%, rgba(216, 246, 251, 0.15) 0%, transparent 65%),
    radial-gradient(circle at 20% 30%, rgba(56, 189, 248, 0.22) 0%, transparent 55%),
    radial-gradient(circle at 80% 70%, rgba(19, 77, 105, 0.4) 0%, transparent 60%);
  filter: blur(50px);
  pointer-events: none;
  z-index: -3;
}

/* ==========================================================================
   FROSTED GLASSMORPHIC CARDS (100% GLASS STYLED)
   ========================================================================== */
.morphy-card {
  background: rgba(11, 53, 74, 0.38) !important;
  backdrop-filter: blur(24px) !important;
  -webkit-backdrop-filter: blur(24px) !important;
  border: 1px solid rgba(216, 246, 251, 0.18) !important;
  border-radius: 28px !important;
  box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.55), inset 0 1px 1px rgba(255, 255, 255, 0.25) !important;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
  position: relative !important;
  overflow: hidden !important;
}

.morphy-card:hover {
  background: rgba(15, 68, 94, 0.52) !important;
  border-color: rgba(56, 189, 248, 0.75) !important;
  box-shadow: 0 25px 60px -10px rgba(0, 0, 0, 0.65), 0 0 35px -5px rgba(56, 189, 248, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.4) !important;
  transform: translateY(-4px) !important;
}

.morphy-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  border-radius: 9999px;
  background: rgba(216, 246, 251, 0.08);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(216, 246, 251, 0.22);
  font-size: 12px;
  font-weight: 700;
  color: var(--beam-light);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
  transition: all 0.25s ease;
}

.morphy-pill:hover {
  background: rgba(56, 189, 248, 0.2);
  border-color: var(--primary);
  color: #FFFFFF;
  box-shadow: 0 0 20px rgba(56, 189, 248, 0.4);
}

.morphy-tag-primary {
  background: rgba(56, 189, 248, 0.15);
  border: 1px solid rgba(56, 189, 248, 0.4);
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
  box-shadow: 0 0 18px rgba(56, 189, 248, 0.25);
}

/* ==========================================================================
   ULTRA-ATTRACTIVE ANIMATED BUTTON SYSTEM (CYAN BEAM GLOW)
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
  background: linear-gradient(135deg, #38BDF8 0%, #0284C7 100%) !important;
  color: #04141E !important;
  font-size: 12.5px !important;
  font-weight: 800 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.06em !important;
  border: 1.5px solid rgba(255, 255, 255, 0.8) !important;
  box-shadow: 0 8px 30px rgba(56, 189, 248, 0.5), 0 0 22px rgba(56, 189, 248, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.8) !important;
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
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.65), transparent) !important;
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
  box-shadow: 0 16px 40px rgba(56, 189, 248, 0.7), 0 0 35px rgba(56, 189, 248, 0.55), inset 0 1px 3px rgba(255, 255, 255, 0.9) !important;
  color: #04141E !important;
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

/* SECONDARY FROSTED OUTLINE BUTTON */
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
  background: rgba(216, 246, 251, 0.08) !important;
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
  color: #E0F7FA !important;
  font-size: 12.5px !important;
  font-weight: 800 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.06em !important;
  border: 1.5px solid rgba(216, 246, 251, 0.28) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35) !important;
  cursor: pointer !important;
  text-decoration: none !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.btn-morphy-outline:hover,
.btn-editorial-outline:hover,
.btn-secondary-animated:hover {
  border-color: #38BDF8 !important;
  color: #FFFFFF !important;
  background: rgba(56, 189, 248, 0.22) !important;
  transform: translateY(-2.5px) scale(1.02) !important;
  box-shadow: 0 10px 30px -4px rgba(56, 189, 248, 0.4), 0 0 20px rgba(56, 189, 248, 0.25) !important;
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
  width: 360px !important;
  height: 360px !important;
  border-radius: 50% !important;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.45) 0%, rgba(11, 53, 74, 0.35) 50%, transparent 70%) !important;
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
  background: linear-gradient(135deg, #38BDF8 0%, #0B354A 100%) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  color: #FFFFFF !important;
  font-size: 42px !important;
  box-shadow: 0 0 50px rgba(56, 189, 248, 0.65), 0 0 0 10px rgba(56, 189, 248, 0.18) !important;
  border: 2px solid rgba(255, 255, 255, 0.7) !important;
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
  background: rgba(11, 53, 74, 0.55) !important;
  backdrop-filter: blur(16px) !important;
  border: 1px solid rgba(216, 246, 251, 0.25) !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 20px !important;
  color: #38BDF8 !important;
  z-index: 15 !important;
  transition: all 0.3s ease !important;
}

.satellite-node:hover {
  transform: scale(1.18) !important;
  border-color: #38BDF8 !important;
  background: rgba(56, 189, 248, 0.3) !important;
  color: #FFFFFF !important;
  box-shadow: 0 0 25px rgba(56, 189, 248, 0.55) !important;
}

.hero-float-chip {
  position: absolute !important;
  background: rgba(11, 53, 74, 0.65) !important;
  backdrop-filter: blur(16px) !important;
  border: 1px solid rgba(216, 246, 251, 0.25) !important;
  border-radius: 9999px !important;
  padding: 9px 20px !important;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.45) !important;
  z-index: 16 !important;
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  font-size: 12px !important;
  font-weight: 700 !important;
  color: #E0F7FA !important;
}

/* FLOATING DASHBOARD WIDGET */
.morphy-dashboard-widget {
  position: relative;
  width: 100%;
  max-width: 460px;
  margin: 0 auto;
}

.dash-main-card {
  background: rgba(11, 53, 74, 0.45) !important;
  backdrop-filter: blur(24px) !important;
  border: 1px solid rgba(216, 246, 251, 0.2) !important;
  border-radius: 28px !important;
  padding: 28px !important;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.55), inset 0 1px 1px rgba(255, 255, 255, 0.2) !important;
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
  background: rgba(216, 246, 251, 0.15);
  border-radius: 8px;
  transition: all 0.4s ease;
}

.dash-bar-fill.active {
  background: linear-gradient(180deg, #38BDF8 0%, #0B354A 100%);
  box-shadow: 0 0 18px rgba(56, 189, 248, 0.55);
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
  background: rgba(11, 53, 74, 0.75);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(216, 246, 251, 0.25);
  border-radius: 16px;
  padding: 10px 16px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45);
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
  background: rgba(11, 53, 74, 0.75);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(216, 246, 251, 0.25);
  border-radius: 18px;
  padding: 12px 18px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45);
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
  border: 1.5px dashed rgba(216, 246, 251, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #74A8BA;
  font-size: 14px;
  letter-spacing: 8px;
  background: rgba(11, 53, 74, 0.25);
}

.matrix-metric-pill-white {
  background: rgba(11, 53, 74, 0.5);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(216, 246, 251, 0.22);
  border-radius: 9999px;
  padding: 16px 36px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  gap: 14px;
  color: #FFFFFF;
}

.matrix-metric-pill-blue {
  background: linear-gradient(135deg, #0B354A 0%, #38BDF8 100%);
  border-radius: 9999px;
  padding: 16px 36px;
  box-shadow: 0 10px 35px rgba(56, 189, 248, 0.45);
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
  background: rgba(11, 53, 74, 0.35) !important;
  backdrop-filter: blur(16px) !important;
  border: 1.5px solid rgba(216, 246, 251, 0.2) !important;
  color: #B2DFEB !important;
  font-size: 12px !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.35) !important;
  text-decoration: none !important;
}

.filter-btn:hover {
  border-color: #38BDF8 !important;
  color: #FFFFFF !important;
  background: rgba(56, 189, 248, 0.2) !important;
  transform: translateY(-1.5px) !important;
  box-shadow: 0 6px 20px rgba(56, 189, 248, 0.35) !important;
}

.filter-btn.active {
  background: linear-gradient(135deg, #38BDF8 0%, #0284C7 100%) !important;
  border-color: #38BDF8 !important;
  color: #04141E !important;
  box-shadow: 0 8px 25px rgba(56, 189, 248, 0.55), inset 0 1px 2px rgba(255, 255, 255, 0.7) !important;
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

#navbar {
  background: rgba(6, 27, 39, 0.82) !important;
  backdrop-filter: blur(24px) !important;
  -webkit-backdrop-filter: blur(24px) !important;
  border-bottom: 1px solid rgba(216, 246, 251, 0.15) !important;
}

#mobileMenu {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  background: rgba(6, 27, 39, 0.96) !important;
  backdrop-filter: blur(24px) !important;
  border-top: 1px solid rgba(216, 246, 251, 0.15) !important;
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
  color: #B2DFEB;
  transition: all 0.2s ease;
  background: transparent;
  border: 1px solid transparent;
}

.mobile-nav-link:hover,
.mobile-nav-link:active {
  background: rgba(56, 189, 248, 0.15);
  color: #38BDF8;
  border-color: rgba(56, 189, 248, 0.35);
  transform: translateX(3px);
}

.mobile-nav-link.active {
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.25) 0%, rgba(11, 53, 74, 0.5) 100%);
  color: #38BDF8;
  font-weight: 800;
  border-color: rgba(56, 189, 248, 0.45);
}

/* ==========================================================================
   DARK LUXURY FORM INPUTS & SELECT CONTROLS
   ========================================================================== */
input, textarea, select {
  background-color: rgba(11, 53, 74, 0.45) !important;
  color: #E0F7FA !important;
  border: 1px solid rgba(216, 246, 251, 0.2) !important;
  backdrop-filter: blur(16px) !important;
  transition: all 0.25s ease !important;
}

input:focus, textarea:focus, select:focus {
  border-color: #38BDF8 !important;
  box-shadow: 0 0 20px rgba(56, 189, 248, 0.4) !important;
  outline: none !important;
}

select option {
  background-color: #071E2B !important;
  color: #E0F7FA !important;
}

::placeholder {
  color: rgba(178, 223, 235, 0.55) !important;
}

/* Glass Tables */
table {
  color: #E0F7FA;
}

thead tr {
  background: rgba(11, 53, 74, 0.6) !important;
}

tbody tr:hover {
  background: rgba(56, 189, 248, 0.1) !important;
}
`;

fs.writeFileSync(path.join(rootDir, 'styles.css'), cyanBeamStylesCss, 'utf8');

// 2. UPDATE app.js and services/service-page.js WITH PRISMATIC DIAGONAL CYAN BEAM CANVAS
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
    initLightBeams();
  }, { passive: true });

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  }, { passive: true });

  // High-Tech Prismatic Diagonal Light Beams & Particles
  let beams = [];
  function initLightBeams() {
    beams = [];
    const count = 6;
    for (let i = 0; i < count; i++) {
      beams.push({
        offset: (i / count) * (width + height) - height * 0.5,
        speed: 0.25 + (i % 2) * 0.15,
        width: 140 + Math.random() * 180,
        alpha: 0.12 + Math.random() * 0.15
      });
    }
  }
  initLightBeams();

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Smooth mouse parallax
    mouse.x += (mouse.targetX - mouse.x) * 0.04;
    mouse.y += (mouse.targetY - mouse.y) * 0.04;

    // 1. Base Oceanic Gradient
    const baseGrad = ctx.createLinearGradient(0, 0, width, height);
    baseGrad.addColorStop(0, 'rgba(6, 24, 36, 0.95)');
    baseGrad.addColorStop(0.35, 'rgba(11, 53, 74, 0.85)');
    baseGrad.addColorStop(0.5, 'rgba(53, 146, 176, 0.7)');
    baseGrad.addColorStop(0.52, 'rgba(213, 245, 250, 0.8)');
    baseGrad.addColorStop(0.58, 'rgba(53, 146, 176, 0.7)');
    baseGrad.addColorStop(0.75, 'rgba(11, 53, 74, 0.85)');
    baseGrad.addColorStop(1, 'rgba(5, 21, 31, 0.95)');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Draw Moving Diagonal Light Beams (45-degree angle matching reference image)
    const parallax = (mouse.x - width / 2) * 0.04;
    beams.forEach(b => {
      b.offset += b.speed;
      if (b.offset > width + height) {
        b.offset = -height;
      }

      ctx.save();
      ctx.translate(b.offset + parallax, 0);
      ctx.rotate(Math.PI / 4); // 45 degree angle

      const beamGrad = ctx.createLinearGradient(0, -b.width, 0, b.width);
      beamGrad.addColorStop(0, 'rgba(56, 189, 248, 0)');
      beamGrad.addColorStop(0.5, \`rgba(216, 246, 251, \${b.alpha})\`);
      beamGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');

      ctx.fillStyle = beamGrad;
      ctx.fillRect(-width * 2, -b.width, width * 4, b.width * 2);
      ctx.restore();
    });

    // 3. Horizontal Scanlines Mesh
    ctx.fillStyle = 'rgba(255, 255, 255, 0.035)';
    for (let y = 0; y < height; y += 4) {
      ctx.fillRect(0, y, width, 1);
    }

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

// 3. UPDATE ALL HTML FILES FOR CYAN LIGHT-BEAM & GLASSMORPHIC THEME
function updateHtmlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Tailwind config
  const tailwindRegex = /tailwind\.config\s*=\s*\{[\s\S]*?theme:\s*\{[\s\S]*?extend:\s*\{[\s\S]*?colors:\s*\{[\s\S]*?\}\s*\}\s*\}\s*\}/m;
  const newTailwindConfig = `tailwind.config = {
      theme: {
        extend: {
          colors: {
            palette: {
              olive: '#38BDF8',
              forest: '#0B354A',
              slate: '#38BDF8',
              mist: '#74A8BA',
              stone: 'rgba(216, 246, 251, 0.15)',
              emerald: '#38BDF8',
              brunswick: '#0B354A',
              polar: '#D8F6FB',
              canvas: '#061B27',
              card: 'rgba(11, 53, 74, 0.42)'
            },
            canvas: '#061B27'
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

  content = content
    // Replace green tokens with Cyan / Aqua tokens
    .replace(/#06D6A0/gi, '#38BDF8')
    .replace(/#05B386/gi, '#0284C7')
    .replace(/#0C4137/gi, '#0B354A')
    .replace(/#E6FBF6/gi, '#D8F6FB')
    .replace(/#03100D/gi, '#061B27')
    .replace(/#041612/gi, '#071E2B')
    .replace(/#051F19/gi, '#092A3B')
    
    // Replace RGBAs
    .replace(/rgba\(6,\s*214,\s*160,/gi, 'rgba(56, 189, 248,')
    .replace(/rgba\(12,\s*65,\s*55,/gi, 'rgba(11, 53, 74,')
    .replace(/rgba\(230,\s*251,\s*246,/gi, 'rgba(216, 246, 251,')
    
    // Borders & Glass Cards
    .replace(/bg-white(?=[\s"'])/g, 'bg-[#0B354A]/40 backdrop-blur-xl')
    .replace(/border-\[#D7EFE9\]/gi, 'border-[#D8F6FB]/20')
    .replace(/border-\[#E6FBF6\]\/15/gi, 'border-[#D8F6FB]/20')
    .replace(/border-\[#E6FBF6\]\/10/gi, 'border-[#D8F6FB]/15');

  fs.writeFileSync(filePath, content, 'utf8');
}

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
  console.log('Updated to Cyan Light-Beam Glass Theme:', path.relative(rootDir, file));
});

console.log('\\n✅ 100% Prismatic Cyan Light-Beam Gradient & Glass Theme Applied Successfully!');
