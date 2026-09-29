# Design System Specification — shakibur.info

## 1. Brand Aesthetic & Philosophy
The **shakibur.info** design system is built upon a **Botanical Forest & Steel Slate** light aesthetic on a clean Stone Canvas. It blends organic warmth (earthy sage and deep olive) with modern architectural precision (steel slate and ice mist), communicating authority, technical mastery, and creative sophistication.

---

## 2. Color Palette & Token Definitions

| Token Name | Hex Code | Semantic Role | Usage Context |
| :--- | :--- | :--- | :--- |
| **--palette-olive** | `#70805D` | Primary Accent & Brand Identity | Primary buttons, active tabs, icon highlights, badges. |
| **--palette-forest** | `#2A3B27` | Deep Accent & High Contrast Text | Major headings, monogram gradients, high-emphasis text. |
| **--palette-slate** | `#55738D` | Secondary Accent & Metadata | Subtitles, pill borders, secondary links, category chips. |
| **--palette-mist** | `#96A7B6` | Soft Neutral Accent | Gradient midpoints, subtle dividers, secondary badges. |
| **--palette-stone** | `#CBC8C4` | Neutral Base & Border Tint | Subtle borders, ambient vignettes, inactive states. |
| **--bg-canvas** | `#F8F9F6` | Page Background Canvas | Full-page light canvas, modal overlays, input fields. |
| **--bg-card** | `#FFFFFF` | Elevated Surface & Panels | Bento cards, spotlight panels, accordion rows. |

---

## 3. Typography System

**Single Unified Typeface**: `Plus Jakarta Sans` (Weights: 300, 400, 500, 600, 700, 800, 900)

| Hierarchy Level | Font Size (Desktop) | Font Size (Mobile) | Weight | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Title (Hero)** | 4.5rem (72px) | 2.5rem (40px) | 800 (Extrabold) | 1.06 | -0.03em |
| **Section Heading (H2)** | 3.0rem (48px) | 1.875rem (30px)| 800 (Extrabold) | 1.15 | -0.02em |
| **Card Title (H3)** | 1.25rem (20px) | 1.125rem (18px)| 700 (Bold) | 1.30 | -0.015em |
| **Body Text** | 0.9375rem (15px) | 0.875rem (14px)| 400 / 500 (Medium) | 1.65 | -0.01em |
| **Meta / Eyebrow Tag** | 0.6875rem (11px) | 0.625rem (10px)| 800 (Extrabold) | 1.00 | +0.14em (Uppercase) |
| **Code / Monospace** | 0.75rem (12px) | 0.6875rem (11px)| 600 (Semibold) | 1.40 | 0.00em |

---

## 4. UI Components & Micro-Interactions

### 4.1 Glassmorphic Cards & Mouse Spotlight
- **Base Surface**: `rgba(255, 255, 255, 0.94)` with `backdrop-filter: blur(16px)` and `1px solid rgba(112, 128, 93, 0.18)`.
- **Spotlight Sheen**: Dynamic mouse-following radial gradient driven by CSS custom properties (`--mouse-x`, `--mouse-y`).
- **Elevation on Hover**: `transform: translateY(-4px)` with soft olive drop shadow (`0 16px 36px -10px rgba(42, 59, 39, 0.12)`).

### 4.2 Interactive Action Buttons
- **Primary Aesthetic Button**: Linear gradient `#70805D` to `#2A3B27`, rounded-full pill, white text, bold typography, arrow icon hover shift.
- **Emerald Outline Button**: Transparent fill with `1px solid #70805D`, dark olive text, subtle green fill transition on hover.
- **Glass Floating Pill**: White semi-transparent backdrop, subtle border, smooth hover elevation.

### 4.3 Ambient Background Engine
- **Canvas Particle Orbs**: Smooth floating gradient nodes tuned with soft alpha channels (`rgba(112, 128, 93, 0.08)`, `rgba(85, 115, 141, 0.07)`).
- **Animated Background Mesh**: 4-point radial mesh with 18s floating animation.
