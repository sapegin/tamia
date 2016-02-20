// Password field with toggle to show characters

import { onEvent, offEvent } from '../../events';
import { addState, toggleState, hasState } from '../../states';
import Component from '../../Component';
import registerComponent from '../../registerComponent';
import { toggleFields } from '../form';

const UNLOCKED_STATE = 'unlocked';
const DISABLED_STATE = 'disabled';

export class Password extends Component {
	static binded = 'toggle';
	static template = {
		block: 'password',
		element: '@root',
		content: [
			{
				block: 'password',
				elem: 'toggle',
				link: true,
			},
			{
				block: 'password',
				elem: 'field',
				mix: 'field',
				element: 'input',
				link: true,
				attrs: {
					autocapitalize: 'off',
					autocomplete: 'off',
					autocorrect: 'off',
					spellcheck: 'false',
				},
			},
		],
	};

	init() {
		// Mousedown instead of click to catch focused field
		onEvent(this.toggleElem, 'mousedown', this.toggle);

		if (hasState(this.elem, DISABLED_STATE)) {
			toggleFields(this.fieldElem, false);
		}
	}

	toggle() {
		let focused = document.activeElement === this.fieldElem;
		let locked = !this.isLocked();

		toggleState(this.elem, UNLOCKED_STATE);

		// Create hidden input[type=password] element to invoke password saving in browser
		if (!locked) {
			this.cloneElem = this.fieldElem.cloneNode();
			addState(this.cloneElem, 'hidden');
			this.fieldElem.parentNode.appendChild(this.cloneElem);
			this.fieldElem.name = '';
			this.syncWithClone = (event) => this.cloneElem.value = event.target.value;
			this.syncWithField = (event) => this.fieldElem.value = event.target.value;
			onEvent(this.fieldElem, 'input', this.syncWithClone);
			onEvent(this.cloneElem, 'input', this.syncWithField);
		}
		else if (this.cloneElem) {
			offEvent(this.fieldElem, 'input', this.syncWithClone);
			this.fieldElem.name = this.cloneElem.name;
			this.cloneElem.parentNode.removeChild(this.cloneElem);
		}

		this.fieldElem.setAttribute('type', locked ? 'password' : 'text');

		if (focused) {
			setTimeout(() => this.fieldElem.focus());
		}
	}

	isLocked() {
		return !hasState(this.elem, UNLOCKED_STATE);
	}
}

registerComponent('t-password', Password);
