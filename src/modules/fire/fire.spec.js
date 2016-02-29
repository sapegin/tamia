import './fire';
import { triggerNativeEvent } from '../../events';

describe('modules/fire', (done) => {
	it('Click on an element with data-fire should trigger an event', () => {
		let elem = document.createElement('div');
		elem.classList.add('is-hidden');
		document.body.appendChild(elem);

		let button = document.createElement('button');
		button.setAttribute('data-fire', 'tamia.appear');
		button.setAttribute('data-target', 'div');
		document.body.appendChild(button);

		triggerNativeEvent(button, 'click');

		setTimeout(() => {
			expect(elem.className).to.eql('');
			done();
		}, 1);
	});
});
