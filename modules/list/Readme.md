# Lists

Unordered list with dashes (—) as bullets and basic ordered list.


## Markup

	<ul class="list">
		<li>Dog</li>
		<li>Cat</li>
		<li>Mouse</li>
		<li>Moose</li>
	</ul>

	<ol class="list-num">
		<li>Dog</li>
		<li>Cat</li>
		<li>Mouse</li>
		<li>Moose</li>
	</ol>


## Modifiers

### .list.list_inside / .list-num.list-num_inside

Places bullets inside container.


## Configuration

### list_inside

Type: Boolean, default: `false`.

If `true` places bullets inside container (by default bullets are outside).


## Caveats

1. If `list_inside` is `false` (default) automatically places bullets inside container (like `list_inside = true` does) when window width is less than `max_width` or `content_max_width` global variable.

2. `UL`s inside `.text` class are treated as `.list`. `OL`s inside `.text` class are treated as `.list-num`.
