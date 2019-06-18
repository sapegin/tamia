# Tâmia

[![Build Status](https://travis-ci.org/tamiadev/tamia.png)](https://travis-ci.org/tamiadev/tamia)

Tâmia is a tiny React component library with themable primitives that you can use to quickly start working on a new project.

## Based on

- [React](https://reactjs.org/)
- [Emotion](https://emotion.sh/)
- [styled-system](https://styled-system.com/)
- [polished](https://polished.js.org/)
- [Normalize.css](https://necolas.github.io/normalize.css/)

## Tools

There are a few other things made specifically for Tâmia:

- [tamia-gatsby-link](https://github.com/tamiadev/tamia-gatsby-link): Render Gatsby `Link` component with Tâmia styles
- [eslint-config-tamia](https://github.com/tamiadev/eslint-config-tamia): ESLint config

## Documentation

[Documentation is here](http://tamiadev.github.io/tamia/).

## Getting started

1. Install Tâmia and peer dependencies:

```bash
npm install tamia @emotion/core @emotion/styled emotion-theming
```

2. Create a theme at `src/theme.js`:

```js static
import merge from 'lodash/merge';
import defaultTheme from 'tamia/lib/theme';

const theme = merge(defaultTheme, {
  colors: {
    primary: 'salmon'
  }
});

export default theme;
```

3. Wrap your app in a root container:

```js static
import React from 'react';
import { TamiaRoot } from 'tamia';
import theme from './theme';

const Root = ({ children }) => (
  <TamiaRoot theme={theme}>{children}</ThemeRoot>
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
- React + Emotion + styled-system + TypeScript (2019)

---

## License

The MIT License, see the included [License.md](License.md) file.
