// Tâmia © 2014 Artem Sapegin http://sapegin.me
// Modal

/*global tamia:false*/
;(function(window, $, undefined) {
	'use strict';

	var _body = $('body');
	var _doc = $(document);

	var _bodyClass = 'modal-opened';
	var _switchingState = 'switching';
	var _hiddenState = 'hidden';
	var _wrapperTmpl = '' +
	'<div class="modal-shade is-hidden">' +
		'<div class="l-center">' +
			'<div class="l-center-i js-modal"></div>' +
		'</div>' +
	'</div>';
	var _opened = null;

	var Modal = tamia.extend(tamia.Component, {
		binded: 'commit dismiss keyup shadeClick',

		init: function() {
			this.elem.data('modal', this);
			this.elem.on('click', '.js-modal-commit', this.commit_);
			this.elem.on('click', '.js-modal-dismiss', this.dismiss_);
			if (this.elem.data('modal-open')) {
				this.open();
			}
		},

		initHtml: function() {
			if (this.wrapper) return;

			this.wrapper = $(_wrapperTmpl);
			this.wrapper.find('.js-modal').append(this.elem);
			this.wrapper.on('click', this.shadeClick_);
			_body.append(this.wrapper);
			this.elem.removeState('hidden');
		},

		open: function() {
			if (this === _opened) return;

			var opened = _opened;
			this.initHtml();
			_body.addClass(_bodyClass);
			if (opened) {
				opened.close({hide: true});
				this.wrapper.addState(_switchingState);
				this.wrapper.on('appeared.tamia', function() {
					this.wrapper.removeState(_switchingState);
					opened.wrapper.addState(_hiddenState);
					opened.elem.removeState(_hiddenState);
				}.bind(this));
			}
			this.wrapper.trigger('appear.tamia');
			_doc.on('keyup', this.keyup_);
			_opened = this;

			// Set focus to element with autofocus attribute
			var autofocus = this.elem.find('[autofocus]');
			if (autofocus.length) {
				autofocus.focus();
			}
		},

		close: function(params) {
			if (params === undefined) params = {hide: false};

			var elem = params.hide ? this.elem : this.wrapper;
			elem.trigger('disappear.tamia');
			if (!params.hide) _body.removeClass(_bodyClass);
			_doc.off('keyup', this.keyup_);
			_opened = null;
		},

		commit: function(event) {
			this.done(event, 'commit');
		},

		dismiss: function(event) {
			this.done(event, 'dismiss');
		},

		done: function(event, type) {
			if (event) event.preventDefault();

			var typeEvent = $.Event(type + '.modal.tamia');
			this.elem.trigger(typeEvent);
			if (typeEvent.isDefaultPrevented()) return;

			this.close();
		},

		keyup: function(event) {
			if (event.which === 27) {  // Escape
				this.dismiss(event);
			}
		},

		shadeClick: function(event) {
			if ($(event.target).hasClass('js-modal')) {
				this.dismiss(event);
			}
		}
	});

	// Events
	tamia.registerEvents({
		'open.modal': function(elem) {
			var container = $(elem);
			var modal = container.data('modal');
			if (!modal) modal = new Modal(elem);
			modal.open();
		},
		'close.modal': function(elem) {
			var container = $(elem);
			var modal = container.data('modal');
			if (!modal) return;
			modal.close();
		}
	});

}(window, jQuery));
