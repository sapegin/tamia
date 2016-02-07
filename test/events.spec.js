import sinon from 'sinon';
import * as events from '../src/events';

function click(elem) {
	let event = document.createEvent('HTMLEvents');
	event.initEvent('click', true, false);
	elem.dispatchEvent(event);
}

describe('events', () => {
	afterEach(() => {
		document.body.innerHTML = '';
	});

	it('onEvent() should attach an event handler to an element', () => {
		let elem = document.createElement('div');
		let handler = sinon.spy();

		events.onEvent(elem, 'click', handler);
		click(elem);

		expect(handler.called).to.be.true;
	});

	it('onEvent() should attach an event handler with delegation', () => {
		let elem = document.createElement('div');
		let span = document.createElement('span');
		elem.appendChild(span);
		let handler = sinon.spy();

		events.onEvent(elem, 'click', 'span', handler);
		click(span);

		expect(handler.called).to.be.true;
	});

	it('offEvent() should remove an event handler from an element', () => {
		let elem = document.createElement('div');
		let handler = sinon.spy();

		events.onEvent(elem, 'click', handler);
		click(elem);
		expect(handler.calledOnce).to.be.true;

		events.offEvent(elem, 'click', handler);
		click(elem);
		expect(handler.calledOnce).to.be.true;
	});

	it('oneEvent() should attach an event handler and remove it after the first event', () => {
		let elem = document.createElement('div');
		let handler = sinon.spy();

		events.oneEvent(elem, 'click', handler);

		click(elem);
		expect(handler.calledOnce).to.be.true;

		click(elem);
		expect(handler.calledOnce).to.be.true;
	});

	it('offEvent() should remove an event handler that was set with oneEvent() function', () => {
		let elem = document.createElement('div');
		let handler = sinon.spy();

		events.oneEvent(elem, 'click', handler);
		events.offEvent(elem, 'click', handler);
		click(elem);

		expect(handler.called).to.be.false;
	});

	it('offEvent() should remove an event handler with delegation', () => {
		let elem = document.createElement('div');
		let span = document.createElement('span');
		elem.appendChild(span);
		let handler = sinon.spy();

		events.onEvent(elem, 'click', 'span', handler);
		events.offEvent(elem, 'click', handler);
		click(span);

		expect(handler.called).to.be.false;
	});

	it('triggerEvent() should trigger a custom event', () => {
		let elem = document.createElement('div');
		let handler = sinon.spy();

		events.onEvent(elem, 'tamia.foo', handler);
		events.triggerEvent(elem, 'tamia.foo');

		expect(handler.called).to.be.true;
	});

	it('triggerEvent() should pass details as additional arguments to a handler', () => {
		let elem = document.createElement('div');
		let handler = sinon.spy();

		events.onEvent(elem, 'tamia.foo', handler);
		events.triggerEvent(elem, 'tamia.foo', 1, '2');

		expect(handler.called).to.be.true;
		expect(handler.firstCall.args[1]).to.eql(1);
		expect(handler.firstCall.args[2]).to.eql('2');
	});

	it('triggerNativeEvent() should trigger a native event', () => {
		let elem = document.createElement('div');
		let handler = sinon.spy();

		events.onEvent(elem, 'click', handler);
		events.triggerNativeEvent(elem, 'click');

		expect(handler.called).to.be.true;
	});

	it('registerGlobalEvents() should attach event handlers to document', () => {
		let elem = document.createElement('div');
		document.body.appendChild(elem);
		let handler = sinon.spy();

		events.registerGlobalEvents({
			'tamia.foo': handler,
		});
		events.triggerEvent(elem, 'tamia.foo');

		expect(handler.called).to.be.true;
	});

	it('data-fire should trigger an event on an element', () => {
		let elem1 = document.createElement('div');
		elem1.setAttribute('id', 'elem1');
		let elem2 = document.createElement('div');
		elem2.setAttribute('data-fire', 'foo');
		elem2.setAttribute('data-target', '#elem1');
		document.body.appendChild(elem1);
		document.body.appendChild(elem2);

		let handler = sinon.spy();

		events.onEvent(elem1, 'foo', handler);
		click(elem2);

		expect(handler.called).to.be.true;
	});

	it('data-fire should trigger an event on an element (data-closest)', () => {
		let elem1 = document.createElement('div');
		elem1.className = 'elem1';
		let elem2 = document.createElement('div');
		elem2.setAttribute('data-fire', 'foo');
		elem2.setAttribute('data-closest', '.elem1');
		document.body.appendChild(elem1);
		elem1.appendChild(elem2);

		let handler = sinon.spy();

		events.onEvent(elem1, 'foo', handler);
		click(elem2);

		expect(handler.called).to.be.true;
	});
});
