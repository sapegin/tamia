// Tâmia © 2014 Artem Sapegin http://sapegin.me
// Password field with toggle to show characters

/*global tamia:false*/
;(function(window, $, undefined) {
	'use strict';

	var _unlockedState = 'unlocked';
	var _disabledState = 'disabled';
	var _inputSyncEvent = 'input.sync.password';

	tamia.Password = tamia.extend(tamia.Component, {
		displayName: 'tamia.Password',
		binded: 'toggle focus',
		template: {
			block: 'password',
			node: 'root',
			content: [
				{
					block: 'password',
					elem: 'toggle',
					link: 'toggleElem'
				},
				{
					block: 'password',
					elem: 'field',
					mix: {
						block: 'field'
					},
					node: '.js-field',
					link: 'fieldElem',
					attrs: {
						autocapitalize: 'off',
						autocomplete: 'off',
						autocorrect: 'off',
						spellcheck: 'false'
					}
				}
			]
		},

		init: function() {
			// Mousedown instead of click to catch focused field
			this.toggleElem.on('mousedown', this.toggle_);

			if (this.elem.hasState(_disabledState)) {
				this.fieldElem.prop(_disabledState, true);
			}
		},

		toggle: function() {
			var focused = document.activeElement === this.fieldElem[0];
			var locked = !this.isLocked();

			this.elem.toggleState(_unlockedState);

			// Create hidden input[type=password] element to invoke password saving in browser
			if (!locked) {
				this.cloneElem = this.fieldElem.clone();
				this.cloneElem.hide();
				this.fieldElem.after(this.cloneElem);
				this.fieldElem.name = '';
				this.fieldElem.on(_inputSyncEvent, this.syncWith.bind(this, this.cloneElem));
				this.cloneElem.on(_inputSyncEvent, this.syncWith.bind(this, this.fieldElem));
			}
			else if (this.cloneElem) {
				this.fieldElem.off(_inputSyncEvent);
				this.fieldElem.name = this.cloneElem.name;
				this.cloneElem.remove();
			}

			this.fieldElem.attr('type', locked ? 'password' : 'text');

			if (focused) {
				setTimeout(this.focus_, 0);
			}
		},

		focus: function() {
			this.fieldElem.focus();
		},

		isLocked: function() {
			return !this.elem.hasState(_unlockedState);
		},

		syncWith: function(receiver, event) {
			receiver.val(event.target.value);
		}
	});

	tamia.initComponents({password: tamia.Password});

}(window, jQuery));
