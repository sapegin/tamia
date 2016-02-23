import { onEvent } from '../../events';
import data from '../../data';

/**
 * Google Analytics or Mixpanel events tracking.
 *
 * @param data-track Event name ('link' if empty).
 * @param [data-track-extra] Extra data.
 */
if ('ga' in window || 'mixpanel' in window) {
	onEvent(document, 'click', '[data-track]', (event) => {
		let mp = 'mixpanel' in window;
		let elem = event.target;
		let eventName = data(elem, 'track') || (mp ? 'Link clicked' : 'link');
		let eventExtra = data(elem, 'track-extra') || (mp ? undefined : 'click');
		let url = elem.getAttribute('href');
		let link = url && !event.metaKey && !event.ctrlKey;
		let callback;
		if (link) {
			event.preventDefault();
			callback = () => document.location = url;
		}
		if (mp) {
			let props = { URL: url };
			if (eventExtra) {
				props.Extra = eventExtra;
			}
			window.mixpanel.track(eventName, props, callback);
		}
		else {
			window.ga('send', 'event', eventName, eventExtra, url, { hitCallback: callback });
		}
	});
}
