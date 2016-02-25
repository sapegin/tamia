import data, { _test } from '../src/data';

describe('data', () => {
	it('toObject() should convert string to numbers, boolean and null', () => {
		let result = _test.toObject({
			true: 'true',
			false: 'false',
			null: 'null',
			number: '42',
			double: '42.53',
			string: 'such characters',
		});

		expect(result.true).to.be.true;
		expect(result.false).to.be.false;
		expect(result.null).to.be.null;
		expect(result.number).to.eql(42);
		expect(result.double).to.eql(42.53);
		expect(result.string).to.eql('such characters');
	});

	it('data() should return undefined for non-existent data-attributes', () => {
		let elem = document.createElement('div');

		let result = data(elem, 'foo');

		expect(result).to.be.undefined;
	});

	it('data() should return a value for existent data-attributes', () => {
		let elem = document.createElement('div');
		elem.setAttribute('data-foo', 'bar');

		let result = data(elem, 'foo');

		expect(result).to.eql('bar');
	});

	it('data() should set a value to a cache, should not update data-attribute', () => {
		let elem = document.createElement('div');
		elem.setAttribute('data-foo', 'bar');

		data(elem, 'foo', 'baz');
		let result = data(elem, 'foo');

		expect(result).to.eql('baz');
		expect(elem.getAttribute('data-foo')).to.eql('bar');
	});

	it('data() should convert string to numbers, boolean and null', () => {
		let elem = document.createElement('div');
		elem.setAttribute('data-true', 'true');
		elem.setAttribute('data-false', 'false');
		elem.setAttribute('data-null', 'null');
		elem.setAttribute('data-number', '42');

		expect(data(elem, 'true')).to.be.true;
		expect(data(elem, 'false')).to.be.false;
		expect(data(elem, 'null')).to.be.null;
		expect(data(elem, 'number')).to.eql(42);
	});
});
