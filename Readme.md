# Tâmia

[![Build Status](https://travis-ci.org/tamiadev/tamia.png)](https://travis-ci.org/tamiadev/tamia)

Tâmia is a tiny but extremely opinionated framework for front-end developers (hmm… just for me now). It consists of four parts:

1. Stylus bootstrap.
2. Component base class.
3. JavaScript helpers.
4. Modules library.


## Based On

* [Web Components](https://github.com/WebReflection/document-register-element)
* [Autoprefixer](https://github.com/postcss/autoprefixer)
* [ECMAScript 6](http://es6-features.org/)
* [Webpack](http://webpack.github.io/)
* [Stylus](http://stylus-lang.com/)
* [ESLint](http://eslint.org/)
* [Lodash](https://lodash.com/)
* [Babel](http://babeljs.io/)


## Why Another Framework

Bootstrap, Inuit.css and HTML5 Boilerplate are awesome. I found a lot of inspiration there. But they just don’t suit my needs and way of working. They also don’t like Stylus as much as I do.

Tâmia is a new cool name for what I use every day in my own and freelance projects. It’s evolved from a folder on my HDD with a few CSS and JS files that I copypasted to every new project in 2000s.


## Browser Support

I love new technologies so I spend as little time as possible on old browsers. The minimum supported browser is IE11.


## Workflow

I use Webpack to bundle JavaScript and Stylus.

For CSS I use kinda [BEM](http://bem.info/) light methodology—[OPOR](http://blog.sapegin.me/all/opor-methodology) (One Page of Rules).

And then I use [shipit](https://github.com/sapegin/shipit) to deploy a site to a server from GitHub or BitBucket or using rsync.


## Definitions: blocks, components, modules

**Block** is an independent entity with some appearance (Stylus). You could read more about blocks [on bem.info](http://bem.info/method/definitions/).

**Component** is a JavaScript “class” inherited from `tamia.Component` base “class”. You could mix blocks and components in any same combination.

**Module** is combination of block (appearance) and component (behaviour) that can be used on many sites. Some modules have only blocks, some modules have default skin that you can disable if you want.


## Stylus Bootstap

It’s a base CSS rules (like [Normalize.css](https://necolas.github.io/normalize.css/) but quite different) and a lot of useful Stylus mixins:

* Fluid grid.
* Images with Retina support.
* Links with three types of underlining: text-decoration, border-bottom and linear-gradient.
* Media query helpers.
* Sticky footer.
* Debug helpers.
* Lot of useful mixins.


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

See documentation [for details](http://tamiadev.github.io/tamia/api.html#Component).


## JavaScript Helpers

Useful events and other stuff.

See documentation [for details](http://tamiadev.github.io/tamia/api.html).


## Modules library

Form controls, basic text styles, [etc](http://tamiadev.github.io/tamia/modules.html).

All modules are disabled by default. See *Using Modules* below for details.


## Tools

There are a few other things made specifically for Tâmia:

* [tamia-build](https://github.com/tamiadev/tamia-build): Webpack-based build tool.
* [eslint-config-tamia](https://github.com/tamiadev/eslint-config-tamia): ESLint config.
* [babel-preset-tamia](https://github.com/tamiadev/babel-preset-tamia): Babel preset with ES2015, etc.


## Documentation

[See here](http://tamiadev.github.io/tamia/).


## Getting Started

It’s recommended to use Tâmia with a Webpack builder, [tamia-build](https://github.com/tamiadev/tamia-build).

```bash
npm install --save tamia
npm install --save-dev tamia-build
./node_modules/.bin/tamia init
```

The `init` script will create:

1. Main JavaScript entry point at `js/main.js`.
2. Main Stylus file at `styles/index.styl`.
3. Stylus config at `styles/config.styl`.

It also creates two npm scripts:

* `npm start` to start a dev server.
* `npm run bundle` to make a production build of JavaScript and CSS.

### Configuration

Stylus bootstrap has a lot of parameters you can change via `styles/config.styl` file:

```scss
link_style = "gradient"
link_color = #c0ffee
...
```

### Using Modules

To add module to the project add this to you main JavaScript module:

```javascript
import 'tamia/src/modules/modulename';
```

Default skin is enabled by default. To disable it add to project‘s Stylus config:

```scss
modules_default_skin = false;
```

### Debug Mode

Both Stylus and JavaScript in Tâmia have debug mode which allows you to exclude from minified production code stuff you need only for development purposes.

Stylus:

```scss
div {
	outline: 1px solid #c0ffee if DEBUG;
}
```

JavaScript:

```javascript
if (DEBUG) {
	console.log('Debug info');
}
```


## The Name

Tâmia is a chipmunk in Portuguese. It refers to [Squirrelstrap](https://github.com/sapegin/squirrelstrap), my love of small cheeky creatures and “Chip ’n Dale Rescue Rangers” (which is exactly framework’s aim).


---

## License

The MIT License, see the included `License.md` file.
