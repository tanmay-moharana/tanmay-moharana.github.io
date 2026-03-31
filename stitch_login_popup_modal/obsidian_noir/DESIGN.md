# Design System Document

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Curated Monolith."** 

Unlike standard Material Design implementations that rely on floating buttons and bright primary accents, this system treats the digital interface as a high-end editorial gallery. It is a world of deep blacks, tactile depth, and expansive negative space. We move beyond "templates" by embracing intentional asymmetry—using offset grids and varied typographic weights to guide the eye through a narrative journey rather than a data table. Every element must feel intentional, silent, and premium.

## 2. Colors
Our palette is a study in tonal subtlety. We use a "Deep-Dark" philosophy where pure black (#080808) serves as the void, and elevated grays define the architecture.

*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Structural boundaries must be defined solely through background color shifts. Use `surface-container-low` for large section blocks against a `surface` background to create soft containment without the visual noise of lines.
*   **Surface Hierarchy & Nesting:** Treat the UI as physical layers of obsidian and smoked glass. 
    *   **Base:** `surface` (#131313) or `surface_container_lowest` (#0e0e0e).
    *   **Nesting:** Place a `surface_container` card inside a `surface_container_low` section to create natural depth.
*   **The "Glass & Gradient" Rule:** Floating elements (Modals, Nav bars) should use `surface_variant` at 60% opacity with a `24px` backdrop-blur. 
*   **Signature Textures:** For high-impact areas like hero buttons or "Selected Work" headers, use a linear gradient from `primary` (#c0c7d6) to `primary_container` (#6b7280) at a 45-degree angle to provide a metallic, satin finish.

## 3. Typography
The typography is a dialogue between the modern geometric structure of **Plus Jakarta Sans** and the functional clarity of **Inter**.

*   **Display & Headlines (Plus Jakarta Sans):** Used for "moments" of impact. `display-lg` should be used sparingly, often with tight letter-spacing (-0.02em) to create a sophisticated, editorial "masthead" feel.
*   **Body & Labels (Inter):** Reserved for technical details and long-form reading. The high x-height of Inter provides exceptional legibility against dark backgrounds.
*   **The Hierarchy Identity:** Always pair a `headline-sm` in Plus Jakarta Sans with a `label-md` in Inter (All Caps, letter-spaced 0.1em) to create an authoritative, "Curated" aesthetic.

## 4. Elevation & Depth
Depth is communicated through light and shadow, not lines.

*   **The Layering Principle:** Avoid shadows for static cards. Instead, use the `surface-container` tiers. A `surface-container-high` card on a `surface` background is the standard for interactive objects.
*   **Ambient Shadows:** For elements that truly float (menus, tooltips), use a triple-layered shadow:
    *   `0px 4px 12px rgba(0, 0, 0, 0.4)`
    *   `0px 16px 32px rgba(0, 0, 0, 0.2)`
    *   The shadow should never be neutral gray; it must be a deep, tinted shade of the background.
*   **The "Ghost Border" Fallback:** If a divider is mandatory for accessibility, use `outline_variant` at **15% opacity**. It should feel like a suggestion of a line, visible only when the user's eye seeks it out.

## 5. Components

### Buttons
*   **Primary:** Solid `primary` (#c0c7d6) background with `on_primary` text. No border. Roundedness: `md` (0.75rem).
*   **Secondary:** Ghost style. No background. `outline` border at 20% opacity. 
*   **Tertiary:** Text only in `primary` color, using `label-md` specs.

### Cards (The "Portfolio" Unit)
*   **Visuals:** Forbid divider lines between title and description. 
*   **Spacing:** Use `spacing-6` (1.5rem) for internal padding.
*   **Interaction:** On hover, a card should transition from `surface_container` to `surface_container_high` with a subtle 2% scale increase.

### Chips (Skills & Tags)
*   **Style:** `surface_container_high` background with `on_surface_variant` text. 
*   **Radius:** `full` (9999px) to create a "pill" shape that contrasts against the rectangularity of the grid.

### Input Fields
*   **Base:** `surface_container_lowest` background. 
*   **Focus:** No glow. Instead, the `outline` transitions from 20% to 100% opacity of the `primary` token.

### Additional Component: The "Bento" Grid
Given the portfolio context, use an asymmetrical "Bento" layout. Combine different card sizes (1x1, 2x1, 2x2) using `spacing-4` gaps. This breaks the monotony of a standard vertical list and feels like a custom-coded experience.

## 6. Do's and Don'ts

### Do
*   **Use Asymmetry:** Offset your text columns. A headline might start at Column 2, while the body text starts at Column 4.
*   **Embrace the Dark:** Allow large areas of the screen to remain `surface_container_lowest` (#0e0e0e) to create a sense of luxury.
*   **Monospace Accents:** Use the `ui-monospace` font for tiny details like dates, version numbers, or "01/" index markers to add a "technical-chic" layer.

### Don't
*   **No High-Contrast White:** Never use #FFFFFF for long-form body text; use `on_surface_variant` (#c5c6cc) to reduce eye strain and maintain the "muted" aesthetic.
*   **No Hard Edges:** Avoid `none` or `sm` roundedness for large containers. Stick to `md` (0.75rem) or `lg` (1rem) to soften the "Brutalist" tendencies of the dark theme.
*   **No Default Shadows:** Never use the default browser/Figma "Drop Shadow" preset. It will look muddy on deep grays. Always manually craft ambient, low-opacity shadows.