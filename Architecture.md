# System Architecture & Technical Specification — shakibur.info

## 1. System Overview & Application Flow

```
+-----------------------------------------------------------------------------------+
|                                  USER / CLIENT                                    |
|             (Desktop, Tablet, Mobile - iOS Safari, Chrome, Edge, Firefox)         |
+-----------------------------------------------------------------------------------+
                                         |
                                         | HTTPS / WSS Requests
                                         v
+-----------------------------------------------------------------------------------+
|                            CLOUDFLARE EDGE NETWORK                                |
|                (SSL Termination, Global CDN, Quick Tunnel / DNS)                  |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                              NODE.JS HTTP ENGINE                                  |
|                             (server.js - Port 5500)                               |
|                                                                                   |
|  +---------------------------+  +----------------------+  +--------------------+  |
|  |    Static Asset Server    |  |     REST API Core    |  |  Cloudflare Tunnel |  |
|  |   HTML5, CSS3, ES6 JS,    |  |  /api/content (GET)  |  |  Process Manager   |  |
|  |     Images, Fonts, SVG    |  |  /api/content (POST) |  |   (Auto-Healing)   |  |
|  +---------------------------+  |  /api/leads (POST)   |  +--------------------+  |
|                                 |  /api/auth (POST)    |                          |
|                                 |  /api/forms (CRUD)   |                          |
|                                 |  /api/ai/* (Studio)  |                          |
|                                 +----------------------+                          |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                             PERSISTENCE LAYER (JSON & LocalStorage)               |
|  - data/content.json (Site content, services, web projects, SEO graph)            |
|  - data/leads.json (Submitted project briefs, client inquiries, package bookings) |
|  - data/custom_forms.json (Dynamic Form Builder schemas & templates)              |
|  - data/form_submissions.json (Form responses & webhook payload logs)             |
|  - localStorage (Client-side lead caching: shakib_leads, shakib_inquiries)        |
+-----------------------------------------------------------------------------------+
```

---

## 2. Directory & File Structure

```
shakibur-portfolio/
├── index.html                     # Primary single-page portfolio & showcase
├── services.html                  # Consolidated 9-Services directory
├── projects.html                  # Web development projects showcase
├── case-studies.html              # Case studies directory
├── case-study.html                # Detailed single case study template
├── experience.html                # Career timeline & expertise
├── testimonials.html              # Client endorsements & photo mosaic
├── consultation.html              # Strategy session booking
├── contact.html                   # Contact & direct WhatsApp reach
├── form.html                      # Standalone form viewer
├── admin.html                     # Administrative control center & CRM
├── admin.css                      # Admin CMS dashboard styling
├── admin.js                       # Admin CMS frontend application logic
├── styles.css                     # Unified Dark Teal Glass design system
├── app.js                         # Public client runtime & DOM hydration
├── site-hydration.js              # Multi-page header, footer, & navigation hydration
├── server.js                      # High-performance Node.js backend & tunnel supervisor
├── llms.txt                       # Machine-readable context graph for LLMs (AEO)
├── package.json                   # Project descriptor & scripts
│
├── offers/                        # Promotional packages & campaign landing pages
│   └── ecommerce.html             # E-Commerce package pricing, matrix, & in-page booking
│
├── services/                      # 9 Granular service vertical detail sub-pages
│   ├── service-page.js            # Shared interactive logic for service sub-pages
│   ├── branding.html              # 01 Branding & Strategy
│   ├── graphics-design.html       # 02 Graphics Design & Visual ID
│   ├── web-development.html       # 03 Web Design & Development (MERN/Laravel)
│   ├── social-media-marketing.html# 04 Social Media & Meta Paid Ads
│   ├── photoshoot-videography.html# 05 Commercial Photoshoot & Video
│   ├── event-activation.html      # 06 Event & 3D Spatial Builds
│   ├── google-ads.html            # 07 Google Ads & Performance Max
│   ├── seo-aeo.html               # 08 SEO & Generative AI Search (AEO)
│   └── public-relations.html      # 09 Strategic PR & Mainstream Media
│
├── data/                          # Flat-file database & state persistence
│   ├── content.json               # Master CMS payload (services, projects, stats)
│   ├── leads.json                 # Inbound client leads repository
│   ├── custom_forms.json          # Form Builder schemas & 22 templates
│   ├── form_submissions.json     # Submissions ledger
│   └── live_tunnel_url.txt        # Current active Cloudflare live endpoint
│
├── assets/                        # Static imagery, brand assets, photography
│   └── shakibur.jpg               # Author master portrait
│
└── docs/                          # Comprehensive technical documentation
    ├── PRD.md                     # Product Requirements Document
    ├── Architecture.md            # System Architecture & Tech Specs
    ├── Rules.md                   # Engineering Standards & AI Boundaries
    ├── Design.md                  # Design System, Palette & Typography
    ├── Task.md                    # Implementation Roadmap & Sprint Logs
    └── Memory.md                  # Context Ledger & Changelog
```

---

## 3. Technology Stack & Framework Choices

| Layer | Technologies Selected | Justification |
| :--- | :--- | :--- |
| **Frontend Core** | HTML5, Modern ES6+ JavaScript, Tailwind CSS (Utility CDN) | Sub-second First Contentful Paint (FCP), zero build-step overhead, maximum reliability. |
| **Styling & Motion** | Custom CSS3 Custom Properties, Plus Jakarta Sans, FontAwesome 6.5, Frosted Glass Blur | Luxury Dark Teal Aurora aesthetic, responsive cards, glassmorphic sheen effects. |
| **Backend Runtime** | Node.js (Built-in `http`, `fs`, `path`, `crypto`, `child_process`) | Ultra-lightweight, zero external npm vulnerability surface, native fast I/O. |
| **Data Persistence** | Atomic JSON Flat-File Store with in-memory & LocalStorage caching | Deterministic snapshots, instant backup/restore, offline resilience. |
| **Deployment & Tunnel** | Cloudflare Zero-Trust Quick Tunnel (`cloudflared`) | Instant SSL, DDoS protection, edge caching, zero exposed local ports. |
| **Supported Dev Stacks** | MERN (MongoDB, Express, React, Node.js), Laravel, WordPress, WooCommerce | Complete versatility across headless SPAs, enterprise PHP backends, and CMS portals. |
