/**
 * GSAP High-Performance Animation Engine for Md. Shakibur Rahaman Portfolio & Offers
 * 
 * Powered by GreenSock Animation Platform (GSAP 3.12+ & ScrollTrigger)
 * 
 * 1. Cinematic Hero Entrance Timeline
 * 2. Staggered Scroll-Triggered Card Reveals (Services, Projects, Reviews, Packages)
 * 3. Interactive 3D Card Hover & Magnetic Tilt Effects
 * 4. Smooth Anchor Scrolling via ScrollToPlugin
 * 5. Ambient Mesh & Glow Motion Parallax
 * 6. Guaranteed 100% Content Visibility with clearProps
 */

(function () {
  'use strict';

  // Respect user preference for reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  function initGSAP() {
    if (typeof gsap === 'undefined') {
      setTimeout(initGSAP, 80);
      return;
    }

    // Register Plugins
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    if (typeof ScrollToPlugin !== 'undefined') {
      gsap.registerPlugin(ScrollToPlugin);
    }

    // =========================================================================
    // 1. HERO SECTION CINEMATIC TIMELINE
    // =========================================================================
    const heroSection = document.querySelector('#hero, section.hero-section');
    if (heroSection) {
      const heroTl = gsap.timeline({
        defaults: { ease: 'power4.out', duration: 0.9 },
        onComplete: () => {
          gsap.set(heroSection.querySelectorAll('*'), { clearProps: 'opacity,transform,visibility' });
        }
      });

      // Tags & Live Badges
      const heroBadges = heroSection.querySelectorAll('.inline-flex.items-center, .morphy-tag-primary, #heroLiveViewersCount, .live-beacon');
      if (heroBadges.length > 0) {
        heroTl.fromTo(heroBadges,
          { y: -25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out', clearProps: 'all' },
          0.1
        );
      }

      // H1 Headline
      const heroH1 = heroSection.querySelector('h1');
      if (heroH1) {
        heroTl.fromTo(heroH1,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, ease: 'power4.out', clearProps: 'all' },
          0.25
        );
      }

      // Subtitles & Bio
      const heroPs = heroSection.querySelectorAll('p');
      if (heroPs.length > 0) {
        heroTl.fromTo(heroPs,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, stagger: 0.08, ease: 'power3.out', clearProps: 'all' },
          0.45
        );
      }

      // Action CTA Buttons
      const heroBtns = heroSection.querySelectorAll('.btn-morphy-primary, .btn-morphy-outline, .btn-morphy-ghost, a[href*="contact"], a[href*="consultation"]');
      if (heroBtns.length > 0) {
        heroTl.fromTo(heroBtns,
          { y: 20, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.5)', clearProps: 'all' },
          0.6
        );
      }

      // Hero Command Center / Mockup
      const heroMockup = heroSection.querySelector('.morphy-card.bg-\\[\\#041B21\\]\\/95, #activeScreenImg, .morphy-card.p-2\\.5, .aspect-\\[16\\/10\\]');
      if (heroMockup) {
        heroTl.fromTo(heroMockup,
          { y: 45, opacity: 0, rotationX: 4, transformPerspective: 1000 },
          { y: 0, opacity: 1, rotationX: 0, duration: 1.2, ease: 'power3.out', clearProps: 'all' },
          0.7
        );
      }
    }

    // =========================================================================
    // 2. SCROLLTRIGGER SECTION & CARD REVEALS
    // =========================================================================
    if (typeof ScrollTrigger !== 'undefined') {
      
      // Section Headers
      document.querySelectorAll('section:not(#hero)').forEach(sec => {
        const header = sec.querySelector('.morphy-tag-primary, h2');
        if (header) {
          gsap.fromTo(header,
            { y: 30, opacity: 0 },
            {
              scrollTrigger: {
                trigger: sec,
                start: 'top 88%',
                toggleActions: 'play none none none'
              },
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              clearProps: 'all'
            }
          );
        }
      });

      // Card Grids Reveal Helper
      function setupGridScrollReveal(selector) {
        document.querySelectorAll(selector).forEach(grid => {
          if (grid.closest('#hero') || grid.classList.contains('hidden')) return;
          const items = Array.from(grid.children).filter(c => !c.classList.contains('hidden'));
          if (items.length > 0) {
            gsap.fromTo(items,
              { y: 40, opacity: 0 },
              {
                scrollTrigger: {
                  trigger: grid,
                  start: 'top 85%',
                  toggleActions: 'play none none none'
                },
                y: 0,
                opacity: 1,
                duration: 0.85,
                stagger: 0.1,
                ease: 'power3.out',
                clearProps: 'all'
              }
            );
          }
        });
      }

      setupGridScrollReveal('#servicesContainer');
      setupGridScrollReveal('#servicesGrid');
      setupGridScrollReveal('#projectsGrid');
      setupGridScrollReveal('#testimonialsContainer');
      setupGridScrollReveal('#offersGrid');

      // Ambient Glow Parallax
      const ambientGlow = document.querySelector('.ambient-mesh-glow');
      if (ambientGlow) {
        gsap.to(ambientGlow, {
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5
          },
          y: 80,
          opacity: 0.85,
          ease: 'none'
        });
      }
    }

    // =========================================================================
    // 3. INTERACTIVE 3D TILT ON HOVER (Mouse Move)
    // =========================================================================
    const tiltCards = document.querySelectorAll('.morphy-card, .glass-card, .glass-dark-card');
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        gsap.to(card, {
          rotationX: rotateX,
          rotationY: rotateY,
          transformPerspective: 1000,
          duration: 0.35,
          ease: 'power1.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.55,
          ease: 'power2.out',
          clearProps: 'transformPerspective'
        });
      });
    });

    // =========================================================================
    // 4. SMOOTH ANCHOR SCROLLING
    // =========================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#!') return;
        const targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          if (typeof ScrollToPlugin !== 'undefined' || typeof gsap.plugins?.scrollTo !== 'undefined') {
            gsap.to(window, {
              duration: 0.85,
              scrollTo: { y: targetEl, offsetY: 80 },
              ease: 'power3.inOut'
            });
          } else {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    // =========================================================================
    // 5. MAGNETIC BUTTON SNAPS
    // =========================================================================
    const magneticBtns = document.querySelectorAll('.btn-morphy-primary, .animated-lighting-btn');
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.16,
          y: y * 0.16,
          duration: 0.25,
          ease: 'power2.out'
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1.2, 0.4)'
        });
      });
    });

  }

  // Initialize on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGSAP);
  } else {
    initGSAP();
  }

  // Refresh triggers on full load
  window.addEventListener('load', () => {
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  });

  // Export to window
  window.ShakibGSAP = {
    refresh: () => {
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    }
  };

})();
