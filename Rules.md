# Engineering Standards, Operational Rules & AI Boundaries

## 1. Core Principles & "What To Do"

### 1.1 Performance & UI Code Quality
- **Dark Teal / Cyan Glass Aesthetics**: Maintain consistent dark gradient backdrops (`#021217` to `#041C22`) and frosted glass cards (`bg-[#082830]/45 backdrop-blur-2xl border border-[#D1F5EE]/15`) across all pages.
- **Zero-Bloat Vanilla Architecture**: Keep client-side bundles lean. Rely on native ES6+ features, CSS custom properties, and semantic HTML5.
- **Mobile-First Responsive Verification**:
  - Always verify mobile navigation menus are readable (white text on dark frosted teal backgrounds).
  - Show cards view first on mobile screens, and full comparison table view on desktop screens.
- **Unified WhatsApp Integration**: Always use the official verified number `01838070468` (`+8801838070468` / `https://wa.me/8801838070468`).
- **Fail-Safe Client Hydration**: All forms and pages must have dual storage: push to backend API (`/api/leads`) and persist to browser `localStorage` (`shakib_leads`, `shakib_inquiries`).

### 1.2 Technical Marketing & SEO Standards
- **AEO & LLM Grounding**: Maintain `/llms.txt` with structured markdown summaries of all services, packages, skills, and portfolio case studies for generative search crawlers.
- **Rich Schema.org JSON-LD**: Include structured `Person`, `WebSite`, `ProfessionalService`, and `ItemList` schemas with verified social links.
- **Clean Conversion Pipelines**: All forms must validate Bangladesh phone numbers (`+880` prefix) and have anti-spam client sanitization.

---

## 2. Anti-Patterns & "What To Avoid"

- ❌ **NO Hardcoded External Framework Dependencies**: Avoid heavy frontend runtime bundles when vanilla ES6 delivers instant loading.
- ❌ **NO Light Background Clashes in Dark Mode**: Never leave white/light text on white/light backgrounds in mobile menus or dropdowns.
- ❌ **NO Modal Interruption for Package Selection**: When users click a package, do NOT open blocking popups; smoothly scroll down to the dedicated in-page form.
- ❌ **NO Horizontal Scroll Viewport Leaks**: Never use uncontrolled `100vw` widths or horizontal CSS translate transforms on mobile without explicit container overflow clipping.
- ❌ **NO Unsanitized DOM Injections**: Never use raw `innerHTML` with untrusted user inputs. Always pass data through `escapeHtml()` before DOM rendering.
- ❌ **NO Password Plaintext Exposure**: Admin credentials and AI API bearer tokens must never be exposed in public client bundles.

---

## 3. Approved Libraries & Tools

| Category | Approved Tool / Library | Purpose |
| :--- | :--- | :--- |
| **Typography** | Google Fonts — Plus Jakarta Sans & Inter | Clean, authoritative typography for luxury tech brands. |
| **Icons** | Font Awesome 6.5.1 CDN | Consistent vector iconography for services, tools, and social links. |
| **Utility CSS** | Tailwind CSS CDN | Rapid spacing, grid, and flexbox utility helpers. |
| **Backend Core** | Node.js Built-in Core API | Fast static file delivery, REST routing, process supervision. |
| **Edge Delivery** | Cloudflare Quick Tunnels | Ephemeral & production tunneling with SSL encryption. |

---

## 4. AI Assistant Boundaries & Guidelines

- **Preserve Working Features**: When editing existing files, never remove unrelated features, comments, or styling sections.
- **Verify Execution**: Always test endpoints, build scripts, and tunnel connections proactively using system commands.
- **Cross-Platform Pathing**: Always use robust path resolution (`path.join(__dirname, ...)`) to prevent Windows backslash escaping errors.
- **Graceful Error Handling**: Return meaningful HTTP status codes (400, 401, 404, 500) and structured JSON error messages from all API routes.
