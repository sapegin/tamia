// Modal dialog

import { onEvent, offEvent, triggerEvent, registerGlobalEvents } from '../../events';
import { addState, removeState } from '../../states';
import { appear, disappear } from '../../appear';
import { oporElement } from '../../opor';
import { TamiaError } from '../../util';
import data from '../../data';
import Component from '../../Component';
import registerComponent from '../../registerComponent';

const INSTANCE_KEY = 'tamia-modal';
const BODY_MODAL_OPENED_CLASS = 'modal-is-opened';
const SWITCHING_STATE = 'switching';
const HIDDEN_STATE = 'hidden';

let openedInstance = null;

export class Modal extends Component {
	static binded = 'commit dismiss keyup shadeClick';
	static wrapperTemplate = {
		block: 'modal-shade',
		states: 'hidden',
		content: {
			block: 'l-center',
			content: {
				block: 'l-center-i',
				js: 'modal',
				content: {
					element: '@root',
				},
			},
		},
	};

	init() {
		data(this.elem, INSTANCE_KEY, this);

		onEvent(this.elem, 'click', '.js-modal-commit', this.commit);
		onEvent(this.elem, 'click', '.js-modal-dismiss', this.dismiss);

		if (data(this.elem, 'modal-open')) {
			this.open();
		}
	}

	initWrapperHtml() {
		if (this.wrapper) {
			return;
		}
		this.wrapper = oporElement(this.constructor.wrapperTemplate, this.elem);

		onEvent(this.wrapper, 'click', this.shadeClick);
		document.body.appendChild(this.wrapper);
		removeState(this.elem, 'hidden');
	}

	open() {
		if (this === openedInstance) {
			return;
		}

		this.initWrapperHtml();
		document.body.classList.add(BODY_MODAL_OPENED_CLASS);
		if (openedInstance) {
			openedInstance.close({ hide: true });
			addState(this.wrapper, SWITCHING_STATE);
			onEvent(this.wrapper, 'tamia.appeared', () => {
				removeState(this.wrapper, SWITCHING_STATE);
				addState(openedInstance.wrapper, HIDDEN_STATE);
				removeState(openedInstance.elem, HIDDEN_STATE);
			});
		}

		appear(this.wrapper);
		onEvent(document, 'keyup', this.keyup);

		openedInstance = this;

		// Set focus to element with autofocus attribute
		let autofocus = this.elem.querySelector('[autofocus]');
		if (autofocus) {
			autofocus.focus();
		}
	}

	close({ hide = false } = {}) {
		let elem = hide ? this.elem : this.wrapper;
		disappear(elem);
		if (!hide) {
			document.body.classList.remove(BODY_MODAL_OPENED_CLASS);
		}
		offEvent(document, 'keyup', this.keyup);
		openedInstance = null;
	}

	commit(event) {
		this.done(event, 'commit');
	}

	dismiss(event) {
		this.done(event, 'dismiss');
	}

	done(event, type) {
		if (event) {
			event.preventDefault();
		}

		if (!triggerEvent(this.elem, `tamia.modal.${type}`)) {
			return;
		}

		this.close();
	}

	keyup(event) {
		if (event.which === 27) {  // Escape
			this.dismiss(event);
		}
	}

	shadeClick(event) {
		if (event.target.classList.contains('js-modal') && data(this.elem, 'modal-close-on-shade') !== 'no') {
			this.dismiss(event);
		}
	}
}

registerComponent('t-modal', Modal);

// Events
registerGlobalEvents({
	'tamia.modal.open': (event) => {
		let modal = data(event.target, INSTANCE_KEY);
		if (!modal) {
			throw new TamiaError('Modal component was not initialized at this element.');
		}
		modal.open();
	},

	'tamia.modal.close': (event) => {
		let modal = data(event.target, INSTANCE_KEY);
		if (!modal) {
			return;
		}
		modal.close();
	},
});
