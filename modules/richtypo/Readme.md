# Rich typograhy

Classes and tweaks for better typography.


## Markup

### Abbreviations with spacing

	<div class="text">
		<p><abbr>PNG</abbr>, <abbr>GIF</abbr> (animated or not) and <abbr>JPEG</abbr> formats.</p>
	</div>

### The best ampersand

	Nuts <span class="amp">&amp;</span> Bolts.

### Hanging punctuation

	Awesome Web Typography with <span class="slaquo"> </span> <span class="hlaquo">“</span>Richtypo”'


## Configuration

### richtypo_global_ligatures

Type: Boolean. Default: `true`.

Enables ligatures on body (just headers otherwise).

### richtypo_extra_features

Type: Boolean or List. Default: `false`.

Extra OpenType features, eg. `"ss01", "ss03", "salt"` (`richtypo_global_ligatures` should be enabled).

### richtypo_figures

Type: String. Default: `proportional`.

Figures type: `proportional`, `oldstyle` (`richtypo_global_ligatures` should be enabled).

### richtypo_proper_abbr

Type: Boolean. Default: `true`.

Enables small caps in abbreviations (if your font supports them).


## Tools

* [richtypo.js](https://github.com/sapegin/richtypo.js) for Node.js.
* [wp-typohelper](https://github.com/sapegin/wp-typohelper) for Wordpress.
