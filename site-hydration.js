/**
 * Md. Shakibur Rahaman - Unified Client-Side Dynamic Hydration Engine
 * Automatically hydrates Header Navigation, CTA Buttons, Page Figures, Counters, and Hero Elements from /api/content (or data/content.json)
 */

(function() {
  'use strict';

  async function fetchSiteContent() {
    try {
      const res = await fetch('/api/content?t=' + Date.now(), { cache: 'no-store' });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API fetch error, falling back to data/content.json', e);
    }
    try {
      const res = await fetch('/data/content.json?t=' + Date.now(), { cache: 'no-store' });
      if (res.ok) return await res.json();
    } catch (e) {
      console.error('Failed to load content.json', e);
    }
    return null;
  }

  function detectCurrentPageKey() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('about.html')) return 'about';
    if (path.includes('services.html') || path.includes('/services/index.html')) return 'services';
    if (path.includes('projects.html')) return 'projects';
    if (path.includes('case-studies.html') || path.includes('case-study.html')) return 'caseStudies';
    if (path.includes('testimonials.html')) return 'testimonials';
    if (path.includes('contact.html')) return 'contact';
    return 'home';
  }

  function hydrateHeaderMenu(menu) {
    if (!menu) return;

    // 1. Header CTA Button
    if (menu.ctaButton) {
      const ctaBtns = document.querySelectorAll('.nav-cta-btn, [data-nav-cta]');
      ctaBtns.forEach(btn => {
        if (menu.ctaButton.url) btn.setAttribute('href', menu.ctaButton.url);
        if (menu.ctaButton.isExternal) btn.setAttribute('target', '_blank');
        const span = btn.querySelector('span');
        if (span && menu.ctaButton.label) {
          span.textContent = menu.ctaButton.label;
        } else if (menu.ctaButton.label) {
          btn.textContent = menu.ctaButton.label;
        }
        const icon = btn.querySelector('i');
        if (icon && menu.ctaButton.icon) {
          icon.className = `fa-solid ${menu.ctaButton.icon} text-[10px]`;
        }
      });
    }

    // 2. Brand Name & Status
    if (menu.brand) {
      const brandName = document.getElementById('navBrandName');
      if (brandName && menu.brand.name) brandName.textContent = menu.brand.name;

      const brandStatus = document.getElementById('navBrandStatus');
      if (brandStatus && menu.brand.status) brandStatus.textContent = menu.brand.status;
    }

    // 3. Desktop Navigation Bar (In-Place Safe Hydration)
    if (menu.items && menu.items.length) {
      const desktopNav = document.querySelector('header nav.hidden.lg\\:flex, header nav');
      if (desktopNav) {
        const currentPath = window.location.pathname;
        const navLinks = desktopNav.querySelectorAll('.desktop-nav-link');

        if (navLinks && navLinks.length >= menu.items.length) {
          // Update in-place to NEVER disturb .services-dropdown layout
          menu.items.forEach((item, idx) => {
            const link = navLinks[idx];
            if (!link) return;

            if (item.url) link.setAttribute('href', item.url);
            if (item.isExternal) link.setAttribute('target', '_blank');

            const span = link.querySelector('span');
            if (span && item.label) {
              span.textContent = item.label;
            } else if (item.label && !link.querySelector('i')) {
              link.textContent = item.label;
            }

            const isCurrent = currentPath === item.url || 
              (item.url !== '/' && currentPath.endsWith(item.url)) ||
              (item.url === '/' && (currentPath === '/' || currentPath === '/index.html'));

            if (isCurrent) {
              link.classList.add('text-[#70805D]', 'font-bold');
              link.classList.remove('hover:text-[#70805D]');
            } else {
              link.classList.remove('text-[#70805D]');
              link.classList.add('hover:text-[#70805D]');
            }
          });
        }
      }

      // 4. Mobile Menu Links (In-Place Safe Hydration)
      const mobileNavGrid = document.querySelector('#mobileMenu .grid');
      if (mobileNavGrid) {
        const mobileLinks = mobileNavGrid.querySelectorAll('.mobile-link');
        if (mobileLinks && mobileLinks.length >= menu.items.length) {
          menu.items.forEach((item, idx) => {
            const link = mobileLinks[idx];
            if (!link) return;
            if (item.url) link.setAttribute('href', item.url);
            const span = link.querySelector('span');
            if (span && item.label) span.textContent = item.label;
          });
        }
      }
    }
  }

  function hydratePageContent(pageKey, pagesData) {
    if (!pagesData || !pagesData[pageKey]) return;
    const page = pagesData[pageKey];

    // 1. Hero Badge
    const badgeEl = document.getElementById('pageHeroBadge') || 
                    document.getElementById('csHeroBadge') || 
                    document.getElementById('heroBadge') || 
                    document.querySelector('section:first-of-type .section-tag span:last-child');
    if (badgeEl && page.heroBadge) badgeEl.textContent = page.heroBadge;

    // 2. Hero Title
    const titleEl = document.getElementById('pageHeroTitle') || 
                    document.getElementById('csHeroTitle') || 
                    document.getElementById('heroTitle') || 
                    document.querySelector('section:first-of-type h1');
    if (titleEl && page.heroTitle) {
      if (page.heroTitle.includes(' <br>')) {
        titleEl.innerHTML = page.heroTitle;
      } else {
        titleEl.textContent = page.heroTitle;
      }
    }

    // 3. Hero Subtitle / Tagline
    const subEl = document.getElementById('pageHeroSubtitle') || 
                  document.getElementById('csHeroSubtitle') || 
                  document.getElementById('heroTagline');
    if (subEl && (page.heroSubtitle || page.heroTagline)) {
      subEl.textContent = page.heroSubtitle || page.heroTagline;
    }

    // 4. Hero Bio
    const bioEl = document.getElementById('pageHeroBio') || document.getElementById('heroBio');
    if (bioEl && page.heroBio) {
      bioEl.textContent = page.heroBio;
    }

    // 5. Primary Action Button
    if (page.primaryBtn) {
      const priBtn = document.getElementById('pagePrimaryBtn') || 
                     document.getElementById('heroPrimaryBtn') || 
                     document.querySelector('#hero .btn-aesthetic-primary');
      if (priBtn) {
        if (page.primaryBtn.url) priBtn.setAttribute('href', page.primaryBtn.url);
        const span = priBtn.querySelector('span');
        if (span && page.primaryBtn.label) span.textContent = page.primaryBtn.label;
        else if (page.primaryBtn.label) priBtn.textContent = page.primaryBtn.label;
      }
    }

    // 6. Secondary Action Button
    if (page.secondaryBtn) {
      const secBtn = document.getElementById('pageSecondaryBtn') || 
                     document.getElementById('heroSecondaryBtn') || 
                     document.querySelector('#hero .btn-pill-glass');
      if (secBtn) {
        if (page.secondaryBtn.url) secBtn.setAttribute('href', page.secondaryBtn.url);
        const span = secBtn.querySelector('span');
        if (span && page.secondaryBtn.label) span.textContent = page.secondaryBtn.label;
        else if (page.secondaryBtn.label) secBtn.textContent = page.secondaryBtn.label;
      }
    }

    // 7. Page Figures / Stats Strip
    if (page.figures && page.figures.length) {
      hydrateFiguresStrip(pageKey, page.figures);
    }

    // 8. Bottom CTA Banner
    if (page.bottomCta) {
      const ctaHeading = document.getElementById('pageCtaHeading');
      if (ctaHeading && page.bottomCta.heading) ctaHeading.textContent = page.bottomCta.heading;

      const ctaSub = document.getElementById('pageCtaSubheading');
      if (ctaSub && page.bottomCta.subheading) ctaSub.textContent = page.bottomCta.subheading;

      const ctaBtn = document.getElementById('pageCtaBtn');
      if (ctaBtn) {
        if (page.bottomCta.btnUrl) ctaBtn.setAttribute('href', page.bottomCta.btnUrl);
        const span = ctaBtn.querySelector('span');
        if (span && page.bottomCta.btnLabel) span.textContent = page.bottomCta.btnLabel;
        else if (page.bottomCta.btnLabel) ctaBtn.textContent = page.bottomCta.btnLabel;
      }
    }
  }

  function hydrateFiguresStrip(pageKey, figures) {
    // 1. If explicit container exists:
    const strip = document.getElementById('pageFiguresStrip') || 
                  document.getElementById('csStatsStrip') || 
                  document.getElementById(pageKey + 'FiguresStrip');

    if (strip) {
      strip.innerHTML = figures.map(fig => {
        const numVal = parseInt(fig.value, 10);
        const hasNum = !isNaN(numVal);
        const dataTarget = hasNum ? `data-counter-target="${numVal}"` : '';
        const dataSuffix = fig.suffix ? `data-counter-suffix="${fig.suffix}"` : '';

        return `
          <div class="spotlight-card p-4 bg-white border border-[#70805D]/20 rounded-2xl shadow-xs text-center">
            <div class="text-2xl sm:text-3xl font-black text-[#2A3B27]" ${dataTarget} ${dataSuffix}>
              ${fig.prefix || ''}${fig.value}
            </div>
            <div class="text-[11px] text-[#55738D] uppercase font-extrabold mt-1">
              ${fig.label}
            </div>
            ${fig.sublabel ? `<div class="text-[10px] text-[#4D614A] font-medium mt-0.5">${fig.sublabel}</div>` : ''}
          </div>
        `;
      }).join('\n');
    }

    // 2. Hydrate floating badges on Home or About (years of experience & portals)
    if (pageKey === 'home' || pageKey === 'about') {
      const expFig = figures.find(f => f.label.toLowerCase().includes('experience') || f.id.includes('exp'));
      if (expFig) {
        const expValEl = document.getElementById('badgeExpValue') || document.querySelector('[data-counter-suffix*="Years"]');
        if (expValEl) {
          const num = parseInt(expFig.value, 10);
          if (!isNaN(num)) expValEl.setAttribute('data-counter-target', num);
          expValEl.setAttribute('data-counter-suffix', expFig.suffix || '+ Years');
          expValEl.textContent = `${expFig.prefix || ''}${expFig.value} ${expFig.suffix || ''}`.trim();
        }
        const expLblEl = document.getElementById('badgeExpLabel') || document.querySelector('[data-counter-suffix*="Years"] ~ div');
        if (expLblEl && expFig.sublabel) {
          expLblEl.textContent = expFig.sublabel;
        }
      }

      const portalsFig = figures.find(f => f.label.toLowerCase().includes('portal') || f.id.includes('portal'));
      if (portalsFig) {
        const portValEl = document.getElementById('badgePortalsValue') || document.querySelector('[data-counter-suffix*="Portals"]');
        if (portValEl) {
          const num = parseInt(portalsFig.value, 10);
          if (!isNaN(num)) portValEl.setAttribute('data-counter-target', num);
          portValEl.setAttribute('data-counter-suffix', portalsFig.suffix || '+ Portals');
          portValEl.textContent = `${portalsFig.prefix || ''}${portalsFig.value} ${portalsFig.suffix || ''}`.trim();
        }
        const portLblEl = document.getElementById('badgePortalsLabel') || document.querySelector('[data-counter-suffix*="Portals"] ~ div');
        if (portLblEl && portalsFig.sublabel) {
          portLblEl.textContent = portalsFig.sublabel;
        }
      }
    }

    // Trigger animated counters
    initAnimatedCounters();
  }

  function initAnimatedCounters() {
    const counterElements = document.querySelectorAll('[data-counter-target]');
    if (!counterElements.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      counterElements.forEach(el => observer.observe(el));
    } else {
      counterElements.forEach(animateCounter);
    }
  }

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-counter-target'));
    if (isNaN(target)) return;

    const suffix = el.getAttribute('data-counter-suffix') || '';
    const prefix = el.getAttribute('data-counter-prefix') || '';
    const duration = 1200;
    const start = 0;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * easeProgress);

      el.textContent = `${prefix}${current}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = `${prefix}${target}${suffix}`;
      }
    }

    requestAnimationFrame(update);
  }

  window.applySiteHydration = function(content) {
    if (!content) return;
    if (content.menu) hydrateHeaderMenu(content.menu);
    const pageKey = detectCurrentPageKey();
    if (content.pages) hydratePageContent(pageKey, content.pages);
  };

  async function initHydration() {
    const content = await fetchSiteContent();
    if (content) {
      window.applySiteHydration(content);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHydration);
  } else {
    initHydration();
  }

})();
