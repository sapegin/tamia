# Unordered list

Unordered list with dashes (—) as bullets.


## Markup

	<ul class="list">
		<li>Dog</li>
		<li>Cat</li>
		<li>Mouse</li>
		<li>Moose</li>
	</ul>


## Configuration

### `list-inside` (Boolean, default: `false`)

If `true` places bullets inside container (by default bullets are outside).


## Caveats

1. If `list-inside` is `false` (default) automatically places bullets inside container (like `list-inside = true` does) when window width is less than `max-width` global variable.

2. `UL`s inside `.text` class are treated as `.list`.
