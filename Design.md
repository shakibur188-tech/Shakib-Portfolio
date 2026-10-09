# Design System Specification — shakibur.info

## 1. Brand Aesthetic & Philosophy
The **shakibur.info** design system is built upon a **Dark Teal / Cyan Aurora & Frosted Glass** luxury aesthetic. It blends deep oceanic darks (`#021217`, `#041C22`) with vibrant neon cyan/teal accents (`#20E1B2`, `#0D9488`, `#D1F5EE`), frosted glass cards (`backdrop-blur-2xl`), and subtle luminous glowing borders, communicating high-end engineering authority, data mastery, and creative prestige.

---

## 2. Color Palette & Token Definitions

| Token Name | Hex Code / Value | Semantic Role | Usage Context |
| :--- | :--- | :--- | :--- |
| **--palette-primary** | `#20E1B2` | Primary Neon Cyan / Teal Accent | Primary CTA buttons, glowing badges, active pills, hover borders. |
| **--palette-teal-deep** | `#0D9488` | Deep Teal Accent | Secondary gradients, accent cards, icon backgrounds. |
| **--palette-cyan-light**| `#D1F5EE` | Ice Mint Text / Neutral Highlight | Subheadings, feature text, badges, secondary icons. |
| **--bg-canvas** | `#021217` to `#041C22` | Deep Ocean Canvas Gradient | Full-page background with radial aurora ambient lights. |
| **--bg-glass-card** | `rgba(8, 40, 48, 0.45)` | Frosted Glass Surface | Bento cards, pricing tiers, feature blocks, modal backdrops. |
| **--border-glass** | `rgba(209, 245, 238, 0.15)` | Subtle Glass Border | Card borders, table cell dividers, form inputs. |
| **--text-primary** | `#FFFFFF` | High-Contrast Headings & Titles | Hero titles, package names, pricing figures. |
| **--text-secondary** | `#94A3B8` / `#CBD5E1` | Readable Body & Meta Text | Paragraphs, descriptions, secondary metadata. |

---

## 3. Typography System

**Single Unified Typeface**: `Plus Jakarta Sans` & `Inter` (Weights: 300, 400, 500, 600, 700, 800, 900)

| Hierarchy Level | Font Size (Desktop) | Font Size (Mobile) | Weight | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Title (Hero)** | 3.75rem – 4.5rem (60-72px) | 2.25rem (36px) | 800 (Extrabold) | 1.08 | -0.03em |
| **Section Heading (H2)** | 2.5rem – 3.0rem (40-48px) | 1.75rem (28px) | 800 (Extrabold) | 1.15 | -0.02em |
| **Card Title (H3)** | 1.25rem – 1.5rem (20-24px) | 1.125rem (18px) | 700 (Bold) | 1.30 | -0.015em |
| **Body Text** | 0.9375rem (15px) | 0.875rem (14px) | 400 / 500 (Medium) | 1.65 | -0.01em |
| **Meta / Eyebrow Tag** | 0.6875rem (11px) | 0.625rem (10px) | 800 (Extrabold) | 1.00 | +0.14em (Uppercase) |
| **Pricing / Figures** | 2.25rem – 3.0rem (36-48px) | 1.75rem (28px) | 900 (Black) | 1.10 | -0.02em |

---

## 4. UI Components & Micro-Interactions

### 4.1 Frosted Glassmorphic Cards (`.glass-card`)
- **Base Surface**: `bg-[#082830]/45 backdrop-blur-2xl border border-[#D1F5EE]/15`.
- **Hover Transition**: `hover:border-[#20E1B2]/60 hover:-translate-y-1 transition-all duration-300 shadow-2xl`.
- **Spotlight Sheen**: Subtle dynamic glow with gradient overlay `radial-gradient(circle at top, rgba(32,225,178,0.12), transparent 70%)`.

### 4.2 Interactive Action Buttons
- **Primary Glowing Pill**: `bg-gradient-to-r from-[#20E1B2] to-[#0D9488] text-[#021217] font-extrabold shadow-lg shadow-[#20E1B2]/20 hover:scale-[1.02]`.
- **Glass Outline Button**: `bg-white/5 border border-[#D1F5EE]/20 text-[#D1F5EE] hover:bg-[#20E1B2]/10 hover:border-[#20E1B2]/50`.
- **Floating WhatsApp Action**: Direct WhatsApp click triggering chat with `01838070468` / `+880 1838-070468`.

### 4.3 Ambient Background Engine
- **Dark Aurora Mesh**: Fixed layered gradients `radial-gradient(circle at 15% 20%, rgba(32, 225, 178, 0.12) 0%, transparent 40%)` and `radial-gradient(circle at 85% 80%, rgba(13, 148, 136, 0.12) 0%, transparent 40%)`.
- **Canvas Noise / Particle Layer**: Seamless subtle texture overlaid on top of `#021217` body canvas.
