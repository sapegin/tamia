// Tâmia © 2014 Artem Sapegin http://sapegin.me
// Select with custom design

/*global tamia:false*/
;(function(window, $, undefined) {
	'use strict';

	var tpl = '\
<div class="select">\
	<div class="select__box js-box">{selected.text}</div>\
	<select class="select__select js-select" rv-value="selected.value" rv-on-change="changed">\
		<option rv-each-option="options" rv-value="option.value">{option.text}</option>\
	</select>\
</div>\
';

	var Select = tamia.extend(tamia.Component, {
		init: function() {
			if (DEBUG && this.elemNode.tagName !== 'SELECT') throw new tamia.Error('Select: no <select> element found.');

			var selected = null;
			var options = Array.prototype.slice.call(this.elemNode.options).map(function(option) {
				var item = {
					text: option.text,
					value: option.value,
					selected: option.selected
				};
				if (item.selected) selected = item;
				return item;
			});

			var model = {
				selected: selected,
				options: options,
				changed: function(event, self) {
					self.selected.text = this.options[this.selectedIndex].text;
				}
			};

			var newElem = $(tpl);
			rivets.bind(newElem, model);
			this.elem.replaceWith(newElem);
		}


		/*,

		focus: function() {
			this.toggleFocused(true);
		},

		blur: function() {
			this.toggleFocused(false);
		},

		toggleFocused: function(toggle) {
			this.elem.toggleState('focused', toggle);
		},

		change: function() {
			this.boxElem.text(this.selectElem.find(':selected').text());
		}*/
	});

	tamia.initComponents({select: Select});

}(window, jQuery));
