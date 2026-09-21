/**
 * Shakibur CMS - Admin Controller Logic
 * High-Converting Portfolio CMS with 8 Core Services, 15 Live Web Projects,
 * Complete AI & Google SEO, and Manual-Only Live Publishing.
 */

let currentContent = null;
let initialContent = null;
let currentLeads = [];
let isDirty = false;
let authToken = localStorage.getItem('shakibur_admin_token') || '';

// ==========================================
// 1. INITIALIZATION & AUTHENTICATION
// ==========================================
document.addEventListener('DOMContentLoaded', async () => {
  setupEventListeners();
  
  if (authToken) {
    const isValid = await verifyAuthToken();
    if (isValid) {
      showAdminApp();
      await loadDashboardData();
      await loadAiStudioStatus();
    } else {
      showLoginOverlay();
    }
  } else {
    showLoginOverlay();
  }
});

function showLoginOverlay() {
  document.getElementById('loginOverlay').classList.remove('hidden');
  document.getElementById('adminApp').classList.add('hidden');
}

function showAdminApp() {
  document.getElementById('loginOverlay').classList.add('hidden');
  document.getElementById('adminApp').classList.remove('hidden');
}

async function verifyAuthToken() {
  try {
    const res = await fetch('/api/auth/verify', {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    const data = await res.json();
    return data.valid === true;
  } catch (err) {
    console.error('Auth verification error:', err);
    return false;
  }
}

// ==========================================
// 2. EVENT LISTENERS SETUP
// ==========================================
function setupEventListeners() {
  // Login Form
  const loginForm = document.getElementById('loginForm');
  if (loginForm) loginForm.addEventListener('submit', handleLogin);

  // Logout Button
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);

  // Tab Navigation
  document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  // Top Save and Discard
  const topSaveBtn = document.getElementById('topSaveBtn');
  if (topSaveBtn) topSaveBtn.addEventListener('click', saveAndPublish);

  const floatingSaveBtn = document.getElementById('floatingSaveBtn');
  if (floatingSaveBtn) floatingSaveBtn.addEventListener('click', saveAndPublish);

  const discardChangesBtn = document.getElementById('discardChangesBtn');
  if (discardChangesBtn) discardChangesBtn.addEventListener('click', discardChanges);

  const floatingDiscardBtn = document.getElementById('floatingDiscardBtn');
  if (floatingDiscardBtn) floatingDiscardBtn.addEventListener('click', discardChanges);

  // Dynamic Add Buttons
  const addNewServiceBtn = document.getElementById('addNewServiceBtn');
  if (addNewServiceBtn) addNewServiceBtn.addEventListener('click', addNewService);

  const addNewWebProjectBtn = document.getElementById('addNewWebProjectBtn');
  if (addNewWebProjectBtn) addNewWebProjectBtn.addEventListener('click', addNewWebProject);

  const addNewCreativeBtn = document.getElementById('addNewCreativeBtn');
  if (addNewCreativeBtn) addNewCreativeBtn.addEventListener('click', addNewCreativeItem);

  const addNewTestimonialBtn = document.getElementById('addNewTestimonialBtn');
  if (addNewTestimonialBtn) addNewTestimonialBtn.addEventListener('click', addNewTestimonialItem);

  const addTypewriterBtn = document.getElementById('addTypewriterBtn');
  if (addTypewriterBtn) addTypewriterBtn.addEventListener('click', addTypewriterPhrase);

  // Menu and Page Figures Add Buttons
  const addNewMenuItemBtn = document.getElementById('addNewMenuItemBtn');
  if (addNewMenuItemBtn) addNewMenuItemBtn.addEventListener('click', addNewMenuItem);

  const addNewPageFigureBtn = document.getElementById('addNewPageFigureBtn');
  if (addNewPageFigureBtn) addNewPageFigureBtn.addEventListener('click', addNewPageFigure);

  // Page switcher pills
  document.querySelectorAll('.page-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pageKey = btn.getAttribute('data-page-key');
      selectPageEditor(pageKey);
    });
  });

  // Leads Search & Export
  const leadsSearchInput = document.getElementById('leadsSearchInput');
  if (leadsSearchInput) {
    leadsSearchInput.addEventListener('input', (e) => filterLeads(e.target.value));
  }

  const exportLeadsCsvBtn = document.getElementById('exportLeadsCsvBtn');
  if (exportLeadsCsvBtn) exportLeadsCsvBtn.addEventListener('click', exportLeadsCsv);

  // Settings
  const changePasswordForm = document.getElementById('changePasswordForm');
  if (changePasswordForm) changePasswordForm.addEventListener('submit', handleChangePassword);

  const downloadBackupBtn = document.getElementById('downloadBackupBtn');
  if (downloadBackupBtn) downloadBackupBtn.addEventListener('click', downloadSiteBackup);

  const restoreFileInput = document.getElementById('restoreFileInput');
  if (restoreFileInput) restoreFileInput.addEventListener('change', handleRestoreBackup);

  const factoryResetBtn = document.getElementById('factoryResetBtn');
  if (factoryResetBtn) factoryResetBtn.addEventListener('click', handleFactoryReset);

  // AI Studio Listeners
  const saveAiConfigBtn = document.getElementById('saveAiConfigBtn');
  if (saveAiConfigBtn) saveAiConfigBtn.addEventListener('click', handleSaveAiConfig);

  const testAiConnectionBtn = document.getElementById('testAiConnectionBtn');
  if (testAiConnectionBtn) testAiConnectionBtn.addEventListener('click', handleTestAiConnection);

  const toggleAiKeyVisibility = document.getElementById('toggleAiKeyVisibility');
  if (toggleAiKeyVisibility) {
    toggleAiKeyVisibility.addEventListener('click', () => {
      const input = document.getElementById('aiApiKeyInput');
      if (input) {
        if (input.type === 'password') {
          input.type = 'text';
          toggleAiKeyVisibility.textContent = 'Hide';
        } else {
          input.type = 'password';
          toggleAiKeyVisibility.textContent = 'Show';
        }
      }
    });
  }

  const aiCopyPresetSelect = document.getElementById('aiCopyPresetSelect');
  if (aiCopyPresetSelect) aiCopyPresetSelect.addEventListener('change', handleCopyPresetChange);

  const generateTextBtn = document.getElementById('generateTextBtn');
  if (generateTextBtn) generateTextBtn.addEventListener('click', handleGenerateAiText);

  const copyAiTextBtn = document.getElementById('copyAiTextBtn');
  if (copyAiTextBtn) {
    copyAiTextBtn.addEventListener('click', () => {
      const box = document.getElementById('aiTextResultBox');
      if (box && box.textContent) {
        navigator.clipboard.writeText(box.textContent.trim());
        showToast('Generated copy copied to clipboard!', 'success');
      }
    });
  }

  const generateImageBtn = document.getElementById('generateImageBtn');
  if (generateImageBtn) generateImageBtn.addEventListener('click', handleGenerateAiImage);

  const brainstormIdeasBtn = document.getElementById('brainstormIdeasBtn');
  if (brainstormIdeasBtn) brainstormIdeasBtn.addEventListener('click', handleBrainstormAiIdeas);

  // SERP simulator listeners
  ['seo_pageTitle', 'seo_metaDescription', 'seo_canonicalUrl'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateGoogleSerpPreview);
  });

  // Track changes to mark dirty
  const adminMain = document.querySelector('.admin-main');
  if (adminMain) {
    adminMain.addEventListener('input', (e) => {
      const id = e.target?.id || '';
      if (id === 'leadsSearchInput' || id === 'loginUsername' || id === 'loginPassword' || id.startsWith('ai')) return;
      markDirty();
    });

    adminMain.addEventListener('change', (e) => {
      const id = e.target?.id || '';
      if (id === 'leadsSearchInput' || id === 'loginUsername' || id === 'loginPassword' || id.startsWith('ai') || id.startsWith('builder') || id.startsWith('template') || id.startsWith('submissions')) return;
      markDirty();
    });
  }

  // Initialize Form Builder Event Listeners
  initFormBuilderEventListeners();
}

// ==========================================
// 3. TAB SWITCHING
// ==========================================
window.switchTab = function(tabId) {
  document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });

  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.classList.toggle('active', pane.id === tabId);
  });

  const titleMap = {
    'tab-overview': { title: 'Dashboard Overview', sub: 'Real-time performance metrics, services, and live web portals.' },
    'tab-menu': { title: 'Header & Menu Navigation Manager', sub: 'Customize navigation items, URLs, header CTA button and top brand identity.' },
    'tab-pages': { title: 'Page-by-Page Content & Figures CMS', sub: 'Edit hero titles, numbers, years of experience, counters, and action buttons for every page.' },
    'tab-services': { title: '6 Core Services CMS', sub: 'Manage titles, deliverables, tools, icons, and impact metrics.' },
    'tab-webprojects': { title: 'Projects CMS (Live)', sub: 'Manage client portals, live external URLs, screenshots, and tech stacks.' },
    'tab-casestudies': { title: 'Case Studies & Recent Works CMS', sub: 'Write, edit, feature, and publish comprehensive case studies and measurable results for your audience.' },
    'tab-creative': { title: 'Creative Media Studio Gallery', sub: 'Branding kits, commercial films, packaging visual mockups, and expo booths.' },
    'tab-process': { title: '4-Stage Strategic Methodology', sub: 'Discovery, Creative Architecture, Engineering, and Omnichannel Amplification.' },
    'tab-testimonials': { title: 'Client Testimonials CMS', sub: 'Executive client reviews, endorsements, and verified partners.' },
    'tab-seo': { title: 'Global & AI SEO Center', sub: 'Meta tags, Google SERP simulator, GA4, Meta Pixel & /llms.txt standard.' },
    'tab-hero': { title: 'Hero, Profile & Stats', sub: 'Bio, contact numbers, animated typewriter phrases, and key impact numbers.' },
    'tab-leads': { title: 'Client Inquiries & Leads Inbox', sub: 'Project briefs submitted through the public website contact form.' },
    'tab-forms': { title: 'Form Builder & 20+ Template Engine', sub: 'Create custom forms, explore 22 templates, share embed codes, and inspect submissions.' },
    'tab-aistudio': { title: 'AI Studio & OpenAI Suite', sub: 'Generate copy, DALL-E 3 visual assets, and strategic marketing concepts.' },
    'tab-scripts': { title: 'Custom Scripts & Header Injection', sub: 'Google Tag Manager, custom CSS, chat widgets, and tracking pixels.' },
    'tab-settings': { title: 'Security & Backup Settings', sub: 'Change admin password, download JSON site snapshot, or restore.' }
  };

  const meta = titleMap[tabId] || { title: 'Admin CMS', sub: 'Manage portfolio settings.' };
  document.getElementById('pageTitle').textContent = meta.title;
  document.getElementById('pageSubtitle').textContent = meta.sub;

  if (tabId === 'tab-forms') {
    loadFormsData();
  }

  document.querySelector('.admin-content-container')?.scrollTo({ top: 0, behavior: 'smooth' });
};

// ==========================================
// 4. AUTH HANDLERS
// ==========================================
async function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value;
  const errorDiv = document.getElementById('loginError');
  const submitBtn = document.getElementById('loginSubmitBtn');

  errorDiv.classList.add('hidden');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>Verifying credentials...</span>';

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (res.ok && data.token) {
      authToken = data.token;
      localStorage.setItem('shakibur_admin_token', authToken);
      showAdminApp();
      await loadDashboardData();
      showToast('Authenticated successfully! Welcome back.', 'success');
    } else {
      errorDiv.textContent = data.error || 'Invalid username or password.';
      errorDiv.classList.remove('hidden');
    }
  } catch (err) {
    errorDiv.textContent = 'Server connection failed. Ensure backend server is running.';
    errorDiv.classList.remove('hidden');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<span>Authenticate & Enter CMS</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
  }
}

function handleLogout() {
  authToken = '';
  localStorage.removeItem('shakibur_admin_token');
  showLoginOverlay();
  showToast('Logged out securely.', 'info');
}

async function handleChangePassword(e) {
  e.preventDefault();
  const currentPass = document.getElementById('currentPass').value;
  const newPass = document.getElementById('newPass').value;

  try {
    const res = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ currentPassword: currentPass, newPassword: newPass })
    });

    const data = await res.json();
    if (res.ok && data.success) {
      showToast('Admin password updated successfully!', 'success');
      document.getElementById('changePasswordForm').reset();
    } else {
      showToast(data.error || 'Failed to update password.', 'error');
    }
  } catch (err) {
    showToast('Failed to connect to server.', 'error');
  }
}

// ==========================================
// 5. DATA LOADING & HYDRATION
// ==========================================
async function loadDashboardData() {
  try {
    const contentRes = await fetch('/api/content?t=' + Date.now());
    if (contentRes.ok) {
      currentContent = await contentRes.json();
      initialContent = JSON.parse(JSON.stringify(currentContent));
      populateAdminForms(currentContent);
    }
    await loadLeads();
    await loadFormsData();
    resetDirty();
  } catch (err) {
    console.error('Failed to load dashboard data:', err);
    showToast('Failed to load content from server.', 'error');
  }
}

async function loadLeads() {
  try {
    const res = await fetch('/api/leads', {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    if (res.ok) {
      currentLeads = await res.json();
      renderLeads(currentLeads);
      updateOverviewStats();
    }
  } catch (err) {
    console.error('Failed to load leads:', err);
  }
}

function updateOverviewStats() {
  const leadsCount = currentLeads ? currentLeads.length : 0;
  const servicesCount = currentContent && currentContent.services ? currentContent.services.length : 8;
  const projectsCount = currentContent && currentContent.webProjects ? currentContent.webProjects.length : 15;

  const leadsBadge = document.getElementById('leadsBadge');
  if (leadsBadge) leadsBadge.textContent = leadsCount;

  const ovLeads = document.getElementById('overviewLeadsCount');
  if (ovLeads) ovLeads.textContent = leadsCount;

  const ovSvc = document.getElementById('overviewServicesCount');
  if (ovSvc) ovSvc.textContent = servicesCount;

  const ovProj = document.getElementById('overviewProjectsCount');
  if (ovProj) ovProj.textContent = projectsCount;

  const recentContainer = document.getElementById('overviewRecentLeads');
  if (recentContainer) {
    if (!currentLeads || currentLeads.length === 0) {
      recentContainer.innerHTML = '<div class="empty-state-sm">No new inquiries yet. Submissions from the contact form will appear here.</div>';
    } else {
      const recents = currentLeads.slice(-4).reverse();
      recentContainer.innerHTML = recents.map(l => `
        <div class="recent-lead-item" style="padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.06);">
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <div>
              <strong style="color:#FFF;">${escapeHtml(l.name || 'Inquirer')}</strong>
              <div style="font-size:11px; color:#E2E8F0; font-weight:600; margin-top:2px;">${escapeHtml(l.services || 'General')}</div>
              <div style="font-size:11px; color:#94A3B8;">${escapeHtml(l.email || l.phone || '')}</div>
            </div>
            <span style="font-size:10px; color:#64748B;">${new Date(l.date || Date.now()).toLocaleDateString()}</span>
          </div>
        </div>
      `).join('');
    }
  }
}

// ==========================================
// 6. POPULATE ADMIN FORMS
// ==========================================

/* ==========================================================================
   CASE STUDIES & RECENT WORKS CMS ENGINE
   ========================================================================== */
function renderCaseStudiesEditor(caseStudies) {
  const container = document.getElementById('caseStudiesEditorContainer');
  if (!container) return;

  const countBadge = document.getElementById('caseStudiesBadge');
  const countLabel = document.getElementById('caseStudiesAdminCount');
  if (countBadge) countBadge.textContent = caseStudies.length;
  if (countLabel) countLabel.textContent = `${caseStudies.length} case studies loaded`;

  const categoryOptions = [
    'Graphics & Visual Identity',
    'Web design & Development',
    'Social Media marketing',
    'Public relation & Media outreach',
    'Google ads & Intent Scaling',
    'Event activation & Exhibition'
  ];

  container.innerHTML = caseStudies.map((cs, idx) => {
    const metricsStr = Array.isArray(cs.metrics) ? cs.metrics.join('\n') : (cs.metrics || '');
    const delivStr = Array.isArray(cs.deliverables) ? cs.deliverables.join(', ') : (cs.deliverables || '');

    const catOptionsHtml = categoryOptions.map(cat => `
      <option value="${cat}" ${cs.category === cat ? 'selected' : ''}>${cat}</option>
    `).join('');

    const isFeatured = cs.featuredOnHome === true || cs.featuredOnHome === 'true';

    return `
      <div class="case-item-card ${isFeatured ? 'featured-card' : ''}" data-cs-idx="${idx}">
        <div class="case-header-row" onclick="toggleAccordion(this)">
          <div class="case-header-left">
            <span class="case-badge-pill" style="background:rgba(112,128,93,0.15); border-color:#70805D; color:#70805D;">${escapeHtml(cs.category || 'Strategic Work')}</span>
            <span class="case-title-txt">${escapeHtml(cs.title)}</span>
            ${isFeatured ? '<span class="badge-featured" style="background:rgba(234,179,8,0.18); color:#EAB308; border:1px solid rgba(234,179,8,0.4); padding:2px 8px; border-radius:9999px; font-size:10px; font-weight:800;">⭐ HOMEPAGE FEATURED</span>' : ''}
          </div>
          <div class="flex-gap align-center">
            <span class="text-xs text-slate-400 font-bold">${escapeHtml(cs.client || '')}</span>
            <button type="button" class="btn-delete-icon" onclick="event.stopPropagation(); deleteCaseStudy(${idx});">🗑️</button>
            <span class="accordion-arrow">▼</span>
          </div>
        </div>

        <div class="case-body-content hidden">
          <input type="hidden" class="cs-id" value="${escapeHtml(cs.id || ('cs-' + (idx + 1)))}">

          <div class="form-row-2">
            <div class="form-group">
              <label>Case Study Title *</label>
              <input type="text" class="admin-input cs-title" value="${escapeHtml(cs.title)}" required placeholder="e.g. Direct Hospitality Booking Engine">
            </div>
            <div class="form-group">
              <label>Client Organization / Brand *</label>
              <input type="text" class="admin-input cs-client" value="${escapeHtml(cs.client || '')}" required placeholder="e.g. The Peninsula Hotels">
            </div>
          </div>

          <div class="form-row-3">
            <div class="form-group">
              <label>Relevant Service Vertical</label>
              <select class="admin-select cs-category">
                ${catOptionsHtml}
              </select>
            </div>
            <div class="form-group">
              <label>Completion Year / Date</label>
              <input type="text" class="admin-input cs-year" value="${escapeHtml(cs.year || '2026')}" placeholder="e.g. 2026">
            </div>
            <div class="form-group" style="display:flex; flex-direction:column; justify-content:center;">
              <label style="cursor:pointer; display:flex; items-center; gap:8px; margin-top:16px;">
                <input type="checkbox" class="cs-featured" ${isFeatured ? 'checked' : ''} onchange="markDirty();">
                <span style="font-weight:700; color:#EAB308;">⭐ Feature on Homepage (Top 4)</span>
              </label>
            </div>
          </div>

          <div class="form-group">
            <label>Tagline / Brief Summary (1-2 sentences)</label>
            <input type="text" class="admin-input cs-tagline" value="${escapeHtml(cs.tagline || '')}" placeholder="High-impact one-liner summary of achievements...">
          </div>

          <div class="form-group">
            <label>Cover Preview Image URL</label>
            <input type="text" class="admin-input cs-image" value="${escapeHtml(cs.coverImage || '')}" placeholder="https://images.unsplash.com/photo-...">
          </div>

          <div class="form-row-2">
            <div class="form-group">
              <label>The Challenge / Commercial Bottleneck</label>
              <textarea class="admin-textarea cs-challenge" rows="3" placeholder="Describe the client's initial bottleneck, challenges, and high OTA/ad expenses...">${escapeHtml(cs.challenge || '')}</textarea>
            </div>
            <div class="form-group">
              <label>Strategic Execution & Technical Solution</label>
              <textarea class="admin-textarea cs-solution" rows="3" placeholder="Describe the architecture, visual systems, and growth funnels deployed...">${escapeHtml(cs.solution || '')}</textarea>
            </div>
          </div>

          <div class="form-row-2">
            <div class="form-group">
              <label>Measured ROI Metrics (1 per line or comma-separated)</label>
              <textarea class="admin-textarea cs-metrics" rows="3" placeholder="+320% Surge in Direct Bookings&#10;0.8s Mobile Load Speed&#10;18% Saved Fees">${escapeHtml(metricsStr)}</textarea>
            </div>
            <div class="form-group">
              <label>Key Deliverables & Artifacts (Comma-separated)</label>
              <textarea class="admin-textarea cs-deliverables" rows="3" placeholder="Custom Direct Booking Engine, Multi-Currency Payment Gateway, High-Intent Google Ads">${escapeHtml(delivStr)}</textarea>
            </div>
          </div>

          <div class="form-group">
            <label>Live Implementation / Showcase Link (Optional)</label>
            <input type="url" class="admin-input cs-liveUrl" value="${escapeHtml(cs.liveUrl || '')}" placeholder="https://clientdomain.com">
          </div>
        </div>
      </div>
    `;
  }).join('');
}

window.addNewCaseStudy = function() {
  const current = getCaseStudiesFromForms();
  current.unshift({
    id: 'cs-' + Date.now(),
    title: 'New Case Study & Strategic Impact',
    client: 'Client Organization',
    category: 'Web design & Development',
    serviceSlug: 'web-development',
    tagline: 'Brief summary of commercial growth and execution milestones.',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    challenge: 'Describe the problem statement, inefficiency, or market challenge.',
    solution: 'Describe the decisive strategic execution and architectural deployment.',
    metrics: ['+150% Performance Lift', 'Sub-second Latency', 'Zero Downtime'],
    deliverables: ['Full-Stack Engineering', 'Custom CMS Integration', 'Analytics Funnels'],
    liveUrl: 'https://example.com',
    featuredOnHome: false,
    year: '2026'
  });
  renderCaseStudiesEditor(current);
  markDirty();
};

window.deleteCaseStudy = function(idx) {
  if (confirm('Are you sure you want to delete this case study?')) {
    const current = getCaseStudiesFromForms();
    current.splice(idx, 1);
    renderCaseStudiesEditor(current);
    markDirty();
  }
};

function getCaseStudiesFromForms() {
  const cards = document.querySelectorAll('#caseStudiesEditorContainer .case-item-card');
  const caseStudies = [];

  cards.forEach((card, idx) => {
    const id = card.querySelector('.cs-id')?.value || ('cs-' + (idx + 1));
    const title = card.querySelector('.cs-title')?.value.trim() || 'Untitled Case Study';
    const client = card.querySelector('.cs-client')?.value.trim() || 'Client';
    const category = card.querySelector('.cs-category')?.value || 'Web design & Development';
    const year = card.querySelector('.cs-year')?.value.trim() || '2026';
    const featuredOnHome = card.querySelector('.cs-featured')?.checked === true;
    const tagline = card.querySelector('.cs-tagline')?.value.trim() || '';
    const coverImage = card.querySelector('.cs-image')?.value.trim() || '';
    const challenge = card.querySelector('.cs-challenge')?.value.trim() || '';
    const solution = card.querySelector('.cs-solution')?.value.trim() || '';
    const liveUrl = card.querySelector('.cs-liveUrl')?.value.trim() || '';

    const metricsRaw = card.querySelector('.cs-metrics')?.value || '';
    const metrics = metricsRaw.split(/[\r\n,]+/).map(m => m.trim()).filter(Boolean);

    const delivRaw = card.querySelector('.cs-deliverables')?.value || '';
    const deliverables = delivRaw.split(/[\r\n,]+/).map(d => d.trim()).filter(Boolean);

    caseStudies.push({
      id,
      title,
      client,
      category,
      year,
      featuredOnHome,
      tagline,
      coverImage,
      challenge,
      solution,
      metrics,
      deliverables,
      liveUrl
    });
  });

  return caseStudies;
}

function populateAdminForms(c) {
  if (!c) return;

  // Header & Menu Navigation
  renderMenuEditor(c.menu);

  // Page-by-Page Content & Figures
  renderPageByPageEditor(c.pages, activePageEditorKey || 'home');

  // 1. 8 Core Services
  renderServicesEditor(c.services || []);

  // 2. 15 Web Projects
  renderWebProjectsEditor(c.webProjects || []);

  // 3. Creative Studio
  renderCreativeEditor(c.creativePortfolio || []);

  // 4. 4-Stage Process
  renderProcessEditor(c.process || []);

  // 5. Testimonials
  renderTestimonialsEditor(c.testimonials || []);
  renderCaseStudiesEditor(c.caseStudies || []);

  // 6. SEO Center
  const seo = c.seo || {};
  setValue('seo_pageTitle', seo.pageTitle || '');
  setValue('seo_metaDescription', seo.metaDescription || '');
  setValue('seo_primaryKeyword', seo.primaryKeyword || '');
  setValue('seo_secondaryKeywords', seo.secondaryKeywords || '');
  setValue('seo_targetAiQueries', seo.targetAiQueries || seo.aiSeo?.targetAiQueries || '');
  setValue('seo_canonicalUrl', seo.canonicalUrl || 'http://localhost:5500/');
  setValue('seo_robots', seo.robots || 'index, follow, max-image-preview:large');
  setValue('seo_author', seo.author || 'Md. Shakibur Rahaman');
  setValue('seo_googleSiteVerification', seo.googleSiteVerification || '');
  setValue('seo_ogTitle', seo.ogTitle || '');
  setValue('seo_twitterCard', seo.twitterCard || 'summary_large_image');
  setValue('seo_ogDescription', seo.ogDescription || '');
  setValue('seo_ogImage', seo.ogImage || '');
  setValue('seo_gtmId', seo.gtmId || '');
  setValue('seo_googleAnalyticsId', seo.googleAnalyticsId || '');
  setValue('seo_metaPixelId', seo.metaPixelId || '');
  setValue('seo_aiSummary', seo.aiSeo?.aiSummary || seo.aiSummary || '');
  setValue('seo_llmsTxtContent', seo.aiSeo?.llmsTxtContent || seo.llmsTxtContent || '');
  const aiCrawlerEl = document.getElementById('seo_allowAiCrawlers');
  if (aiCrawlerEl) aiCrawlerEl.checked = seo.aiSeo?.allowAiCrawlers !== false;
  setValue('seo_schemaJson', typeof seo.schemaJson === 'object' ? JSON.stringify(seo.schemaJson, null, 2) : (seo.schemaJson || ''));
  setValue('seo_customHeadScript', seo.customHeadScript || '');
  setValue('seo_customBodyScript', seo.customBodyScript || '');

  // 7. Hero & Profile
  const p = c.profile || {};
  setValue('prof_name', p.name || '');
  setValue('prof_eyebrow', p.eyebrow || '');
  setValue('prof_headline', p.headline || '');
  setValue('prof_bio', p.bio || '');
  setValue('prof_statusBadge', p.statusBadge || '');
  setValue('prof_location', p.location || '');
  setValue('prof_email', p.email || '');
  setValue('prof_phone', p.phone || '');
  setValue('prof_whatsapp', p.whatsapp || '');
  setValue('prof_linkedin', p.linkedin || '');
  setValue('prof_resumePdfUrl', p.resumePdfUrl || '');

  renderTypewriterList(c.typewriter || []);
  renderStatsEditor(c.stats || []);

  updateGoogleSerpPreview();
  calculateSeoScore();
}

function setValue(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val;
}

// ==========================================
// 7. EDITORS RENDERING
// ==========================================

/* --- A. 8 Core Services Editor --- */
function renderServicesEditor(services) {
  const container = document.getElementById('servicesEditorContainer');
  if (!container) return;

  container.innerHTML = services.map((svc, idx) => {
    const deliverables = svc.deliverables || [];
    const deliverablesRows = deliverables.map((deliv, dIdx) => `
      <div class="dynamic-row">
        <input type="text" class="admin-input svc-deliverable" value="${escapeHtml(deliv)}" placeholder="Deliverable description">
        <button type="button" class="btn-delete-icon" onclick="this.parentElement.remove(); markDirty();">✕</button>
      </div>
    `).join('');

    const toolsStr = Array.isArray(svc.tools) ? svc.tools.join(', ') : (svc.tools || '');

    return `
      <div class="case-item-card" data-service-idx="${idx}">
        <div class="case-header-row" onclick="toggleAccordion(this)">
          <div class="case-header-left">
            <span class="case-badge-pill"><i class="fa-solid ${svc.icon || 'fa-layer-group'}"></i> ${escapeHtml(svc.badge || 'Service')}</span>
            <span class="case-title-txt">${escapeHtml(svc.title)}</span>
          </div>
          <div class="flex-gap align-center">
            <button type="button" class="btn-delete-icon" onclick="event.stopPropagation(); deleteService(${idx});">🗑️</button>
            <span class="accordion-arrow">▼</span>
          </div>
        </div>

        <div class="case-body-content hidden">
          <input type="hidden" class="svc-id" value="${escapeHtml(svc.id || ('service-' + idx))}">
          <input type="hidden" class="svc-slug" value="${escapeHtml(svc.slug || svc.id || ('service-' + idx))}">
          <input type="hidden" class="svc-pageUrl" value="${escapeHtml(svc.pageUrl || ('/services/' + (svc.slug || svc.id || 'service') + '.html'))}">
          
          <div class="form-row-2">
            <div class="form-group">
              <label>Service Title</label>
              <input type="text" class="admin-input svc-title" value="${escapeHtml(svc.title)}">
            </div>
            <div class="form-group">
              <label>Subtitle / Category Pitch</label>
              <input type="text" class="admin-input svc-subtitle" value="${escapeHtml(svc.subtitle || '')}">
            </div>
          </div>

          <div class="form-row-3">
            <div class="form-group">
              <label>FontAwesome Icon Class</label>
              <input type="text" class="admin-input svc-icon" value="${escapeHtml(svc.icon || 'fa-layer-group')}" placeholder="e.g. fa-code, fa-bezier-curve">
            </div>
            <div class="form-group">
              <label>Badge Label</label>
              <input type="text" class="admin-input svc-badge" value="${escapeHtml(svc.badge || 'Core Vertical')}">
            </div>
            <div class="form-group">
              <label>Key Impact / Output Stat</label>
              <input type="text" class="admin-input svc-stats" value="${escapeHtml(svc.stats || '')}" placeholder="e.g. 15+ Live Web Portals">
            </div>
          </div>

          <div class="form-group">
            <label>Comprehensive Description</label>
            <textarea class="admin-textarea svc-desc" rows="3">${escapeHtml(svc.description || '')}</textarea>
          </div>

          <div class="form-group">
            <label>Key Deliverables (List)</label>
            <div class="svc-deliverables-list mb-2">${deliverablesRows}</div>
            <button type="button" class="btn-secondary-sm" onclick="addDeliverableToService(this)">+ Add Deliverable</button>
          </div>

          <div class="form-group mb-0">
            <label>Tools & Tech Stack (Comma separated)</label>
            <input type="text" class="admin-input svc-tools" value="${escapeHtml(toolsStr)}" placeholder="e.g. Figma, Adobe Illustrator, React, Node.js">
          </div>
        </div>
      </div>
    `;
  }).join('');
}

window.toggleAccordion = function(header) {
  const content = header.nextElementSibling;
  const arrow = header.querySelector('.accordion-arrow');
  if (content) {
    content.classList.toggle('hidden');
    if (arrow) arrow.textContent = content.classList.contains('hidden') ? '▼' : '▲';
  }
};

window.addDeliverableToService = function(btn) {
  const list = btn.previousElementSibling;
  const row = document.createElement('div');
  row.className = 'dynamic-row';
  row.innerHTML = `
    <input type="text" class="admin-input svc-deliverable" value="" placeholder="New Deliverable">
    <button type="button" class="btn-delete-icon" onclick="this.parentElement.remove(); markDirty();">✕</button>
  `;
  list.appendChild(row);
  markDirty();
};

window.addNewService = function() {
  const current = getServicesFromForms();
  const newSlug = 'service-' + Date.now();
  current.push({
    id: newSlug,
    slug: newSlug,
    title: 'New Specialized Service',
    subtitle: 'High-Impact Brand & Growth Vertical',
    icon: 'fa-wand-magic-sparkles',
    badge: 'Specialized Vertical',
    description: 'Describe the value proposition, strategy, and execution workflow for this service.',
    deliverables: ['Key Deliverable 1', 'Key Deliverable 2', 'Key Deliverable 3'],
    tools: ['Industry Standard Tools'],
    stats: 'Verified Execution',
    pageUrl: '/services/' + newSlug + '.html'
  });
  renderServicesEditor(current);
  markDirty();
};

window.deleteService = function(idx) {
  if (confirm('Delete this service vertical?')) {
    const current = getServicesFromForms();
    current.splice(idx, 1);
    renderServicesEditor(current);
    markDirty();
  }
};

function getServicesFromForms() {
  const cards = document.querySelectorAll('#servicesEditorContainer .case-item-card');
  const services = [];

  cards.forEach(card => {
    const id = card.querySelector('.svc-id')?.value || 'service-' + Date.now();
    const slug = card.querySelector('.svc-slug')?.value || id;
    const pageUrl = card.querySelector('.svc-pageUrl')?.value || (`/services/${slug}.html`);
    const title = card.querySelector('.svc-title')?.value.trim() || 'Untitled Service';
    const subtitle = card.querySelector('.svc-subtitle')?.value.trim() || '';
    const icon = card.querySelector('.svc-icon')?.value.trim() || 'fa-layer-group';
    const badge = card.querySelector('.svc-badge')?.value.trim() || 'Core Vertical';
    const stats = card.querySelector('.svc-stats')?.value.trim() || '';
    const description = card.querySelector('.svc-desc')?.value.trim() || '';
    
    const deliverables = Array.from(card.querySelectorAll('.svc-deliverable'))
      .map(input => input.value.trim())
      .filter(Boolean);

    const toolsStr = card.querySelector('.svc-tools')?.value || '';
    const tools = toolsStr.split(',').map(t => t.trim()).filter(Boolean);

    services.push({ id, slug, title, subtitle, icon, badge, description, deliverables, tools, stats, pageUrl });
  });

  return services;
}

/* --- B. 15 Web Projects Editor --- */
function renderWebProjectsEditor(projects) {
  const container = document.getElementById('webProjectsEditorContainer');
  if (!container) return;

  const categoryOptions = [
    'E-Commerce',
    'Corporate / B2B',
    'Hospitality & Booking',
    'Web Apps / SaaS',
    'Creative Portfolios'
  ];

  container.innerHTML = projects.map((proj, idx) => {
    const techStr = Array.isArray(proj.techStack) ? proj.techStack.join(', ') : (proj.techStack || '');
    
    const catOptionsHtml = categoryOptions.map(cat => `
      <option value="${cat}" ${proj.category === cat ? 'selected' : ''}>${cat}</option>
    `).join('');

    return `
      <div class="case-item-card" data-project-idx="${idx}">
        <div class="case-header-row" onclick="toggleAccordion(this)">
          <div class="case-header-left">
            <span class="case-badge-pill" style="background:rgba(56,189,248,0.15); border-color:#38BDF8; color:#38BDF8;">${escapeHtml(proj.category || 'Web Portal')}</span>
            <span class="case-title-txt">${escapeHtml(proj.title)}</span>
          </div>
          <div class="flex-gap align-center">
            <a href="${escapeHtml(proj.liveUrl)}" target="_blank" rel="noopener noreferrer" class="btn-link text-sky-400 text-xs" onclick="event.stopPropagation()">🔗 Test Live Link ↗</a>
            <button type="button" class="btn-delete-icon" onclick="event.stopPropagation(); deleteWebProject(${idx});">🗑️</button>
            <span class="accordion-arrow">▼</span>
          </div>
        </div>

        <div class="case-body-content hidden">
          <input type="hidden" class="proj-id" value="${escapeHtml(proj.id || ('proj-' + (idx + 1)))}">

          <div class="form-row-2">
            <div class="form-group">
              <label>Website Title</label>
              <input type="text" class="admin-input proj-title" value="${escapeHtml(proj.title)}">
            </div>
            <div class="form-group">
              <label>Client / Brand Organization</label>
              <input type="text" class="admin-input proj-client" value="${escapeHtml(proj.client || '')}">
            </div>
          </div>

          <div class="form-row-3">
            <div class="form-group">
              <label>Project Category</label>
              <select class="admin-select proj-category">
                ${catOptionsHtml}
              </select>
            </div>
            <div class="form-group">
              <label>Key Impact Metric Pill</label>
              <input type="text" class="admin-input proj-metrics" value="${escapeHtml(proj.metrics || '')}" placeholder="e.g. +42% Direct Bookings">
            </div>
            <div class="form-group">
              <label>CTA Button Text</label>
              <input type="text" class="admin-input proj-ctaText" value="${escapeHtml(proj.ctaText || 'Visit Live Website ↗')}">
            </div>
          </div>

          <div class="form-row-2">
            <div class="form-group">
              <label>Live URL (Destination when clicked)</label>
              <input type="url" class="admin-input proj-liveUrl" value="${escapeHtml(proj.liveUrl)}" placeholder="https://example.com">
            </div>
            <div class="form-group">
              <label>Preview Image URL</label>
              <input type="url" class="admin-input proj-previewImage" value="${escapeHtml(proj.previewImage)}">
            </div>
          </div>

          <div class="form-group">
            <label>Project Highlights / Overview</label>
            <textarea class="admin-textarea proj-highlights" rows="2">${escapeHtml(proj.highlights || '')}</textarea>
          </div>

          <div class="form-group mb-0">
            <label>Tech Stack Pills (Comma separated)</label>
            <input type="text" class="admin-input proj-techStack" value="${escapeHtml(techStr)}" placeholder="e.g. Next.js, React, Tailwind CSS, Stripe">
          </div>
        </div>
      </div>
    `;
  }).join('');
}

window.addNewWebProject = function() {
  const current = getWebProjectsFromForms();
  current.push({
    id: 'proj-' + (current.length + 1),
    title: 'New Deployed Web Platform',
    client: 'Enterprise Client',
    category: 'E-Commerce',
    liveUrl: 'https://example.com',
    previewImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    techStack: ['Next.js', 'Tailwind CSS', 'Node.js'],
    highlights: 'High-performance web portal built with modern web architecture and 95+ PageSpeed.',
    metrics: '99/100 Speed',
    ctaText: 'Visit Live Website ↗'
  });
  renderWebProjectsEditor(current);
  markDirty();
};

window.deleteWebProject = function(idx) {
  if (confirm('Delete this web project?')) {
    const current = getWebProjectsFromForms();
    current.splice(idx, 1);
    renderWebProjectsEditor(current);
    markDirty();
  }
};

function getWebProjectsFromForms() {
  const cards = document.querySelectorAll('#webProjectsEditorContainer .case-item-card');
  const projects = [];

  cards.forEach((card, idx) => {
    const id = card.querySelector('.proj-id')?.value || ('proj-' + (idx + 1));
    const title = card.querySelector('.proj-title')?.value.trim() || 'Untitled Project';
    const client = card.querySelector('.proj-client')?.value.trim() || 'Client';
    const category = card.querySelector('.proj-category')?.value || 'Corporate / B2B';
    const liveUrl = card.querySelector('.proj-liveUrl')?.value.trim() || 'https://example.com';
    const previewImage = card.querySelector('.proj-previewImage')?.value.trim() || '';
    const highlights = card.querySelector('.proj-highlights')?.value.trim() || '';
    const metrics = card.querySelector('.proj-metrics')?.value.trim() || '';
    const ctaText = card.querySelector('.proj-ctaText')?.value.trim() || 'Visit Live Website ↗';

    const techStr = card.querySelector('.proj-techStack')?.value || '';
    const techStack = techStr.split(',').map(t => t.trim()).filter(Boolean);

    projects.push({ id, title, client, category, liveUrl, previewImage, techStack, highlights, metrics, ctaText });
  });

  return projects;
}

/* --- C. Creative Media Studio Editor --- */
function renderCreativeEditor(items) {
  const container = document.getElementById('creativeEditorContainer');
  if (!container) return;

  container.innerHTML = items.map((item, idx) => `
    <div class="case-item-card" data-creative-idx="${idx}">
      <div class="case-header-row" onclick="toggleAccordion(this)">
        <div class="case-header-left">
          <span class="case-badge-pill" style="color:#A855F7; border-color:#A855F7;">${escapeHtml(item.category || 'Creative')}</span>
          <span class="case-title-txt">${escapeHtml(item.title)}</span>
        </div>
        <div class="flex-gap align-center">
          <button type="button" class="btn-delete-icon" onclick="event.stopPropagation(); deleteCreativeItem(${idx});">🗑️</button>
          <span class="accordion-arrow">▼</span>
        </div>
      </div>
      <div class="case-body-content hidden">
        <div class="form-row-2">
          <div class="form-group">
            <label>Title</label>
            <input type="text" class="admin-input cr-title" value="${escapeHtml(item.title)}">
          </div>
          <div class="form-group">
            <label>Category Badge</label>
            <input type="text" class="admin-input cr-category" value="${escapeHtml(item.category)}">
          </div>
        </div>
        <div class="form-group">
          <label>Image URL</label>
          <input type="url" class="admin-input cr-image" value="${escapeHtml(item.image)}">
        </div>
        <div class="form-group mb-0">
          <label>Description</label>
          <textarea class="admin-textarea cr-desc" rows="2">${escapeHtml(item.description)}</textarea>
        </div>
      </div>
    </div>
  `).join('');
}

window.addNewCreativeItem = function() {
  const current = getCreativeFromForms();
  current.push({
    title: 'New Creative Studio Project',
    category: 'Graphics Design',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
    description: 'Visual identity system and brand guidelines.'
  });
  renderCreativeEditor(current);
  markDirty();
};

window.deleteCreativeItem = function(idx) {
  if (confirm('Delete this creative portfolio item?')) {
    const current = getCreativeFromForms();
    current.splice(idx, 1);
    renderCreativeEditor(current);
    markDirty();
  }
};

function getCreativeFromForms() {
  const cards = document.querySelectorAll('#creativeEditorContainer .case-item-card');
  const items = [];
  cards.forEach(card => {
    const title = card.querySelector('.cr-title')?.value.trim() || '';
    const category = card.querySelector('.cr-category')?.value.trim() || 'Creative';
    const image = card.querySelector('.cr-image')?.value.trim() || '';
    const description = card.querySelector('.cr-desc')?.value.trim() || '';
    items.push({ title, category, image, description });
  });
  return items;
}

/* --- D. 4-Stage Process Editor --- */
function renderProcessEditor(steps) {
  const container = document.getElementById('processEditorContainer');
  if (!container) return;

  container.innerHTML = steps.map((s, idx) => `
    <div class="case-item-card">
      <div class="case-header-row" onclick="toggleAccordion(this)">
        <div class="case-header-left">
          <span class="case-badge-pill">${escapeHtml(s.step)}</span>
          <span class="case-title-txt">${escapeHtml(s.title)}</span>
        </div>
        <span class="accordion-arrow">▼</span>
      </div>
      <div class="case-body-content hidden">
        <div class="form-row-2">
          <div class="form-group">
            <label>Step Number</label>
            <input type="text" class="admin-input proc-step" value="${escapeHtml(s.step)}">
          </div>
          <div class="form-group">
            <label>Stage Title</label>
            <input type="text" class="admin-input proc-title" value="${escapeHtml(s.title)}">
          </div>
        </div>
        <div class="form-group mb-0">
          <label>Stage Description</label>
          <textarea class="admin-textarea proc-desc" rows="2">${escapeHtml(s.description)}</textarea>
        </div>
      </div>
    </div>
  `).join('');
}

function getProcessFromForms() {
  const cards = document.querySelectorAll('#processEditorContainer .case-item-card');
  const steps = [];
  cards.forEach(card => {
    const step = card.querySelector('.proc-step')?.value.trim() || '01';
    const title = card.querySelector('.proc-title')?.value.trim() || '';
    const description = card.querySelector('.proc-desc')?.value.trim() || '';
    steps.push({ step, title, description });
  });
  return steps;
}

/* --- E. Testimonials Editor --- */
function renderTestimonialsEditor(testimonials) {
  const container = document.getElementById('testimonialsEditorContainer');
  if (!container) return;

  container.innerHTML = testimonials.map((t, idx) => `
    <div class="case-item-card" data-testimonial-idx="${idx}">
      <div class="case-header-row" onclick="toggleAccordion(this)">
        <div class="case-header-left">
          <span class="case-badge-pill">⭐ Quote</span>
          <span class="case-title-txt">${escapeHtml(t.author)} (${escapeHtml(t.organization)})</span>
        </div>
        <div class="flex-gap align-center">
          <button type="button" class="btn-delete-icon" onclick="event.stopPropagation(); deleteTestimonial(${idx});">🗑️</button>
          <span class="accordion-arrow">▼</span>
        </div>
      </div>
      <div class="case-body-content hidden">
        <div class="form-group">
          <label>Client Endorsement Quote</label>
          <textarea class="admin-textarea test-quote" rows="3">${escapeHtml(t.quote)}</textarea>
        </div>
        <div class="form-row-3">
          <div class="form-group">
            <label>Author Name</label>
            <input type="text" class="admin-input test-author" value="${escapeHtml(t.author)}">
          </div>
          <div class="form-group">
            <label>Organization / Company</label>
            <input type="text" class="admin-input test-org" value="${escapeHtml(t.organization)}">
          </div>
          <div class="form-group">
            <label>Role / Position</label>
            <input type="text" class="admin-input test-role" value="${escapeHtml(t.role)}">
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

window.addNewTestimonialItem = function() {
  const current = getTestimonialsFromForms();
  current.push({
    quote: 'Outstanding creative and digital execution.',
    author: 'Client Name',
    organization: 'Company Name',
    role: 'Managing Director'
  });
  renderTestimonialsEditor(current);
  markDirty();
};

window.deleteTestimonial = function(idx) {
  if (confirm('Delete this testimonial?')) {
    const current = getTestimonialsFromForms();
    current.splice(idx, 1);
    renderTestimonialsEditor(current);
    markDirty();
  }
};

function getTestimonialsFromForms() {
  const cards = document.querySelectorAll('#testimonialsEditorContainer .case-item-card');
  const list = [];
  cards.forEach(card => {
    const quote = card.querySelector('.test-quote')?.value.trim() || '';
    const author = card.querySelector('.test-author')?.value.trim() || '';
    const organization = card.querySelector('.test-org')?.value.trim() || '';
    const role = card.querySelector('.test-role')?.value.trim() || '';
    list.push({ quote, author, organization, role });
  });
  return list;
}

// ==========================================
// 8.1 HEADER & MENU NAVIGATION EDITOR
// ==========================================
let currentMenuData = null;

function renderMenuEditor(menu) {
  currentMenuData = menu || {
    brand: { name: 'Md. Shakibur Rahaman', avatarText: 'SR', status: 'Available for Q3/Q4 Advisory & Execution' },
    items: [
      { id: 'nav-home', label: 'Home', url: '/', isExternal: false, order: 1 },
      { id: 'nav-about', label: 'About Me', url: '/about.html', isExternal: false, order: 2 },
      { id: 'nav-services', label: 'Services', url: '/services.html', isExternal: false, order: 3, hasDropdown: true },
      { id: 'nav-projects', label: 'Projects', url: '/projects.html', isExternal: false, order: 4 },
      { id: 'nav-casestudies', label: 'Case Studies', url: '/case-studies.html', isExternal: false, order: 5 },
      { id: 'nav-contact', label: 'Contact', url: '/contact.html', isExternal: false, order: 6 }
    ],
    ctaButton: { label: "Let's Talk", url: '/contact.html', icon: 'fa-arrow-up-right-from-square', isExternal: false }
  };

  const brand = currentMenuData.brand || {};
  setValue('menu_brandName', brand.name || 'Md. Shakibur Rahaman');
  setValue('menu_brandAvatar', brand.avatarText || 'SR');
  setValue('menu_brandStatus', brand.status || 'Available for Q3/Q4 Advisory & Execution');

  const cta = currentMenuData.ctaButton || {};
  setValue('menu_ctaLabel', cta.label || "Let's Talk");
  setValue('menu_ctaUrl', cta.url || '/contact.html');
  setValue('menu_ctaIcon', cta.icon || 'fa-arrow-up-right-from-square');
  const ctaExt = document.getElementById('menu_ctaExternal');
  if (ctaExt) ctaExt.checked = !!cta.isExternal;

  renderMenuItemsList(currentMenuData.items || []);
}

function renderMenuItemsList(items) {
  const container = document.getElementById('menuItemsContainer');
  if (!container) return;

  container.innerHTML = items.map((item, idx) => `
    <div class="menu-item-row-card" data-menu-idx="${idx}">
      <div class="flex-between mb-2">
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold text-[#70805D] bg-[#70805D]/10 px-2 py-0.5 rounded">#${idx + 1}</span>
          <span class="text-xs font-bold text-[#2A3B27]">${escapeHtml(item.label || 'Link')}</span>
          <span class="text-[11px] text-[#55738D] font-mono">${escapeHtml(item.url || '/')}</span>
        </div>
        <div class="flex items-center gap-1.5">
          <button type="button" class="btn-move-arrow" title="Move Up" onclick="moveMenuItem(${idx}, -1)" ${idx === 0 ? 'disabled' : ''}>▲</button>
          <button type="button" class="btn-move-arrow" title="Move Down" onclick="moveMenuItem(${idx}, 1)" ${idx === items.length - 1 ? 'disabled' : ''}>▼</button>
          <button type="button" class="btn-delete-icon ml-2" title="Delete Nav Item" onclick="deleteMenuItem(${idx})">🗑️</button>
        </div>
      </div>
      <div class="form-row-2">
        <div class="form-group mb-2">
          <label>Display Label</label>
          <input type="text" class="admin-input menu-item-label" value="${escapeHtml(item.label || '')}" oninput="markDirty()">
        </div>
        <div class="form-group mb-2">
          <label>Destination URL</label>
          <input type="text" class="admin-input menu-item-url" value="${escapeHtml(item.url || '')}" oninput="markDirty()">
        </div>
      </div>
      <div class="flex items-center gap-6 mt-1 text-xs">
        <label class="flex items-center gap-2 cursor-pointer text-[#4D614A] font-semibold">
          <input type="checkbox" class="admin-checkbox menu-item-dropdown" ${item.hasDropdown ? 'checked' : ''} onchange="markDirty()">
          <span>Has Services Dropdown</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer text-[#4D614A] font-semibold">
          <input type="checkbox" class="admin-checkbox menu-item-external" ${item.isExternal ? 'checked' : ''} onchange="markDirty()">
          <span>External Link (New Tab)</span>
        </label>
      </div>
    </div>
  `).join('');
}

window.addNewMenuItem = function() {
  const currentItems = getMenuItemsFromDOM();
  currentItems.push({
    id: 'nav-' + Date.now(),
    label: 'New Link',
    url: '/new-page.html',
    isExternal: false,
    hasDropdown: false,
    order: currentItems.length + 1
  });
  if (currentMenuData) currentMenuData.items = currentItems;
  renderMenuItemsList(currentItems);
  markDirty();
};

window.deleteMenuItem = function(idx) {
  const currentItems = getMenuItemsFromDOM();
  if (confirm(`Remove "${currentItems[idx]?.label || 'this link'}" from the menu?`)) {
    currentItems.splice(idx, 1);
    if (currentMenuData) currentMenuData.items = currentItems;
    renderMenuItemsList(currentItems);
    markDirty();
  }
};

window.moveMenuItem = function(idx, direction) {
  const currentItems = getMenuItemsFromDOM();
  const targetIdx = idx + direction;
  if (targetIdx < 0 || targetIdx >= currentItems.length) return;
  const temp = currentItems[idx];
  currentItems[idx] = currentItems[targetIdx];
  currentItems[targetIdx] = temp;
  if (currentMenuData) currentMenuData.items = currentItems;
  renderMenuItemsList(currentItems);
  markDirty();
};

function getMenuItemsFromDOM() {
  const rows = document.querySelectorAll('#menuItemsContainer .menu-item-row-card');
  const items = [];
  rows.forEach((row, idx) => {
    items.push({
      id: 'nav-' + idx,
      label: row.querySelector('.menu-item-label')?.value.trim() || '',
      url: row.querySelector('.menu-item-url')?.value.trim() || '/',
      hasDropdown: row.querySelector('.menu-item-dropdown')?.checked || false,
      isExternal: row.querySelector('.menu-item-external')?.checked || false,
      order: idx + 1
    });
  });
  return items;
}

function getMenuFromForms() {
  return {
    brand: {
      name: document.getElementById('menu_brandName')?.value.trim() || 'Md. Shakibur Rahaman',
      avatarText: document.getElementById('menu_brandAvatar')?.value.trim() || 'SR',
      status: document.getElementById('menu_brandStatus')?.value.trim() || 'Available for Q3/Q4 Advisory & Execution'
    },
    ctaButton: {
      label: document.getElementById('menu_ctaLabel')?.value.trim() || "Let's Talk",
      url: document.getElementById('menu_ctaUrl')?.value.trim() || '/contact.html',
      icon: document.getElementById('menu_ctaIcon')?.value.trim() || 'fa-arrow-up-right-from-square',
      isExternal: document.getElementById('menu_ctaExternal')?.checked || false
    },
    items: getMenuItemsFromDOM()
  };
}

// ==========================================
// 8.2 PAGE-BY-PAGE CONTENT & FIGURES EDITOR
// ==========================================
let activePageEditorKey = 'home';
let currentPagesData = null;

function renderPageByPageEditor(pages, selectedKey) {
  currentPagesData = pages || {};
  activePageEditorKey = selectedKey || activePageEditorKey || 'home';

  // Update pills active state
  document.querySelectorAll('.page-pill-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-page-key') === activePageEditorKey);
  });

  const page = currentPagesData[activePageEditorKey] || {};
  const indicator = document.getElementById('activePageIndicator');
  if (indicator) indicator.textContent = `Editing: ${page.pageName || activePageEditorKey}`;

  // Populate fields
  setValue('page_heroBadge', page.heroBadge || '');
  setValue('page_heroTitle', page.heroTitle || '');
  setValue('page_heroSubtitle', page.heroSubtitle || page.heroTagline || '');
  setValue('page_heroBio', page.heroBio || '');

  setValue('page_primaryBtnLabel', page.primaryBtn?.label || '');
  setValue('page_primaryBtnUrl', page.primaryBtn?.url || '');
  setValue('page_secondaryBtnLabel', page.secondaryBtn?.label || '');
  setValue('page_secondaryBtnUrl', page.secondaryBtn?.url || '');

  setValue('page_ctaHeading', page.bottomCta?.heading || '');
  setValue('page_ctaSubheading', page.bottomCta?.subheading || '');
  setValue('page_ctaBtnLabel', page.bottomCta?.btnLabel || '');
  setValue('page_ctaBtnUrl', page.bottomCta?.btnUrl || '');

  // Render Figures
  renderPageFigures(page.figures || []);
}

window.selectPageEditor = function(pageKey) {
  if (pageKey === activePageEditorKey) return;
  // Save current form fields to in-memory pages object before switching
  saveActivePageFormToMemory();
  activePageEditorKey = pageKey;
  renderPageByPageEditor(currentPagesData, pageKey);
};

function saveActivePageFormToMemory() {
  if (!currentPagesData) currentPagesData = {};
  const prevPage = currentPagesData[activePageEditorKey] || {};

  currentPagesData[activePageEditorKey] = {
    ...prevPage,
    pageName: prevPage.pageName || activePageEditorKey,
    heroBadge: document.getElementById('page_heroBadge')?.value.trim() || '',
    heroTitle: document.getElementById('page_heroTitle')?.value.trim() || '',
    heroSubtitle: document.getElementById('page_heroSubtitle')?.value.trim() || '',
    heroBio: document.getElementById('page_heroBio')?.value.trim() || '',
    primaryBtn: {
      label: document.getElementById('page_primaryBtnLabel')?.value.trim() || '',
      url: document.getElementById('page_primaryBtnUrl')?.value.trim() || ''
    },
    secondaryBtn: {
      label: document.getElementById('page_secondaryBtnLabel')?.value.trim() || '',
      url: document.getElementById('page_secondaryBtnUrl')?.value.trim() || ''
    },
    figures: getPageFiguresFromDOM(),
    bottomCta: {
      heading: document.getElementById('page_ctaHeading')?.value.trim() || '',
      subheading: document.getElementById('page_ctaSubheading')?.value.trim() || '',
      btnLabel: document.getElementById('page_ctaBtnLabel')?.value.trim() || '',
      btnUrl: document.getElementById('page_ctaBtnUrl')?.value.trim() || ''
    }
  };
}

function renderPageFigures(figures) {
  const container = document.getElementById('pageFiguresContainer');
  if (!container) return;

  if (!figures || !figures.length) {
    container.innerHTML = '<div class="empty-state-sm">No figures configured for this page yet. Click "+ Add Figure Metric" above to create one.</div>';
    return;
  }

  container.innerHTML = figures.map((fig, idx) => `
    <div class="figure-item-card" data-fig-idx="${idx}">
      <div class="flex-between mb-2">
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold text-[#70805D] bg-[#70805D]/10 px-2 py-0.5 rounded">Figure #${idx + 1}</span>
          <span class="text-xs font-black text-[#1C2B1B]">${escapeHtml(fig.value || '0')}</span>
          <span class="text-xs font-semibold text-[#4D614A]">${escapeHtml(fig.label || 'Metric')}</span>
        </div>
        <div class="flex items-center gap-1.5">
          <button type="button" class="btn-move-arrow" title="Move Up" onclick="movePageFigure(${idx}, -1)" ${idx === 0 ? 'disabled' : ''}>▲</button>
          <button type="button" class="btn-move-arrow" title="Move Down" onclick="movePageFigure(${idx}, 1)" ${idx === figures.length - 1 ? 'disabled' : ''}>▼</button>
          <button type="button" class="btn-delete-icon ml-2" title="Delete Figure" onclick="deletePageFigure(${idx})">🗑️</button>
        </div>
      </div>
      <div class="form-row-3 mb-2">
        <div class="form-group mb-1">
          <label>Metric Number / Value (e.g. 5+, 15+, 4.8x)</label>
          <input type="text" class="admin-input fig-value" value="${escapeHtml(fig.value || '')}" placeholder="5+" oninput="markDirty()">
        </div>
        <div class="form-group mb-1">
          <label>Prefix (optional, e.g. $)</label>
          <input type="text" class="admin-input fig-prefix" value="${escapeHtml(fig.prefix || '')}" placeholder="" oninput="markDirty()">
        </div>
        <div class="form-group mb-1">
          <label>Suffix (e.g. + Years, %, x, +)</label>
          <input type="text" class="admin-input fig-suffix" value="${escapeHtml(fig.suffix || '')}" placeholder="+ Years" oninput="markDirty()">
        </div>
      </div>
      <div class="form-row-2">
        <div class="form-group mb-0">
          <label>Primary Metric Label</label>
          <input type="text" class="admin-input fig-label" value="${escapeHtml(fig.label || '')}" placeholder="Years Experience" oninput="markDirty()">
        </div>
        <div class="form-group mb-0">
          <label>Sublabel / Context</label>
          <input type="text" class="admin-input fig-sublabel" value="${escapeHtml(fig.sublabel || '')}" placeholder="Agency Leadership" oninput="markDirty()">
        </div>
      </div>
    </div>
  `).join('');
}

window.addNewPageFigure = function() {
  const currentFigs = getPageFiguresFromDOM();
  currentFigs.push({
    id: 'fig-' + Date.now(),
    value: '10+',
    prefix: '',
    suffix: '+',
    label: 'New Metric',
    sublabel: 'Verified Achievement'
  });
  if (currentPagesData && currentPagesData[activePageEditorKey]) {
    currentPagesData[activePageEditorKey].figures = currentFigs;
  }
  renderPageFigures(currentFigs);
  markDirty();
};

window.deletePageFigure = function(idx) {
  const currentFigs = getPageFiguresFromDOM();
  if (confirm(`Remove this figure metric?`)) {
    currentFigs.splice(idx, 1);
    if (currentPagesData && currentPagesData[activePageEditorKey]) {
      currentPagesData[activePageEditorKey].figures = currentFigs;
    }
    renderPageFigures(currentFigs);
    markDirty();
  }
};

window.movePageFigure = function(idx, direction) {
  const currentFigs = getPageFiguresFromDOM();
  const targetIdx = idx + direction;
  if (targetIdx < 0 || targetIdx >= currentFigs.length) return;
  const temp = currentFigs[idx];
  currentFigs[idx] = currentFigs[targetIdx];
  currentFigs[targetIdx] = temp;
  if (currentPagesData && currentPagesData[activePageEditorKey]) {
    currentPagesData[activePageEditorKey].figures = currentFigs;
  }
  renderPageFigures(currentFigs);
  markDirty();
};

function getPageFiguresFromDOM() {
  const cards = document.querySelectorAll('#pageFiguresContainer .figure-item-card');
  const figures = [];
  cards.forEach((card, idx) => {
    figures.push({
      id: 'fig-' + activePageEditorKey + '-' + idx,
      value: card.querySelector('.fig-value')?.value.trim() || '',
      prefix: card.querySelector('.fig-prefix')?.value.trim() || '',
      suffix: card.querySelector('.fig-suffix')?.value.trim() || '',
      label: card.querySelector('.fig-label')?.value.trim() || '',
      sublabel: card.querySelector('.fig-sublabel')?.value.trim() || ''
    });
  });
  return figures;
}

function getPagesFromForms() {
  saveActivePageFormToMemory();
  return currentPagesData || {};
}

/* --- F. Typewriter Phrases Editor --- */
function renderTypewriterList(phrases) {
  const container = document.getElementById('typewriterList');
  if (!container) return;

  container.innerHTML = phrases.map((phrase) => `
    <div class="dynamic-row">
      <input type="text" class="admin-input typewriter-input" value="${escapeHtml(phrase)}">
      <button type="button" class="btn-delete-icon" onclick="this.parentElement.remove(); markDirty();">✕</button>
    </div>
  `).join('');
}

window.addTypewriterPhrase = function() {
  const container = document.getElementById('typewriterList');
  if (!container) return;
  const row = document.createElement('div');
  row.className = 'dynamic-row';
  row.innerHTML = `
    <input type="text" class="admin-input typewriter-input" value="" placeholder="New animated service phrase">
    <button type="button" class="btn-delete-icon" onclick="this.parentElement.remove(); markDirty();">✕</button>
  `;
  container.appendChild(row);
  markDirty();
};

function getTypewriterPhrases() {
  const inputs = document.querySelectorAll('#typewriterList .typewriter-input');
  return Array.from(inputs).map(inp => inp.value.trim()).filter(Boolean);
}

/* --- G. Stats Cards Editor --- */
function renderStatsEditor(stats) {
  const container = document.getElementById('statsEditorContainer');
  if (!container) return;

  container.innerHTML = (stats || []).map((s, idx) => `
    <div class="stat-edit-box p-3 rounded-xl bg-slate-950/60 border border-slate-800" data-stat-idx="${idx}">
      <input type="hidden" class="stat-id" value="${s.id || (idx + 1)}">
      <div class="form-group mb-2">
        <label class="text-[11px]">Metric Value</label>
        <input type="text" class="admin-input stat-val" value="${escapeHtml(s.value || '')}" placeholder="e.g. 15+">
      </div>
      <div class="form-group mb-2">
        <label class="text-[11px]">Metric Title</label>
        <input type="text" class="admin-input stat-lbl" value="${escapeHtml(s.label || '')}" placeholder="e.g. Live Web Portals">
      </div>
      <div class="form-group mb-0">
        <label class="text-[11px]">Sublabel / Context</label>
        <input type="text" class="admin-input stat-sub" value="${escapeHtml(s.sublabel || '')}" placeholder="e.g. Deployed & Active">
      </div>
    </div>
  `).join('');
}

function getStatsFromForms() {
  const boxes = document.querySelectorAll('#statsEditorContainer .stat-edit-box');
  const stats = [];
  boxes.forEach((box, idx) => {
    const id = box.querySelector('.stat-id')?.value || String(idx + 1);
    const value = box.querySelector('.stat-val')?.value.trim() || '0';
    const label = box.querySelector('.stat-lbl')?.value.trim() || 'Stat';
    const sublabel = box.querySelector('.stat-sub')?.value.trim() || '';
    stats.push({ id, value, label, sublabel });
  });
  return stats;
}

// ==========================================
// 8. LEADS INBOX & CSV EXPORT
// ==========================================
function renderLeads(leads) {
  const container = document.getElementById('leadsTableContainer');
  if (!container) return;

  if (!leads || leads.length === 0) {
    container.innerHTML = '<div class="empty-state">No client inquiries found yet.</div>';
    return;
  }

  const rows = leads.slice().reverse().map((lead, idx) => {
    const dateStr = new Date(lead.date || Date.now()).toLocaleDateString();
    const actualIdx = leads.length - 1 - idx;
    return `
      <tr>
        <td>${dateStr}</td>
        <td><strong>${escapeHtml(lead.name || 'Anonymous')}</strong></td>
        <td>
          <a href="mailto:${escapeHtml(lead.email)}" class="btn-link">${escapeHtml(lead.email || 'N/A')}</a>
          <br><small class="text-dim">${escapeHtml(lead.phone || '')}</small>
        </td>
        <td><span class="badge-tag">${escapeHtml(lead.services || 'All Services')}</span></td>
        <td>${escapeHtml(lead.budget || 'N/A')}</td>
        <td class="lead-msg-cell" title="${escapeHtml(lead.message)}">${escapeHtml(lead.message || '')}</td>
        <td>
          <button type="button" class="btn-delete-icon" onclick="deleteLead(${actualIdx})">🗑️</button>
        </td>
      </tr>
    `;
  }).join('');

  container.innerHTML = `
    <table class="admin-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Name</th>
          <th>Contact</th>
          <th>Services Requested</th>
          <th>Budget Scope</th>
          <th>Project Brief</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
}

window.deleteLead = async function(idx) {
  if (confirm('Delete this client inquiry permanently?')) {
    currentLeads.splice(idx, 1);
    try {
      await fetch('/api/leads', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(currentLeads)
      });
      renderLeads(currentLeads);
      updateOverviewStats();
      showToast('Lead deleted.', 'info');
    } catch (e) {
      showToast('Failed to delete lead.', 'error');
    }
  }
};

function filterLeads(query) {
  if (!query) {
    renderLeads(currentLeads);
    return;
  }
  const q = query.toLowerCase();
  const filtered = currentLeads.filter(l => 
    (l.name && l.name.toLowerCase().includes(q)) ||
    (l.email && l.email.toLowerCase().includes(q)) ||
    (l.services && l.services.toLowerCase().includes(q)) ||
    (l.message && l.message.toLowerCase().includes(q))
  );
  renderLeads(filtered);
}

function exportLeadsCsv() {
  if (!currentLeads || currentLeads.length === 0) {
    alert('No inquiries available to export.');
    return;
  }
  const headers = ['Date', 'Name', 'Email', 'Phone', 'Services', 'Budget', 'Message'];
  const rows = currentLeads.map(l => [
    `"${l.date || ''}"`,
    `"${(l.name || '').replace(/"/g, '""')}"`,
    `"${(l.email || '').replace(/"/g, '""')}"`,
    `"${(l.phone || '').replace(/"/g, '""')}"`,
    `"${(l.services || '').replace(/"/g, '""')}"`,
    `"${(l.budget || '').replace(/"/g, '""')}"`,
    `"${(l.message || '').replace(/"/g, '""')}"`
  ]);
  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const link = document.createElement('a');
  link.setAttribute('href', encodeURI(csvContent));
  link.setAttribute('download', `shakibur_leads_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

// ==========================================
// 9. SEO HELPERS & SIMULATORS
// ==========================================
function updateGoogleSerpPreview() {
  const title = document.getElementById('seo_pageTitle')?.value || 'Md. Shakibur Rahaman | 360° Creative Director & Digital Growth Architect';
  const desc = document.getElementById('seo_metaDescription')?.value || 'Senior Creative Director & Full-Stack Growth Strategist.';
  const url = document.getElementById('seo_canonicalUrl')?.value || 'http://localhost:5500/';

  const prevTitle = document.getElementById('previewSeoTitle');
  if (prevTitle) prevTitle.textContent = title;

  const prevDesc = document.getElementById('previewSeoDesc');
  if (prevDesc) prevDesc.textContent = desc;

  const prevUrl = document.getElementById('previewSeoUrl');
  if (prevUrl) prevUrl.textContent = url.replace(/^https?:\/\//i, '') + ' › md-shakibur-rahaman';

  const titleCount = document.getElementById('titleCharCount');
  if (titleCount) titleCount.textContent = `${title.length} / 60 chars`;

  const descCount = document.getElementById('descCharCount');
  if (descCount) descCount.textContent = `${desc.length} / 160 chars`;
}

function calculateSeoScore() {
  let score = 70;
  const title = document.getElementById('seo_pageTitle')?.value || '';
  const desc = document.getElementById('seo_metaDescription')?.value || '';
  const kw = document.getElementById('seo_primaryKeyword')?.value || '';
  const ai = document.getElementById('seo_aiSummary')?.value || '';

  if (title.length >= 40 && title.length <= 65) score += 10;
  if (desc.length >= 120 && desc.length <= 165) score += 10;
  if (kw.length > 5) score += 5;
  if (ai.length > 50) score += 5;

  const scoreEl = document.getElementById('seoLiveScore');
  if (scoreEl) scoreEl.textContent = `SEO Score: ${Math.min(100, score)}/100`;
}

window.autoGenerateLlmsTxt = function() {
  const name = document.getElementById('prof_name')?.value || 'Md. Shakibur Rahaman';
  const bio = document.getElementById('prof_bio')?.value || '';
  const email = document.getElementById('prof_email')?.value || 'shakibur188@gmail.com';
  const phone = document.getElementById('prof_phone')?.value || '+880 1838-070468';
  const location = document.getElementById('prof_location')?.value || 'Dhaka, Bangladesh';

  const services = getServicesFromForms();
  const webProjects = getWebProjectsFromForms();

  let text = `# ${name} - 360° Creative Director & Digital Growth Architect\n\n`;
  text += `> ${bio}\n\n`;
  text += `## 8 Core Specialized Services\n`;
  services.forEach((s, idx) => {
    text += `${idx + 1}. **${s.title}**: ${s.description} Deliverables: ${(s.deliverables || []).join('; ')}.\n`;
  });
  text += `\n## 15 Deployed Web Development Portals\n`;
  webProjects.forEach((p, idx) => {
    text += `${idx + 1}. **${p.title}** (${p.category}) - Client: ${p.client}. URL: ${p.liveUrl}. Metric: ${p.metrics}. Tech: ${(p.techStack || []).join(', ')}.\n`;
  });
  text += `\n## Verified Contact\n- Email: ${email}\n- Phone / WhatsApp: ${phone}\n- Location: ${location}\n- Website: http://localhost:5500/\n`;

  const llmsEl = document.getElementById('seo_llmsTxtContent');
  if (llmsEl) {
    llmsEl.value = text;
    markDirty();
    showToast('Auto-generated /llms.txt content from site services & projects!', 'success');
  }
};

window.formatSchemaJson = function() {
  const el = document.getElementById('seo_schemaJson');
  if (!el) return;
  try {
    const obj = JSON.parse(el.value);
    el.value = JSON.stringify(obj, null, 2);
    showToast('Schema JSON formatted nicely.', 'success');
  } catch (e) {
    showToast('Invalid JSON syntax in Schema.', 'error');
  }
};

// ==========================================
// 10. GATHER CONTENT FROM FORMS
// ==========================================
function gatherContentFromForms() {
  let schemaParsed = null;
  try {
    const rawSchema = document.getElementById('seo_schemaJson')?.value.trim();
    if (rawSchema) schemaParsed = JSON.parse(rawSchema);
  } catch (e) {
    schemaParsed = currentContent?.seo?.schemaJson || {};
  }

  return {
    seo: {
      pageTitle: document.getElementById('seo_pageTitle')?.value.trim() || '',
      metaDescription: document.getElementById('seo_metaDescription')?.value.trim() || '',
      primaryKeyword: document.getElementById('seo_primaryKeyword')?.value.trim() || '',
      secondaryKeywords: document.getElementById('seo_secondaryKeywords')?.value.trim() || '',
      targetAiQueries: document.getElementById('seo_targetAiQueries')?.value.trim() || '',
      metaKeywords: document.getElementById('seo_secondaryKeywords')?.value.trim() || '',
      author: document.getElementById('seo_author')?.value.trim() || 'Md. Shakibur Rahaman',
      canonicalUrl: document.getElementById('seo_canonicalUrl')?.value.trim() || 'http://localhost:5500/',
      robots: document.getElementById('seo_robots')?.value.trim() || 'index, follow, max-image-preview:large',
      ogTitle: document.getElementById('seo_ogTitle')?.value.trim() || '',
      ogDescription: document.getElementById('seo_ogDescription')?.value.trim() || '',
      ogImage: document.getElementById('seo_ogImage')?.value.trim() || '',
      twitterCard: document.getElementById('seo_twitterCard')?.value || 'summary_large_image',
      googleSiteVerification: document.getElementById('seo_googleSiteVerification')?.value.trim() || '',
      gtmId: document.getElementById('seo_gtmId')?.value.trim() || '',
      googleAnalyticsId: document.getElementById('seo_googleAnalyticsId')?.value.trim() || '',
      metaPixelId: document.getElementById('seo_metaPixelId')?.value.trim() || '',
      customHeadScript: document.getElementById('seo_customHeadScript')?.value || '',
      customBodyScript: document.getElementById('seo_customBodyScript')?.value || '',
      schemaJson: schemaParsed,
      aiSeo: {
        enabled: true,
        aiSummary: document.getElementById('seo_aiSummary')?.value.trim() || '',
        targetAiQueries: document.getElementById('seo_targetAiQueries')?.value.trim() || '',
        allowAiCrawlers: document.getElementById('seo_allowAiCrawlers')?.checked !== false,
        llmsTxtContent: document.getElementById('seo_llmsTxtContent')?.value || ''
      }
    },
    profile: {
      name: document.getElementById('prof_name')?.value.trim() || 'Md. Shakibur Rahaman',
      eyebrow: document.getElementById('prof_eyebrow')?.value.trim() || '360° CREATIVE DIRECTOR',
      headline: document.getElementById('prof_headline')?.value.trim() || '',
      bio: document.getElementById('prof_bio')?.value.trim() || '',
      statusBadge: document.getElementById('prof_statusBadge')?.value.trim() || '',
      location: document.getElementById('prof_location')?.value.trim() || 'Dhaka, Bangladesh',
      email: document.getElementById('prof_email')?.value.trim() || 'shakibur188@gmail.com',
      phone: document.getElementById('prof_phone')?.value.trim() || '+880 1838-070468',
      whatsapp: document.getElementById('prof_whatsapp')?.value.trim() || '8801838070468',
      linkedin: document.getElementById('prof_linkedin')?.value.trim() || '',
      github: currentContent?.profile?.github || 'https://github.com',
      resumePdfUrl: document.getElementById('prof_resumePdfUrl')?.value.trim() || '#'
    },
    typewriter: getTypewriterPhrases(),
    stats: getStatsFromForms(),
    services: getServicesFromForms(),
    webProjects: getWebProjectsFromForms(),
    creativePortfolio: getCreativeFromForms(),
    process: getProcessFromForms(),
    testimonials: getTestimonialsFromForms(),
    caseStudies: getCaseStudiesFromForms(),
    menu: getMenuFromForms(),
    pages: getPagesFromForms()
  };
}

// ==========================================
// 11. MANUAL-ONLY SAVE & PUBLISH
// ==========================================
async function saveAndPublish() {
  const saveBtn = document.getElementById('topSaveBtn');
  const floatingBtn = document.getElementById('floatingSaveBtn');

  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<span>Saving &amp; Publishing Live...</span>';
  }
  if (floatingBtn) {
    floatingBtn.disabled = true;
    floatingBtn.textContent = 'Publishing...';
  }

  const updatedContent = gatherContentFromForms();

  try {
    const res = await fetch('/api/content', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(updatedContent, null, 2)
    });

    const data = await res.json();
    if (res.ok && data.success) {
      currentContent = JSON.parse(JSON.stringify(updatedContent));
      initialContent = JSON.parse(JSON.stringify(updatedContent));
      try { localStorage.setItem('shakibur_content', JSON.stringify(updatedContent)); } catch (e) {}
      resetDirty();
      updateOverviewStats();
      showToast('🚀 Changes saved and published live to website!', 'success');
    } else {
      showToast(data.error || 'Failed to save changes.', 'error');
    }
  } catch (err) {
    console.error('Save error:', err);
    showToast('Failed to connect to backend server.', 'error');
  } finally {
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 01-2-2h11l5 5v11a2 2 0 01-2 2zM17 21v-8H7v8M7 3v5h8"/></svg><span>Save & Publish Live</span>`;
    }
    if (floatingBtn) {
      floatingBtn.disabled = false;
      floatingBtn.textContent = 'Save & Publish Live';
    }
  }
}

function discardChanges() {
  if (confirm('Discard all unsaved changes and revert to live content?')) {
    populateAdminForms(initialContent);
    resetDirty();
    showToast('Unsaved edits discarded.', 'info');
  }
}

function markDirty() {
  isDirty = true;
  document.getElementById('unsavedBar')?.classList.remove('hidden');
  document.getElementById('discardChangesBtn')?.classList.remove('hidden');
}

function resetDirty() {
  isDirty = false;
  document.getElementById('unsavedBar')?.classList.add('hidden');
  document.getElementById('discardChangesBtn')?.classList.add('hidden');
}

// ==========================================
// 12. BACKUP & RESTORE
// ==========================================
function downloadSiteBackup() {
  const content = gatherContentFromForms();
  const snapshot = {
    version: '3.0.0',
    exportDate: new Date().toISOString(),
    content: content,
    leads: currentLeads
  };

  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(snapshot, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `shakibur_portfolio_backup_${new Date().toISOString().slice(0,10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast('Full site JSON backup downloaded successfully.', 'success');
}

function handleRestoreBackup(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (event) => {
    try {
      const parsed = JSON.parse(event.target.result);
      if (parsed.content) {
        populateAdminForms(parsed.content);
        markDirty();
        showToast('Backup parsed successfully. Click Save & Publish to apply live.', 'success');
      } else {
        showToast('Invalid backup file format.', 'error');
      }
    } catch (err) {
      showToast('Failed to parse JSON file.', 'error');
    }
  };
  reader.readAsText(file);
}

async function handleFactoryReset() {
  if (confirm('WARNING: Reset all website content back to factory defaults? All custom changes will be lost!')) {
    try {
      const res = await fetch('/api/reset', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      if (res.ok) {
        showToast('Content successfully reset to default!', 'success');
        await loadDashboardData();
      }
    } catch (err) {
      showToast('Reset failed.', 'error');
    }
  }
}

// ==========================================
// 13. TOAST NOTIFICATIONS & UTILITIES
// ==========================================
function showToast(message, type = 'info') {
  const toast = document.getElementById('adminToast');
  if (!toast) return;

  toast.textContent = message;
  toast.className = `admin-toast show toast-${type}`;

  setTimeout(() => {
    toast.className = 'admin-toast hidden';
  }, 4000);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ==========================================
// 14. AI STUDIO & OPENAI SUITE CONTROLLER
// ==========================================
let aiStatusData = null;

// Helper to apply 1-click presets (xkiro, OpenAI, OpenRouter)
window.setAiPreset = function(url, model) {
  const urlInput = document.getElementById('aiBaseUrlInput');
  const modelInput = document.getElementById('aiTextModelInput') || document.getElementById('aiTextModelSelect');
  if (urlInput) urlInput.value = url;
  if (modelInput) modelInput.value = model;
  showToast(`Preset configured: ${model} via ${new URL(url).hostname}`, 'info');
};

async function loadAiStudioStatus() {
  const badge = document.getElementById('aiStatusBadge');
  const preview = document.getElementById('aiKeyPreviewText');
  const keyInput = document.getElementById('aiApiKeyInput');
  const baseUrlInput = document.getElementById('aiBaseUrlInput');
  const textModelInput = document.getElementById('aiTextModelInput') || document.getElementById('aiTextModelSelect');

  try {
    const res = await fetch('/api/ai/status', {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    const data = await res.json();
    if (!res.ok) return;

    if (baseUrlInput && data.baseUrl) {
      baseUrlInput.value = data.baseUrl;
    }

    if (textModelInput && data.textModel) {
      textModelInput.value = data.textModel;
    }

    if (data.configured) {
      if (badge) {
        const host = data.baseUrl ? new URL(data.baseUrl).hostname : 'API';
        badge.textContent = `● Connected (${host})`;
        badge.className = 'badge-tag bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 font-mono text-xs';
      }
      if (preview) preview.innerHTML = `Active Key: <code>${data.maskedKey}</code> • Endpoint: <code>${data.baseUrl}</code>`;
      if (keyInput && !keyInput.value) keyInput.placeholder = `Configured (${data.maskedKey})`;
    } else {
      if (badge) {
        badge.textContent = '○ Key / Token Optional';
        badge.className = 'badge-tag bg-amber-950/80 text-amber-400 border border-amber-500/30 font-mono text-xs';
      }
      if (preview) preview.innerHTML = `Endpoint: <code>${data.baseUrl || 'https://api.xkiro.com/v1'}</code> • Enter API Key if required by provider`;
    }
  } catch (err) {
    console.warn('AI status load note:', err);
  }
}

async function handleSaveAiConfig() {
  const baseUrlInput = document.getElementById('aiBaseUrlInput');
  const keyInput = document.getElementById('aiApiKeyInput');
  const textModelInput = document.getElementById('aiTextModelInput') || document.getElementById('aiTextModelSelect');
  const saveBtn = document.getElementById('saveAiConfigBtn');

  const apiKey = (keyInput?.value || '').trim();
  const baseUrl = (baseUrlInput?.value || 'https://api.xkiro.com/v1').trim();
  const textModel = (textModelInput?.value || 'qwen/qwen3.8-max:free').trim();

  const payload = {
    baseUrl,
    textModel
  };
  if (apiKey) payload.apiKey = apiKey;

  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<span>Saving...</span>';
  }

  try {
    const res = await fetch('/api/ai/config', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showToast('AI API settings saved successfully!', 'success');
      if (keyInput) keyInput.value = '';
      await loadAiStudioStatus();
    } else {
      showToast(data.error || 'Failed to save AI settings.', 'error');
    }
  } catch (err) {
    showToast('Failed to connect to backend server.', 'error');
  } finally {
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.innerHTML = '<span>💾 Save API Settings</span>';
    }
  }
}

async function handleTestAiConnection() {
  const testBtn = document.getElementById('testAiConnectionBtn');
  const textModelInput = document.getElementById('aiTextModelInput') || document.getElementById('aiTextModelSelect');
  const baseUrlInput = document.getElementById('aiBaseUrlInput');

  if (testBtn) {
    testBtn.disabled = true;
    testBtn.innerHTML = '<span>Testing API...</span>';
  }

  try {
    const res = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        prompt: 'Say "AI Engine connected successfully to Md. Shakibur Rahaman Portfolio!" in 1 sentence.',
        model: (textModelInput?.value || 'qwen/qwen3.8-max:free').trim(),
        baseUrl: (baseUrlInput?.value || '').trim(),
        temperature: 0.5
      })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showToast('⚡ ' + (data.text || 'API Connected Successfully!'), 'success');
      await loadAiStudioStatus();
    } else {
      showToast(data.error || 'Connection failed. Please verify endpoint & API key.', 'error');
    }
  } catch (err) {
    showToast('Connection test failed: ' + err.message, 'error');
  } finally {
    if (testBtn) {
      testBtn.disabled = false;
      testBtn.innerHTML = '<span>⚡ Test Connection</span>';
    }
  }
}

function handleCopyPresetChange() {
  const select = document.getElementById('aiCopyPresetSelect');
  const promptInput = document.getElementById('aiTextPromptInput');
  if (!select || !promptInput) return;

  const presets = {
    'case-study': 'Write a prestigious, high-converting 150-word project case study for a premium web development portal. Highlight client background, architecture, fast delivery, and commercial lift.',
    'hero-bio': 'Write 3 distinctive, high-impact hero bio variations for Md. Shakibur Rahaman (Strategic Lead & Digital Architect). Tone: executive, authoritative, visionary.',
    'service-specs': 'Generate 6 granular, modern service deliverables for a high-ticket Branding & Visual Systems client. Include practical outputs and strategic rigor.',
    'seo-meta': 'Write a compelling Google SEO Title (under 60 chars) and Meta Description (under 155 chars) targeting high-intent enterprise clients in Dhaka and international markets.',
    'lead-reply': 'Draft an executive client inquiry response proposing an initial strategic discovery session and overviewing the 4-phase production methodology.'
  };

  if (presets[select.value]) {
    promptInput.value = presets[select.value];
  }
}

async function handleGenerateAiText() {
  const promptInput = document.getElementById('aiTextPromptInput');
  const resultBox = document.getElementById('aiTextResultBox');
  const genBtn = document.getElementById('generateTextBtn');
  const textModelInput = document.getElementById('aiTextModelInput') || document.getElementById('aiTextModelSelect');
  const baseUrlInput = document.getElementById('aiBaseUrlInput');

  const prompt = (promptInput?.value || '').trim();
  if (!prompt) {
    showToast('Please enter a prompt for the AI generator.', 'error');
    return;
  }

  if (genBtn) {
    genBtn.disabled = true;
    genBtn.innerHTML = '<span>✨ Generating...</span>';
  }
  if (resultBox) {
    resultBox.textContent = 'Generating refined copy from AI Engine... Please wait...';
  }

  try {
    const res = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        prompt: prompt,
        model: (textModelInput?.value || 'qwen/qwen3.8-max:free').trim(),
        baseUrl: (baseUrlInput?.value || '').trim(),
        temperature: 0.7
      })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      if (resultBox) resultBox.textContent = data.text;
      showToast('Copy generated successfully!', 'success');
    } else {
      if (resultBox) resultBox.textContent = 'Error: ' + (data.error || 'Failed to generate copy.');
      showToast(data.error || 'Text generation failed.', 'error');
    }
  } catch (err) {
    if (resultBox) resultBox.textContent = 'Connection error: ' + err.message;
    showToast('Failed to connect to AI server.', 'error');
  } finally {
    if (genBtn) {
      genBtn.disabled = false;
      genBtn.innerHTML = '<span>✨ Generate Copy</span>';
    }
  }
}

async function handleGenerateAiImage() {
  const promptInput = document.getElementById('aiImagePromptInput');
  const styleSelect = document.getElementById('aiImageStyleSelect');
  const sizeSelect = document.getElementById('aiImageSizeSelect');
  const genBtn = document.getElementById('generateImageBtn');
  const imgEl = document.getElementById('aiImageResultImg');
  const placeholder = document.getElementById('aiImagePlaceholder');
  const dlLink = document.getElementById('downloadAiImageLink');
  const urlBar = document.getElementById('aiImageUrlBar');

  const rawPrompt = (promptInput?.value || '').trim();
  if (!rawPrompt) {
    showToast('Please enter an image description prompt.', 'error');
    return;
  }

  const fullPrompt = `${rawPrompt}. Visual style: ${styleSelect?.value || 'Cyber Noir'}. High aesthetic quality, sharp focus, 8k resolution.`;

  if (genBtn) {
    genBtn.disabled = true;
    genBtn.innerHTML = '<span>🎨 Rendering with DALL-E 3...</span>';
  }
  if (placeholder) {
    placeholder.textContent = 'Generating visual with DALL-E 3 & downloading to assets... (takes 10-15s)';
    placeholder.classList.remove('hidden');
  }
  if (imgEl) imgEl.classList.add('hidden');
  if (dlLink) dlLink.classList.add('hidden');
  if (urlBar) urlBar.classList.add('hidden');

  try {
    const res = await fetch('/api/ai/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        prompt: fullPrompt,
        size: sizeSelect?.value || '1024x1024'
      })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      if (imgEl) {
        imgEl.src = data.url;
        imgEl.classList.remove('hidden');
      }
      if (placeholder) placeholder.classList.add('hidden');
      if (dlLink) {
        dlLink.href = data.url;
        dlLink.classList.remove('hidden');
      }
      if (urlBar) {
        urlBar.innerHTML = `<strong>Saved Asset URL:</strong> <a href="${data.url}" target="_blank" class="text-[#70805D] underline">${data.url}</a>`;
        urlBar.classList.remove('hidden');
      }
      showToast('Visual rendered and saved to assets successfully!', 'success');
    } else {
      if (placeholder) placeholder.textContent = 'Error: ' + (data.error || 'Failed to render image.');
      showToast(data.error || 'Image generation failed.', 'error');
    }
  } catch (err) {
    if (placeholder) placeholder.textContent = 'Connection error: ' + err.message;
    showToast('Failed to connect to image generator.', 'error');
  } finally {
    if (genBtn) {
      genBtn.disabled = false;
      genBtn.innerHTML = '<span>🖼️ Generate DALL-E 3 Visual</span>';
    }
  }
}

async function handleBrainstormAiIdeas() {
  const industryInput = document.getElementById('aiIdeaIndustry');
  const goalSelect = document.getElementById('aiIdeaGoal');
  const btn = document.getElementById('brainstormIdeasBtn');
  const outputBox = document.getElementById('aiIdeasOutputContainer');
  const textModelInput = document.getElementById('aiTextModelInput') || document.getElementById('aiTextModelSelect');
  const baseUrlInput = document.getElementById('aiBaseUrlInput');

  const industry = (industryInput?.value || '').trim() || 'High-End Consumer Brand / Enterprise B2B';
  const goal = goalSelect?.value || 'Brand Positioning & Market Differentiation';

  const prompt = `Brainstorm strategic angles for a client in the "${industry}" sector with the objective of "${goal}". Provide:
1. 3 Disruptive Strategic Positioning Angles
2. 3 High-Impact Marketing Hooks / Headline Concepts
3. Recommended Digital & Media Execution Channels
Format cleanly with bullet points and bold headers.`;

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<span>🧠 Brainstorming...</span>';
  }
  if (outputBox) {
    outputBox.classList.remove('hidden');
    outputBox.textContent = 'Brainstorming creative angles and strategic direction...';
  }

  try {
    const res = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        prompt: prompt,
        model: (textModelInput?.value || 'qwen/qwen3.8-max:free').trim(),
        baseUrl: (baseUrlInput?.value || '').trim(),
        temperature: 0.8
      })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      if (outputBox) outputBox.textContent = data.text;
      showToast('Strategic angles brainstormed successfully!', 'success');
    } else {
      if (outputBox) outputBox.textContent = 'Error: ' + (data.error || 'Failed to brainstorm.');
      showToast(data.error || 'Brainstorming failed.', 'error');
    }
  } catch (err) {
    if (outputBox) outputBox.textContent = 'Error: ' + err.message;
    showToast('Failed to connect to AI server.', 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<span>🧠 Brainstorm Strategic Angles</span>';
    }
  }
}

// ==========================================
// 12. CUSTOM FORM BUILDER & 22 TEMPLATES CONTROLLER
// ==========================================
let allFormsData = [];
let allSubmissionsData = [];
let currentBuilderForm = {
  id: '',
  title: '',
  slug: '',
  category: 'Strategy & Direction',
  description: '',
  submitText: 'Submit Form',
  successMessage: 'Thank you! Your submission has been received.',
  notificationEmail: '',
  redirectUrl: '',
  isActive: true,
  fields: []
};
let selectedTemplateForModal = null;
let activeTemplateCategory = 'all';
let templateSearchQuery = '';

function initFormBuilderEventListeners() {
  // Subnav switching
  document.querySelectorAll('.form-subnav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const subtab = btn.getAttribute('data-subtab');
      switchFormSubtab(subtab);
    });
  });

  // Category filters
  document.querySelectorAll('.template-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.template-filter-btn').forEach(b => {
        b.className = 'template-filter-btn px-3 py-1.5 rounded-full text-xs font-bold bg-white border border-[#70805D]/25 text-[#2A3B27] hover:bg-[#F1F4EE]';
      });
      btn.className = 'template-filter-btn px-3 py-1.5 rounded-full text-xs font-bold bg-[#70805D] text-white';
      activeTemplateCategory = btn.getAttribute('data-cat') || 'all';
      renderTemplateGallery();
    });
  });

  // Search input
  const searchInp = document.getElementById('templateSearchInput');
  if (searchInp) {
    searchInp.addEventListener('input', (e) => {
      templateSearchQuery = e.target.value.toLowerCase().trim();
      renderTemplateGallery();
    });
  }

  // Create New Form from Scratch
  const createNewBtn = document.getElementById('createNewFormBtn');
  if (createNewBtn) {
    createNewBtn.addEventListener('click', () => {
      openFormBuilder({
        id: '',
        title: 'Custom Client Intake Form',
        slug: 'intake-' + Math.floor(Math.random() * 900 + 100),
        category: 'General',
        description: 'Please complete the questionnaire below to initiate your project onboarding.',
        submitText: 'Submit Form',
        successMessage: 'Thank you! Your response has been received.',
        notificationEmail: '',
        redirectUrl: '',
        isActive: true,
        fields: [
          { id: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Marcus Vance', required: true },
          { id: 'emailAddress', label: 'Corporate Email', type: 'email', placeholder: 'marcus@company.com', required: true },
          { id: 'phone', label: 'Phone / WhatsApp', type: 'tel', placeholder: '+880 1838-070468', required: false },
          { id: 'serviceType', label: 'Select Service Required', type: 'select', options: ['Branding & Identity', 'Graphics Design & Packaging', 'Jamstack Web Development', 'Commercial Video & TVC', 'Performance Google Ads'], required: true },
          { id: 'projectNotes', label: 'Project Scope & Timeline Details', type: 'textarea', placeholder: 'Describe your commercial goals, budget scope, and target deadline...', required: true }
        ]
      }, true);
    });
  }

  // Add field button in builder
  const addFieldBtn = document.getElementById('builderAddFieldBtn');
  if (addFieldBtn) {
    addFieldBtn.addEventListener('click', addFieldToBuilder);
  }

  // Builder form inputs - update live preview on input
  ['builderFormTitle', 'builderFormSlug', 'builderFormCategory', 'builderFormDescription', 'builderFormSubmitText'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        syncBuilderMetadata();
        updateLiveFormPreview();
      });
    }
  });

  // Save Form Button
  const saveFormBtn = document.getElementById('saveFormBtn');
  if (saveFormBtn) {
    saveFormBtn.addEventListener('click', saveBuilderForm);
  }

  // Cancel Button
  const cancelBtn = document.getElementById('cancelBuilderBtn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      switchFormSubtab('myforms');
    });
  }

  // Template Modal Close
  const closeTplModalBtn = document.getElementById('closeTplModalBtn');
  if (closeTplModalBtn) closeTplModalBtn.addEventListener('click', closeTemplateModal);
  const closeTplModalSecondaryBtn = document.getElementById('closeTplModalSecondaryBtn');
  if (closeTplModalSecondaryBtn) closeTplModalSecondaryBtn.addEventListener('click', closeTemplateModal);

  // Template Modal: Use Template
  const useTplBtn = document.getElementById('useThisTemplateBtn');
  if (useTplBtn) {
    useTplBtn.addEventListener('click', () => {
      if (selectedTemplateForModal) {
        const clone = JSON.parse(JSON.stringify(selectedTemplateForModal));
        closeTemplateModal();
        clone.id = '';
        clone.slug = clone.id.replace('tpl-', '') + '-' + Math.floor(Math.random() * 900 + 100);
        clone.title = clone.title + ' (Active)';
        openFormBuilder(clone, true);
      }
    });
  }

  // Embed Modal Close
  const closeEmbedBtn = document.getElementById('closeEmbedModalBtn');
  if (closeEmbedBtn) closeEmbedBtn.addEventListener('click', closeEmbedModal);
  const closeEmbedSecondaryBtn = document.getElementById('closeEmbedModalSecondaryBtn');
  if (closeEmbedSecondaryBtn) closeEmbedSecondaryBtn.addEventListener('click', closeEmbedModal);

  // Copy Direct Link
  const copyDirectUrlBtn = document.getElementById('copyDirectUrlBtn');
  if (copyDirectUrlBtn) {
    copyDirectUrlBtn.addEventListener('click', () => {
      const urlInput = document.getElementById('embedDirectUrl');
      if (urlInput) {
        navigator.clipboard.writeText(urlInput.value);
        showToast('Direct public form link copied to clipboard!', 'success');
      }
    });
  }

  // Copy iFrame Snippet
  const copyIframeBtn = document.getElementById('copyIframeBtn');
  if (copyIframeBtn) {
    copyIframeBtn.addEventListener('click', () => {
      const iframeInput = document.getElementById('embedIframeCode');
      if (iframeInput) {
        navigator.clipboard.writeText(iframeInput.value);
        showToast('HTML iFrame embed code copied to clipboard!', 'success');
      }
    });
  }

  // Submissions filter & search
  const subFilter = document.getElementById('submissionsFilterFormSelect');
  if (subFilter) {
    subFilter.addEventListener('change', (e) => {
      loadSubmissions(e.target.value);
    });
  }

  const subSearch = document.getElementById('submissionsSearchInput');
  if (subSearch) {
    subSearch.addEventListener('input', (e) => {
      filterSubmissionsLocal(e.target.value);
    });
  }

  // Export CSV
  const exportCsvBtn = document.getElementById('exportSubmissionsCsvBtn');
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', exportSubmissionsCsv);
  }
}

function switchFormSubtab(subtabName) {
  document.querySelectorAll('.form-subnav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-subtab') === subtabName);
  });

  document.getElementById('subtabTemplatesView')?.classList.toggle('hidden', subtabName !== 'templates');
  document.getElementById('subtabMyFormsView')?.classList.toggle('hidden', subtabName !== 'myforms');
  document.getElementById('subtabBuilderView')?.classList.toggle('hidden', subtabName !== 'builder');
  document.getElementById('subtabSubmissionsView')?.classList.toggle('hidden', subtabName !== 'submissions');

  if (subtabName === 'templates') {
    renderTemplateGallery();
  } else if (subtabName === 'myforms') {
    renderCustomFormsTable();
  } else if (subtabName === 'submissions') {
    loadSubmissions();
  }
}

async function loadFormsData() {
  try {
    const res = await fetch('/api/forms', {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    if (res.ok) {
      allFormsData = await res.json();
      
      const customCount = allFormsData.filter(f => !f.isTemplate).length;
      const formsBadge = document.getElementById('formsBadge');
      if (formsBadge) formsBadge.textContent = customCount > 0 ? customCount : allFormsData.length;

      renderTemplateGallery();
      renderCustomFormsTable();
      populateSubmissionsFormFilter();
    }
  } catch (err) {
    console.error('Failed to fetch forms:', err);
  }

  try {
    const subRes = await fetch('/api/forms/submissions', {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    if (subRes.ok) {
      allSubmissionsData = await subRes.json();
      const subBadge = document.getElementById('submissionsTabBadge');
      if (subBadge) subBadge.textContent = allSubmissionsData.length;
    }
  } catch (err) {
    console.error('Failed to fetch submissions:', err);
  }
}

function renderTemplateGallery() {
  const container = document.getElementById('templateCardsContainer');
  if (!container) return;

  const templates = allFormsData.filter(f => f.isTemplate);
  let filtered = templates;

  if (activeTemplateCategory && activeTemplateCategory !== 'all') {
    filtered = filtered.filter(t => (t.category || '').toLowerCase().includes(activeTemplateCategory.toLowerCase()));
  }

  if (templateSearchQuery) {
    filtered = filtered.filter(t => 
      t.title.toLowerCase().includes(templateSearchQuery) || 
      (t.description || '').toLowerCase().includes(templateSearchQuery) ||
      (t.category || '').toLowerCase().includes(templateSearchQuery)
    );
  }

  if (!filtered.length) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-xs text-[#55738D] bg-white rounded-2xl border border-[#70805D]/15 p-8">
        <i class="fa-solid fa-folder-open text-2xl text-[#70805D] mb-2"></i>
        <p class="font-bold text-[#1C2B1B]">No templates match your filter.</p>
        <p class="mt-1">Try searching for a different keyword or select "All".</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(tpl => `
    <div class="template-card">
      <div>
        <div class="template-card-header">
          <span class="template-cat-badge">${escapeHtml(tpl.category || 'General')}</span>
          <h3 class="template-card-title">${escapeHtml(tpl.title)}</h3>
          <p class="template-card-desc">${escapeHtml(tpl.description || '')}</p>
        </div>

        <div class="space-y-1.5 py-3 border-t border-[#70805D]/10">
          <div class="text-[11px] font-extrabold uppercase tracking-wider text-[#70805D]">Fields Preview:</div>
          <div class="flex flex-wrap gap-1.5">
            ${(tpl.fields || []).slice(0, 4).map(f => `
              <span class="px-2 py-0.5 rounded-md bg-[#F1F4EE] text-[10px] font-bold text-[#2A3B27] border border-[#70805D]/20">
                ${escapeHtml(f.label)}
              </span>
            `).join('')}
            ${(tpl.fields || []).length > 4 ? `<span class="px-1.5 py-0.5 text-[10px] text-[#55738D] font-bold">+${(tpl.fields || []).length - 4} more</span>` : ''}
          </div>
        </div>
      </div>

      <div class="template-card-footer">
        <div class="template-fields-count">
          <i class="fa-solid fa-list-check text-[11px] text-[#70805D]"></i>
          <span>${(tpl.fields || []).length} Fields</span>
        </div>

        <div class="flex items-center gap-2">
          <button type="button" class="btn-ghost-sm text-xs py-1.5 px-3" onclick="openTemplatePreview('${tpl.id}')">
            <span>Preview</span>
          </button>
          <button type="button" class="btn-primary-gold-sm text-xs py-1.5 px-3" onclick="useTemplateDirectly('${tpl.id}')">
            <span>Use Template</span>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

window.openTemplatePreview = function(templateId) {
  const tpl = allFormsData.find(f => f.id === templateId);
  if (!tpl) return;

  selectedTemplateForModal = tpl;
  document.getElementById('tplModalCatBadge').textContent = tpl.category || 'General';
  document.getElementById('tplModalTitle').textContent = tpl.title;
  document.getElementById('tplModalDesc').textContent = tpl.description || '';

  const fieldsList = document.getElementById('tplModalFieldsList');
  fieldsList.innerHTML = (tpl.fields || []).map((f, i) => `
    <div class="p-3 bg-[#F8F9F6] rounded-xl border border-[#70805D]/15 flex items-center justify-between text-xs">
      <div class="flex items-center gap-2.5">
        <span class="w-6 h-6 rounded-lg bg-[#70805D]/10 text-[#70805D] flex items-center justify-center font-bold text-[10px]">
          ${i + 1}
        </span>
        <div>
          <div class="font-bold text-[#1C2B1B]">${escapeHtml(f.label)} ${f.required ? '<span class="text-red-500">*</span>' : ''}</div>
          <div class="text-[10.5px] text-[#55738D] font-mono">${escapeHtml(f.placeholder || 'No placeholder')}</div>
        </div>
      </div>
      <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-white border border-[#70805D]/25 text-[#70805D]">
        ${f.type}
      </span>
    </div>
  `).join('');

  document.getElementById('templatePreviewModal').classList.remove('hidden');
};

function closeTemplateModal() {
  document.getElementById('templatePreviewModal').classList.add('hidden');
}

window.useTemplateDirectly = function(templateId) {
  const tpl = allFormsData.find(f => f.id === templateId);
  if (!tpl) return;
  const clone = JSON.parse(JSON.stringify(tpl));
  clone.id = '';
  clone.slug = clone.id.replace('tpl-', '') + '-' + Math.floor(Math.random() * 900 + 100);
  clone.title = clone.title + ' (Active)';
  openFormBuilder(clone, true);
};

function openFormBuilder(formObj, isNew = false) {
  currentBuilderForm = JSON.parse(JSON.stringify(formObj || {}));
  if (!currentBuilderForm.fields) currentBuilderForm.fields = [];

  document.getElementById('builderFormModeHeading').textContent = isNew ? 'Create New Form' : 'Edit Form: ' + (currentBuilderForm.title || '');
  document.getElementById('builderFormId').value = currentBuilderForm.id || '';
  document.getElementById('builderFormTitle').value = currentBuilderForm.title || '';
  document.getElementById('builderFormSlug').value = currentBuilderForm.slug || '';
  document.getElementById('builderFormCategory').value = currentBuilderForm.category || 'General';
  document.getElementById('builderFormDescription').value = currentBuilderForm.description || '';
  document.getElementById('builderFormSubmitText').value = currentBuilderForm.submitText || 'Submit Form';
  document.getElementById('builderFormSuccessMessage').value = currentBuilderForm.successMessage || 'Thank you! Your response has been received.';
  document.getElementById('builderFormRedirectUrl').value = currentBuilderForm.redirectUrl || '';
  document.getElementById('builderFormIsActive').checked = currentBuilderForm.isActive !== false;

  renderBuilderFields();
  updateLiveFormPreview();
  switchFormSubtab('builder');
}

function syncBuilderMetadata() {
  currentBuilderForm.title = document.getElementById('builderFormTitle')?.value || '';
  currentBuilderForm.slug = document.getElementById('builderFormSlug')?.value || '';
  currentBuilderForm.category = document.getElementById('builderFormCategory')?.value || 'General';
  currentBuilderForm.description = document.getElementById('builderFormDescription')?.value || '';
  currentBuilderForm.submitText = document.getElementById('builderFormSubmitText')?.value || 'Submit Form';
  currentBuilderForm.successMessage = document.getElementById('builderFormSuccessMessage')?.value || '';
  currentBuilderForm.redirectUrl = document.getElementById('builderFormRedirectUrl')?.value || '';
  currentBuilderForm.isActive = document.getElementById('builderFormIsActive')?.checked !== false;
}

function renderBuilderFields() {
  const container = document.getElementById('builderFieldsContainer');
  const countEl = document.getElementById('builderFieldsCount');
  if (countEl) countEl.textContent = currentBuilderForm.fields.length;
  if (!container) return;

  if (!currentBuilderForm.fields.length) {
    container.innerHTML = `
      <div class="p-8 text-center bg-white rounded-xl border border-dashed border-[#70805D]/30 text-xs text-[#55738D]">
        <i class="fa-solid fa-plus-circle text-2xl text-[#70805D] mb-2"></i>
        <p class="font-bold text-[#1C2B1B]">No fields yet in this form.</p>
        <p class="mt-1">Click "Add New Field" above to insert questions.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = currentBuilderForm.fields.map((f, idx) => `
    <div class="field-item-card" data-idx="${idx}">
      <div class="field-item-top">
        <div class="flex items-center gap-2 flex-1">
          <span class="cursor-grab text-gray-400 hover:text-gray-600">
            <i class="fa-solid fa-grip-vertical"></i>
          </span>
          <span class="w-6 h-6 rounded-md bg-[#70805D]/10 text-[#70805D] flex items-center justify-center font-bold text-[10px]">
            ${idx + 1}
          </span>
          <input type="text" value="${escapeHtml(f.label)}" placeholder="Field Question / Label" class="admin-input text-xs py-1.5 px-2.5 font-bold flex-1" oninput="updateFieldProperty(${idx}, 'label', this.value)">
        </div>

        <div class="flex items-center gap-2">
          <select class="admin-input text-xs py-1 px-2 w-28" onchange="updateFieldProperty(${idx}, 'type', this.value)">
            <option value="text" ${f.type === 'text' ? 'selected' : ''}>Text</option>
            <option value="email" ${f.type === 'email' ? 'selected' : ''}>Email</option>
            <option value="tel" ${f.type === 'tel' ? 'selected' : ''}>Phone</option>
            <option value="number" ${f.type === 'number' ? 'selected' : ''}>Number</option>
            <option value="textarea" ${f.type === 'textarea' ? 'selected' : ''}>Textarea</option>
            <option value="select" ${f.type === 'select' ? 'selected' : ''}>Dropdown</option>
            <option value="checkbox" ${f.type === 'checkbox' ? 'selected' : ''}>Checkboxes</option>
            <option value="radio" ${f.type === 'radio' ? 'selected' : ''}>Radio</option>
            <option value="date" ${f.type === 'date' ? 'selected' : ''}>Date</option>
            <option value="url" ${f.type === 'url' ? 'selected' : ''}>URL</option>
          </select>

          <label class="flex items-center gap-1 text-[11px] font-bold text-[#1C2B1B] cursor-pointer" title="Required Field">
            <input type="checkbox" ${f.required ? 'checked' : ''} onchange="updateFieldProperty(${idx}, 'required', this.checked)">
            <span>Req</span>
          </label>

          <button type="button" class="text-gray-400 hover:text-[#70805D] p-1" onclick="moveBuilderField(${idx}, -1)" title="Move Up" ${idx === 0 ? 'disabled' : ''}>
            <i class="fa-solid fa-arrow-up text-xs"></i>
          </button>
          <button type="button" class="text-gray-400 hover:text-[#70805D] p-1" onclick="moveBuilderField(${idx}, 1)" title="Move Down" ${idx === currentBuilderForm.fields.length - 1 ? 'disabled' : ''}>
            <i class="fa-solid fa-arrow-down text-xs"></i>
          </button>
          <button type="button" class="text-red-400 hover:text-red-600 p-1" onclick="removeFieldFromBuilder(${idx})" title="Delete Field">
            <i class="fa-solid fa-trash-can text-xs"></i>
          </button>
        </div>
      </div>

      <!-- Extended Details (Placeholder & Options) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pt-2.5 border-t border-[#70805D]/10">
        <div>
          <label class="block text-[10px] font-bold text-[#55738D] mb-1">Placeholder Text</label>
          <input type="text" value="${escapeHtml(f.placeholder || '')}" placeholder="e.g. Type here..." class="admin-input text-xs py-1 px-2" oninput="updateFieldProperty(${idx}, 'placeholder', this.value)">
        </div>
        ${['select', 'checkbox', 'radio'].includes(f.type) ? `
        <div>
          <label class="block text-[10px] font-bold text-[#70805D] mb-1">Options (comma-separated)</label>
          <input type="text" value="${escapeHtml((f.options || []).join(', '))}" placeholder="Option A, Option B, Option C" class="admin-input text-xs py-1 px-2" oninput="updateFieldOptions(${idx}, this.value)">
        </div>
        ` : `
        <div>
          <label class="block text-[10px] font-bold text-[#55738D] mb-1">Help / Subtext (Optional)</label>
          <input type="text" value="${escapeHtml(f.helpText || '')}" placeholder="Short hint below label..." class="admin-input text-xs py-1 px-2" oninput="updateFieldProperty(${idx}, 'helpText', this.value)">
        </div>
        `}
      </div>
    </div>
  `).join('');
}

window.updateFieldProperty = function(idx, prop, val) {
  if (currentBuilderForm.fields[idx]) {
    currentBuilderForm.fields[idx][prop] = val;
    updateLiveFormPreview();
  }
};

window.updateFieldOptions = function(idx, strVal) {
  if (currentBuilderForm.fields[idx]) {
    const opts = strVal.split(',').map(s => s.trim()).filter(Boolean);
    currentBuilderForm.fields[idx].options = opts;
    updateLiveFormPreview();
  }
};

function addFieldToBuilder() {
  const newId = 'field_' + Date.now();
  currentBuilderForm.fields.push({
    id: newId,
    label: 'New Question ' + (currentBuilderForm.fields.length + 1),
    type: 'text',
    placeholder: '',
    required: false,
    options: []
  });
  renderBuilderFields();
  updateLiveFormPreview();
}

window.removeFieldFromBuilder = function(idx) {
  currentBuilderForm.fields.splice(idx, 1);
  renderBuilderFields();
  updateLiveFormPreview();
};

window.moveBuilderField = function(idx, dir) {
  const target = idx + dir;
  if (target < 0 || target >= currentBuilderForm.fields.length) return;
  const temp = currentBuilderForm.fields[idx];
  currentBuilderForm.fields[idx] = currentBuilderForm.fields[target];
  currentBuilderForm.fields[target] = temp;
  renderBuilderFields();
  updateLiveFormPreview();
};

function updateLiveFormPreview() {
  const box = document.getElementById('builderLivePreviewBox');
  if (!box) return;

  box.innerHTML = `
    <div class="bg-white border border-[#70805D]/20 rounded-2xl p-6 shadow-sm">
      <div class="mb-5 pb-4 border-b border-[#70805D]/15">
        <span class="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#70805D]/10 text-[#70805D] border border-[#70805D]/20">
          ${escapeHtml(currentBuilderForm.category || 'General')}
        </span>
        <h3 class="text-xl font-extrabold text-[#1C2B1B] mt-2">
          ${escapeHtml(currentBuilderForm.title || 'Untitled Form')}
        </h3>
        <p class="text-xs text-[#4D614A] mt-1">
          ${escapeHtml(currentBuilderForm.description || 'Fill out the details below.')}
        </p>
      </div>

      <div class="space-y-4">
        ${currentBuilderForm.fields.map(f => `
          <div>
            <label class="block text-xs font-bold text-[#1C2B1B] mb-1">
              ${escapeHtml(f.label)} ${f.required ? '<span class="text-red-500">*</span>' : ''}
            </label>
            ${f.helpText ? `<p class="text-[10.5px] text-[#55738D] mb-1">${escapeHtml(f.helpText)}</p>` : ''}
            
            ${f.type === 'textarea' ? `
              <textarea class="w-full p-2.5 rounded-xl border border-[#70805D]/25 text-xs bg-[#F8F9F6] resize-none" rows="2" placeholder="${escapeHtml(f.placeholder || '')}" disabled></textarea>
            ` : f.type === 'select' ? `
              <select class="w-full p-2.5 rounded-xl border border-[#70805D]/25 text-xs bg-[#F8F9F6]" disabled>
                <option>${escapeHtml(f.placeholder || 'Select an option...')}</option>
                ${(f.options || []).map(o => `<option>${escapeHtml(o)}</option>`).join('')}
              </select>
            ` : ['checkbox', 'radio'].includes(f.type) ? `
              <div class="flex flex-wrap gap-1.5 pt-0.5">
                ${(f.options || ['Sample Option 1', 'Sample Option 2']).map(o => `
                  <span class="px-2.5 py-1 rounded-lg border border-[#70805D]/25 text-[11px] font-semibold bg-[#F8F9F6] text-[#2A3B27]">
                    ${escapeHtml(o)}
                  </span>
                `).join('')}
              </div>
            ` : `
              <input type="${f.type}" class="w-full p-2.5 rounded-xl border border-[#70805D]/25 text-xs bg-[#F8F9F6]" placeholder="${escapeHtml(f.placeholder || '')}" disabled>
            `}
          </div>
        `).join('')}

        <div class="pt-2">
          <button type="button" class="w-full py-3 rounded-xl bg-[#70805D] text-white text-xs font-bold shadow-md shadow-[#70805D]/20 cursor-default">
            ${escapeHtml(currentBuilderForm.submitText || 'Submit Form')}
          </button>
        </div>
      </div>
    </div>
  `;
}

async function saveBuilderForm() {
  syncBuilderMetadata();

  if (!currentBuilderForm.title) {
    showToast('Please provide a form title.', 'error');
    return;
  }
  if (!currentBuilderForm.slug) {
    currentBuilderForm.slug = 'form-' + Date.now();
  }

  const saveBtn = document.getElementById('saveFormBtn');
  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin text-xs"></i> <span>Saving...</span>';
  }

  try {
    const res = await fetch('/api/forms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(currentBuilderForm)
    });

    const data = await res.json();
    if (res.ok && data.success) {
      showToast('Form saved and published successfully!', 'success');
      await loadFormsData();
      switchFormSubtab('myforms');
    } else {
      showToast(data.error || 'Failed to save form.', 'error');
    }
  } catch (err) {
    showToast('Network error saving form.', 'error');
  } finally {
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.innerHTML = '<i class="fa-solid fa-floppy-disk text-xs"></i> <span>Save & Publish Form</span>';
    }
  }
}

function renderCustomFormsTable() {
  const tbody = document.getElementById('customFormsTableBody');
  if (!tbody) return;

  const customForms = allFormsData.filter(f => !f.isTemplate);

  if (!customForms.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="text-center py-12 text-[#55738D]">
          <i class="fa-solid fa-rectangle-list text-2xl text-[#70805D] mb-2"></i>
          <p class="font-bold text-[#1C2B1B]">No custom forms published yet.</p>
          <p class="text-xs mt-1">Pick a template from the "Template Library" or create one from scratch!</p>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = customForms.map(f => {
    const subCount = allSubmissionsData.filter(s => s.formId === f.id).length;
    const directUrl = `${window.location.origin}/form.html?id=${encodeURIComponent(f.id)}`;

    return `
      <tr>
        <td>
          <div class="font-bold text-[#1C2B1B] text-sm">${escapeHtml(f.title)}</div>
          <div class="text-[11px] text-[#55738D] line-clamp-1">${escapeHtml(f.description || '')}</div>
        </td>
        <td>
          <span class="template-cat-badge mb-0">${escapeHtml(f.category || 'General')}</span>
        </td>
        <td>
          <code class="text-xs text-[#70805D] font-mono bg-[#F8F9F6] px-2 py-1 rounded border border-[#70805D]/20">
            ${escapeHtml(f.slug || f.id)}
          </code>
        </td>
        <td>
          <span class="font-bold text-[#2A3B27]">${(f.fields || []).length}</span>
        </td>
        <td>
          <span class="px-2.5 py-0.5 rounded-full text-xs font-bold ${subCount > 0 ? 'bg-[#70805D] text-white' : 'bg-gray-100 text-gray-500'}">
            ${subCount}
          </span>
        </td>
        <td>
          <span class="inline-flex items-center gap-1.5 text-xs font-bold ${f.isActive !== false ? 'text-[#70805D]' : 'text-gray-400'}">
            <span class="w-2 h-2 rounded-full ${f.isActive !== false ? 'bg-[#70805D]' : 'bg-gray-400'}"></span>
            ${f.isActive !== false ? 'Active' : 'Draft'}
          </span>
        </td>
        <td class="text-right whitespace-nowrap">
          <div class="flex items-center justify-end gap-1.5">
            <a href="${directUrl}" target="_blank" class="p-2 rounded-lg bg-[#F8F9F6] hover:bg-white text-[#70805D] border border-[#70805D]/20 transition-colors" title="Open Public Form ↗">
              <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
            </a>
            <button type="button" class="p-2 rounded-lg bg-[#F8F9F6] hover:bg-white text-[#55738D] border border-[#70805D]/20 transition-colors" onclick="openEmbedModal('${f.id}')" title="Share & Embed Code">
              <i class="fa-solid fa-code text-xs"></i>
            </button>
            <button type="button" class="p-2 rounded-lg bg-[#F8F9F6] hover:bg-white text-[#2A3B27] border border-[#70805D]/20 transition-colors" onclick="editCustomForm('${f.id}')" title="Edit Form">
              <i class="fa-solid fa-pen-to-square text-xs"></i>
            </button>
            <button type="button" class="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors" onclick="deleteCustomForm('${f.id}')" title="Delete Form">
              <i class="fa-solid fa-trash text-xs"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

window.editCustomForm = function(formId) {
  const form = allFormsData.find(f => f.id === formId);
  if (!form) return;
  openFormBuilder(form, false);
};

window.deleteCustomForm = async function(formId) {
  const form = allFormsData.find(f => f.id === formId);
  const title = form ? form.title : 'this form';
  if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) return;

  try {
    const res = await fetch(`/api/forms/${encodeURIComponent(formId)}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    if (res.ok) {
      showToast('Form deleted successfully.', 'success');
      await loadFormsData();
    } else {
      showToast('Failed to delete form.', 'error');
    }
  } catch (err) {
    showToast('Network error deleting form.', 'error');
  }
};

window.openEmbedModal = function(formId) {
  const form = allFormsData.find(f => f.id === formId);
  if (!form) return;

  const publicUrl = `${window.location.origin}/form.html?id=${encodeURIComponent(form.id)}`;
  const iframeSnippet = `<iframe src="${publicUrl}" width="100%" height="750" frameborder="0" style="border:none; border-radius:16px; max-width:800px; width:100%;" title="${escapeHtml(form.title)}"></iframe>`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`Please fill out the ${form.title}: ${publicUrl}`)}`;

  document.getElementById('embedDirectUrl').value = publicUrl;
  document.getElementById('openDirectUrlBtn').href = publicUrl;
  document.getElementById('embedIframeCode').value = iframeSnippet;
  document.getElementById('embedWhatsAppUrl').value = whatsappUrl;
  document.getElementById('openWhatsAppShareBtn').href = whatsappUrl;

  document.getElementById('embedCodeModal').classList.remove('hidden');
};

function closeEmbedModal() {
  document.getElementById('embedCodeModal').classList.add('hidden');
}

function populateSubmissionsFormFilter() {
  const select = document.getElementById('submissionsFilterFormSelect');
  if (!select) return;

  const currentVal = select.value;
  select.innerHTML = '<option value="">All Form Submissions</option>';

  const activeForms = allFormsData.filter(f => !f.isTemplate || allSubmissionsData.some(s => s.formId === f.id));
  activeForms.forEach(f => {
    const count = allSubmissionsData.filter(s => s.formId === f.id).length;
    const opt = document.createElement('option');
    opt.value = f.id;
    opt.textContent = `${f.title} (${count})`;
    select.appendChild(opt);
  });

  if (currentVal) select.value = currentVal;
}

async function loadSubmissions(filterFormId = '') {
  try {
    const query = filterFormId ? `?formId=${encodeURIComponent(filterFormId)}` : '';
    const res = await fetch(`/api/forms/submissions${query}`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });

    if (res.ok) {
      allSubmissionsData = await res.json();
      renderSubmissionsList(allSubmissionsData);
      populateSubmissionsFormFilter();
      const subBadge = document.getElementById('submissionsTabBadge');
      if (subBadge) subBadge.textContent = allSubmissionsData.length;
    }
  } catch (err) {
    console.error('Error loading submissions:', err);
  }
}

function filterSubmissionsLocal(searchTerm) {
  if (!searchTerm) {
    renderSubmissionsList(allSubmissionsData);
    return;
  }
  const term = searchTerm.toLowerCase();
  const filtered = allSubmissionsData.filter(s => {
    const jsonStr = JSON.stringify(s.data || {}).toLowerCase();
    const title = (s.formTitle || '').toLowerCase();
    const ip = (s.clientIp || '').toLowerCase();
    return jsonStr.includes(term) || title.includes(term) || ip.includes(term);
  });
  renderSubmissionsList(filtered);
}

function renderSubmissionsList(submissions) {
  const container = document.getElementById('submissionsCardsContainer');
  if (!container) return;

  if (!submissions.length) {
    container.innerHTML = `
      <div class="glass-panel p-12 text-center text-[#55738D]">
        <i class="fa-solid fa-inbox text-3xl text-[#70805D] mb-3"></i>
        <h4 class="text-base font-bold text-[#1C2B1B]">No Submissions Recorded Yet</h4>
        <p class="text-xs mt-1">When users fill out any of your 22 templates or custom forms, their responses will appear here in real-time.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = submissions.map(sub => {
    const dataEntries = Object.entries(sub.data || {});
    const formattedDate = new Date(sub.createdAt).toLocaleString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    return `
      <div class="submission-card" id="sub_card_${sub.id}">
        <div class="submission-header">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-xl bg-[#70805D]/10 text-[#70805D] flex items-center justify-center font-bold text-xs">
              <i class="fa-solid fa-envelope-open-text"></i>
            </span>
            <div>
              <div class="font-extrabold text-sm text-[#1C2B1B]">${escapeHtml(sub.formTitle || 'Custom Form')}</div>
              <div class="submission-meta flex items-center gap-2 mt-0.5">
                <span><i class="fa-regular fa-clock text-[10px]"></i> ${formattedDate}</span>
                <span>&bull;</span>
                <span>IP: ${escapeHtml(sub.clientIp || '127.0.0.1')}</span>
              </div>
            </div>
          </div>

          <button type="button" class="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 text-xs flex items-center gap-1.5 transition-colors" onclick="deleteSubmission('${sub.id}')">
            <i class="fa-solid fa-trash-can"></i>
            <span>Delete</span>
          </button>
        </div>

        <div class="submission-data-grid">
          ${dataEntries.map(([key, val]) => `
            <div class="submission-data-item">
              <div class="submission-field-name">${escapeHtml(key)}</div>
              <div class="submission-field-value">
                ${Array.isArray(val) ? val.map(v => `<span class="inline-block px-1.5 py-0.5 rounded bg-white text-[11px] font-bold border border-[#70805D]/20 mr-1">${escapeHtml(v)}</span>`).join('') : escapeHtml(String(val))}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}

window.deleteSubmission = async function(subId) {
  if (!confirm('Are you sure you want to delete this submission?')) return;

  try {
    const res = await fetch(`/api/forms/submissions/${encodeURIComponent(subId)}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${authToken}` }
    });

    if (res.ok) {
      showToast('Submission deleted.', 'success');
      document.getElementById(`sub_card_${subId}`)?.remove();
      allSubmissionsData = allSubmissionsData.filter(s => s.id !== subId);
      const subBadge = document.getElementById('submissionsTabBadge');
      if (subBadge) subBadge.textContent = allSubmissionsData.length;
    } else {
      showToast('Failed to delete submission.', 'error');
    }
  } catch (err) {
    showToast('Network error deleting submission.', 'error');
  }
};

function exportSubmissionsCsv() {
  const filterFormId = document.getElementById('submissionsFilterFormSelect')?.value || '';
  const query = filterFormId ? `?formId=${encodeURIComponent(filterFormId)}` : '';
  window.open(`/api/forms/submissions/export${query}`, '_blank');
}

