# Modal

Modal popup.


## Markup

	<div class="modal is-hidden">
		<header class="modal__header">
			<h3 class="modal__title">Hello world</h3>
			<button class="close js-modal-dismiss"></button>
		</header>
		<div class="modal__body">
			...
		</div>
		<footer class="modal__footer">
			<div class="button js-modal-dismiss">Cancel</div>
			<div class="button js-modal-commit">Save</div>
		</footer>
	</div>

To disable modal closing by click on a shade use `data-modal-close-on-shade="no"` attribute:

	<div class="modal is-hidden" data-modal-close-on-shade="no">

## How to open

Auto open:

	<div class="modal is-hidden" data-component="modal" data-modal-open="yes">...</div>

Open via JavaScript:

	<div class="modal pony is-hidden">...</div>
	$('.pony').trigger('open.modal.tamia');

Open via link:

	<a href="#" class="" data-fire="open.modal.tamia" data-target=".js-popup">Open</a>


## Events

### open.modal.tamia

Fire this event on `.modal` DOM node to open popup.

### close.modal.tamia

Fire this event on `.modal` DOM node to close popup.

### commit.modal.tamia

Fires when user clicks Save button.

You can prevent popup from closing:

	$('.js-popup').on('commit.modal.tamia', function() {
		return false;
	});

### dismiss.modal.tamia

Fires when user click Cancel button


## Skin

Set `modal_default_skin` or `modules_default_skin` to `true` to enable default skin.


## Configuration

### modal_shade_color

Type: CSS color value.

Color of popup shade layer.
