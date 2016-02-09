import * as opor from '../src/opor';

describe('OPOR', () => {
	it('oporClass() should return a class name', () => {
		let result = opor.oporClass({
			block: 'select',
		});
		expect(result).to.eql('select');
	});

	it('oporClass() should accept an element name', () => {
		let result = opor.oporClass({
			block: 'select',
			elem: 'box',
		});
		expect(result).to.eql('select__box');
	});

	it('oporClass() should accept a modifier name', () => {
		let result = opor.oporClass({
			block: 'select',
			mods: 'big',
		});
		expect(result).to.eql('select select_big');
	});

	it('oporClass() should accept an element and a modifier names', () => {
		let result = opor.oporClass({
			block: 'select',
			elem: 'box',
			mods: 'big',
		});
		expect(result).to.eql('select__box select__box_big');
	});

	it('oporClass() should accept multiple modifiers', () => {
		let result = opor.oporClass({
			block: 'select',
			mods: ['big', 'green'],
		});
		expect(result).to.eql('select select_big select_green');
	});

	it('oporClass() should accept a mix as a string', () => {
		let result = opor.oporClass({
			block: 'select',
			mix: 'foo',
		});
		expect(result).to.eql('select foo');
	});

	it('oporClass() should accept a mix as an OPORJSON', () => {
		let result = opor.oporClass({
			block: 'select',
			mix: {
				block: 'foo',
				elem: 'bar',
			},
		});
		expect(result).to.eql('select foo__bar');
	});

	it('oporClass() should accept multiple mixes', () => {
		let result = opor.oporClass({
			block: 'select',
			mix: [
				'foo',
				{
					block: 'bar',
					elem: 'baz',
				},
			],
		});
		expect(result).to.eql('select foo bar__baz');
	});

	it('oporClass() should accept a state', () => {
		let result = opor.oporClass({
			block: 'select',
			states: 'visible',
		});
		expect(result).to.eql('select is-visible');
	});

	it('oporClass() should accept multiple states', () => {
		let result = opor.oporClass({
			block: 'select',
			states: ['visible', 'hidden'],
		});
		expect(result).to.eql('select is-visible is-hidden');
	});

	it('oporClass() should accept a JS class', () => {
		let result = opor.oporClass({
			block: 'select',
			js: 'select',
		});
		expect(result).to.eql('select js-select');
	});

	it('oporClass() should accept multiple JS classes', () => {
		let result = opor.oporClass({
			block: 'select',
			js: ['select', 'button'],
		});
		expect(result).to.eql('select js-select js-button');
	});

	it('oporClass() should return an array if the second argument is true', () => {
		let result = opor.oporClass({
			block: 'select',
			mods: 'blue',
		}, true);
		expect(result).to.eql(['select', 'select_blue']);
	});

	it('oporElement() should return a DOM element with attached class name', () => {
		let result = opor.oporElement({
			block: 'select',
			elem: 'box',
		});
		expect(result.tagName).to.eql('DIV');
		expect(result.className).to.eql('select__box');
	});

	it('oporElement() should be able to create an element with a custom tag', () => {
		let result = opor.oporElement({
			block: 'select',
			tag: 'span',
		});
		expect(result.tagName).to.eql('SPAN');
	});

	it('oporElement() should be able to use existing DOM elements', () => {
		let elem = document.createElement('div');
		elem.className = 'was-here';
		let result = opor.oporElement({
			block: 'select',
			element: elem,
		});
		expect(result.tagName).to.eql('DIV');
		expect(result.className).to.eql('was-here select');
	});

	it('oporElement() should be able to attach custom attributes', () => {
		let result = opor.oporElement({
			block: 'select',
			attrs: {
				'title': 'Hello',
				'data-foo': 42,
			},
		});
		expect(result.title).to.eql('Hello');
		expect(result.dataset.foo).to.eql('42');
	});

	it('oporElement() should return links object', () => {
		let [elem, links] = opor.oporElement({
			block: 'select',
			content: {
				block: 'select',
				elem: 'foo-bar',
				link: true,
			},
		});
		expect(elem.tagName).to.eql('DIV');
		expect(links.fooBarElem.className).to.eql('select__foo-bar');
	});

	it('oporElement() should accept content as an array', () => {
		let result = opor.oporElement({
			block: 'select',
			content: [
				{
					block: 'select',
					elem: 'foo',
				},
				{
					block: 'select',
					elem: 'bar',
				},
			],
		});
		expect(result.childNodes.length).to.eql(2);
		expect(result.firstChild.className).to.eql('select__foo');
	});

	it('oporElement() should accept content as a string', () => {
		let result = opor.oporElement({
			block: 'select',
			content: 'Hello world',
		});
		expect(result.innerHTML).to.eql('Hello world');
	});
});
