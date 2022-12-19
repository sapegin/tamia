# Tâmia

[![npm](https://img.shields.io/npm/v/tamia.svg)](https://www.npmjs.com/package/tamia) [![Node.js CI status](https://github.com/tamiadev/tamia.git/workflows/Node.js%20CI/badge.svg)](https://github.com/tamiadev/tamia.git/actions)

Tâmia is a tiny React component library with themable primitives that you can use to quickly start working on a new project.

## Based on

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [styled-components](https://www.styled-components.com/)

## Tools

There are a few other things made specifically for Tâmia:

- [tamia-gatsby-link](https://github.com/tamiadev/tamia-gatsby-link): Render Gatsby `Link` component with Tâmia styles
- [eslint-config-tamia](https://github.com/tamiadev/eslint-config-tamia): ESLint config

## Documentation

[Documentation is here](https://tamiadev.github.io/tamia/).

## Getting started

1. Install Tâmia and peer dependencies:

```bash
npm install tamia styled-components
```

2. Create a theme.

Copy [the default theme](https://github.com/tamiadev/tamia/blob/master/src/theme.tsx) to `src/theme.tsx` and modify it according to your taste:

3. Type your theme.

Create `src/styled.d.ts` and import there your theme:

```ts static
import theme from './theme';

type ThemeInterface = typeof theme;

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends ThemeInterface {}
}
```

4. Wrap your app in a root container:

```js static
import React from 'react';
import { TamiaRoot } from 'tamia';
import theme from './theme';

const Root = ({ children }) => (
  <TamiaRoot theme={theme}>{children}</TamiaRoot>
);

export default Root;
```

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

---

## License

The MIT License, see the included [License.md](License.md) file.
