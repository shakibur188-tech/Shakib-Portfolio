const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'admin.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Append all missing CSS classes
const missingCSS = `

/* ===================================================
   8. ACCORDION / CASE ITEM CARDS
   =================================================== */
.cases-accordion-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.case-item-card {
  background: #FFFFFF;
  border: 1px solid var(--border-subtle);
  border-radius: 14px;
  overflow: hidden;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 10px -2px rgba(42, 59, 39, 0.05);
}

.case-item-card:hover {
  border-color: var(--palette-olive);
  box-shadow: 0 6px 20px -4px rgba(112, 128, 93, 0.12);
}

.case-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  cursor: pointer;
  background: #FAFBF8;
  border-bottom: 1px solid transparent;
  transition: all 0.2s;
  gap: 12px;
}

.case-header-row:hover {
  background: #F1F4EE;
}

.case-header-left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  flex: 1;
}

.case-badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 4px 12px;
  border-radius: 20px;
  background: rgba(112, 128, 93, 0.10);
  color: var(--palette-olive);
  border: 1px solid rgba(112, 128, 93, 0.25);
  white-space: nowrap;
  flex-shrink: 0;
}

.case-title-txt {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-heading);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.accordion-arrow {
  font-size: 11px;
  color: var(--text-dim);
  transition: transform 0.3s;
  flex-shrink: 0;
  margin-left: 8px;
}

.case-body-content {
  padding: 24px 20px;
  border-top: 1px solid var(--border-subtle);
  background: #FFFFFF;
  animation: accordionSlide 0.25s ease;
}

@keyframes accordionSlide {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ===================================================
   9. UTILITY LAYOUT CLASSES
   =================================================== */
.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.flex-gap {
  display: flex;
  align-items: center;
  gap: 10px;
}

.align-center {
  align-items: center;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.items-end {
  align-items: flex-end;
}

.justify-between {
  justify-content: space-between;
}

.justify-end {
  justify-content: flex-end;
}

.flex-wrap {
  flex-wrap: wrap;
}

.flex-col {
  flex-direction: column;
}

.gap-1 { gap: 4px; }
.gap-1\\.5 { gap: 6px; }
.gap-2 { gap: 8px; }
.gap-2\\.5 { gap: 10px; }
.gap-3 { gap: 12px; }
.gap-4 { gap: 16px; }
.gap-6 { gap: 24px; }

.shrink-0 { flex-shrink: 0; }

.grid { display: grid; }
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }

@media (min-width: 640px) {
  .sm\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (min-width: 1024px) {
  .lg\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

.relative { position: relative; }
.absolute { position: absolute; }
.sticky { position: sticky; }
.top-28 { top: 7rem; }
.right-2 { right: 0.5rem; }
.overflow-hidden { overflow: hidden; }

/* ===================================================
   10. FORM ROW GRIDS
   =================================================== */
.form-row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-row-3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}

@media (max-width: 768px) {
  .form-row-2,
  .form-row-3 {
    grid-template-columns: 1fr;
  }
}

/* ===================================================
   11. SPACING UTILITIES
   =================================================== */
.mb-0 { margin-bottom: 0 !important; }
.mb-1 { margin-bottom: 4px; }
.mb-1\\.5 { margin-bottom: 6px; }
.mb-2 { margin-bottom: 8px; }
.mb-3 { margin-bottom: 12px; }
.mb-4 { margin-bottom: 16px; }
.mb-6 { margin-bottom: 24px; }
.mb-8 { margin-bottom: 32px; }

.mt-1 { margin-top: 4px; }
.mt-1\\.5 { margin-top: 6px; }
.mt-2 { margin-top: 8px; }
.mt-3 { margin-top: 12px; }
.mt-4 { margin-top: 16px; }
.mt-6 { margin-top: 24px; }
.mt-8 { margin-top: 32px; }

.ml-1 { margin-left: 4px; }
.ml-1\\.5 { margin-left: 6px; }
.mr-1 { margin-right: 4px; }

.p-3 { padding: 12px; }
.p-3\\.5 { padding: 14px; }
.p-4 { padding: 16px; }
.p-6 { padding: 24px; }

.px-2 { padding-left: 8px; padding-right: 8px; }
.px-3 { padding-left: 12px; padding-right: 12px; }
.py-1 { padding-top: 4px; padding-bottom: 4px; }
.py-0\\.5 { padding-top: 2px; padding-bottom: 2px; }
.py-1\\.5 { padding-top: 6px; padding-bottom: 6px; }
.py-2 { padding-top: 8px; padding-bottom: 8px; }

.pt-2 { padding-top: 8px; }
.pt-3 { padding-top: 12px; }
.pt-4 { padding-top: 16px; }
.pb-3 { padding-bottom: 12px; }
.pb-4 { padding-bottom: 16px; }
.pr-2 { padding-right: 8px; }
.pr-20 { padding-right: 5rem; }

/* ===================================================
   12. TYPOGRAPHY UTILITIES
   =================================================== */
.text-xs { font-size: 12px; }
.text-\\[10px\\] { font-size: 10px; }
.text-\\[10\\.5px\\] { font-size: 10.5px; }
.text-\\[11px\\] { font-size: 11px; }
.text-sm { font-size: 14px; }
.text-base { font-size: 16px; }
.text-lg { font-size: 18px; }
.text-xl { font-size: 20px; }

.font-mono { font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', 'Cascadia Code', 'Consolas', monospace; }
.font-sans { font-family: var(--font-sans); }
.font-bold { font-weight: 700; }
.font-extrabold { font-weight: 800; }
.font-semibold { font-weight: 600; }

.tracking-tight { letter-spacing: -0.02em; }
.tracking-wider { letter-spacing: 0.05em; }

.uppercase { text-transform: uppercase; }
.leading-relaxed { line-height: 1.625; }
.break-all { word-break: break-all; }
.whitespace-pre-wrap { white-space: pre-wrap; }
.text-right { text-align: right; }
.text-center { text-align: center; }
.word-break-word { word-break: break-word; }

.text-dim { color: var(--text-dim); }
.text-white { color: #FFFFFF; }

.text-\\[\\#1C2B1B\\] { color: #1C2B1B; }
.text-\\[\\#2A3B27\\] { color: #2A3B27; }
.text-\\[\\#4D614A\\] { color: #4D614A; }
.text-\\[\\#55738D\\] { color: #55738D; }
.text-\\[\\#70805D\\] { color: #70805D; }
.text-sky-400 { color: #38BDF8; }
.text-gray-400 { color: #9CA3AF; }
.text-slate-400 { color: #94A3B8; }
.text-slate-500 { color: #64748B; }
.text-slate-200 { color: #E2E8F0; }

.hover\\:text-gray-600:hover { color: #4B5563; }
.hover\\:text-white:hover { color: #FFFFFF; }
.hover\\:bg-\\[\\#F1F4EE\\]:hover { background: #F1F4EE; }

/* ===================================================
   13. SIZING UTILITIES
   =================================================== */
.w-full { width: 100%; }
.w-56 { width: 14rem; }
.w-64 { width: 16rem; }
.h-44 { height: 11rem; }
.min-h-\\[80px\\] { min-height: 80px; }
.min-h-\\[100px\\] { min-height: 100px; }
.max-h-\\[220px\\] { max-height: 220px; }
.max-h-\\[260px\\] { max-height: 260px; }
.max-h-64 { max-height: 16rem; }
.max-h-\\[75vh\\] { max-height: 75vh; }
.overflow-y-auto { overflow-y: auto; }

/* ===================================================
   14. BORDER & ROUNDED UTILITIES
   =================================================== */
.rounded { border-radius: 4px; }
.rounded-lg { border-radius: 8px; }
.rounded-xl { border-radius: 12px; }
.rounded-2xl { border-radius: 16px; }
.rounded-full { border-radius: 9999px; }

.border { border-width: 1px; border-style: solid; }
.border-t { border-top: 1px solid var(--border-subtle); }
.border-b { border-bottom: 1px solid var(--border-subtle); }

.border-white\\/10 { border-color: rgba(255, 255, 255, 0.10); }
.border-\\[\\#70805D\\]\\/15 { border-color: rgba(112, 128, 93, 0.15); }
.border-\\[\\#70805D\\]\\/20 { border-color: rgba(112, 128, 93, 0.20); }
.border-\\[\\#70805D\\]\\/25 { border-color: rgba(112, 128, 93, 0.25); }
.border-\\[\\#BDCFAA\\]\\/30 { border-color: rgba(189, 207, 170, 0.30); }

/* ===================================================
   15. BACKGROUND UTILITIES
   =================================================== */
.bg-white { background: #FFFFFF; }
.bg-black\\/40 { background: rgba(0, 0, 0, 0.08); }
.bg-\\[\\#F8F9F6\\] { background: #F8F9F6; }
.bg-\\[\\#70805D\\] { background: #70805D; }
.bg-\\[\\#70805D\\]\\/10 { background: rgba(112, 128, 93, 0.10); }
.bg-\\[\\#70805D\\]\\/20 { background: rgba(112, 128, 93, 0.20); }
.bg-\\[\\#25D366\\] { background: #25D366; }
.bg-slate-800 { background: #1E293B; }
.bg-slate-950\\/60 { background: rgba(2, 6, 23, 0.08); }

.shadow-inner { box-shadow: inset 0 2px 4px 0 rgba(42, 59, 39, 0.06); }
.shadow-lg { box-shadow: 0 10px 15px -3px rgba(42, 59, 39, 0.10), 0 4px 6px -4px rgba(42, 59, 39, 0.10); }
.shadow-\\[\\#BDCFAA\\]\\/5 { box-shadow: 0 10px 15px -3px rgba(189, 207, 170, 0.05); }

/* ===================================================
   16. CARD-FORM (Section Panels)
   =================================================== */
.card-form {
  padding: 28px;
  margin-bottom: 0;
}

.card-form h3 {
  font-size: 17px;
  font-weight: 800;
  color: var(--text-heading);
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-form h4 {
  font-size: 14px;
  font-weight: 800;
  color: var(--text-heading);
}

.section-desc {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.5;
}

/* ===================================================
   17. BUTTON VARIANTS
   =================================================== */
.btn-secondary-sm {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: #F8F9F6;
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  color: var(--text-muted);
  font-size: 12.5px;
  font-weight: 700;
  font-family: var(--font-sans);
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary-sm:hover {
  background: #FFFFFF;
  color: var(--palette-olive);
  border-color: var(--border-glass);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  background: #F8F9F6;
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  color: var(--text-muted);
  font-size: 13px;
  font-weight: 700;
  font-family: var(--font-sans);
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: #FFFFFF;
  color: var(--palette-olive);
  border-color: var(--border-glass);
}

.btn-primary-gold-sm {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  background: linear-gradient(135deg, #70805D 0%, #2A3B27 100%);
  color: #FFFFFF;
  border: none;
  border-radius: 10px;
  font-size: 12.5px;
  font-weight: 700;
  font-family: var(--font-sans);
  cursor: pointer;
  box-shadow: 0 3px 12px -2px rgba(112, 128, 93, 0.35);
  transition: all 0.2s;
}

.btn-primary-gold-sm:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px -2px rgba(112, 128, 93, 0.45);
}

.btn-ghost-sm {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  background: transparent;
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 600;
  font-family: var(--font-sans);
  cursor: pointer;
  transition: all 0.2s;
}

.btn-ghost-sm:hover {
  background: #F1F4EE;
  color: var(--palette-olive);
  border-color: var(--border-glass);
}

.btn-link {
  background: transparent;
  border: none;
  color: var(--palette-olive);
  font-size: 12.5px;
  font-weight: 700;
  cursor: pointer;
  font-family: var(--font-sans);
  padding: 0;
  text-decoration: none;
  transition: color 0.2s;
}

.btn-link:hover {
  color: var(--palette-forest);
  text-decoration: underline;
}

.btn-delete-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  flex-shrink: 0;
  padding: 0;
}

.btn-delete-icon:hover {
  background: rgba(220, 38, 38, 0.08);
  border-color: rgba(220, 38, 38, 0.2);
}

/* ===================================================
   18. DYNAMIC ROWS (Deliverables, Typewriter etc.)
   =================================================== */
.dynamic-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.dynamic-row .admin-input {
  flex: 1;
}

.dynamic-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* ===================================================
   19. OVERVIEW PAGE
   =================================================== */
.overview-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

@media (max-width: 1024px) {
  .overview-split {
    grid-template-columns: 1fr;
  }
}

.overview-card {
  padding: 28px;
}

.overview-card h3 {
  font-size: 17px;
  font-weight: 800;
  color: var(--text-heading);
  margin-bottom: 6px;
}

.widget-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  background: rgba(112, 128, 93, 0.10);
  flex-shrink: 0;
}

.widget-data {
  display: flex;
  flex-direction: column;
}

.widget-value {
  font-size: 26px;
  font-weight: 900;
  color: var(--text-heading);
  line-height: 1.2;
}

.widget-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  margin-top: 2px;
}

.quick-links-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 16px;
}

.quick-link-btn {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  padding: 16px;
  background: #F8F9F6;
  border: 1px solid var(--border-subtle);
  border-radius: 14px;
  cursor: pointer;
  text-align: left;
  font-family: var(--font-sans);
  transition: all 0.25s;
}

.quick-link-btn:hover {
  background: #FFFFFF;
  border-color: var(--palette-olive);
  box-shadow: 0 6px 20px -4px rgba(112, 128, 93, 0.12);
  transform: translateY(-2px);
}

.quick-link-btn span {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-heading);
}

.quick-link-btn small {
  font-size: 11.5px;
  color: var(--text-dim);
  line-height: 1.4;
}

.recent-leads-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.empty-state-sm {
  padding: 24px;
  text-align: center;
  color: var(--text-dim);
  font-size: 13px;
  background: #F8F9F6;
  border-radius: 12px;
  border: 1px dashed var(--border-subtle);
}

/* ===================================================
   20. SEO & AI STUDIO
   =================================================== */
.ai-badge-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 800;
  padding: 5px 14px;
  border-radius: 20px;
  background: rgba(112, 128, 93, 0.10);
  color: var(--palette-olive);
  border: 1px solid rgba(112, 128, 93, 0.25);
}

.seo-audit-score {
  font-size: 13px;
  font-weight: 800;
  color: #10B981;
  background: rgba(16, 185, 129, 0.08);
  padding: 5px 14px;
  border-radius: 10px;
  border: 1px solid rgba(16, 185, 129, 0.25);
}

.badge-tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 700;
}

.google-preview-box {
  background: #FFFFFF;
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: 20px;
}

.google-preview-url {
  font-size: 12px;
  color: var(--text-dim);
  font-family: Arial, sans-serif;
  margin-bottom: 4px;
}

.google-preview-title {
  font-size: 18px;
  font-weight: 600;
  color: #1A0DAB;
  line-height: 1.3;
  margin-bottom: 4px;
  cursor: pointer;
}

.google-preview-title:hover {
  text-decoration: underline;
}

.google-preview-desc {
  font-size: 13px;
  color: #4D5156;
  line-height: 1.5;
  font-family: Arial, sans-serif;
}

/* Toggle Switch */
.switch {
  position: relative;
  display: inline-block;
  width: 46px;
  height: 24px;
  flex-shrink: 0;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider.round {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #CBD5E1;
  border-radius: 24px;
  transition: 0.3s;
}

.slider.round:before {
  content: "";
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #FFFFFF;
  left: 3px;
  bottom: 3px;
  transition: 0.3s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12);
}

input:checked + .slider.round {
  background: var(--palette-olive);
}

input:checked + .slider.round:before {
  transform: translateX(22px);
}

/* ===================================================
   21. LEADS INBOX
   =================================================== */
.leads-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.admin-input-search {
  padding: 9px 16px;
  background: var(--bg-input);
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  color: var(--text-main);
  font-size: 13px;
  font-family: var(--font-sans);
  outline: none;
  width: 240px;
  transition: all 0.2s;
}

.admin-input-search:focus {
  background: #FFFFFF;
  border-color: var(--palette-olive);
  box-shadow: 0 0 0 3px rgba(112, 128, 93, 0.12);
}

.table-responsive {
  overflow-x: auto;
  border-radius: 14px;
  border: 1px solid var(--border-subtle);
  background: #FFFFFF;
}

.table-responsive table {
  width: 100%;
  border-collapse: collapse;
}

.table-responsive th {
  background: #F1F4EE;
  padding: 14px 18px;
  font-weight: 800;
  font-size: 11.5px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--palette-forest);
  text-align: left;
  border-bottom: 1px solid var(--border-subtle);
}

.table-responsive td {
  padding: 14px 18px;
  border-bottom: 1px solid var(--border-subtle);
  color: var(--text-main);
  font-size: 13px;
}

.table-responsive tr:hover td {
  background: #F8F9F6;
}

/* ===================================================
   22. STATS EDITOR GRID
   =================================================== */
.stats-editor-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 768px) {
  .stats-editor-grid {
    grid-template-columns: 1fr;
  }
}

/* ===================================================
   23. TOAST NOTIFICATION
   =================================================== */
.admin-toast {
  position: fixed;
  bottom: 32px;
  right: 32px;
  padding: 14px 24px;
  background: #FFFFFF;
  border: 1px solid var(--border-subtle);
  border-radius: 14px;
  box-shadow: 0 12px 40px -6px rgba(42, 59, 39, 0.15);
  font-size: 13px;
  font-weight: 700;
  color: var(--text-heading);
  z-index: 9999;
  animation: toastSlide 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
}

.admin-toast.toast-success {
  border-left: 4px solid #10B981;
}

.admin-toast.toast-error {
  border-left: 4px solid #DC2626;
}

.admin-toast.toast-info {
  border-left: 4px solid var(--palette-olive);
}

@keyframes toastSlide {
  from { opacity: 0; transform: translateY(10px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* ===================================================
   24. UNSAVED CHANGES BAR
   =================================================== */
.unsaved-bar {
  position: fixed;
  bottom: 0;
  left: 280px;
  right: 0;
  background: #FFFFFF;
  border-top: 2px solid var(--palette-olive);
  padding: 14px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 50;
  box-shadow: 0 -4px 20px rgba(42, 59, 39, 0.08);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

.unsaved-info {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-heading);
}

.unsaved-dot {
  color: #F59E0B;
  font-size: 16px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.unsaved-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* ===================================================
   25. DANGER ZONE
   =================================================== */
.danger-zone {
  border-color: rgba(220, 38, 38, 0.25) !important;
  background: rgba(220, 38, 38, 0.02) !important;
}

.danger-zone h3 {
  color: #DC2626;
}

/* ===================================================
   26. SPACE-Y UTILITY
   =================================================== */
.space-y-2 > * + * { margin-top: 8px; }
.space-y-3 > * + * { margin-top: 12px; }
.space-y-4 > * + * { margin-top: 16px; }
.space-y-5 > * + * { margin-top: 20px; }
.space-y-6 > * + * { margin-top: 24px; }

/* ===================================================
   27. BLOCK UTILITY
   =================================================== */
.block { display: block; }
.inline-block { display: inline-block; }
.cursor-pointer { cursor: pointer; }
.transition-colors { transition: color 0.2s, background-color 0.2s; }

/* ===================================================
   28. NAV ICON SIZING
   =================================================== */
.nav-icon {
  font-size: 16px;
  width: 22px;
  text-align: center;
  flex-shrink: 0;
}

.nav-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ===================================================
   29. RESPONSIVE ADJUSTMENTS
   =================================================== */
@media (max-width: 768px) {
  .admin-sidebar {
    width: 240px;
  }
  .admin-content-container {
    padding: 20px;
  }
  .overview-grid {
    grid-template-columns: 1fr 1fr;
  }
  .quick-links-grid {
    grid-template-columns: 1fr;
  }
  .unsaved-bar {
    left: 0;
  }
}

/* ===================================================
   30. SCROLLBAR STYLING
   =================================================== */
.admin-sidebar::-webkit-scrollbar,
.admin-content-container::-webkit-scrollbar {
  width: 5px;
}

.admin-sidebar::-webkit-scrollbar-track,
.admin-content-container::-webkit-scrollbar-track {
  background: transparent;
}

.admin-sidebar::-webkit-scrollbar-thumb,
.admin-content-container::-webkit-scrollbar-thumb {
  background: rgba(112, 128, 93, 0.2);
  border-radius: 10px;
}

.admin-sidebar::-webkit-scrollbar-thumb:hover,
.admin-content-container::-webkit-scrollbar-thumb:hover {
  background: rgba(112, 128, 93, 0.35);
}
`;

css += missingCSS;
fs.writeFileSync(cssPath, css, 'utf8');
console.log('Admin CSS fixed! Added all missing styles.');
