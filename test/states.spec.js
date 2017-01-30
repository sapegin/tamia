import * as states from '../src/states';

function createElement(classes) {
	const elem = document.createElement('div');
	elem.className = classes;
	return elem;
}

describe('states', () => {
	it('toggleState() should set state if it is not set', () => {
		const elem = createElement('foo is-bar baz is-one-more');
		const result = states.toggleState(elem, 'foo', true);
		expect(result).to.be.true;
		expect(elem.className).to.eql('foo is-bar baz is-one-more is-foo');
	});

	it('toggleState() should not set state if it is already set', () => {
		const elem = createElement('foo is-bar baz is-one-more');
		const result = states.toggleState(elem, 'bar', true);
		expect(result).to.be.true;
		expect(elem.className).to.eql('foo is-bar baz is-one-more');
	});

	it('toggleState() should toggle set state if it is not set', () => {
		const elem = createElement('foo is-bar baz is-one-more');
		const result = states.toggleState(elem, 'foo');
		expect(result).to.be.true;
		expect(elem.className).to.eql('foo is-bar baz is-one-more is-foo');
	});

	it('toggleState() should toggle set state if it is already set', () => {
		const elem = createElement('foo is-bar baz is-one-more');
		const result = states.toggleState(elem, 'bar');
		expect(result).to.be.false;
		expect(elem.className).to.eql('foo baz is-one-more');
	});

	it('addState() should add state', () => {
		const elem = createElement('foo is-bar');
		states.addState(elem, 'baz');
		expect(elem.className).to.eql('foo is-bar is-baz');
	});

	it('removeState() should remove state', () => {
		const elem = createElement('foo is-bar');
		states.removeState(elem, 'bar');
		expect(elem.className).to.eql('foo');
	});

	it('hasState() should return true if element has given state', () => {
		const elem = createElement('foo is-bar baz is-one-more');
		const result = states.hasState(elem, 'bar');
		expect(result).to.be.true;
	});

	it('hasState() should return false if element has no given state', () => {
		const elem = createElement('foo is-bar baz is-one-more');
		const result = states.hasState(elem, 'baz');
		expect(result).to.be.false;
	});
});
