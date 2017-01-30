import sinon from 'sinon';
import * as events from '../src/events';

function click(elem) {
	const event = document.createEvent('HTMLEvents');
	event.initEvent('click', true, false);
	elem.dispatchEvent(event);
}

describe('events', () => {
	afterEach(() => {
		document.body.innerHTML = '';
	});

	it('onEvent() should attach an event handler to an element', () => {
		const elem = document.createElement('div');
		const handler = sinon.spy();

		events.onEvent(elem, 'click', handler);
		click(elem);

		expect(handler.called).to.be.true;
	});

	it('onEvent() should attach an event handler with delegation', () => {
		const elem = document.createElement('div');
		const span = document.createElement('span');
		elem.appendChild(span);
		const handler = sinon.spy();

		events.onEvent(elem, 'click', 'span', handler);
		click(span);

		expect(handler.called).to.be.true;
	});

	it('onEvent() with delegation should set event.target to delegated element, not to an actual event catcher', () => {
		const elem = document.createElement('div');
		const button = document.createElement('button');
		const span = document.createElement('span');
		button.appendChild(span);
		elem.appendChild(button);
		const handler = sinon.spy();

		events.onEvent(elem, 'click', 'button', handler);
		click(span);

		expect(handler.called).to.be.true;
		expect(handler.firstCall.args[0].target.tagName).to.eql('BUTTON');
	});

	it('oneEvent() should attach an event handler and remove it after the first event', () => {
		const elem = document.createElement('div');
		const handler = sinon.spy();

		events.oneEvent(elem, 'click', handler);

		click(elem);
		expect(handler.calledOnce).to.be.true;

		click(elem);
		expect(handler.calledOnce).to.be.true;
	});

	it('offEvent() should remove an event handler from an element', () => {
		const elem = document.createElement('div');
		const handler = sinon.spy();

		events.onEvent(elem, 'click', handler);
		click(elem);
		expect(handler.calledOnce).to.be.true;

		events.offEvent(elem, 'click', handler);
		click(elem);
		expect(handler.calledOnce).to.be.true;
	});

	it('offEvent() should remove an event handler that was set with oneEvent() function', () => {
		const elem = document.createElement('div');
		const handler = sinon.spy();

		events.oneEvent(elem, 'click', handler);
		events.offEvent(elem, 'click', handler);
		click(elem);

		expect(handler.called).to.be.false;
	});

	it('offEvent() should remove an event handler with delegation', () => {
		const elem = document.createElement('div');
		const span = document.createElement('span');
		elem.appendChild(span);
		const handler = sinon.spy();

		events.onEvent(elem, 'click', 'span', handler);
		events.offEvent(elem, 'click', handler);
		click(span);

		expect(handler.called).to.be.false;
	});

	it('triggerEvent() should trigger a custom event', () => {
		const elem = document.createElement('div');
		const handler = sinon.spy();

		events.onEvent(elem, 'tamia.foo', handler);
		const result = events.triggerEvent(elem, 'tamia.foo');

		expect(handler.called).to.be.true;
		expect(result).to.be.true;
	});

	it('triggerEvent() should pass details as additional arguments to a handler', () => {
		const elem = document.createElement('div');
		const handler = sinon.spy();

		events.onEvent(elem, 'tamia.foo', handler);
		events.triggerEvent(elem, 'tamia.foo', 1, '2');

		expect(handler.called).to.be.true;
		expect(handler.firstCall.args[1]).to.eql(1);
		expect(handler.firstCall.args[2]).to.eql('2');
	});

	it('triggerEvent() should return false if event was cancelled', () => {
		const elem = document.createElement('div');
		const handler = event => event.preventDefault();

		events.onEvent(elem, 'tamia.foo', handler);
		const result = events.triggerEvent(elem, 'tamia.foo');

		expect(result).to.be.false;
	});

	it('triggerNativeEvent() should trigger a native event', () => {
		const elem = document.createElement('div');
		const handler = sinon.spy();

		events.onEvent(elem, 'click', handler);
		const result = events.triggerNativeEvent(elem, 'click');

		expect(handler.called).to.be.true;
		expect(result).to.be.true;
	});

	it('data-fire should trigger an event on an element', () => {
		const elem1 = document.createElement('div');
		elem1.setAttribute('id', 'elem1');
		const elem2 = document.createElement('div');
		elem2.setAttribute('data-fire', 'foo');
		elem2.setAttribute('data-target', '#elem1');
		document.body.appendChild(elem1);
		document.body.appendChild(elem2);

		const handler = sinon.spy();

		events.onEvent(elem1, 'foo', handler);
		click(elem2);

		expect(handler.called).to.be.true;
	});

	it('data-fire should trigger an event on an element (data-closest)', () => {
		const elem1 = document.createElement('div');
		elem1.className = 'elem1';
		const elem2 = document.createElement('div');
		elem2.setAttribute('data-fire', 'foo');
		elem2.setAttribute('data-closest', '.elem1');
		document.body.appendChild(elem1);
		elem1.appendChild(elem2);

		const handler = sinon.spy();

		events.onEvent(elem1, 'foo', handler);
		click(elem2);

		expect(handler.called).to.be.true;
	});

	it('data-fire should accept extra attributes', () => {
		const elem1 = document.createElement('div');
		elem1.setAttribute('id', 'elem1');
		const elem2 = document.createElement('div');
		elem2.setAttribute('data-fire', 'foo');
		elem2.setAttribute('data-target', '#elem1');
		elem2.setAttribute('data-attrs', '1,2');
		document.body.appendChild(elem1);
		document.body.appendChild(elem2);

		const handler = sinon.spy();

		events.onEvent(elem1, 'foo', handler);
		click(elem2);

		expect(handler.called).to.be.true;
		expect(handler.firstCall.args[1]).to.eql('1');
		expect(handler.firstCall.args[2]).to.eql('2');
	});
});
