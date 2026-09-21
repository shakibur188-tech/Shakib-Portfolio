# Graph Report - shakibur-portfolio-live  (2026-09-21)

## Corpus Check
- 39 files · ~162,701 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 2, .css 2, .bat 2)

## Summary
- 302 nodes · 485 edges · 21 communities (16 shown, 5 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 33 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d3fe67c6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- admin.js
- server.js
- app.js
- Md. Shakibur Rahaman — Executive Portfolio, CMS & Digital Growth Architecture
- update_navbar_and_about.js
- initFormBuilderEventListeners
- service-page.js
- package.json
- 🚀 Easy Deployment & Migration Guide | Md. Shakibur Rahaman Portfolio
- index.php
- Design.md
- Architecture.md
- Personal Portfolio Website - PRD
- test_cms.js
- Task.md
- serve.ps1
- Md. Shakibur Rahaman - Portfolio & CMS Website
- vercel.json
- rules/graphify.md
- workflows/graphify.md
- site-hydration.js

## God Nodes (most connected - your core abstractions)
1. `server` - 27 edges
2. `setupEventListeners()` - 21 edges
3. `showToast()` - 18 edges
4. `escapeHtml()` - 18 edges
5. `populateAdminForms()` - 17 edges
6. `initFormBuilderEventListeners()` - 15 edges
7. `gatherContentFromForms()` - 13 edges
8. `applyContentToDOM()` - 12 edges
9. `Md. Shakibur Rahaman — Executive Portfolio, CMS & Digital Growth Architecture` - 10 edges
10. `loadDashboardData()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `setupEventListeners()` --calls--> `initFormBuilderEventListeners()`  [EXTRACTED]
  admin.js → admin.js  _Bridges community 0 → community 5_

## Import Cycles
- None detected.

## Communities (21 total, 5 thin omitted)

### Community 0 - "admin.js"
Cohesion: 0.08
Nodes (62): allFormsData, allSubmissionsData, calculateSeoScore(), currentBuilderForm, currentLeads, discardChanges(), downloadSiteBackup(), escapeHtml() (+54 more)

### Community 1 - "server.js"
Cohesion: 0.06
Nodes (52): ref_child_process, ref_crypto, ref_https, ref_url, AI_ASSETS_DIR, applySecurityHeaders(), AUTH_FILE, BACKUPS_DIR (+44 more)

### Community 2 - "app.js"
Cohesion: 0.10
Nodes (26): animateSingleCounter(), applyContentToDOM(), currentTypewriterTitles, escapeHtml(), fetchAndHydrateContent(), fetchFallbackData(), filterProjectsByCategory(), getEmergencyFallbackData() (+18 more)

### Community 3 - "Md. Shakibur Rahaman — Executive Portfolio, CMS & Digital Growth Architecture"
Cohesion: 0.10
Nodes (19): 🌐 15 Live Deployed Web Portals Directory, 1. Author Assets & Visual Profiles, 📋 22 Pre-Configured Form Templates, 2. Search Engine, Schema & AI Authority Documents, 3. Lead Generation, Inquiries & Form Records, 4. Deployment Guides & Automation Scripts, Admin Capabilities, 🔐 Admin CMS Control Center (+11 more)

### Community 4 - "update_navbar_and_about.js"
Cohesion: 0.12
Nodes (16): css, cssPath, fs, path, ref_fs, ref_path, fs, indexHtml (+8 more)

### Community 5 - "initFormBuilderEventListeners"
Cohesion: 0.19
Nodes (18): addFieldToBuilder(), closeEmbedModal(), closeTemplateModal(), exportSubmissionsCsv(), filterSubmissionsLocal(), initFormBuilderEventListeners(), loadFormsData(), loadSubmissions() (+10 more)

### Community 6 - "service-page.js"
Cohesion: 0.14
Nodes (5): initAmbientCanvas(), initInteractiveWorkflow(), onScrollSpy(), updateActiveUI(), initScrollProgressBar()

### Community 7 - "package.json"
Cohesion: 0.18
Nodes (10): author, description, keywords, license, main, name, scripts, dev (+2 more)

### Community 8 - "🚀 Easy Deployment & Migration Guide | Md. Shakibur Rahaman Portfolio"
Cohesion: 0.22
Nodes (8): 💻 1. How to Shift from This Desktop to Another Desktop, 🌐 2. How to Upload to Your Web Hosting, 🔐 3. Admin Access & Credentials, 📁 4. Key Files Summary, 🚀 Easy Deployment & Migration Guide | Md. Shakibur Rahaman Portfolio, Option A: Standard Web Hosting (cPanel / Shared Hosting / Namecheap / Hostinger / GoDaddy / Bluehost), Option B: Node.js Cloud Hosting (Render / Railway / DigitalOcean / VPS / AWS), Option C: 1-Click Free Hosting (Vercel / Netlify / GitHub Pages)

### Community 9 - "index.php"
Cohesion: 0.38
Nodes (3): getAuthData(), hashPassword(), verifyAuthHeader()

### Community 10 - "Design.md"
Cohesion: 0.33
Nodes (4): Color, Font, Theme, Typography

### Community 11 - "Architecture.md"
Cohesion: 0.40
Nodes (3): App Flow & Architecture, Folder & File Structure, Tech Stack

### Community 12 - "Personal Portfolio Website - PRD"
Cohesion: 0.40
Nodes (4): Features, Personal Portfolio Website - PRD, Target User, What to Build

### Community 13 - "test_cms.js"
Cohesion: 0.50
Nodes (4): ref_http, http, makeRequest(), runTests()

### Community 14 - "Task.md"
Cohesion: 0.40
Nodes (3): Task-1 (Initial setup and routing), Task-2 (UI implementation and content integration), Task-3 (Analytics, SEO, and deployment)

### Community 20 - "site-hydration.js"
Cohesion: 0.29
Nodes (6): animateCounter(), fetchSiteContent(), hydrateFiguresStrip(), hydratePageContent(), initAnimatedCounters(), initHydration()

## Knowledge Gaps
- **86 isolated node(s):** `currentLeads`, `allFormsData`, `allSubmissionsData`, `currentBuilderForm`, `currentTypewriterTitles` (+81 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 125 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 16 inferred relationships involving `setupEventListeners()` (e.g. with `discardChanges()` and `downloadSiteBackup()`) actually correct?**
  _`setupEventListeners()` has 16 INFERRED edges - model-reasoned connections that need verification._
- **What connects `currentLeads`, `allFormsData`, `allSubmissionsData` to the rest of the system?**
  _86 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `admin.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07837301587301587 - nodes in this community are weakly interconnected._
- **Should `server.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06009783368273934 - nodes in this community are weakly interconnected._
- **Should `app.js` be split into smaller, more focused modules?**
  _Cohesion score 0.0957983193277311 - nodes in this community are weakly interconnected._
- **Should `Md. Shakibur Rahaman — Executive Portfolio, CMS & Digital Growth Architecture` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `update_navbar_and_about.js` be split into smaller, more focused modules?**
  _Cohesion score 0.11695906432748537 - nodes in this community are weakly interconnected._