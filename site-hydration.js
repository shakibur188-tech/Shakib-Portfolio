/**
 * Md. Shakibur Rahaman - Unified Client-Side Dynamic Hydration Engine
 * Automatically hydrates Header Navigation, CTA Buttons, Page Figures, Counters, and Hero Elements from /api/content (or data/content.json)
 */

(function() {
  'use strict';

  const CACHE_KEY = 'shakibur_content_cache_v2';

  // 1. Instant Cache + Background Revalidation (0ms Local Render, <0.01s Page Navigation)
  function getCachedSiteContent() {
    try {
      const cached = sessionStorage.getItem(CACHE_KEY) || localStorage.getItem(CACHE_KEY);
      if (cached) return JSON.parse(cached);
    } catch (e) {}
    return null;
  }

  function setCachedSiteContent(data) {
    try {
      const serialized = JSON.stringify(data);
      sessionStorage.setItem(CACHE_KEY, serialized);
      localStorage.setItem(CACHE_KEY, serialized);
    } catch (e) {}
  }

  async function fetchSiteContent(onUpdate) {
    // 1. Instant local return if available
    const cached = getCachedSiteContent();
    if (cached && typeof onUpdate === 'function') {
      onUpdate(cached);
    }

    // 2. Silent background network revalidation
    try {
      const res = await fetch('/api/content?t=' + Date.now());
      if (res.ok) {
        const data = await res.json();
        setCachedSiteContent(data);
        if (typeof onUpdate === 'function') onUpdate(data);
        return data;
      }
    } catch (e) {
      try {
        const res = await fetch('/data/content.json?t=' + Date.now());
        if (res.ok) {
          const data = await res.json();
          setCachedSiteContent(data);
          if (typeof onUpdate === 'function') onUpdate(data);
          return data;
        }
      } catch (err) {}
    }
    return cached;
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
              link.classList.add('text-[#0066FF]', 'font-bold');
              link.classList.remove('hover:text-[#0066FF]');
            } else {
              link.classList.remove('text-[#0066FF]');
              link.classList.add('hover:text-[#0066FF]');
            }
          });
        }
      }

      // 4. Mobile Menu Links (In-Place Safe Hydration)
      const allMobileLinks = Array.from(document.querySelectorAll('#mobileMenu a.mobile-link'));
      if (allMobileLinks.length) {
        allMobileLinks.forEach(link => {
          if (link.getAttribute('href') === '/testimonials.html') {
            link.style.display = 'none';
          }
        });

        const mobileNavLinks = allMobileLinks.filter(link => {
          const href = link.getAttribute('href');
          return href && !href.startsWith('https://wa.me') && !link.classList.contains('btn-aesthetic-primary') && link.style.display !== 'none';
        });

        if (mobileNavLinks && mobileNavLinks.length >= menu.items.length) {
          menu.items.forEach((item, idx) => {
            const link = mobileNavLinks[idx];
            if (!link) return;
            if (item.url) link.setAttribute('href', item.url);
            const span = link.querySelector('div > span:last-child') || link.querySelector('span');
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
          <div class="spotlight-card p-4 bg-white border border-[#0066FF]/20 rounded-2xl shadow-xs text-center">
            <div class="text-2xl sm:text-3xl font-black text-[#0B0F19]" ${dataTarget} ${dataSuffix}>
              ${fig.prefix || ''}${fig.value}
            </div>
            <div class="text-[11px] text-[#0066FF] uppercase font-extrabold mt-1">
              ${fig.label}
            </div>
            ${fig.sublabel ? `<div class="text-[10px] text-[#64748B] font-medium mt-0.5">${fig.sublabel}</div>` : ''}
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
  // Floating WhatsApp Interactive Widget & Instant Hover Modal
  // -------------------------------------------------------------
  function initWhatsAppFloatingWidget() {
    if (document.getElementById('floatingWhatsAppWidget')) return;

    // Create Widget Container
    const widget = document.createElement('div');
    widget.id = 'floatingWhatsAppWidget';
    widget.className = 'fixed bottom-5 right-5 z-[9999] font-sans antialiased group/wa';

    widget.innerHTML = `
      <!-- WhatsApp Popup Chat Card -->
      <div id="waPopupCard" class="hidden absolute bottom-14 right-0 w-[315px] max-w-[calc(100vw-32px)] bg-white rounded-3xl shadow-2xl border border-[#0066FF]/20 overflow-hidden transition-all duration-200 transform origin-bottom-right mb-2 ring-1 ring-black/10">
        
        <!-- Header -->
        <div class="p-3.5 bg-gradient-to-r from-[#0B0F19] via-[#0B0F19] to-[#0B0F19] text-white flex items-center justify-between border-b border-white/10">
          <div class="flex items-center gap-2.5">
            <div class="relative shrink-0">
              <img src="/assets/shakibur.jpg" alt="Md. Shakibur Rahaman" class="w-9 h-9 rounded-full object-cover border-2 border-[#25D366] shadow-sm" onerror="this.src='/assets/avatar-placeholder.png'">
              <span class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#25D366] ring-2 ring-[#0B0F19]"></span>
            </div>
            <div>
              <div class="text-[11.5px] font-black text-white tracking-tight">Md. Shakibur Rahaman</div>
              <div class="text-[9.5px] text-emerald-400 font-bold flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></span>
                <span>Online | Direct WhatsApp</span>
              </div>
            </div>
          </div>
          <button type="button" id="waCloseBtn" class="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs transition-colors focus:outline-none" aria-label="Close Chat">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <!-- Chat Bubble Intro -->
        <div class="p-3 bg-[#F8FAFC] border-b border-[#0066FF]/10">
          <div class="p-2.5 rounded-2xl bg-white border border-[#0066FF]/15 text-[11px] text-[#0B0F19] shadow-2xs leading-snug">
            👋 <strong>Hi there!</strong> Ready to scale your brand? Drop your details below to chat with <strong>Mr. Shakib</strong> directly on WhatsApp.
          </div>
        </div>

        <!-- Form Body -->
        <form id="waInquiryForm" class="p-3.5 space-y-2.5 bg-white">
          <div>
            <label class="block text-[10px] font-black uppercase tracking-wider text-[#0B0F19] mb-0.5">Your Name *</label>
            <input type="text" id="waInputName" required placeholder="e.g. John Doe" class="w-full px-2.5 py-1.5 text-xs rounded-xl border border-[#0066FF]/25 focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 outline-none text-[#0B0F19] bg-[#F8FAFC] focus:bg-white transition-all">
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label class="block text-[10px] font-black uppercase tracking-wider text-[#0B0F19] mb-0.5">Contact / Phone *</label>
              <input type="tel" id="waInputContact" required placeholder="+880 1..." class="w-full px-2.5 py-1.5 text-xs rounded-xl border border-[#0066FF]/25 focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 outline-none text-[#0B0F19] bg-[#F8FAFC] focus:bg-white transition-all">
            </div>
            <div>
              <label class="block text-[10px] font-black uppercase tracking-wider text-[#0B0F19] mb-0.5">Email</label>
              <input type="email" id="waInputEmail" placeholder="you@company.com" class="w-full px-2.5 py-1.5 text-xs rounded-xl border border-[#0066FF]/25 focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 outline-none text-[#0B0F19] bg-[#F8FAFC] focus:bg-white transition-all">
            </div>
          </div>

          <div>
            <label class="block text-[10px] font-black uppercase tracking-wider text-[#0B0F19] mb-0.5">Discussion Topic / Details</label>
            <textarea id="waInputTopic" rows="2" placeholder="e.g. E-Commerce Packages, High-Converting Web, SMM..." class="w-full px-2.5 py-1.5 text-xs rounded-xl border border-[#0066FF]/25 focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 outline-none text-[#0B0F19] bg-[#F8FAFC] focus:bg-white resize-none transition-all"></textarea>
          </div>

          <div id="waFormAlert" class="hidden text-[10.5px] p-2 rounded-lg font-bold"></div>

          <button type="submit" id="waSubmitBtn" class="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/30 hover:shadow-lg hover:scale-[1.01] transition-all">
            <i class="fa-brands fa-whatsapp text-sm"></i>
            <span>Contact with Mr. Shakib</span>
          </button>
        </form>

      </div>

      <!-- Compact Floating Launcher Button -->
      <div class="relative">
        <button type="button" id="waLauncherBtn" aria-label="Chat on WhatsApp with Mr. Shakib" class="w-11 h-11 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center justify-center shadow-xl shadow-[#25D366]/35 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none ring-2 ring-white/90">
          <i class="fa-brands fa-whatsapp text-xl"></i>
          
          <!-- Ping indicator -->
          <span class="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
          </span>
        </button>

        <!-- Floating Tooltip Label (Desktop only on hover) -->
        <div class="hidden md:block absolute right-14 top-1/2 -translate-y-1/2 bg-[#0B0F19] text-white text-[10.5px] font-bold px-2.5 py-1 rounded-lg whitespace-nowrap shadow-md opacity-0 group-hover/wa:opacity-100 transition-opacity pointer-events-none border border-white/10">
          WhatsApp
          <span class="absolute right-[-3px] top-1/2 -translate-y-1/2 border-3 border-transparent border-l-[#0B0F19]"></span>
        </div>
      </div>
    `;

    document.body.appendChild(widget);

    // Event Listeners & Instant Hover Handling
    const launcherBtn = document.getElementById('waLauncherBtn');
    const popupCard = document.getElementById('waPopupCard');
    const closeBtn = document.getElementById('waCloseBtn');
    const form = document.getElementById('waInquiryForm');

    let manuallyClosed = false;

    function openPopup() {
      popupCard.classList.remove('hidden');
    }

    function closePopup() {
      popupCard.classList.add('hidden');
    }

    // Instant Hover: Open on hover and STAY open until manually closed
    launcherBtn.addEventListener('mouseenter', () => {
      if (!manuallyClosed) {
        openPopup();
      }
    });

    // Reset manuallyClosed flag once mouse completely leaves widget area
    widget.addEventListener('mouseleave', () => {
      manuallyClosed = false;
    });

    // Click on launcher button toggles
    launcherBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (popupCard.classList.contains('hidden')) {
        manuallyClosed = false;
        openPopup();
        const nameInput = document.getElementById('waInputName');
        if (nameInput) nameInput.focus();
      } else {
        closePopup();
        manuallyClosed = true;
      }
    });

    // Manual close button dismisses card
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closePopup();
      manuallyClosed = true;
    });

    // Form Submission
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('waInputName').value.trim();
      const contact = document.getElementById('waInputContact').value.trim();
      const email = document.getElementById('waInputEmail').value.trim();
      const topic = document.getElementById('waInputTopic').value.trim() || 'your services, pricing packages, and strategic consultation';
      const submitBtn = document.getElementById('waSubmitBtn');
      const alertBox = document.getElementById('waFormAlert');

      if (!name || !contact) {
        alertBox.className = 'text-[10.5px] p-2 rounded-lg font-bold bg-rose-50 text-rose-700 border border-rose-200 block';
        alertBox.textContent = 'Please provide both your Name and Contact number.';
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin text-xs"></i><span>Opening WhatsApp...</span>';

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
      alertBox.className = 'text-[10.5px] p-2 rounded-lg font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 block';
      alertBox.textContent = '✅ Connected! WhatsApp chat opened.';

      setTimeout(() => {
        form.reset();
        closePopup();
        alertBox.classList.add('hidden');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-brands fa-whatsapp text-sm"></i><span>Contact with Mr. Shakib</span>';
      }, 1500);
    });
  }

  // -------------------------------------------------------------
  // 3. Right-Sided Off-Canvas Mobile Drawer & Dropdown Controller
  // -------------------------------------------------------------
  function initMobileDrawer() {
    const toggleBtn = document.getElementById('mobileMenuToggle') || document.getElementById('svcMobileToggle');
    const closeBtn = document.getElementById('mobileDrawerClose');
    const drawer = document.getElementById('mobileDrawer');
    const backdrop = document.getElementById('mobileBackdrop');
    const mobileMenu = document.getElementById('mobileMenu') || document.getElementById('svcMobileMenu');
    const icon = document.getElementById('mobileMenuIcon') || (toggleBtn ? toggleBtn.querySelector('i') : null);

    if (drawer && backdrop) {
      function openDrawer() {
        backdrop.classList.remove('opacity-0', 'pointer-events-none');
        backdrop.classList.add('opacity-100', 'pointer-events-auto');
        drawer.classList.remove('translate-x-full');
        document.body.style.overflow = 'hidden';
      }

      function closeDrawer() {
        backdrop.classList.remove('opacity-100', 'pointer-events-auto');
        backdrop.classList.add('opacity-0', 'pointer-events-none');
        drawer.classList.add('translate-x-full');
        document.body.style.overflow = '';
      }

      if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (drawer.classList.contains('translate-x-full')) {
            openDrawer();
          } else {
            closeDrawer();
          }
        });
      }

      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.preventDefault();
          closeDrawer();
        });
      }

      backdrop.addEventListener('click', closeDrawer);

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !drawer.classList.contains('translate-x-full')) {
          closeDrawer();
        }
      });

      drawer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          closeDrawer();
        });
      });
    } else if (toggleBtn && mobileMenu) {
      if (!toggleBtn.dataset.menuHydrated) {
        toggleBtn.dataset.menuHydrated = 'true';
        function openMenu() {
          mobileMenu.classList.remove('hidden');
          if (icon) {
            icon.classList.remove('fa-bars-staggered', 'fa-bars');
            icon.classList.add('fa-xmark');
          }
        }
        function closeMenu() {
          mobileMenu.classList.add('hidden');
          if (icon) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars-staggered');
          }
        }
        toggleBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (mobileMenu.classList.contains('hidden')) {
            openMenu();
          } else {
            closeMenu();
          }
        });
        mobileMenu.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', () => closeMenu());
        });
        document.addEventListener('click', (e) => {
          if (!mobileMenu.classList.contains('hidden') && !mobileMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
            closeMenu();
          }
        });
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
            closeMenu();
          }
        });
      }
    }
  }

  // -------------------------------------------------------------
  // 4. Instant Pre-fetching Engine (< 0.01s instant click)
  const preloadedUrls = new Set();

  function prefetchUrl(url) {
    if (!url || preloadedUrls.has(url) || url.startsWith('#') || url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('https://wa.me') || url.includes('/admin')) return;
    if (url.startsWith('http') && !url.includes(window.location.hostname)) return;

    preloadedUrls.add(url);
    try {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);
    } catch (e) {}

    fetch(url, { priority: 'low' }).catch(() => {});
  }

  function initInstantPageTransitions() {
    const coreRoutes = [
      '/',
      '/about.html',
      '/services.html',
      '/projects.html',
      '/case-studies.html',
      '/case-study.html',
      '/offers.html',
      '/contact.html',
      '/testimonials.html'
    ];

    setTimeout(() => {
      coreRoutes.forEach(r => {
        if (r !== window.location.pathname) prefetchUrl(r);
      });
    }, 50);

    // Instant Hover / Touch Pre-load so clicking renders immediately from cache in <0.01s
    document.addEventListener('mouseover', (e) => {
      const anchor = e.target.closest('a');
      if (anchor && anchor.getAttribute('href')) {
        prefetchUrl(anchor.getAttribute('href'));
      }
    }, { passive: true });

    document.addEventListener('touchstart', (e) => {
      const anchor = e.target.closest('a');
      if (anchor && anchor.getAttribute('href')) {
        prefetchUrl(anchor.getAttribute('href'));
      }
    }, { passive: true });
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
    initMobileDrawer();
    initInstantPageTransitions();
    initWhatsAppFloatingWidget();

    // Instant Hydration from Cache in 0.000s, then silent background revalidate
    await fetchSiteContent((data) => {
      if (data) window.applySiteHydration(data);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHydration);
  } else {
    initHydration();
  }

})();



  // -------------------------------------------------------------
  // Dynamic Offers Grid Hydration (Admin CMS Driven)
  // -------------------------------------------------------------
  function hydrateOffersGrid(content) {
    const grid = document.getElementById('offersGrid');
    if (!grid || !Array.isArray(content.offers) || !content.offers.length) return;

    grid.innerHTML = content.offers.map(offer => {
      const isFeatured = offer.featured === true;
      const borderClass = isFeatured 
        ? 'border-2 border-[#0066FF] shadow-2xl shadow-[#0066FF]/20 relative -translate-y-1 md:-translate-y-2 ring-4 ring-[#0066FF]/10' 
        : 'border border-[#E2E8F0] shadow-sm hover:border-[#0066FF]/40 hover:shadow-xl hover:-translate-y-1.5';
      
      const btnClass = isFeatured
        ? 'w-full py-3.5 px-5 rounded-full bg-[#0066FF] hover:bg-[#0052FF] text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-between shadow-lg shadow-[#0066FF]/30 active:scale-98'
        : 'w-full py-3.5 px-5 rounded-full bg-[#F8FAFC] hover:bg-[#0066FF] text-[#0B0F19] hover:text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-between border border-[#E2E8F0] hover:border-transparent shadow-xs hover:shadow-lg hover:shadow-[#0066FF]/25 active:scale-98';

      const featureItems = (offer.features || []).map(feat => `
        <li class="flex items-start gap-2.5">
          <div class="w-4 h-4 rounded-full bg-[#0066FF]/10 text-[#0066FF] flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-black">✓</div>
          <span>${feat}</span>
        </li>
      `).join('');

      const featuredBadge = isFeatured
        ? `<div class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0052FF] text-white font-extrabold text-[10px] uppercase tracking-wider shadow-md shadow-[#0066FF]/30">
            ★ Most Popular Sprint
          </div>`
        : '';

      return `
        <div class="morphy-card p-8 bg-white ${borderClass} rounded-[32px] flex flex-col justify-between transition-all duration-300 relative group">
          ${featuredBadge}
          <div>
            <div class="flex items-center justify-between mb-5 pt-1">
              <span class="px-3 py-1 rounded-full text-[10px] font-black bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/20 uppercase tracking-wider">
                ${offer.badge || 'Sprint Package'}
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
                ${offer.emiBadge || 'EMI Available'}
              </span>
            </div>

            <h3 class="text-2xl font-black text-[#0B0F19] leading-tight">
              ${offer.title} <br>
              <span class="text-sm font-bold text-[#0066FF]">${offer.subtitle || ''}</span>
            </h3>

            <p class="text-xs text-[#64748B] mt-2 mb-6 leading-relaxed">
              ${offer.description || ''}
            </p>

            <ul class="space-y-3.5 pt-5 border-t border-[#F1F5F9] text-xs text-[#475569] font-medium">
              ${featureItems}
            </ul>
          </div>

          <div class="pt-6 border-t border-[#F1F5F9] mt-8">
            <a href="${offer.ctaLink || '/contact'}" class="${btnClass}">
              <span>${offer.ctaText || 'View Plans & EMI Matrix'}</span>
              <i class="fa-solid fa-arrow-right text-[10px]"></i>
            </a>
          </div>
        </div>
      `;
    }).join('');
  }
  