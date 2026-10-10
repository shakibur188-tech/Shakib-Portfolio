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
 * 7. Accessibility check for prefers-reduced-motion
 */

(function () {
  'use strict';

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  function initGSAP() {
    if (typeof gsap === 'undefined') {
      console.warn('GSAP library not loaded yet, retrying...');
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
    const heroSection = document.querySelector('#hero, section.relative.overflow-hidden, section:first-of-type');
    if (heroSection) {
      const heroTimeline = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1 } });

      // Eyebrow / Tag Badge
      const heroTags = heroSection.querySelectorAll('.morphy-tag-primary, .inline-flex.items-center, #heroLiveViewersCount, .live-beacon');
      if (heroTags.length > 0) {
        heroTimeline.from(heroTags, {
          y: -25,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out'
        }, 0.1);
      }

      // Main Headline (H1)
      const heroHeading = heroSection.querySelector('h1');
      if (heroHeading) {
        heroTimeline.from(heroHeading, {
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: 'power4.out'
        }, 0.25);
      }

      // Hero Subtitles & Paragraphs
      const heroParagraphs = heroSection.querySelectorAll('p');
      if (heroParagraphs.length > 0) {
        heroTimeline.from(heroParagraphs, {
          y: 25,
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out'
        }, 0.45);
      }

      // Hero CTA Buttons & Benefit Badges
      const heroButtons = heroSection.querySelectorAll('.btn-morphy-primary, .btn-morphy-outline, .btn-morphy-ghost, a[href*="contact"], a[href*="consultation"], a[href*="#packages"], .pt-1.flex.flex-wrap');
      if (heroButtons.length > 0) {
        heroTimeline.from(heroButtons, {
          y: 20,
          opacity: 0,
          scale: 0.96,
          duration: 0.8,
          stagger: 0.12,
          ease: 'back.out(1.5)'
        }, 0.6);
      }

      // Hero Command Center / Live Preview Window / Image Mockup
      const heroMockup = heroSection.querySelector('.morphy-card.bg-\\[\\#041B21\\]\\/95, #activeScreenImg, .morphy-card.p-2\\.5, .aspect-\\[16\\/10\\]');
      if (heroMockup) {
        heroTimeline.from(heroMockup, {
          y: 50,
          opacity: 0,
          rotationX: 6,
          transformPerspective: 1000,
          duration: 1.2,
          ease: 'power3.out'
        }, 0.75);
      }
    }

    // --- 2. SCROLLTRIGGER SECTION HEADER REVEALS ---
    if (typeof ScrollTrigger !== 'undefined') {
      const allSections = document.querySelectorAll('section, main > div, footer');
      allSections.forEach(section => {
        const sectionHeader = section.querySelector('.morphy-tag-primary, h2, h3.text-2xl, h3.text-3xl, h3.text-xl, .text-center.max-w-3xl');
        if (sectionHeader) {
          gsap.from(sectionHeader, {
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none none'
            },
            y: 35,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out'
          });
        }

        // Section Subtitles
        const sectionDesc = section.querySelector('p.text-sm, p.text-base, p.text-xs');
        if (sectionDesc && sectionHeader) {
          gsap.from(sectionDesc, {
            scrollTrigger: {
              trigger: section,
              start: 'top 83%',
              toggleActions: 'play none none none'
            },
            y: 20,
            opacity: 0,
            duration: 0.8,
            delay: 0.15,
            ease: 'power3.out'
          });
        }
      });

      // --- 3. CARD GRIDS STAGGERED REVEAL ---
      const gridContainers = [
        '#pricingCardsView',
        '#offersGrid',
        '.grid.grid-cols-1.md\\:grid-cols-2',
        '.grid.grid-cols-1.md\\:grid-cols-3',
        '.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3',
        '.grid.grid-cols-2.md\\:grid-cols-3',
        '.grid.grid-cols-1.md\\:grid-cols-4',
        '#servicesGrid',
        '#projectsGrid',
        '#testimonialsGrid'
      ];

      gridContainers.forEach(gridSelector => {
        document.querySelectorAll(gridSelector).forEach(container => {
          const cards = container.children;
          if (cards && cards.length > 0) {
            gsap.from(cards, {
              scrollTrigger: {
                trigger: container,
                start: 'top 85%',
                toggleActions: 'play none none none'
              },
              y: 45,
              opacity: 0,
              duration: 0.85,
              stagger: 0.1,
              ease: 'power3.out'
            });
          }
        });
      });

      // --- 4. COMPARISON TABLE & HEATMAP ROW REVEALS ---
      const tableRows = document.querySelectorAll('tbody tr, .heatmap-zone');
      if (tableRows.length > 0) {
        const tableContainer = document.querySelector('tbody, .heatmap-zone')?.parentElement;
        if (tableContainer) {
          gsap.from(tableRows, {
            scrollTrigger: {
              trigger: tableContainer,
              start: 'top 85%',
              toggleActions: 'play none none none'
            },
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.04,
            ease: 'power2.out'
          });
        }
      }

      // --- 5. ANIMATED NUMBER COUNTERS SCRUB ---
      const statElements = document.querySelectorAll('.font-eng.text-3xl, .font-eng.text-4xl, .font-eng.text-2xl, .text-3xl.font-black, [data-counter-target]');
      statElements.forEach(el => {
        const text = el.textContent.trim();
        const numMatch = text.replace(/,/g, '').match(/\d+(\.\d+)?/);
        if (numMatch && !el.hasAttribute('data-no-counter') && !el.id.includes('heroLiveViewersCount')) {
          const targetNum = parseFloat(numMatch[0]);
          const prefix = text.split(numMatch[0])[0] || '';
          const suffix = text.split(numMatch[0])[1] || '';
          const isCurrency = prefix.includes('৳') || prefix.includes('$');

          const counterObj = { val: 0 };
          gsap.to(counterObj, {
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none'
            },
            val: targetNum,
            duration: 1.6,
            ease: 'power2.out',
            onUpdate: function () {
              const currentVal = targetNum % 1 === 0 ? Math.round(counterObj.val) : counterObj.val.toFixed(1);
              const formattedVal = targetNum > 999 ? currentVal.toLocaleString() : currentVal;
              el.textContent = `${prefix}${formattedVal}${suffix}`;
            }
          });
        }
      });

      // --- 6. AMBIENT BACKGROUND & MESH PARALLAX ---
      const ambientGlow = document.querySelector('.ambient-mesh-glow, .ambient-vignette');
      if (ambientGlow) {
        gsap.to(ambientGlow, {
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5
          },
          y: 120,
          opacity: 0.75,
          ease: 'none'
        });
      }
    }

    // --- 7. INTERACTIVE 3D TILT EFFECT ON CARDS (Mouse Move) ---
    const tiltCards = document.querySelectorAll('.morphy-card, .glass-card, .glass-dark-card');
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        gsap.to(card, {
          rotationX: rotateX,
          rotationY: rotateY,
          transformPerspective: 800,
          duration: 0.4,
          ease: 'power1.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.6,
          ease: 'power2.out'
        });
      });
    });

    // --- 8. SMOOTH ANCHOR LINK SCROLLING VIA GSAP ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#' && targetId.length > 1) {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            if (typeof gsap !== 'undefined' && typeof ScrollToPlugin !== 'undefined') {
              gsap.to(window, {
                duration: 1.1,
                scrollTo: { y: targetEl, offsetY: 70 },
                ease: 'power3.inOut'
              });
            } else {
              targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        }
      });
    });

    // --- 9. BUTTON HOVER MAGNETIC RIPPLE EFFECT ---
    const magneticBtns = document.querySelectorAll('.btn-morphy-primary, .animated-lighting-btn, #viewCardsBtn, #viewTableBtn');
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.18,
          y: y * 0.18,
          duration: 0.3,
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
