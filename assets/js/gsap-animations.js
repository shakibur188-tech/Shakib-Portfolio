/**
 * GSAP High-Performance Animation Engine for Md. Shakibur Rahaman Portfolio & Offers
 * 
 * Powered by GreenSock Animation Platform (GSAP 3.12+ & ScrollTrigger)
 * 
 * Guaranteed 100% Content Visibility & High Performance
 */

(function () {
  'use strict';

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  function initGSAP() {
    if (typeof gsap === 'undefined') {
      setTimeout(initGSAP, 100);
      return;
    }

    // Register ScrollTrigger & ScrollToPlugin if available
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    if (typeof ScrollToPlugin !== 'undefined') {
      gsap.registerPlugin(ScrollToPlugin);
    }

    // --- 1. HERO SECTION CINEMATIC ENTRANCE ---
    const heroSection = document.querySelector('#hero, section.hero-section');
    if (heroSection) {
      const heroTimeline = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 0.8 },
        onComplete: () => {
          gsap.set(heroSection.querySelectorAll('*'), { clearProps: 'opacity,transform,visibility' });
        }
      });

      const heroTags = heroSection.querySelectorAll('.inline-flex.items-center, .morphy-tag-primary, #heroLiveViewersCount, .live-beacon');
      if (heroTags.length > 0) {
        heroTimeline.fromTo(heroTags, 
          { y: -15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: 'power2.out', clearProps: 'all' },
          0.05
        );
      }

      const heroHeading = heroSection.querySelector('h1');
      if (heroHeading) {
        heroTimeline.fromTo(heroHeading,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', clearProps: 'all' },
          0.15
        );
      }

      const heroParagraphs = heroSection.querySelectorAll('p');
      if (heroParagraphs.length > 0) {
        heroTimeline.fromTo(heroParagraphs,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: 'power2.out', clearProps: 'all' },
          0.25
        );
      }

      const heroButtons = heroSection.querySelectorAll('.btn-morphy-primary, .btn-morphy-outline, .btn-morphy-ghost, a[href*="contact"], a[href*="consultation"]');
      if (heroButtons.length > 0) {
        heroTimeline.fromTo(heroButtons,
          { y: 12, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: 'back.out(1.2)', clearProps: 'all' },
          0.35
        );
      }

      const heroMockup = heroSection.querySelector('.morphy-card.bg-\\[\\#041B21\\]\\/95, #activeScreenImg, .morphy-card.p-2\\.5, .aspect-\\[16\\/10\\]');
      if (heroMockup) {
        heroTimeline.fromTo(heroMockup,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', clearProps: 'all' },
          0.45
        );
      }
    }

    // --- 2. SCROLLTRIGGER SECTION HEADER REVEALS ---
    if (typeof ScrollTrigger !== 'undefined') {
      const nonHeroSections = document.querySelectorAll('section:not(#hero)');
      nonHeroSections.forEach(section => {
        const sectionHeader = section.querySelector('.morphy-tag-primary, h2');
        if (sectionHeader && !sectionHeader.closest('#hero')) {
          gsap.fromTo(sectionHeader,
            { y: 25, opacity: 0 },
            {
              scrollTrigger: {
                trigger: section,
                start: 'top 90%',
                toggleActions: 'play none none none'
              },
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'power3.out',
              clearProps: 'all'
            }
          );
        }
      });

      // --- 3. AMBIENT BACKGROUND PARALLAX ---
      const ambientGlow = document.querySelector('.ambient-mesh-glow');
      if (ambientGlow) {
        gsap.to(ambientGlow, {
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5
          },
          y: 60,
          opacity: 0.85,
          ease: 'none'
        });
      }
    }

    // --- 4. INTERACTIVE 3D TILT ON CARDS (Mouse Move) ---
    const tiltCards = document.querySelectorAll('.morphy-card, .glass-card, .glass-dark-card');
    tiltCards.forEach(card => {
      // Ensure card is always fully visible
      card.style.opacity = '1';
      card.style.visibility = 'visible';

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -3;
        const rotateY = ((x - centerX) / centerX) * 3;

        gsap.to(card, {
          rotationX: rotateX,
          rotationY: rotateY,
          transformPerspective: 1000,
          duration: 0.3,
          ease: 'power1.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
          ease: 'power2.out',
          clearProps: 'transformPerspective'
        });
      });
    });

    // --- 5. SMOOTH ANCHOR LINK SCROLLING ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#!') return;
        const targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          if (typeof gsap.plugins?.scrollTo !== 'undefined' || typeof ScrollToPlugin !== 'undefined') {
            gsap.to(window, {
              duration: 0.8,
              scrollTo: { y: targetEl, offsetY: 80 },
              ease: 'power3.inOut'
            });
          } else {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    // --- 6. BUTTON HOVER MAGNETIC EFFECT ---
    const magneticBtns = document.querySelectorAll('.btn-morphy-primary, .animated-lighting-btn');
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.12,
          y: y * 0.12,
          duration: 0.2,
          ease: 'power2.out'
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: 'elastic.out(1.2, 0.4)'
        });
      });
    });

    // --- 7. ABSOLUTE VISIBILITY GUARANTEE ---
    // Ensure all pricing cards, services, and sections have 100% opacity
    function ensureAllCardsVisible() {
      document.querySelectorAll('#pricingCardsView > *, #pricingTableView, #pricingTableView tr, #servicesGrid > *, #projectsGrid > *, #testimonialsGrid > *, .morphy-card').forEach(el => {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
      });
    }

    ensureAllCardsVisible();
    setTimeout(ensureAllCardsVisible, 500);
    setTimeout(ensureAllCardsVisible, 1500);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGSAP);
  } else {
    initGSAP();
  }

  window.addEventListener('load', () => {
    document.querySelectorAll('#pricingCardsView > *, #pricingTableView tr, .morphy-card').forEach(el => {
      el.style.opacity = '1';
      el.style.visibility = 'visible';
    });
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
  });

  // Export to window
  window.ShakibGSAP = {
    refresh: () => {
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    }
  };

})();
