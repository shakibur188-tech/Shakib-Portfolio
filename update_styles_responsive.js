const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

const responsiveCSS = `

/* ==========================================================================
   21. ENHANCED MOBILE RESPONSIVENESS & VISUAL REFINEMENTS
   ========================================================================== */

/* Navbar Mobile CTA Button Enforcing */
.nav-cta-btn {
  display: none !important;
}

@media (min-width: 768px) {
  .nav-cta-btn {
    display: inline-flex !important;
  }
}

/* Global Viewport Overflow Guard */
html, body {
  overflow-x: hidden !important;
  max-width: 100vw !important;
  position: relative;
}

/* Hero Section Mobile Responsiveness */
@media (max-width: 768px) {
  .hero-portrait-container {
    max-width: 320px;
    margin: 0 auto;
  }

  .hero-olive-aura {
    width: 260px !important;
    height: 260px !important;
  }

  .hero-orbit-ring {
    width: 240px !important;
    height: 240px !important;
  }

  .floating-badge {
    padding: 8px 12px;
    font-size: 11px;
  }

  .code-snippet-chip {
    font-size: 10.5px !important;
    padding: 6px 12px !important;
    max-width: 90vw;
  }
}

@media (max-width: 480px) {
  .hero-portrait-container {
    max-width: 280px;
  }

  .hero-portrait-container img {
    height: 340px !important;
  }

  .floating-badge {
    transform: scale(0.9);
  }
}

/* Testimonials Mobile Enhancements */
@media (max-width: 1024px) {
  .testimonial-mosaic {
    max-width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding: 10px 16px 25px;
    justify-content: flex-start;
    scrollbar-width: thin;
    scrollbar-color: rgba(112, 128, 93, 0.3) transparent;
  }

  .testimonial-mosaic::-webkit-scrollbar {
    height: 4px;
  }

  .testimonial-mosaic::-webkit-scrollbar-thumb {
    background: rgba(112, 128, 93, 0.3);
    border-radius: 9999px;
  }
}

@media (max-width: 640px) {
  .testimonial-mosaic .mosaic-col {
    width: 75px !important;
  }
  .testimonial-mosaic .mosaic-col:nth-child(4),
  .testimonial-mosaic .mosaic-col:nth-child(5) {
    width: 85px !important;
  }
}

/* Bento Grid & Perspective Row Mobile Fixes */
@media (max-width: 768px) {
  .bento-grid {
    grid-template-columns: 1fr !important;
    gap: 16px !important;
  }

  .perspective-row {
    flex-direction: column !important;
    transform: none !important;
    gap: 14px !important;
  }

  .perspective-row > * {
    transform: none !important;
    width: 100% !important;
  }

  .results-grid {
    grid-template-columns: 1fr !important;
    gap: 14px !important;
  }
}

/* Before & After Slider Mobile Adjustments */
@media (max-width: 640px) {
  .before-after-container {
    height: 340px !important;
    border-radius: 14px;
  }

  .ba-handle {
    width: 34px !important;
    height: 34px !important;
    font-size: 10px !important;
  }

  .ba-badge {
    font-size: 9.5px !important;
    padding: 4px 10px !important;
  }
}

@media (max-width: 400px) {
  .before-after-container {
    height: 280px !important;
  }
}

/* Touch Friendly Buttons & Input Fields */
@media (max-width: 640px) {
  .btn-aesthetic-primary,
  .btn-outline-emerald,
  .btn-pill-glass,
  .btn-pill-white {
    padding: 10px 20px;
    font-size: 12px;
  }

  input, select, textarea {
    font-size: 14px !important; /* Prevents auto-zoom on iOS Safari */
  }
}

/* Modal Responsiveness */
@media (max-width: 640px) {
  .modal-container {
    width: 94% !important;
    max-height: 90vh !important;
    padding: 20px 16px !important;
    border-radius: 18px !important;
  }
}
`;

css += responsiveCSS;
fs.writeFileSync(cssPath, css, 'utf8');
console.log('styles.css updated with comprehensive mobile responsiveness & navbar styles!');
