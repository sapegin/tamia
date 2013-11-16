# Spinner

Loading indicator (spinner) with animation.


## Markup

	<div class="spinner"></div>

	<div class="is-loading">
		<div class="loader"></div>
	</div>

`.loader` is the same as `.spinner` but it’s hidden by default. It’s visible only when `.is-loading` state is set on ancestor element.

## Modifiers

### `spinner_big`

Bigger size.


## More sizes

You can set any spinner size changing `font-size` property.

	.spinner_huge
		font-size: 64px

	<div class="spinner spinner_huge"></div>


## IE 8—9 callback

Copy `spinner.gif` to your images folder and set `spinner_fallback_gif` variable to its URL.
