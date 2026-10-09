# Sprint Roadmap & Execution Tasks — shakibur.info

## Task-1: Initial Setup, Core Routing & Infrastructure
- [x] **Project Scaffolding**: Setup modular project directory structure in `C:\Users\ORIGIN\.gemini\antigravity\scratch\Shakibur Rahaman`.
- [x] **High-Performance Backend**: Implement `server.js` with zero-dependency Node.js HTTP server, REST routing, and static file streaming.
- [x] **Self-Healing Cloudflare Tunnel**: Embed automated `cloudflared` child process supervisor with stdout parser and auto-reconnect.
- [x] **Data Persistence Layer**: Establish flat-file JSON schemas for site content, leads inbox, forms, and LLM configuration.
- [x] **Secure Authentication Core**: Build token-based admin authentication and password change utilities.

---

## Task-2: UI Implementation, Content & Interactive Features
- [x] **Design System & Typography**: Integrate Plus Jakarta Sans, FontAwesome 6.5.1 CDN, and unified styling.
- [x] **Ambient Background & Motion**: Build interactive canvas orb physics engine, animated mesh glow, and scroll progress indicator.
- [x] **Hero & Profile Showcase**: Implement fluid typography, animated typewriter phrases, live status pill, and direct contact channels.
- [x] **9 Core Services Directory**: Build interactive 3x3 services grid, blueprint detail modal, and dedicated sub-pages (`services/*.html`).
- [x] **15 Live Web Projects Showcase**: Implement category filtering, real-time live link testing, tech stack pills, and impact metrics.
- [x] **WorkNook Testimonials Mosaic**: Implement visual photo collage, gold 5-star ratings, and verified client endorsements.
- [x] **Interactive Before / After Comparison**: Develop touch-enabled dual-layer image comparison slider.
- [x] **4-Phase Delivery Framework**: Engineer interactive phase switcher with progress tracking and step checklist cards.
- [x] **Admin CMS & Form Builder**: Develop full administration dashboard, accordion editors, AI studio, and 20+ template form engine.

---

## Task-3: Mobile Responsiveness, SEO/AEO & Multi-Page Migration
- [x] **Multi-Page Architecture Migration**: Build standalone HTML pages (`services.html`, `projects.html`, `case-studies.html`, `experience.html`, `testimonials.html`, `consultation.html`, `contact.html`).
- [x] **Global Site Hydration**: Create `site-hydration.js` to ensure consistent header, footer, mobile navigation, and CTA across all pages.
- [x] **Search Engine Optimization (SEO)**: Configure canonical tags, OpenGraph share cards, Google SERP preview simulator, and GA4/GTM ID management.
- [x] **AI Search & AEO Standard**: Deploy machine-readable `/llms.txt` and Schema.org JSON-LD graph.

---

## Task-4: Luxury Dark Teal / Glass Overhaul, Offers & In-Page Booking
- [x] **Dark Teal / Cyan Aurora Glass Redesign**: Converted entire website to deep luxury dark gradient (`#021217` to `#041C22`) with frosted glass cards (`bg-[#082830]/45`).
- [x] **Mobile Navigation Readability Overhaul**: Fixed mobile dropdown menus with high-contrast text and dark frosted backgrounds.
- [x] **Unified WhatsApp Integration**: Connected official contact number `01838070468` across all buttons and floating triggers.
- [x] **E-Commerce Packages Page (`offers/ecommerce.html`)**:
  - 4 Tiered packages (Starter 12k, Growth 22k, Advanced 38k, Enterprise 65k+).
  - Dynamic Cards vs. Matrix Table view switcher (Cards view default on mobile, Table default on desktop).
  - **In-Page Smooth Booking Flow**: Replaced modal popups with smooth scroll to dedicated booking form with pre-selected package.
  - **Dynamic Business Types**: Dropdown with dynamic conditional text field for "Others (অন্যান্য)".
  - **Page-Load Welcome Lead Capture Modal**: Automated welcome modal capturing Name & `+880` phone with Congratulations success stage.
- [x] **Production Deployment**: Main branch push to GitHub and automated cPanel deployment ZIP compilation.
