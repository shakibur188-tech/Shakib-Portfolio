# Engineering Standards, Operational Rules & AI Boundaries

## 1. Core Principles & "What To Do"

### 1.1 Performance & Code Quality
- **Zero-Bloat Vanilla Architecture**: Keep client-side bundles lean. Rely on native ES6+ features, CSS custom properties, and semantic HTML5.
- **Mobile-First Responsive Verification**: Every UI component must be thoroughly validated across screen viewports from 320px (iPhone SE) to 1440px+ (Ultra-wide displays).
- **Sub-Second First Load**: Keep critical path assets minimized; lazy-load secondary images with `loading="lazy"` and explicit width/height attributes.
- **Fail-Safe Client Hydration**: Client applications (`app.js`, `service-page.js`) must always maintain built-in fallback data to guarantee 100% render reliability if backend APIs are temporarily unreachable.
- **Single Source of Truth**: Content updates made via `/admin` must immediately reflect in `data/content.json` and hot-update public DOM elements.

### 1.2 Technical Marketing & SEO Standards
- **AEO & LLM Grounding**: Maintain `/llms.txt` with structured markdown summaries of all services, skills, and portfolio case studies for generative search crawlers (ChatGPT, Perplexity, Gemini, Claude).
- **Rich Schema.org JSON-LD**: Include structured `Person`, `WebSite`, `ProfessionalService`, and `ItemList` schemas with verified social and canonical links.
- **Clean Conversion Pipelines**: All forms must have client-side validation, anti-spam sanitization, and structured payload transmission to `/api/leads`.

---

## 2. Anti-Patterns & "What To Avoid"

- ❌ **NO Hardcoded External Framework Dependencies**: Avoid heavy frontend runtime bundles (e.g. huge React/Vue production builds for static informational views) when vanilla ES6 delivers instant loading.
- ❌ **NO Horizontal Scroll Viewport Leaks**: Never use uncontrolled `100vw` widths or horizontal CSS translate transforms on mobile without explicit container overflow clipping.
- ❌ **NO Unsanitized DOM Injections**: Never use raw `innerHTML` with untrusted user inputs. Always pass data through `escapeHtml()` before DOM rendering.
- ❌ **NO Direct State Overwrites without Backup**: File modifications to `data/*.json` must use atomic write strategies to avoid file corruption during concurrent operations.
- ❌ **NO Password Plaintext Exposure**: Admin passwords and AI API bearer tokens must be stored on the server backend and never exposed over public client responses.

---

## 3. Approved Libraries & Tools

| Category | Approved Tool / Library | Purpose |
| :--- | :--- | :--- |
| **Typography** | Google Fonts — Plus Jakarta Sans | Single unified font family across all headings, body, and UI. |
| **Icons** | Font Awesome 6.5.1 CDN | Consistent vector iconography for services, tools, and navigation. |
| **Utility CSS** | Tailwind CSS CDN | Rapid spacing, grid, and flexbox utility helpers. |
| **Backend Core** | Node.js Built-in Core API | Fast static file delivery, REST routing, process supervision. |
| **Edge Delivery** | Cloudflare Quick Tunnels | Ephemeral & production tunneling with SSL encryption. |

---

## 4. AI Assistant Boundaries & Guidelines

- **Preserve Working Features**: When editing existing files, never remove unrelated features, comments, or styling sections.
- **Verify Execution**: Always test endpoints, build scripts, and tunnel connections proactively using system commands.
- **Cross-Platform Pathing**: Always use robust path resolution (`path.join(__dirname, ...)`) to prevent Windows backslash escaping errors.
- **Graceful Error Handling**: Return meaningful HTTP status codes (400, 401, 404, 500) and structured JSON error messages from all API routes.
