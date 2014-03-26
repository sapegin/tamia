# Toggle ß

Magic content toggler.


## Markup

	<div class="js-toggle-wrapper form form_block">
		<div class="form__row">
			<input type="email" class="field" placeholder="Email">
		</div>
		<div class="form__row toggle-transition-slide" data-states="restore:hidden">
			<input type="password" class="field" data-states="restore:disabled">
		</div>
		<div class="form__row">
			<button type="submit" class="button">
				<div data-states="restore:hidden">Log in</div>
				<div class="is-hidden" data-states="restore:-hidden">Restore</div>
			</button>
		</div>
		<div class="form__row">
			<div class="link" data-toggle="toggle:restore">
				<div data-states="restore:hidden">Forgot password?</div>
				<div class="is-hidden" data-states="restore:-hidden">Log in</div>
			</div>
		</div>
	</div>


## States

There are two kind of states:

* Wrapper states: define different look of your UI. You can switch wrapper sates with togglers (see below).
* Element states: define look of particular elements (hidden, disabled, etc.) as a reaction for wrapper state switching.

For every wrapper state you could define which element states should be added or removed.

For example this element will be hidden at `restore` state:

	<div data-states="restore:hidden">Log in</div>

But this one will be visible:

	<div class="is-hidden" data-states="restore:-hidden">Restore</div>

You could react to or change any number of states:

	<input data-states="restore:hidden,disabled; login:highlighted">

You should set initial states for wrapper (`<div class="js-toggle-wrapper state-restore">`) and elements (`<div class="is-hidden" data-states="restore:-hidden">Restore</div>`) in your markup.

You can use wrapper state classes (`.state-restore`) to add custom CSS.


### Elements States

Basically element state is an `.is-statename` CSS class. But some states imply additional magic:

* `hidden` will also trigger `appear.tamia`/`disappear.tamia` events.
* `disabled` will also add/remove `disabled` attribute.


## Togglers

You can toggle state with a special link:

	<span class="link" data-toggle="toggle:restore">Toggle</span>

Or several states at once:

	<span class="link" data-toggle="toggle:restore,login">Toggle</span>


## Transitions

By default element states change with fade transition (crossfade when necessary) but you can use different transition:

	<div class="form__row toggle-transition-slide" data-states="restore:hidden"></div>


### Available Transitions

* `toggle-transition-slide`: kind of slide transition (unfinished).


## Configuration

### toggle_transition_time

Type: CSS duration value.

Duration of appearing/disappearing animation.
