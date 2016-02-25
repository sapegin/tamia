import * as util from '../src/util';

describe('util', () => {
	it('ensureArray() should return a value if it is an array', () => {
		let result = util.ensureArray([1, 2]);
		expect(result).to.eql([1, 2]);
	});

	it('ensureArray() should wrap a value in an array if it is not an array', () => {
		let result = util.ensureArray('foo');
		expect(result).to.eql(['foo']);
	});

	it('isElement() should return true if a value is an DOM element', () => {
		let result = util.isElement(document.createElement('div'));
		expect(result).to.be.true;
	});

	it('isElement() should return false if a value is anything else', () => {
		expect(util.isElement(null)).to.be.false;
		expect(util.isElement('foo')).to.be.false;
		expect(util.isElement({ bar: 'baz' })).to.be.false;
	});

	it('isEventReceiver() should return true if a value is an DOM element', () => {
		let result = util.isEventReceiver(document.createElement('div'));
		expect(result).to.be.true;
	});

	it('isEventReceiver() should return true if a value is a document', () => {
		let result = util.isEventReceiver(document);
		expect(result).to.be.true;
	});

	it('isEventReceiver() should return true if a value is a window', () => {
		let result = util.isEventReceiver(window);
		expect(result).to.be.true;
	});

	it('isEventReceiver() should return false if a value is anything else', () => {
		expect(util.isEventReceiver(null)).to.be.false;
		expect(util.isEventReceiver('foo')).to.be.false;
		expect(util.isEventReceiver({ bar: 'baz' })).to.be.false;
	});
});
