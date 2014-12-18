// Tâmia © 2014 Artem Sapegin http://sapegin.me
// Basic form controls

/*global tamia:false*/
;(function(window, $, undefined) {
	'use strict';

	var _formElementsSelector = '.field,.button,.disablable';
	var _disabledState = 'disabled';

	/**
	 * Ajax form
	 */
	tamia.Form = tamia.extend(tamia.Component, {
		displayName: 'tamia.Form',
		binded: 'submit success error',

		init: function() {
			//tamia.trace(this);

			this.method = this.elem.data('method') || 'post';
			this.dataType = this.elem.data('form-type') || 'json';
			this.url = this.elem.data('form-action');
			if (DEBUG && !this.url) throw tamia.Error('tamia.Form: data-form-action not defined.');

			this.successElem = this.elem.find('.js-form-success');
			if (this.successElem.length) this.defaultMessage = this.successElem.html();

			this.errorElem = this.elem.find('.js-form-error');
			if (this.errorElem.length) this.defaultError = this.errorElem.html();

			this.elem.on('submit', this.submit_);
		},

		submit: function(event) {
			var fields = this.serialize();

			var sendEvent = $.Event('send.form.tamia', fields);
			this.elem.trigger(sendEvent);
			if (sendEvent.isDefaultPrevented()) return;

			this.elem.removeState('success');
			this.elem.removeState('error');
			this.elem.addState('sending');
			this.elem.trigger('lock.form.tamia');

			$.ajax({
				method: this.method,
				url: this.url,
				data: fields,
				dataType: this.dataType,
				success: this.success_,
				error: this.error_
			});

			event.preventDefault();
		},

		success: function(data) {
			if (data.result === 'success') {
				this.done('success');
				var message = this.elem.triggerHandler('success.form.tamia', data || {});
				if (this.successElem.length) this.successElem.html(message || this.defaultMessage);
				this.elem[0].reset();
			}
			else {
				this.error(data);
			}
		},

		error: function(data) {
			this.done('error');
			var message = this.elem.triggerHandler('error.form.tamia', data || {});
			if (this.errorElem.length) this.errorElem.html(message || this.defaultError);
		},

		done: function(state) {
			this.elem.addState(state);
			this.elem.removeState('sending');
			this.elem.trigger('unlock.form.tamia');
		},

		serialize: function() {
			var fields = {};
			var array = this.elem.serializeArray();
			$.each(array, function(index, field) {
				fields[field.name] = field.value;
			});
			return fields;
		}
	});

	tamia.initComponents({form: tamia.Form});


	/**
	 * Disable submit button on submit
	 */
	tamia.AutoLock = tamia.extend(tamia.Component, {
		displayName: 'tamia.AutoLock',
		binded: 'submit',

		init: function() {
			this.elem.on('submit', this.submit_);
		},

		submit: function(event) {
			this.elem.trigger('lock.form.tamia');
		}
	});

	tamia.initComponents({autolock: tamia.AutoLock});


	var _toggle_fields = function(elem, enable) {
		var formElements = $(elem).find(_formElementsSelector).addBack(_formElementsSelector);
		_toggle(formElements, enable);
	};

	var _toggle_submit = function(form, enable) {
		var submitButton = $(form).find('[type="submit"]');
		_toggle(submitButton, enable);
	};

	var _toggle = function(elem, enable) {
		$(elem)
			.toggleState(_disabledState, !enable)
			.attr('disabled', !enable)
		;
	};

	// Events
	tamia.registerEvents({
		/**
		 * Enables all descendant form elements.
		 */
		'enable.form': function(elem) {
			_toggle_fields(elem, true);
		},

		/**
		 * Disables all descendant form elements.
		 */
		'disable.form': function(elem) {
			_toggle_fields(elem, false);
		},

		/**
		 * Enables submit button of a form.
		 */
		'unlock.form': function(elem) {
			_toggle_submit(elem, true);
		},

		/**
		 * Disables submit button of a form.
		 */
		'lock.form': function(elem) {
			_toggle_submit(elem, false);
		}
	});

}(window, jQuery));
