# Tâmia

[![npm](https://img.shields.io/npm/v/tamia.svg)](https://www.npmjs.com/package/tamia) [![Node.js CI status](https://github.com/sapegin/tamia/workflows/Node.js%20CI/badge.svg)](https://github.com/sapegin/tamia/actions)

An opinionated CSS Tailwind v4 theme with sensible defaults for typography, colors, spacing, and common UI patterns. Restricts and enhances the default Tailwind theme for faster decision making and improved consistency, leans towards semantic design tokens (`--radius-button`, `--leading-heading`) rather than presentational (`--radius-sm`, `--leading-snug`).

[![Washing your code. A book on clean code for frontend developers](https://sapegin.me/images/washing-code-github.jpg)](https://sapegin.me/book/)

## Tech stack

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [clsx](https://github.com/lukeed/clsx)

## Getting started

1. Install Tâmia and peer dependencies:

```bash
npm install tailwindcss clsx
```

2. Create a theme, `theme.css`:

```css
@theme {
  --font-heading: 'Mondwest-Regular', sans-serif;
  --color-primary: #577290;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: #2e3033;
  }
}
```

3. Create typography utilities, `components/typography.css` (or import [default ones](./components/typography.css)):

```css
@utility heading-1 {
  /* ... */
}
@utility typo-body {
  /* ... */
}
```

4. Add the following to your global styles:

```css
/* Import Tailwind, Tâmia, and the theme */
@import 'tailwindcss';
@import 'tamia/index.css';

/* Explicitly import each component */
@import 'tamia/components/prose.css';
@import 'tamia/components/input.css';
@import 'tamia/components/button.css';

/* Import site theme */
@import './theme.css';

/* Import site utilities */
@import './components/typography.css';
```

4. Install [Oxfmt](https://oxc.rs/docs/guide/usage/formatter) and [oxlint-config-raccoon](https://github.com/sapegin/oxlint-config-raccoon) for formatting (including Tailwind class sorting):

```bash
npm install -D oxfmt oxlint-config-raccoon
```

Create `oxfmt.config.ts`:

```ts
import { defineConfig } from 'oxfmt';
import oxfmt from 'oxlint-config-raccoon/oxfmt';

export default defineConfig(oxfmt);
```

5. Install [Oxlint](https://oxc.rs/docs/guide/usage/linter), [`oxlint-tailwindcss`](https://github.com/sergioazoc/oxlint-tailwindcss), and `@oxlint/plugins` for Tailwind CSS linting:

```bash
npm install -D oxlint oxlint-tsgolint oxlint-tailwindcss @oxlint/plugins oxlint-config-raccoon
```

Create `oxlint.config.ts`:

```ts
import { defineConfig } from 'oxlint';
import typescriptReactTailwind from 'oxlint-config-raccoon/typescript-react-tailwind';

export default defineConfig({
  extends: [typescriptReactTailwind],
  options: { typeAware: true, typeCheck: true },
  settings: {
    tailwindcss: {
      entryPoint: 'src/index.css'
    }
  }
});
```

## Utilities

Most Tailwind classes work as they should, with the following additions:

- `grid-auto-narrow` / `grid-auto-wide` — auto-fit columns (use with `grid`)
- `expander` — makes the element full-bleed on mobile
- `frame` — aspect-ratio container with cover children (combine with `aspect-*`)

## Tailwind components

These components should be imported explicitly to the app CSS file:

- `heading-1` / `heading-2` / `heading-3` — headings of various levels
- `typo-body` / `typo-small` / `typo-large` — basic typography presets
- `.link` — styled anchor with hover/focus states
- `.quoted-link` — link where only `<u>` children are underlined
- `.prose` — rich text container (headings, lists, tables, blockquotes, images)
  - `.prose-small` / `.prose-intro` — prose variants
- `.button` — minimal button base (import `components/button.css`)
- `.input` — styled text input

## React components

These components should be imported explicitly:

- `IconBase.tsx` — SVG icon wrapper

## The name

Tâmia is a chipmunk in Portuguese. It refers to [Squirrelstrap](https://github.com/sapegin/squirrelstrap), my love of small cheeky creatures and “Chip ’n Dale Rescue Rangers” (which is exactly framework’s aim).

## History

Tâmia has evolved from a folder on my disk with a few CSS and JS files that I copypasted to every new project in 2000s. Notable iterations are:

- Grunt + Stylus + jQuery (2013)
- Webpack + browser-sync + ES6/Babel + Web Components + Stylus (2016)
- Webpack 2 + browser-sync + PostCSS + cssnext + CSS Modules + ES6/Babel (2017)
- React + Emotion + ES6/Babel (2018)
- React + styled-components + styled-system + TypeScript (2019)
- React + styled-components + TypeScript + custom primitive components (2022)
- React + vanilla-extract + TypeScript (2023)
- React + Panda CSS + TypeScript (2024)
- React + Tailwind CSS + TypeScript (2026)

---

## License

The MIT License, see the included [License.md](License.md) file.
