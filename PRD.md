# Product Requirements Document (PRD) — shakibur.info

## 1. Project Overview & Mission
**shakibur.info** is the official digital flagship and portfolio platform for **Md. Shakibur Rahaman** — a Senior Digital Marketing Specialist, Technical Growth Architect, and Full-Stack Web Developer (MERN Stack, Laravel, WordPress).

The platform demonstrates the convergence of **high-performance software engineering** and **data-driven marketing acquisition systems**, providing corporate enterprises, high-growth startups, and agencies with proof of technical execution, live client platforms, promotional package deals, and end-to-end delivery frameworks.

---

## 2. Target Audience & Personas

| Target Persona | Key Objectives | Critical Site Requirements |
| :--- | :--- | :--- |
| **Enterprise Executives & Founders** | Looking for a strategic leader who owns both product engineering and growth marketing. | High-trust proof, verified case studies, authoritative bio, immediate consultation booking. |
| **Marketing Directors & CMOs** | Seeking technical marketing setups (GTM, GA4, Meta Pixel, Conversion API, SEM funnels, SEO/AEO). | Granular marketing blueprints, data pipeline examples, ROAS metrics, conversion rate lift data. |
| **E-Commerce Brands & Small Businesses** | Looking for turnkey website development packages (WooCommerce, Shopify, Custom MERN/Laravel). | Clear package pricing tiers, feature comparison matrix, in-page booking form, WhatsApp direct booking. |
| **Engineering Leads & CTOs** | Evaluating full-stack code quality, system architecture, performance, and stack versatility. | Clean architecture breakdown, Jamstack speed, headless CMS integrations, REST API specs. |
| **Agency Partners & Recruiters** | Seeking fractional strategic leadership or contract execution across multi-disciplinary scopes. | Clear service pillar deliverables, rate inquiry form, downloadable resumes/specs. |

---

## 3. Core Features & Functional Scope

### 3.1 Public Portfolio & Multi-Page Platform
- **Ambient Neon Aurora & Frosted Glass Hero**: Fluid typography, dynamic status badges, WhatsApp direct contact (`01838070468`), and social verification channels.
- **9 Core Service Pillars**:
  1. *Branding & Corporate Strategy*
  2. *Graphics Design & Visual Identity (Packaging, UI/UX, Decks)*
  3. *Web Design & Full-Stack Development (MERN, Laravel, Jamstack)*
  4. *Data-Driven Social Media Marketing (SMM & Paid Meta Funnels)*
  5. *Commercial Photoshoot & Cinematic Videography*
  6. *Event Activation & 3D Spatial Stalls*
  7. *Google Ads & Intent Scaling (Search, Display, Performance Max)*
  8. *SEO & Generative AI Search Optimization (AEO, Schema Graphs)*
  9. *Strategic Public Relations (PR) & Mainstream Media Outreach*
- **Dedicated Service Detail Pages** (`services/*.html`): Granular before/after sliders, deliverables breakdowns, and lead intake forms.
- **Projects Showcase & Case Studies** (`projects.html`, `case-studies.html`, `case-study.html`): Interactive category filter, live web links, and impact metrics.
- **Experience & Testimonials** (`experience.html`, `testimonials.html`): Career milestone timeline, verified client reviews, and photo mosaic.
- **Consultation & Contact** (`consultation.html`, `contact.html`): Multi-channel booking, Calendly integration, direct WhatsApp connection.

### 3.2 Promotional Offers & Turnkey Packages (`offers/ecommerce.html`)
- **4 E-Commerce Development Packages**:
  - *Starter Store* (৳ 12,000)
  - *Growth Pro* (৳ 22,000)
  - *Advanced Scale* (৳ 38,000)
  - *Enterprise Custom* (৳ 65,000+)
- **Dual View Modes (Cards vs. Comparison Table)**: Dynamic responsive toggle; mobile view defaults to cards first, desktop defaults to comprehensive table first.
- **In-Page Smooth Booking Flow (No Modal Interruption)**:
  - Clicking any package smoothly scrolls directly to the in-page booking form.
  - Automatically pre-selects the selected package in the form dropdown.
- **Smart Booking Form Fields**:
  - *Name*
  - *Contact* starting with fixed `+880` prefix
  - *Select Package* dropdown
  - *Business Types* dropdown with dynamic conditional "Others" text input field
  - *Submit* with instant CRM lead capture and confirmation.
- **Page-Load Welcome Lead Capture Modal**:
  - Welcomes every first-time visitor with a high-conversion discount claim modal (Name + `+880` phone).
  - Displays instant "Congratulations! 🎉" state upon submission.

### 3.3 Dynamic Headless CMS & Admin Control Center (`/admin.html`)
- **JWT & Session Protected Authentication**: Secure credential validation for site administration (`admin` / `shakibur2026`).
- **Real-Time Content Management**: Edit services, web projects, creative media, milestones, and metadata without code redeployments.
- **Inbound Lead Management (CRM)**: Track submissions from contact, consultation, and e-commerce package forms, with CSV export.
- **Visual Form Builder Engine**: Drag-and-drop custom form generator with embed codes.
- **AI Studio & LLM Copywriting Suite**: Integrated OpenAI-compatible gateway for drafting case studies and SEO tags.
- **Comprehensive SEO & AEO Command Center**: Google SERP simulator, dynamic `/llms.txt`, and Schema.org JSON-LD formatting.
