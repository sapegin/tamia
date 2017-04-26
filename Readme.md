# Tâmia

[![Build Status](https://travis-ci.org/tamiadev/tamia.png)](https://travis-ci.org/tamiadev/tamia)

Tâmia is a tiny but extremely opinionated framework for front-end developers (hmm… just for me now). It consists of four parts:

1. CSS bootstrap.
2. Component base class.
3. JavaScript helpers.
4. Modules library.


## Based On

* [Web Components](https://github.com/WebReflection/document-register-element)
* [CSS Modules](https://github.com/css-modules/css-modules), [PostCSS](http://postcss.org/) and [cssnext](http://cssnext.io/)
* [ECMAScript 6](http://es6-features.org/)
* [Webpack 2](http://webpack.js.org/)
* [Lodash](https://lodash.com/)
* [Babel](http://babeljs.io/)


## Why Another Framework

Bootstrap, Inuit.css and HTML5 Boilerplate are awesome. I found a lot of inspiration there. But they just don’t suit my needs and way of working. I also use it to try new technologies and ways of making sites.

Tâmia is a new cool name for what I use every day in my own and freelance projects. It’s evolved from a folder on my disk with a few CSS and JS files that I copypasted to every new project in 2000s.


## Browser Support

I love new technologies so I spend as little time as possible on old browsers. The minimum supported browser is IE11.


## Workflow

I use Webpack-based [tamia-build](https://github.com/tamiadev/tamia-build) to bundle JavaScript and CSS.

For CSS I use [CSS Modules](https://github.com/css-modules/css-modules) with [cssnext](http://cssnext.io/).

And then I use [shipit](https://github.com/sapegin/shipit) to deploy a site to a server from GitHub or BitBucket or using rsync.


## Definitions: blocks, components, modules

**Block** is an independent entity with some appearance. You could read more about blocks [on bem.info](http://bem.info/method/definitions/).

**Component** is a JavaScript “class” inherited from `tamia.Component` base “class”. You could mix blocks and components in any same combination.

**Module** is combination of block (appearance) and component (behaviour) that can be used on many sites. Some modules have only blocks, some modules have default skin that you can disable if you want.


## CSS Bootstrap

It has base CSS rules (like [Normalize.css](https://necolas.github.io/normalize.css/)) and some sane default styles for typography, etc.


## Component Base Class

Simple example:

```javascript
import { Component, registerComponent, onEvent, toggleState } from 'tamia';
class Pony extends Component {
  static binded = 'toggle';

  init() {
    onEvent(this.elem, 'click', '.js-toggle', this.toggle);
  }

  toggle() {
    toggleState(this.elem, 'pink');
  }
}

registerComponent('u-pony', Pony);
```

```html
<u-pony class="pink-pony is-pink">
  <button class="pink-pony__button js-toggle">To pink or not to pink?</button>
</u-pony>
```

See documentation [for details](http://tamiadev.github.io/tamia/javascript.html#Component).


## JavaScript Helpers

Useful events and other stuff.

See documentation [for details](http://tamiadev.github.io/tamia/javascript.html).


## Modules library

Form controls, basic text styles, [etc](http://tamiadev.github.io/tamia/modules.html).

All modules are disabled by default. See [*Using Modules*](#using-modules) below for details.


## Tools

There are a few other things made specifically for Tâmia:

* [tamia-build](https://github.com/tamiadev/tamia-build): Webpack-based build tool.
* [eslint-config-tamia](https://github.com/tamiadev/eslint-config-tamia): ESLint config.


## Documentation

[Can be found in here](http://tamiadev.github.io/tamia/).


## Getting Started

It’s recommended to use Tâmia with a Webpack builder, [tamia-build](https://github.com/tamiadev/tamia-build).

```bash
yarn add tamia
yarn add --dev tamia-build
```

The `init` script will create:

1. Main JavaScript entry point at `js/main.js`.
2. Main Stylus file at `styles/index.styl`.
3. Stylus config at `styles/config.styl`.

It also creates two npm scripts:

* `npm start` to start a dev server.
* `npm run bundle` to make a production build of JavaScript and CSS.

### Configuration

CSS bootstrap has a lot of parameters you can change via `styles/config.css` file:

```css
:root {
	--linkColor: #e08c3b;
	--hoverColor: #d37135;
	--baseFontSize: 18px;
}
```

### Using Modules

To add module to the project add this to your main JavaScript module:

```javascript
import 'tamia/lib/modules/modulename';
```

Default skin is enabled by default. To disable it, add the following to the project‘s Stylus config:

```scss
modules_default_skin = false;
```

### Debug Mode

JavaScript in Tâmia has debug mode which allows you to exclude from minified production code stuff you need only for development purposes.

```javascript
if (DEBUG) {
	console.log('Debug info');
}
```


## The Name

Tâmia is a chipmunk in Portuguese. It refers to [Squirrelstrap](https://github.com/sapegin/squirrelstrap), my love of small cheeky creatures and “Chip ’n Dale Rescue Rangers” (which is exactly framework’s aim).


---

## License

The MIT License, see the included [`License.md`](License.md) file.
