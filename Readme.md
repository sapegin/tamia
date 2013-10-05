# Tâmia [![Build Status](https://travis-ci.org/sapegin/tamia.png)](https://travis-ci.org/sapegin/tamia)

Tâmia is a tiny but extremely opinionated framework for front-end developers (hmm… just for me now). It consists of three parts:

1. Stylus bootstap.
2. JavaScript helpers.
3. Blocks library.


## Requirements

* Stylus and Nib.
* jQuery.
* Modernizr.


## Browser Support

I love new technologies so I spend as little time on old browsers as possible. The minimum supported browser is IE8 (and probably not all features will work fine there).


## Workflow

Usually I use [Yeomen generator](https://github.com/sapegin/generator-tamia) for scaffolding new projects: create folders and all required files.

I use Grunt as much as possible: run Stylus, combine and minify JavaScript, optimize images, generate sprites, generate web fonts, pre-compile JavaScript templates, etc.

For CSS I use kinda [BEM](http://bem.info/) light methodology—[OPOR](http://blog.sapegin.me/all/opor-methodology) (One Page of Rules).

And then I use BitBucket and Fabric to deploy website to a server.


## Why Another Framework

Bootstrap, Inuit.css and HTML5 Boilerplate are awesome. I found a lot of inspiration there. But they just don’t suit my needs and way of working. They also don’t like Stylus as much as I do.

Tâmia is a new cool name for what I use every day in my own and freelance projects. It’s evolved from a folder on my HDD with a few CSS and JS files that I copypasted to every new project few years ago.


## Stylus Bootstap

It’s a base CSS rules (like Normalize.css but a quite different) and a lot of useful Stylus mixins:

* Fluid grid.
* Sprites (manual or generated) with Retina support.
* Links with three types of underlining: text-decoration, border-bottom and linear-gradient.
* Sticky footer.
* Debug helpers.
* Lot of useful mixins.


## JavaScript Helpers

The main purpose of JavaScript helper is components initialization:

```html
<div data-component="pony"></div>
```

```javascript
tamia.initComponents({
	pony: function(elem) {
		alert('I am pink pony! Yay!');
	}
});
```


## Blocks library

Block is an independent component with appearance (Stylus) and behavior (JavaScript) which can be used on many websites. Some blocks have only appearance. Some blocks have default skin that you can disable if you want.


## Tools

There’re few other things made specifically for Tâmia: [Yeomen project generator](https://github.com/sapegin/generator-tamia) and [Grunt task](https://github.com/sapegin/grunt-tamia-sprite) for generating sprites.


## Documentation

Not done yet. See comments in code.


## Installation

The easiest way to install Tâmia is to use Yeomen generator. (Which is under development now, so more information will be available later.)

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

### Using Blocks

Any block consists of stylesheet and / or script. You should include both.

Import block’s stylesheet to your main Stylus stylesheet, after `tamia/tamia` import:

```
import "tamia/tamia"
import "tamia/blocks/select"
```

Include block’s JavaScript to your page:

```html
<script src="tamia/tamia/tamia.js"></script>
<script src="tamia/blocks/select/script.js"></script>
```

Blocks can also have parameters and / or optional default skin.

### Debug Mode

**Note:** Available only if you use Yeomen generator to initialize Tâmia and Grunt to build your project.

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
