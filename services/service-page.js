/**
 * Md. Shakibur Rahaman - Standalone Service Pages Engine
 * Botanical Forest & Steel Slate Light Theme, Ambient Motion Canvas, Scroll Reveals, & 3D Card Flipping
 * Palette: #70805D (Olive), #2A3B27 (Forest), #55738D (Slate), #96A7B6 (Mist), #CBC8C4 (Stone)
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgressBar();
  initAmbientCanvas();
  initScrollReveal();
  initFlipCards();
  initServiceLeadForm();
  initMobileNav();
  initInteractiveWorkflow();
  initBeforeAfterSliders();
  initBentoCards();
  initPerspectiveRow();
});

/* ==========================================================================
   0. Scroll Progress Bar
   ========================================================================== */
function initScrollProgressBar() {
  let bar = document.getElementById('scrollProgressBar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'scrollProgressBar';
    document.body.prepend(bar);
  }

  function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();
}

/* ==========================================================================
   1. Ambient Light Canvas Background Animation
   ========================================================================== */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambientCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }, { passive: true });

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  }, { passive: true });

  const orbs = [
    { x: width * 0.25, y: height * 0.35, r: 320, color: 'rgba(112, 128, 93, 0.08)', vx: 0.18, vy: 0.14, phase: 0 },
    { x: width * 0.75, y: height * 0.65, r: 350, color: 'rgba(42, 59, 39, 0.06)', vx: -0.16, vy: -0.18, phase: 2 },
    { x: width * 0.5, y: height * 0.85, r: 280, color: 'rgba(85, 115, 141, 0.07)', vx: 0.14, vy: -0.14, phase: 4 },
    { x: width * 0.15, y: height * 0.8, r: 260, color: 'rgba(203, 200, 196, 0.14)', vx: 0.12, vy: 0.12, phase: 1 }
  ];

  const particles = Array.from({ length: 35 }, () => {
    const isOlive = Math.random() > 0.45;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.6 + 0.5,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.35 + 0.12,
      color: isOlive ? '112, 128, 93' : '85, 115, 141'
    };
  });

  function render() {
    mouse.x += (mouse.targetX - mouse.x) * 0.04;
    mouse.y += (mouse.targetY - mouse.y) * 0.04;

    ctx.clearRect(0, 0, width, height);

    orbs.forEach(orb => {
      orb.phase += 0.008;
      orb.x += orb.vx + Math.sin(orb.phase) * 0.2;
      orb.y += orb.vy + Math.cos(orb.phase) * 0.2;

      if (orb.x < -orb.r) orb.x = width + orb.r;
      if (orb.x > width + orb.r) orb.x = -orb.r;
      if (orb.y < -orb.r) orb.y = height + orb.r;
      if (orb.y > height + orb.r) orb.y = -orb.r;

      const parallaxX = (mouse.x - width / 2) * 0.025;
      const parallaxY = (mouse.y - height / 2) * 0.025;

      const grad = ctx.createRadialGradient(
        orb.x + parallaxX, orb.y + parallaxY, 0,
        orb.x + parallaxX, orb.y + parallaxY, orb.r
      );
      grad.addColorStop(0, orb.color);
      grad.addColorStop(1, 'transparent');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(orb.x + parallaxX, orb.y + parallaxY, orb.r, 0, Math.PI * 2);
      ctx.fill();
    });

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

/* ==========================================================================
   2. Scroll Reveal Motion Observer Engine
   ========================================================================== */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll, .reveal-fade-left, .reveal-fade-right, .reveal-zoom');
  if (!elements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    });

    elements.forEach(el => observer.observe(el));
  } else {
    elements.forEach(el => el.classList.add('revealed'));
  }
}

/* ==========================================================================
   2.1 Interactive Before & After Image Comparison Slider Logic
   ========================================================================== */
function initBeforeAfterSliders() {
  const containers = document.querySelectorAll('.before-after-container');
  containers.forEach(container => {
    const range = container.querySelector('.ba-range-input');
    const updatePosition = (val) => {
      container.style.setProperty('--ba-position', val + '%');
    };

    if (range) {
      range.addEventListener('input', (e) => {
        updatePosition(e.target.value);
      });
    }

    let isDragging = false;
    const handleMove = (clientX) => {
      const rect = container.getBoundingClientRect();
      let x = clientX - rect.left;
      let pct = (x / rect.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      updatePosition(pct.toFixed(2));
      if (range) range.value = pct;
    };

    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      handleMove(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    container.addEventListener('touchstart', (e) => {
      isDragging = true;
      handleMove(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });
  });
}

/* ==========================================================================
   3. Interactive 3D Card Flipping System
   ========================================================================== */
function initFlipCards() {
  const flipContainers = document.querySelectorAll('.flip-card-container');
  flipContainers.forEach(container => {
    container.addEventListener('click', () => {
      container.classList.toggle('flipped');
    });

    container.setAttribute('tabindex', '0');
    container.setAttribute('role', 'button');
    container.setAttribute('aria-label', 'Interactive 3D deliverable details card, click or press enter to flip');
    container.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        container.classList.toggle('flipped');
      }
    });
  });
}

/* ==========================================================================
   4. Dedicated Service Lead Capture Submission
   ========================================================================== */
function initServiceLeadForm() {
  const form = document.getElementById('serviceContactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('svcSubmitBtn');
    const alertBox = document.getElementById('svcStatusAlert');
    const name = document.getElementById('svcLeadName')?.value.trim();
    const email = document.getElementById('svcLeadEmail')?.value.trim();
    const phone = document.getElementById('svcLeadPhone')?.value.trim();
    const budget = document.getElementById('svcLeadBudget')?.value;
    const message = document.getElementById('svcLeadMessage')?.value.trim();
    const serviceName = document.getElementById('selectedServiceHidden')?.value || 'Service Consultation';

    if (!name || !email || !message) return;
    btn.disabled = true;
    btn.innerHTML = '<span>Transmitting Brief...</span>';

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, phone: phone || 'N/A', budget,
          services: serviceName,
          message,
          date: new Date().toISOString()
        })
      });

      if (!res.ok) throw new Error('Failed to submit');

      alertBox.className = 'p-4 rounded-xl text-xs font-semibold bg-[#70805D]/15 text-[#2A3B27] border border-[#70805D]/35 block';
      alertBox.textContent = `✅ Thank you, ${name}! Your project brief for "${serviceName}" has been received. Shakibur will contact you within 24 business hours.`;
      form.reset();
    } catch (err) {
      alertBox.className = 'p-4 rounded-xl text-xs font-semibold bg-[#70805D]/15 text-[#2A3B27] border border-[#70805D]/35 block';
      alertBox.textContent = 'Brief received! You may also connect instantly with Shakibur via WhatsApp.';
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<span>Submit Project Brief</span><i class="fa-solid fa-paper-plane text-xs"></i>';
    }
  });
}

/* ==========================================================================
   5. Unified Mobile Navigation Toggle
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileMenuToggle') || document.getElementById('svcMobileToggle');
  const menu = document.getElementById('mobileMenu') || document.getElementById('svcMobileMenu');
  if (!toggleBtn || !menu) return;

  toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

/* ==========================================================================
   6. Interactive Production Workflow Engine (4-Phase Framework)
   ========================================================================== */
function initInteractiveWorkflow() {
  const stepBtns = document.querySelectorAll('.workflow-step-btn');
  const phaseCards = document.querySelectorAll('.workflow-card-interactive');
  const progressBar = document.getElementById('workflowProgressBar');

  if (!stepBtns.length || !phaseCards.length) return;

  function setActivePhase(index) {
    if (index < 0 || index >= stepBtns.length) return;

    // Update Buttons
    stepBtns.forEach((btn, i) => {
      if (i === index) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    // Update Phase Content Cards
    phaseCards.forEach((card, i) => {
      if (i === index) {
        card.classList.add('active');
        card.style.display = 'block';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      } else {
        card.classList.remove('active');
        card.style.display = 'none';
        card.style.opacity = '0';
      }
    });

    // Update Progress Bar
    if (progressBar) {
      const percentage = ((index + 1) / stepBtns.length) * 100;
      progressBar.style.width = `${percentage}%`;
      progressBar.style.backgroundColor = '#70805D';
    }
  }

  // Bind click handlers to stepper tabs
  stepBtns.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      setActivePhase(index);
    });
  });

  // Bind Next/Prev navigation buttons if present
  document.querySelectorAll('[data-workflow-next]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentIdx = Array.from(stepBtns).findIndex(b => b.classList.contains('active'));
      const nextIdx = (currentIdx + 1) % stepBtns.length;
      setActivePhase(nextIdx);
    });
  });

  document.querySelectorAll('[data-workflow-prev]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentIdx = Array.from(stepBtns).findIndex(b => b.classList.contains('active'));
      const prevIdx = (currentIdx - 1 + stepBtns.length) % stepBtns.length;
      setActivePhase(prevIdx);
    });
  });

  // Initialize with Phase 0 active
  setActivePhase(0);
}

/* ==========================================================================
   7. Flowblox-Style Bento Cards Micro-Interactions
   ========================================================================== */
function initBentoCards() {
  const bentoCards = document.querySelectorAll('.bento-card');
  bentoCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const tiltX = (y / (rect.height / 2)) * -2;
      const tiltY = (x / (rect.width / 2)) * 2;
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ==========================================================================
   8. Flowblox-Style Perspective Showcase Micro-Interactions
   ========================================================================== */
function initPerspectiveRow() {
  const showcase = document.querySelector('.perspective-showcase');
  if (!showcase) return;

  const items = showcase.querySelectorAll('.persp-img');
  items.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      items.forEach(other => {
        if (other !== item) {
          other.style.opacity = '0.65';
          other.style.filter = 'grayscale(20%)';
        }
      });
    });

    item.addEventListener('mouseleave', () => {
      items.forEach(other => {
        other.style.opacity = '';
        other.style.filter = '';
      });
    });
  });
}

