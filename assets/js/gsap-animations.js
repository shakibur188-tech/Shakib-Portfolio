/**
 * GSAP High-Performance Animation Engine for Md. Shakibur Rahaman Portfolio & Offers
 * 
 * Powered by GreenSock Animation Platform (GSAP 3.12+ & ScrollTrigger)
 * 
 * Features:
 * 1. Cinematic Hero Entrance Timeline (Headlines, Badges, CTAs, Hero Mockups)
 * 2. ScrollTrigger Section & Card Stagger Reveals (Services, Projects, Pricing, Testimonials)
 * 3. Interactive 3D Card Hover & Magnetic Tilt Effects
 * 4. Scroll-Triggered Animated Number Counters (Stats, KPIs, Percentages)
 * 5. Smooth Anchor Scrolling via GSAP ScrollToPlugin
 * 6. Ambient Mesh & Glow Parallax Motion
 * 7. Guaranteed Content Visibility & Accessibility (clearProps, prefers-reduced-motion)
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
    const heroSection = document.querySelector('#hero, section.hero-section, section:first-of-type');
    if (heroSection) {
      const heroTimeline = gsap.timeline({
        defaults: { ease: 'power4.out', duration: 0.9 },
        onComplete: () => {
          gsap.set(heroSection.querySelectorAll('*'), { clearProps: 'opacity,transform' });
        }
      });

      // Eyebrow / Tag Badge
      const heroTags = heroSection.querySelectorAll('.inline-flex.items-center, .morphy-tag-primary, #heroLiveViewersCount, .live-beacon');
      if (heroTags.length > 0) {
        heroTimeline.fromTo(heroTags, 
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out', clearProps: 'opacity,transform' },
          0.05
        );
      }

      // Main Headline (H1)
      const heroHeading = heroSection.querySelector('h1');
      if (heroHeading) {
        heroTimeline.fromTo(heroHeading,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, ease: 'power4.out', clearProps: 'opacity,transform' },
          0.2
        );
      }

      // Hero Subtitles & Paragraphs
      const heroParagraphs = heroSection.querySelectorAll('p');
      if (heroParagraphs.length > 0) {
        heroTimeline.fromTo(heroParagraphs,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out', clearProps: 'opacity,transform' },
          0.35
        );
      }

      // Hero CTA Buttons
      const heroButtons = heroSection.querySelectorAll('.btn-morphy-primary, .btn-morphy-outline, .btn-morphy-ghost, a[href*="contact"], a[href*="consultation"]');
      if (heroButtons.length > 0) {
        heroTimeline.fromTo(heroButtons,
          { y: 15, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: 'back.out(1.4)', clearProps: 'opacity,transform' },
          0.5
        );
      }

      // Hero Command Center / Live Preview Window / Image Mockup
      const heroMockup = heroSection.querySelector('.morphy-card.bg-\\[\\#041B21\\]\\/95, #activeScreenImg, .morphy-card.p-2\\.5, .aspect-\\[16\\/10\\]');
      if (heroMockup) {
        heroTimeline.fromTo(heroMockup,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', clearProps: 'opacity,transform' },
          0.6
        );
      }
    }

    // --- 2. SCROLLTRIGGER SECTION HEADER REVEALS (Excluding Hero) ---
    if (typeof ScrollTrigger !== 'undefined') {
      const nonHeroSections = document.querySelectorAll('section:not(#hero):not(:first-of-type), main > div:not(:first-child)');
      nonHeroSections.forEach(section => {
        const sectionHeader = section.querySelector('.morphy-tag-primary, h2, h3.text-2xl, h3.text-3xl, .text-center.max-w-3xl');
        if (sectionHeader) {
          gsap.fromTo(sectionHeader,
            { y: 30, opacity: 0 },
            {
              scrollTrigger: {
                trigger: section,
                start: 'top 88%',
                toggleActions: 'play none none none'
              },
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              clearProps: 'opacity,transform'
            }
          );
        }

        const sectionDesc = section.querySelector('p.text-sm, p.text-base, p.text-xs');
        if (sectionDesc && sectionHeader) {
          gsap.fromTo(sectionDesc,
            { y: 20, opacity: 0 },
            {
              scrollTrigger: {
                trigger: section,
                start: 'top 86%',
                toggleActions: 'play none none none'
              },
              y: 0,
              opacity: 1,
              duration: 0.7,
              delay: 0.1,
              ease: 'power3.out',
              clearProps: 'opacity,transform'
            }
          );
        }
      });

      // --- 3. CARD GRIDS STAGGERED REVEAL (Safe & Resilient) ---
      function animateGridCards(containerSelector) {
        document.querySelectorAll(containerSelector).forEach(container => {
          if (container.closest('#hero')) return; // do not double animate hero
          const cards = Array.from(container.children).filter(c => !c.classList.contains('hidden'));
          if (cards.length > 0) {
            gsap.fromTo(cards,
              { y: 35, opacity: 0 },
              {
                scrollTrigger: {
                  trigger: container,
                  start: 'top 88%',
                  toggleActions: 'play none none none'
                },
                y: 0,
                opacity: 1,
                duration: 0.75,
                stagger: 0.08,
                ease: 'power3.out',
                clearProps: 'opacity,transform'
              }
            );
          }
        });
      }

      const gridContainers = [
        '#pricingCardsView',
        '#offersGrid',
        '#servicesGrid',
        '#projectsGrid',
        '#testimonialsGrid',
        '.grid.grid-cols-1.md\\:grid-cols-2',
        '.grid.grid-cols-1.md\\:grid-cols-3',
        '.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3'
      ];

      gridContainers.forEach(sel => animateGridCards(sel));

      // Re-run for dynamic grids after content loads
      window.addEventListener('load', () => {
        gridContainers.forEach(sel => animateGridCards(sel));
        ScrollTrigger.refresh();
      });

      // --- 4. COMPARISON TABLE & HEATMAP ROW REVEALS ---
      const tableRows = document.querySelectorAll('tbody tr, .heatmap-zone');
      if (tableRows.length > 0) {
        const tableContainer = document.querySelector('tbody, .heatmap-zone')?.parentElement;
        if (tableContainer) {
          gsap.fromTo(tableRows,
            { y: 15, opacity: 0 },
            {
              scrollTrigger: {
                trigger: tableContainer,
                start: 'top 88%',
                toggleActions: 'play none none none'
              },
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.03,
              ease: 'power2.out',
              clearProps: 'opacity,transform'
            }
          );
        }
      }

      // --- 5. AMBIENT BACKGROUND & MESH PARALLAX ---
      const ambientGlow = document.querySelector('.ambient-mesh-glow, .ambient-vignette');
      if (ambientGlow) {
        gsap.to(ambientGlow, {
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5
          },
          y: 80,
          opacity: 0.8,
          ease: 'none'
        });
      }
    }

    // --- 6. INTERACTIVE 3D TILT EFFECT ON CARDS (Mouse Move) ---
    const tiltCards = document.querySelectorAll('.morphy-card, .glass-card, .glass-dark-card');
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -3.5;
        const rotateY = ((x - centerX) / centerX) * 3.5;

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
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'transformPerspective'
        });
      });
    });

    // --- 7. SMOOTH ANCHOR LINK SCROLLING ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#!') return;
        const targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          if (typeof gsap.plugins?.scrollTo !== 'undefined' || typeof ScrollToPlugin !== 'undefined') {
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

    // --- 8. BUTTON HOVER MAGNETIC EFFECT ---
    const magneticBtns = document.querySelectorAll('.btn-morphy-primary, .animated-lighting-btn');
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.15,
          y: y * 0.15,
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

    // --- 9. GLOBAL FAILSAFE (Ensures all elements remain 100% visible) ---
    setTimeout(() => {
      document.querySelectorAll('section, h1, h2, h3, p, .morphy-card, .grid > *').forEach(el => {
        if (window.getComputedStyle(el).opacity === '0') {
          el.style.opacity = '1';
        }
      });
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    }, 1200);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGSAP);
  } else {
    initGSAP();
  }

  // Export to window
  window.ShakibGSAP = {
    refresh: () => {
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    }
  };

})();
