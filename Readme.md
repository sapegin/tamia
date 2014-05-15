# Tâmia [![Build Status](https://travis-ci.org/sapegin/tamia.png)](https://travis-ci.org/sapegin/tamia)

Tâmia is a tiny but extremely opinionated framework for front-end developers (hmm… just for me now). It consists of four parts:

1. Stylus bootstap.
2. Component base class.
3. JavaScript helpers.
4. Modules library.


## Based On

* Autoprefixer.
* Modernizr.
* jQuery.
* Stylus.
* Grunt.
* Yo.


## Why Another Framework

Bootstrap, Inuit.css and HTML5 Boilerplate are awesome. I found a lot of inspiration there. But they just don’t suit my needs and way of working. They also don’t like Stylus as much as I do.

Tâmia is a new cool name for what I use every day in my own and freelance projects. It’s evolved from a folder on my HDD with a few CSS and JS files that I copypasted to every new project few years ago.


## Browser Support

I love new technologies so I spend as little time as possible on old browsers. The minimum supported browser is IE8 (and probably not all features will work fine there).


## Workflow

I use [Yeomen generator](https://github.com/sapegin/generator-tamia) for scaffolding new projects: create folders and all required files.

I use Grunt as much as possible: run Stylus, combine and minify JavaScript, optimize images, generate sprites, generate web fonts, pre-compile JavaScript templates, etc.

For CSS I use kinda [BEM](http://bem.info/) light methodology—[OPOR](http://blog.sapegin.me/all/opor-methodology) (One Page of Rules).

And then I use BitBucket and Fabric to deploy website to a server.


## Definitions: blocks, components, modules

**Block** is an independent entity with some appearance (Stylus). You could read more about blocks [on bem.info](http://bem.info/method/definitions/).

**Component** is a JavaScript “class” inherited from `tamia.Component` base “class”. You could mix blocks and components in any same combination.

**Module** is combination of block (appearance) and component (behaviour) that can be used on many websites. Some modules have only blocks, some modules have default skin that you can disable if you want.


## Stylus Bootstap

It’s a base CSS rules (like Normalize.css but a quite different) and a lot of useful Stylus mixins:

* Fluid grid.
* Sprites (manual or generated) with Retina support.
* Links with three types of underlining: text-decoration, border-bottom and linear-gradient.
* Sticky footer.
* Debug helpers.
* Lot of useful mixins.


## Component Base Class

Simple example:

```js
var Pony = tamia.extend(tamia.Component, {
  binded: 'toggle',
  init: function() {
    this.elem.on('click', '.js-toggle', this.toggle_);
  },
  toggle: function() {
    this.elem.toggleState('pink');
  }
});

tamia.initComponents({pony: Pony});
```

```html
<div class="pink-pony is-pink" data-component="pony">
  <button class="pink-pony__button js-toggle">To pink or not to pink?</div>
</div>
```

See documentation [for details](http://sapegin.github.io/tamia/docs.html).


## JavaScript Helpers

Useful events and other stuff.

See documentation [for details](http://sapegin.github.io/tamia/docs.html).


## Modules library

Form controls, basic text styles, [etc](https://github.com/sapegin/tamia/tree/master/modules).

All modules are disabled by default. See *Using Modules* below for details.


## Tools

There are few other things made specifically for Tâmia:

* [Yeomen project generator](https://github.com/sapegin/generator-tamia);
* [Grunt task](https://github.com/sapegin/grunt-tamia-sprite) for generating sprites.


## Documentation

See [here](http://sapegin.github.io/tamia/).


## Installation

The easiest way to install Tâmia is to use Yeomen generator:

```
$ npm install -g yo, generator-tamia
$ yo tamia
```

(You can use `yo tamia:framework` to update Tâmia to the latest version.)

You can also install manually:

1. Download and unzip repository to `tamia` folder inside your project.

2. Include Stylus bootstrap to your main Stylus stylesheet: `import "tamia/tamia"`.

3. Include JavaScript helpers to your page: `<script src="tamia/tamia/tamia.js"></script>`.


## Getting Started

### Configuration

Stylus bootstrap has a lot of parameters you can change.

Add all parameters to your main Stylus stylesheet, before `tamia/tamia` import:

```
link_style = "gradient"
link_color = #c0ffee
...
```

### Using Modules

To add module to the project:

```
$ yo tamia:module
```

Then select module you want and it’ll be added .

Default skin is disabled by default. To enable it add to project’s `index.styl`:

```
modules_default_skin = true;
```


### Debug Mode

Both Stylus and JavaScript in Tâmia have debug mode which allows you to exclude from minified production code stuff you need only for development purposes.

Stylus:

```
div
	outline: 1px solid #c0ffee if DEBUG
```

JavaScript:

```
if (DEBUG) console.log('Debug info');
```

To enable debug mode in Stylus just run Grunt with `--debug` command line option. Debug mode in JavaScript enabled by default in unminified code.


## The Name

Tâmia is a chipmunk in Portuguese. It refers to [Squirrelstrap](https://github.com/sapegin/squirrelstrap), my love of small cheeky creatures and “Chip ’n Dale Rescue Rangers” (which is exactly framework’s aim).


---

## License

The MIT License, see the included `License.md` file.
