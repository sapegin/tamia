import * as util from '../src/util';

describe('states', () => {
	it('TamiaError should be an Error descendant', () => {
		let result = new util.TamiaError();
		expect(result).to.be.an.instanceof(Error);
	});

	it('ensureArray() should return a value if it is an array', () => {
		let result = util.ensureArray([1, 2]);
		expect(result).to.eql([1, 2]);
	});

	it('ensureArray() should wrap a value in an array if it is not an array', () => {
		let result = util.ensureArray('foo');
		expect(result).to.eql(['foo']);
	});

	it('isElement() should return true if a value is an HTML element', () => {
		let result = util.isElement(document.createElement('div'));
		expect(result).to.be.true;
	});

	it('isElement() should return true if a value is a document', () => {
		let result = util.isElement(document);
		expect(result).to.be.true;
	});

	it('isElement() should return false if a value is anything else', () => {
		expect(util.isElement(null)).to.be.false;
		expect(util.isElement('foo')).to.be.false;
		expect(util.isElement({ bar: 'baz' })).to.be.false;
	});
});
