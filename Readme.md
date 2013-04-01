# Tâmia

Tâmia is a tiny but extremely opinionated framework for front-end developers (hmm… just for me now). It consists of three parts:

1. Stylus bootstap.
2. JavaScript helpers.
3. Blocks library.

There’re few other things made specifically for Tâmia: Yeomen project generator (not done yet) and [Grunt task](https://github.com/sapegin/grunt-squirrelsprite) for generating sprites.


## Browser Support

I love new technologies so I spend as little time on old browsers as possible. The minimum supported browser is IE8 (and probably not all features will work fine there).


## Requirements

* Stylus and Nib.
* jQuery.


## Workflow

Usually I use [grunt-init](https://github.com/gruntjs/grunt-init) (Yeomen generators in the future) for scaffolding new projects: create folders and all required files.

I use Grunt as much as possible: run Stylus, combine and minify JavaScript, optimize images, generate sprites, generate web fonts, pre-compile JavaScript templates, etc.

For CSS I use kinda BEM light methodology—OPOR, briefly described [here](http://nano.sapegin.ru/all/opor-methodology/) (in Russian).

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
utils.initComponents({
	pony: function(elem) {
		alert('I am pink pony! Yay!');
	}
});
```


## Blocks library

Block is an independent component with appearance (Stylus) and behavior (JavaScript) which can be used on many websites. Some blocks have only appearance. Some blocks have default skin that you can disable if you want.


## Documentation

Not done yet. See comments in code.


## Installation

…


## Getting Started

…


## The Name

Tâmia is a chipmunk in Portuguese. It refers to [Squirrelstrap](https://github.com/sapegin/squirrelstrap), my love of small cheeky creatures and “Chip ’n Dale Rescue Rangers” (which is exactly framework’s aim).


---

## License

The MIT License, see the included `License.md` file.
