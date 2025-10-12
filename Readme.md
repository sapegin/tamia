# Tâmia

[![npm](https://img.shields.io/npm/v/tamia.svg)](https://www.npmjs.com/package/tamia) [![Node.js CI status](https://github.com/sapegin/tamia/workflows/Node.js%20CI/badge.svg)](https://github.com/sapegin/tamia/actions)

Tâmia is a tiny React component library with themable primitives that you can use to quickly start working on a new project.

[![Washing your code. A book on clean code for frontend developers](https://sapegin.me/images/washing-code-github.jpg)](https://sapegin.me/book/)

## Based on

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Panda CSS](https://panda-css.com/)

## Tools

There are a few other things made specifically for Tâmia:

- [eslint-config-tamia](https://github.com/tamiadev/eslint-config-tamia): ESLint config

## Documentation

[Documentation is here](https://tamialib.netlify.app/).

## Getting started

1. Install Tâmia and peer dependencies:

```bash
npm install tamia @pandacss/dev
```

2. Create a Panda CSS config, `panda.config.cjs`:

```js
import { defineConfig } from '@pandacss/dev';
import tamia from 'tamia';
import { theme } from './src/theme';

export default defineConfig({
  ...theme,

  presets: [tamia],

  // Opt out of all default
  eject: true,

  // Output directory
  outdir: 'styled-system',

  // Generate React components based on patterns
  jsxFramework: 'react',

  // Don't include CSS reset
  preflight: false,

  // Where to look for CSS declarations
  include: ['./src/**/*.{js,jsx,ts,tsx,astro}'],

  // Files to exclude
  exclude: []
});
```

3. Create a PostCSS config, `postcss.config.cjs`:

```js
module.exports = {
  plugins: {
    '@pandacss/dev/postcss': {}
  }
};
```

4. Update your `package.json`:

```diff
{
  "scripts": {
    "dev": "astro dev",
    "start": "astro start",
    "build": "astro build",
    "preview": "astro preview",
+   "prepare": "panda codegen"
  }
}
```

5. Add this line to your global CSS:

```css
@layer reset, base, tokens, recipes, utilities;
```

> [!TIP]
> Don’t forget to import it from your main template.

6. Add the generated files to your ignore files: `.gitignore`, `.prettierignore`, `.eslintignore`, etc:

```diff
+ styled-system
```

7. Create a theme, `src/theme.ts`.

Check out [the default theme](https://github.com/sapegin/tamia/blob/master/src/theme.ts),and extend it according to your taste:

```ts
import { type Config } from '@pandacss/dev';

export const theme = {
  theme: {
    extend: {
      tokens: {
        colors: {
          text: { value: '#222' },
          background: { value: '#fff' },
          primary: { value: '#6e56ba' },
          accent: { value: '#d396c3' },
          border: { value: '#ddd' }
        },
        fonts: {
          body: {
            value: "ProximaNova, 'Helvetica Neue', Arial, sans-serif"
          },
          heading: {
            value: "AzoSans, 'Helvetica Neue', Arial, sans-serif"
          },
          ui: {
            value: "AzoSans, 'Helvetica Neue', Arial, sans-serif"
          }
        },
        fontSizes: {
          xxl: { value: '2.1rem' },
          xl: { value: '1.3rem' },
          l: { value: '1.1rem' },
          m: { value: '1rem' },
          s: { value: '0.9rem' },
          xs: { value: '0.75rem' }
        },
        fontWeights: {
          normal: { value: '400' },
          heading: { value: '400' },
          bold: { value: '800' },
          ui: { value: '800' }
        },
        lineHeights: {
          base: { value: '1.5' },
          heading: { value: '1.1' },
          small: { value: '1.4' },
          large: { value: '1.8' }
        },
        letterSpacings: {
          base: { value: '0' },
          heading: { value: '0' },
          uppercase: { value: '0.15ex' }
        },
        borders: {},
        radii: {},
        shadows: {},
        easings: {},
        durations: {}
      },
      semanticTokens: {
        fontSizes: {
          root: { value: '1.125em' },
          article: { value: '1.1rem' }
        },
        spacing: {
          listMargin: { value: '1.2rem' }
        },
        sizes: {
          textMaxWidth: { value: '48rem' }
        }
      }
    }
  },

  globalCss: {}
} as const satisfies Config;
```

9. Generate the styled system, run:

```bash
npm run prepare --clean
```

9. Copy the components, you're going to use fro [src/components](./src/components).

## The Name

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

---

## License

The MIT License, see the included [License.md](License.md) file.
