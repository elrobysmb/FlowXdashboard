# Global Aesthetic Overhaul

## Goal Description

Replace the current dark‑theme premium design with a clean light theme:
- All background colors become **white**.
- All primary text colors become **black** (or appropriate high‑contrast dark shade).
- Replace every existing green hue with **#99CC33**.
- Replace every existing blue hue with **#1A4B99**.
- Ensure the new palette is applied consistently across all Vue components, SCSS files, and Vuetify theme configuration.

## Proposed Changes

### 1. Vuetify Theme (nuxt.config.ts)
- Define a custom light theme with the new primary/secondary colors.
- Set `dark: false`.
- Add CSS variables for `--color-green` and `--color-blue`.

### 2. Global Styles (assets/main.scss)
- Add CSS variables for the new palette.
- Override utility classes (`.bg-dark-*`, `.text-grey-lighten-1`, etc.) to use the new colors.
- Set `body { background-color: #ffffff; color: #000000; }`.

### 3. Component‑Scoped Styles
- Search and replace hard‑coded color values in all `.vue` files under `pages/` and `components/`:
  - Any `background-color: ...` → `#ffffff` (or use the variable).
  - Any `color: ...` → `#000000` (or use the variable).
  - Any green (`#10B981`, `#21B...`, etc.) → `#99CC33`.
  - Any blue (`#0284C7`, `#3b82f6`, etc.) → `#1A4B99`.
- Update class names that reference old colors (e.g., `.bg-dark-2`) to new semantic names if needed.

### 4. Utility Classes
- Redefine `.bg-dark-1`, `.bg-dark-2`, `.bg-dark-3` to simply apply `background-color: #ffffff`.
- Redefine `.text-grey-lighten-1` to `color: #000000`.
- Add new utility classes `.text-green`, `.bg-green`, `.text-blue`, `.bg-blue` using the new hex values.

### 5. Verify Accessibility
- Ensure contrast ratios meet WCAG AA for normal text.
- Run a quick visual check of key pages (home, services, product, about, contact).

## Open Questions
- Should we keep a dark‑mode toggle for future use, or permanently remove dark mode? (Assumed permanent removal.)
- Are there any specific components that must retain their original branding colors? (Assumed none.)

## Verification Plan
### Automated Tests
- Run `npm run dev` and manually inspect pages for correct colors.
- Use a simple script to grep for old color hex codes to ensure none remain.

### Manual Verification
- Open key routes in the browser and confirm background is white and text is black.
- Check that green and blue elements now use the new hex values.

---
*Implementation will proceed by updating the theme configuration, global SCSS, and then batch‑replacing colors in Vue component style blocks.*
