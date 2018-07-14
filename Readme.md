# Tâmia

[![Build Status](https://travis-ci.org/tamiadev/tamia.png)](https://travis-ci.org/tamiadev/tamia)

Tâmia is a tiny but extremely opinionated framework for frontend developers (hmm… just for me now). It consists of:

1. CSS bootstrap.
2. Component library.

## Based on

* [React](https://reactjs.org/)
* [styled-components](https://www.styled-components.com/)
* [Typography.js](https://github.com/KyleAMathews/typography.js/)
* [Normalize.css](https://necolas.github.io/normalize.css/)
* [ECMAScript 6](http://es6-features.org/)


## Why another framework

Bootstrap, Inuit.css and HTML5 Boilerplate are awesome. I found a lot of inspiration there. But they just don’t suit my needs and a way of working. I also use it to try new technologies and ways of making sites.

Tâmia is a new cool name for what I use every day in my own and freelance projects. It has evolved from a folder on my disk with a few CSS and JS files that I copypasted to every new project in 2000s.


## Browser support

I love new technologies so I spend as little time as possible on old browsers. The minimum supported browser is IE11.


## Workflow

For styles I use [styled-components](https://www.styled-components.com/).

I usually use [Gatsby](https://www.gatsbyjs.org/) as a static site generator.

And then I use [shipit](https://github.com/sapegin/shipit) to deploy a site to a server using rsync.


## CSS bootstrap

It has base and typography CSS rules, based on [Typography.js](https://github.com/KyleAMathews/typography.js/) and [Normalize.css](https://necolas.github.io/normalize.css/)).


## Component library

Form controls, basic text styles, [etc](http://tamiadev.github.io/tamia/).


## Tools

There are a few other things made specifically for Tâmia:

* [eslint-config-tamia](https://github.com/tamiadev/eslint-config-tamia): ESLint config.


## Documentation

[Documentation is here](http://tamiadev.github.io/tamia/).


## Getting started

1. Install Tâmia and peer dependencies:

```bash
npm install tamia styled-components typography
```

2. Create a theme at `src/theme.js`:

  ```js static
  import merge from 'lodash/merge';
  import defaultTheme from 'tamia/lib/theme';

  const theme = merge(defaultTheme, {
    colors: {
      primary: 'salmon',
    },
  });

  export default theme;
  ```

3. Create a Typography.js instance:

  ```js static
  import getTypography from 'tamia/lib/typography';
  import theme from './theme';
  export default getTypography(theme);
  ```


## The Name

Tâmia is a chipmunk in Portuguese. It refers to [Squirrelstrap](https://github.com/sapegin/squirrelstrap), my love of small cheeky creatures and “Chip ’n Dale Rescue Rangers” (which is exactly framework’s aim).


---

## License

The MIT License, see the included [License.md](License.md) file.
