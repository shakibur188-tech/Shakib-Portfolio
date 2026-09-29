const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

// 1. UPDATE app.js with Continuous Animated Cloud Background Engine
const appPath = path.join(rootDir, 'app.js');
let appJs = fs.readFileSync(appPath, 'utf8');

// Replace initAmbientBackground with the continuous 60fps Cloud Engine
const newCloudEngine = `/* ==========================================================================
   1. CONTINUOUS ANIMATED CLOUD BACKGROUND ENGINE (60FPS CANVAS & SKY)
   ========================================================================== */
function initAmbientBackground() {
  const canvas = document.getElementById('ambientCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initClouds();
  }, { passive: true });

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  }, { passive: true });

  // Generate realistic layered drifting clouds
  let clouds = [];
  function initClouds() {
    clouds = [];
    const count = width > 768 ? 14 : 8;
    for (let i = 0; i < count; i++) {
      clouds.push({
        x: Math.random() * (width + 400) - 200,
        y: Math.random() * (height * 0.95),
        radius: Math.random() * 140 + 100,
        speed: Math.random() * 0.35 + 0.15,
        opacity: Math.random() * 0.35 + 0.25,
        puffs: Array.from({ length: 6 }, () => ({
          dx: (Math.random() - 0.5) * 160,
          dy: (Math.random() - 0.5) * 60,
          r: Math.random() * 90 + 60
        }))
      });
    }
  }
  initClouds();

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Smooth mouse parallax
    mouse.x += (mouse.targetX - mouse.x) * 0.04;
    mouse.y += (mouse.targetY - mouse.y) * 0.04;

    // 1. Draw subtle ambient sky gradients
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
    skyGrad.addColorStop(0, 'rgba(240, 246, 255, 0.95)');
    skyGrad.addColorStop(0.5, 'rgba(248, 250, 252, 0.9)');
    skyGrad.addColorStop(1, 'rgba(255, 255, 255, 0.98)');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Render and drift soft clouds
    clouds.forEach(c => {
      c.x += c.speed;
      // Seamless wrap-around
      if (c.x - c.radius > width + 200) {
        c.x = -c.radius - 200;
        c.y = Math.random() * (height * 0.95);
      }

      ctx.save();
      const parallaxX = (mouse.x - width / 2) * (c.speed * 0.08);
      const parallaxY = (mouse.y - height / 2) * (c.speed * 0.08);

      c.puffs.forEach(p => {
        const px = c.x + p.dx + parallaxX;
        const py = c.y + p.dy + parallaxY;
        const puffGrad = ctx.createRadialGradient(px, py, 0, px, py, p.r);
        puffGrad.addColorStop(0, \`rgba(255, 255, 255, \${c.opacity})\`);
        puffGrad.addColorStop(0.5, \`rgba(240, 247, 255, \${c.opacity * 0.75})\`);
        puffGrad.addColorStop(1, 'rgba(240, 247, 255, 0)');

        ctx.fillStyle = puffGrad;
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
    });

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}`;

appJs = appJs.replace(/\/\* ==========================================================================\s*1\. FULL-PAGE AMBIENT LIGHT[\s\S]*?requestAnimationFrame\(render\);\s*\}/, newCloudEngine);

fs.writeFileSync(appPath, appJs, 'utf8');
console.log('app.js cloud background engine updated!');

// 2. UPDATE styles.css with full Morphy & bulletproof layout styles
const cssPath = path.join(rootDir, 'styles.css');
const masterMorphyCSS = `/* ==========================================================================
   Md. Shakibur Rahaman - Strategic Lead & Digital Architect
   MODERN "MORPHY" GLASSMORPHIC & CLOUD BLUE AESTHETIC
   Palette: #0066FF (Electric Royal Blue), #0B0F19 (Obsidian), #FFFFFF (Pure White)
   Font: Strictly Plus Jakarta Sans
   ========================================================================== */

@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

:root {
  --primary: #0066FF;
  --primary-hover: #0052FF;
  --primary-glow: rgba(0, 102, 255, 0.22);
  --primary-subtle: rgba(0, 102, 255, 0.08);

  --text-dark: #0B0F19;
  --text-body: #475569;
  --text-muted: #94A3B8;

  --bg-canvas: #FAFCFF;
  --bg-card: #FFFFFF;
  --bg-glass: rgba(255, 255, 255, 0.9);

  --border-subtle: #E2E8F0;
  --border-glass: rgba(0, 102, 255, 0.14);
  --border-highlight: rgba(0, 102, 255, 0.4);

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
  color: #FFFFFF;
}

/* TOP SCROLL PROGRESS BAR */
#scrollProgressBar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  width: 0%;
  background: linear-gradient(90deg, #0066FF 0%, #00D2FF 50%, #7000FF 100%);
  z-index: 99999;
  box-shadow: 0 1px 10px rgba(0, 102, 255, 0.5);
  transition: width 0.08s linear;
  pointer-events: none;
}

/* ANIMATED CLOUD BACKGROUND CANVAS */
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
    radial-gradient(at 20% 20%, rgba(0, 102, 255, 0.06) 0px, transparent 50%),
    radial-gradient(at 80% 15%, rgba(120, 0, 255, 0.05) 0px, transparent 50%),
    radial-gradient(at 50% 70%, rgba(0, 210, 255, 0.05) 0px, transparent 50%);
  filter: blur(50px);
  pointer-events: none;
  z-index: -3;
}

/* MORPHY GLASSMORPHIC CARDS */
.morphy-card {
  background: #FFFFFF;
  border: 1px solid var(--border-subtle);
  border-radius: 28px;
  box-shadow: 0 10px 30px -10px rgba(11, 15, 25, 0.05), 0 2px 8px rgba(0, 0, 0, 0.02);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
}

.morphy-card:hover {
  border-color: var(--border-highlight);
  box-shadow: 0 20px 45px -12px rgba(0, 102, 255, 0.14), 0 0 20px -4px var(--primary-glow);
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
  box-shadow: 0 4px 14px -3px rgba(11, 15, 25, 0.05);
  transition: all 0.25s ease;
}

.morphy-tag-primary {
  background: var(--primary-subtle);
  border: 1px solid rgba(0, 102, 255, 0.22);
  color: var(--primary);
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

/* BUTTONS */
.btn-morphy-primary {
  background: linear-gradient(135deg, #0066FF 0%, #0052FF 100%);
  color: #FFFFFF !important;
  font-size: 13px;
  font-weight: 700;
  padding: 12px 28px;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 20px -3px rgba(0, 102, 255, 0.38);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none;
}

.btn-morphy-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px -4px rgba(0, 102, 255, 0.50);
}

.btn-morphy-outline {
  background: #FFFFFF;
  color: var(--text-dark) !important;
  font-size: 13px;
  font-weight: 700;
  padding: 11px 26px;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--border-subtle);
  cursor: pointer;
  box-shadow: 0 4px 12px -2px rgba(11, 15, 25, 0.04);
  transition: all 0.25s ease;
  text-decoration: none;
}

.btn-morphy-outline:hover {
  border-color: var(--primary);
  color: var(--primary) !important;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px -4px rgba(0, 102, 255, 0.12);
}

/* ==========================================================================
   HERO INFOGRAPHIC NETWORK (BULLETPROOF ABSOLUTE COORDINATES)
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
  width: 320px !important;
  height: 320px !important;
  border-radius: 50% !important;
  background: radial-gradient(circle, rgba(0, 102, 255, 0.18) 0%, rgba(0, 210, 255, 0.08) 50%, transparent 70%) !important;
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
  background: linear-gradient(135deg, #0066FF 0%, #0040C1 100%) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  color: #FFFFFF !important;
  font-size: 42px !important;
  box-shadow: 0 16px 36px -6px rgba(0, 102, 255, 0.45), 0 0 0 10px rgba(0, 102, 255, 0.08) !important;
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
  box-shadow: 0 10px 25px -5px rgba(11, 15, 25, 0.08) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 20px !important;
  z-index: 15 !important;
  transition: all 0.3s ease !important;
}

.satellite-node:hover {
  transform: scale(1.15) !important;
  border-color: var(--primary) !important;
  box-shadow: 0 14px 30px -4px rgba(0, 102, 255, 0.25) !important;
}

.hero-float-chip {
  position: absolute !important;
  background: #FFFFFF !important;
  border: 1px solid var(--border-subtle) !important;
  border-radius: 9999px !important;
  padding: 8px 18px !important;
  box-shadow: 0 12px 30px -6px rgba(11, 15, 25, 0.08) !important;
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
  box-shadow: 0 20px 50px -15px rgba(0, 102, 255, 0.12), 0 4px 12px rgba(0, 0, 0, 0.03);
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
  background: #E2E8F0;
  border-radius: 8px;
  transition: all 0.4s ease;
}

.dash-bar-fill.active {
  background: linear-gradient(180deg, #0066FF 0%, #0040C1 100%);
  box-shadow: 0 4px 14px rgba(0, 102, 255, 0.35);
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
  box-shadow: 0 10px 25px -4px rgba(11, 15, 25, 0.08);
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
  box-shadow: 0 12px 30px -4px rgba(11, 15, 25, 0.10);
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
  color: #94A3B8;
  font-size: 14px;
  letter-spacing: 8px;
  background: rgba(248, 250, 252, 0.6);
}

.matrix-metric-pill-white {
  background: #FFFFFF;
  border: 1px solid var(--border-subtle);
  border-radius: 9999px;
  padding: 16px 36px;
  box-shadow: 0 8px 24px -4px rgba(11, 15, 25, 0.05);
  display: flex;
  align-items: center;
  gap: 14px;
}

.matrix-metric-pill-blue {
  background: linear-gradient(135deg, #0066FF 0%, #004BD6 100%);
  border-radius: 9999px;
  padding: 16px 36px;
  box-shadow: 0 10px 30px -4px rgba(0, 102, 255, 0.45);
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
`;

fs.writeFileSync(cssPath, masterMorphyCSS, 'utf8');
console.log('styles.css updated with Master Morphy Design System!');

// 3. UPDATE index.html with inline styles + robust HTML structure
const indexPath = path.join(rootDir, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

// Ensure hero infographic has bulletproof inline coordinates
const bulletproofHeroInfographic = `      <!-- CENTRAL CONNECTED INFOGRAPHIC DIAGRAM (Bulletproof Coordinates) -->
      <div class="pt-8 pb-4">
        <div class="hero-infographic-container relative w-full max-w-[680px] h-[380px] sm:h-[400px] mx-auto flex items-center justify-center">
          
          <!-- Central Glowing Radial Aura -->
          <div class="hero-center-aura absolute w-[300px] h-[300px] rounded-full pointer-events-none z-[1]"></div>

          <!-- Connected Curved Circuit Lines SVG -->
          <svg class="circuit-svg absolute inset-0 w-full h-full pointer-events-none z-[2]" viewBox="0 0 680 380" fill="none">
            <path d="M 340 190 Q 200 120 100 90" stroke="rgba(0, 102, 255, 0.22)" stroke-width="2" stroke-dasharray="6 6"/>
            <path d="M 340 190 Q 500 120 580 90" stroke="rgba(0, 102, 255, 0.22)" stroke-width="2" stroke-dasharray="6 6"/>
            <path d="M 340 190 Q 220 280 160 310" stroke="rgba(0, 102, 255, 0.22)" stroke-width="2" stroke-dasharray="6 6"/>
            <path d="M 340 190 Q 480 280 560 300" stroke="rgba(0, 102, 255, 0.22)" stroke-width="2" stroke-dasharray="6 6"/>
            <path d="M 340 190 Q 340 80 420 50" stroke="rgba(0, 102, 255, 0.22)" stroke-width="2" stroke-dasharray="6 6"/>
          </svg>

          <!-- Central Glowing Core Infinity / Meta Node -->
          <div class="hero-center-node relative w-[110px] h-[110px] rounded-full z-[10]">
            <i class="fa-brands fa-meta"></i>
          </div>

          <!-- Satellite Floating Ecosystem Nodes (Explicit Inline Positioning) -->
          <div class="satellite-node" style="position: absolute; top: 20%; left: 10%; color: #1877F2;" title="Facebook Ads"><i class="fa-brands fa-facebook-f"></i></div>
          <div class="satellite-node" style="position: absolute; top: 68%; right: 12%; color: #E4405F;" title="Instagram Growth"><i class="fa-brands fa-instagram"></i></div>
          <div class="satellite-node" style="position: absolute; bottom: 8%; left: 22%; color: #25D366;" title="WhatsApp Funnel"><i class="fa-brands fa-whatsapp"></i></div>
          <div class="satellite-node" style="position: absolute; top: 15%; right: 18%; color: #0084FF;" title="Messenger Direct"><i class="fa-brands fa-facebook-messenger"></i></div>
          <div class="satellite-node" style="position: absolute; top: 10%; right: 38%; color: #0066FF;" title="Web Development"><i class="fa-solid fa-code"></i></div>
          <div class="satellite-node" style="position: absolute; bottom: 12%; right: 32%; color: #10B981;" title="Google Ads & SEO"><i class="fa-solid fa-chart-line"></i></div>

          <!-- Floating Info Chip Left: Get Started Free -->
          <div class="hero-float-chip shadow-md" style="position: absolute; top: 18%; left: 2%; background: rgba(0, 102, 255, 0.08); border-color: rgba(0, 102, 255, 0.25); color: #0066FF;">
            <span>Get Started Free</span>
            <i class="fa-solid fa-arrow-up-right-from-square text-[11px]"></i>
          </div>

          <!-- Floating Info Chip Right: 2.3M+ Trusted -->
          <div class="hero-float-chip shadow-md" style="position: absolute; top: 22%; right: 2%;">
            <span class="text-base font-extrabold text-[#0B0F19]">2.3M+</span>
            <span class="text-[11px] text-[#64748B] font-medium">Trusted global reach</span>
          </div>

        </div>
      </div>`;

indexHtml = indexHtml.replace(/<!-- CENTRAL CONNECTED INFOGRAPHIC DIAGRAM[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/, bulletproofHeroInfographic + '\n    </div>\n  </section>');

fs.writeFileSync(indexPath, indexHtml, 'utf8');
console.log('index.html hero infographic updated with bulletproof positioning!');
