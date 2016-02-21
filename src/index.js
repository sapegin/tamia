import './styles/index.styl';

// Expose public API
export {
	registerAnimations,
	runAnimation,
	afterTransitions,
} from './animation';
export {
	appear,
	disappear,
	toggle,
} from './appear';
export {
	Component,
} from './Component';
export {
	default,
} from './data';
export {
	onEvent,
	offEvent,
	triggerEvent,
	triggerNativeEvent,
	registerGlobalEvents,
} from './events';
export {
	oporElement,
	oporClass,
} from './opor';
export {
	default,
} from './registerComponent';
export {
	toggleState,
	addState,
	removeState,
	hasState,
} from './states';
