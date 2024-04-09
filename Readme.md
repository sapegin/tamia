# Tâmia

[![npm](https://img.shields.io/npm/v/tamia.svg)](https://www.npmjs.com/package/tamia) [![Node.js CI status](https://github.com/sapegin/tamia.git/workflows/Node.js%20CI/badge.svg)](https://github.com/sapegin/tamia.git/actions)

Tâmia is a tiny React component library with themable primitives that you can use to quickly start working on a new project.

## Based on

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Panda CSS](https://panda-css.com/)

## Tools

There are a few other things made specifically for Tâmia:

- [tamia-gatsby-link](https://github.com/tamiadev/tamia-gatsby-link): Render Gatsby `Link` component with Tâmia styles
- [eslint-config-tamia](https://github.com/tamiadev/eslint-config-tamia): ESLint config

## Documentation

[Documentation is here](https://sapegin.github.io/tamia/).

## Getting started

1. Install Tâmia and peer dependencies:

```bash
npm install tamia @pandacss/dev
```

2. Create a Panda CSS config.

Check out [the default theme](https://github.com/sapegin/tamia/blob/master/src/theme.ts),and extend it according to your taste:

```ts
// panda.config.cjs
```

3. Create a PostCSS config.

Copy [the default theme](https://github.com/sapegin/tamia/blob/master/src/theme.tsx) to `src/theme.tsx` and modify it according to your taste:

```ts
// postcss.config.cjs
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
+   "prepare": "panda codegen",
    "dev": "astro dev",
    "start": "astro start",
    "build": "astro build",
    "preview": "astro preview"
  }
}
```

5. Update your global CSS:

```css
@layer reset, base, tokens, recipes, utilities;
```

**Tip:** Don't forget to import it from your main template.

6. Update your `.gitignore`:

```diff
+ styled-system
```

7. Generate the styled system, run:

```bash
npm run prepare --clean
```

8. Create the components, you're going to use. TODO

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
