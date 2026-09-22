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
    if (path.includes('about.html') || path.endsWith('/about')) return 'about';
    if (path.includes('services.html') || path.includes('/services/') || path.endsWith('/services')) return 'services';
    if (path.includes('projects.html') || path.endsWith('/projects')) return 'projects';
    if (path.includes('case-studies.html') || path.includes('case-study.html') || path.endsWith('/case-studies')) return 'caseStudies';
    if (path.includes('offers.html') || path.endsWith('/offers')) return 'offers';
    if (path.includes('testimonials.html') || path.endsWith('/testimonials')) return 'testimonials';
    if (path.includes('contact.html') || path.endsWith('/contact')) return 'contact';
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
        const allNavLinks = Array.from(desktopNav.querySelectorAll('.desktop-nav-link'));

        // Ensure testimonials is removed/hidden from header navigation
        allNavLinks.forEach(link => {
          if (link.getAttribute('href') === '/testimonials.html') {
            link.style.display = 'none';
          }
        });

        const navLinks = allNavLinks.filter(link => link.style.display !== 'none');

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
        const allMobileLinks = Array.from(mobileNavGrid.querySelectorAll('.mobile-link'));
        allMobileLinks.forEach(link => {
          if (link.getAttribute('href') === '/testimonials.html') {
            link.style.display = 'none';
          }
        });

        const mobileLinks = allMobileLinks.filter(link => link.style.display !== 'none');
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

  // -------------------------------------------------------------
  // Floating WhatsApp Interactive Widget & Inquiry Modal
  // -------------------------------------------------------------
  function initWhatsAppFloatingWidget() {
    if (document.getElementById('floatingWhatsAppWidget')) return;

    // Create Widget Container
    const widget = document.createElement('div');
    widget.id = 'floatingWhatsAppWidget';
    widget.className = 'fixed bottom-6 right-6 z-[9999] font-sans antialiased';

    widget.innerHTML = `
      <!-- WhatsApp Popup Chat Card -->
      <div id="waPopupCard" class="hidden absolute bottom-16 right-0 w-[340px] max-w-[calc(100vw-32px)] bg-white rounded-3xl shadow-2xl border border-[#70805D]/20 overflow-hidden transition-all duration-300 transform origin-bottom-right mb-2 ring-1 ring-black/10">
        
        <!-- Header -->
        <div class="p-4 bg-gradient-to-r from-[#1C2B1B] via-[#2A3B27] to-[#1C2B1B] text-white flex items-center justify-between border-b border-white/10">
          <div class="flex items-center gap-3">
            <div class="relative">
              <img src="/assets/shakibur.jpg" alt="Md. Shakibur Rahaman" class="w-11 h-11 rounded-full object-cover border-2 border-[#25D366] shadow-sm" onerror="this.src='/assets/avatar-placeholder.png'">
              <span class="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#25D366] ring-2 ring-[#1C2B1B]"></span>
            </div>
            <div>
              <div class="text-xs font-black text-white tracking-wide">Md. Shakibur Rahaman</div>
              <div class="text-[10px] text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                <span class="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></span>
                <span>Online | Instant Response</span>
              </div>
            </div>
          </div>
          <button type="button" id="waCloseBtn" class="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs transition-colors focus:outline-none" aria-label="Close Chat">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <!-- Chat Bubble Intro -->
        <div class="p-4 bg-[#F8F9F6] border-b border-[#70805D]/10">
          <div class="p-3 rounded-2xl bg-white border border-[#70805D]/15 text-xs text-[#2A3B27] shadow-2xs leading-relaxed">
            👋 <strong>Hi there!</strong> Ready to scale your brand or need custom strategic direction? Share your details below to connect with <strong>Mr. Shakib</strong> directly on WhatsApp.
          </div>
        </div>

        <!-- Form Body -->
        <form id="waInquiryForm" class="p-4 space-y-3 bg-white">
          <div>
            <label class="block text-[10.5px] font-black uppercase tracking-wider text-[#2A3B27] mb-1">Your Name *</label>
            <input type="text" id="waInputName" required placeholder="e.g. John Doe" class="w-full px-3 py-2 text-xs rounded-xl border border-[#70805D]/25 focus:border-[#70805D] focus:ring-2 focus:ring-[#70805D]/20 outline-none text-[#1C2B1B] bg-[#F8F9F6] focus:bg-white transition-all">
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label class="block text-[10.5px] font-black uppercase tracking-wider text-[#2A3B27] mb-1">Contact / Phone *</label>
              <input type="tel" id="waInputContact" required placeholder="+880 1..." class="w-full px-3 py-2 text-xs rounded-xl border border-[#70805D]/25 focus:border-[#70805D] focus:ring-2 focus:ring-[#70805D]/20 outline-none text-[#1C2B1B] bg-[#F8F9F6] focus:bg-white transition-all">
            </div>
            <div>
              <label class="block text-[10.5px] font-black uppercase tracking-wider text-[#2A3B27] mb-1">Email</label>
              <input type="email" id="waInputEmail" placeholder="you@company.com" class="w-full px-3 py-2 text-xs rounded-xl border border-[#70805D]/25 focus:border-[#70805D] focus:ring-2 focus:ring-[#70805D]/20 outline-none text-[#1C2B1B] bg-[#F8F9F6] focus:bg-white transition-all">
            </div>
          </div>

          <div>
            <label class="block text-[10.5px] font-black uppercase tracking-wider text-[#2A3B27] mb-1">Discussion Topic / Details</label>
            <textarea id="waInputTopic" rows="2" placeholder="e.g. E-Commerce Packages, High-Converting Web Portal, SMM & Ads..." class="w-full px-3 py-2 text-xs rounded-xl border border-[#70805D]/25 focus:border-[#70805D] focus:ring-2 focus:ring-[#70805D]/20 outline-none text-[#1C2B1B] bg-[#F8F9F6] focus:bg-white resize-none transition-all"></textarea>
          </div>

          <div id="waFormAlert" class="hidden text-[11px] p-2 rounded-lg font-bold"></div>

          <button type="submit" id="waSubmitBtn" class="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:scale-[1.01] transition-all">
            <i class="fa-brands fa-whatsapp text-base"></i>
            <span>Contact with Mr. Shakib</span>
          </button>
        </form>

      </div>

      <!-- Floating Launcher Button -->
      <div class="relative group">
        <button type="button" id="waLauncherBtn" aria-label="Chat on WhatsApp with Mr. Shakib" class="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center justify-center shadow-2xl shadow-[#25D366]/40 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none ring-4 ring-white/90">
          <i class="fa-brands fa-whatsapp text-3xl"></i>
          
          <!-- Ping indicator -->
          <span class="absolute -top-1 -right-1 flex h-4 w-4">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
          </span>
        </button>

        <!-- Floating Tooltip Label (Desktop only) -->
        <div class="hidden md:block absolute right-16 top-1/2 -translate-y-1/2 bg-[#1C2B1B] text-white text-[11px] font-bold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
          Chat with Mr. Shakib
          <span class="absolute right-[-4px] top-1/2 -translate-y-1/2 border-4 border-transparent border-l-[#1C2B1B]"></span>
        </div>
      </div>
    `;

    document.body.appendChild(widget);

    // Event Listeners
    const launcherBtn = document.getElementById('waLauncherBtn');
    const popupCard = document.getElementById('waPopupCard');
    const closeBtn = document.getElementById('waCloseBtn');
    const form = document.getElementById('waInquiryForm');

    function togglePopup() {
      if (popupCard.classList.contains('hidden')) {
        popupCard.classList.remove('hidden');
        setTimeout(() => {
          const nameInput = document.getElementById('waInputName');
          if (nameInput) nameInput.focus();
        }, 100);
      } else {
        popupCard.classList.add('hidden');
      }
    }

    launcherBtn.addEventListener('click', togglePopup);
    closeBtn.addEventListener('click', () => popupCard.classList.add('hidden'));

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('waInputName').value.trim();
      const contact = document.getElementById('waInputContact').value.trim();
      const email = document.getElementById('waInputEmail').value.trim();
      const topic = document.getElementById('waInputTopic').value.trim() || 'your services, pricing packages, and strategic consultation';
      const submitBtn = document.getElementById('waSubmitBtn');
      const alertBox = document.getElementById('waFormAlert');

      if (!name || !contact) {
        alertBox.className = 'text-[11px] p-2 rounded-lg font-bold bg-rose-50 text-rose-700 border border-rose-200 block';
        alertBox.textContent = 'Please provide both your Name and Contact number.';
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin text-sm"></i><span>Opening WhatsApp...</span>';

      // Setup Exact Requested WhatsApp Message Format:
      // "Hello, This is (Name), You can contact with me (Contact) and i would to know/discuss with you about ......."
      const emailNote = email ? ` (Email: ${email})` : '';
      const whatsappMessage = `Hello, This is ${name}, You can contact with me ${contact}${emailNote} and i would to know/discuss with you about ${topic}`;
      const whatsappUrl = `https://wa.me/8801838070468?text=${encodeURIComponent(whatsappMessage)}`;

      // Save lead to backend CRM
      try {
        await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            phone: contact,
            email: email || 'N/A',
            company: 'Direct WhatsApp Contact Widget',
            services: `WhatsApp Inquiry: ${topic}`,
            budget: 'Direct Discussion',
            timeline: 'Immediate WhatsApp Conversation',
            message: `[WHATSAPP CONTACT WIDGET]\nName: ${name}\nContact: ${contact}\nEmail: ${email || 'N/A'}\nTopic: ${topic}\n\nGenerated Message: ${whatsappMessage}`,
            date: new Date().toISOString()
          })
        });
      } catch (err) {
        console.warn('Could not save lead record to backend', err);
      }

      // Open WhatsApp
      window.open(whatsappUrl, '_blank');

      // Reset & show confirmation
      alertBox.className = 'text-[11px] p-2 rounded-lg font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 block';
      alertBox.textContent = '✅ Connected! WhatsApp chat opened.';

      setTimeout(() => {
        form.reset();
        popupCard.classList.add('hidden');
        alertBox.classList.add('hidden');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-brands fa-whatsapp text-base"></i><span>Contact with Mr. Shakib</span>';
      }, 1500);
    });
  }

  window.applySiteHydration = function(content) {
    if (!content) return;
    if (content.menu) hydrateHeaderMenu(content.menu);
    const pageKey = detectCurrentPageKey();
    if (content.pages) hydratePageContent(pageKey, content.pages);
    if (pageKey === 'offers') {
      if (typeof window.renderPricingOffers === 'function') {
        window.renderPricingOffers(content);
      } else if (typeof window.renderOffersList === 'function') {
        window.renderOffersList(content.offers || []);
      }
    }
  };

  async function initHydration() {
    initWhatsAppFloatingWidget();
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

