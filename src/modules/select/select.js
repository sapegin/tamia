// Select with custom design

import { onEvent } from '../../events';
import { toggleState, hasState } from '../../states';
import Component from '../../Component';
import registerComponent from '../../registerComponent';
import { toggleFields } from '../form';

const DISABLED_STATE = 'disabled';

export default class Select extends Component {
	static binded = 'focus blur change';
	static template = {
		block: 'select',
		element: '@root',
		content: [
			{
				block: 'select',
				elem: 'box',
				link: true,
			},
			{
				block: 'select',
				elem: 'select',
				element: 'select',
				link: true,
			},
		],
	};

	init() {
		onEvent(this.selectElem, 'focus', this.focus);
		onEvent(this.selectElem, 'blur', this.blur);
		onEvent(this.selectElem, 'change', this.change);

		if (hasState(this.elem, DISABLED_STATE)) {
			toggleFields(this.selectElem, false);
		}

		this.change();
	}

	focus() {
		this.toggleFocused(true);
	}

	blur() {
		this.toggleFocused(false);
	}

	toggleFocused(enable) {
		toggleState(this.elem, 'focused', enable);
	}

	change() {
		this.boxElem.innerHTML = this.selectElem.options[this.selectElem.selectedIndex].text;
	}
}

registerComponent('t-select', Select);
