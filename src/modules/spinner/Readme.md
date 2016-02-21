# Spinner

Loading indicator (spinner) with animation.


## Markup

```html
<div class="spinner"></div>

<div class="is-loading">
	<div class="loader"></div>
</div>
```

`.loader` is the same as `.spinner` but it’s hidden by default. It’s visible only when `.is-loading` state is set on ancestor element.

## Modifiers

### .spinner.spinner_big

Bigger size.


## More sizes

You can set any spinner size changing `font-size` property.

```css
.spinner_huge {
	font-size: 64px
}
```

```html
<div class="spinner spinner_huge"></div>
```

## Component loading indicator

```javascript
import attachSpinner from 'tamia/src/modules/spinner';
// Show loader
let hideSpinner = attachSpinner($('.pony'));
// Hide loader
hideSpinner();
```

That will blocks all container’s content with a semi-transparent layer and shows spinner in the middle.

To change shade layer’s color set `loader_shade_color` variable.
