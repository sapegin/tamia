import * as opor from '../src/opor';

describe('OPOR', () => {
	it('oporClass() should return a class name', () => {
		const result = opor.oporClass({
			block: 'select',
		});
		expect(result).to.eql('select');
	});

	it('oporClass() should accept an element name', () => {
		const result = opor.oporClass({
			block: 'select',
			elem: 'box',
		});
		expect(result).to.eql('select__box');
	});

	it('oporClass() should accept a modifier name', () => {
		const result = opor.oporClass({
			block: 'select',
			mods: 'big',
		});
		expect(result).to.eql('select select_big');
	});

	it('oporClass() should accept an element and a modifier names', () => {
		const result = opor.oporClass({
			block: 'select',
			elem: 'box',
			mods: 'big',
		});
		expect(result).to.eql('select__box select__box_big');
	});

	it('oporClass() should accept multiple modifiers', () => {
		const result = opor.oporClass({
			block: 'select',
			mods: ['big', 'green'],
		});
		expect(result).to.eql('select select_big select_green');
	});

	it('oporClass() should accept a mix as a string', () => {
		const result = opor.oporClass({
			block: 'select',
			mix: 'foo',
		});
		expect(result).to.eql('select foo');
	});

	it('oporClass() should accept a mix as an OPORJSON', () => {
		const result = opor.oporClass({
			block: 'select',
			mix: {
				block: 'foo',
				elem: 'bar',
			},
		});
		expect(result).to.eql('select foo__bar');
	});

	it('oporClass() should accept multiple mixes', () => {
		const result = opor.oporClass({
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
		const result = opor.oporClass({
			block: 'select',
			states: 'visible',
		});
		expect(result).to.eql('select is-visible');
	});

	it('oporClass() should accept multiple states', () => {
		const result = opor.oporClass({
			block: 'select',
			states: ['visible', 'hidden'],
		});
		expect(result).to.eql('select is-visible is-hidden');
	});

	it('oporClass() should accept a JS class', () => {
		const result = opor.oporClass({
			block: 'select',
			js: 'select',
		});
		expect(result).to.eql('select js-select');
	});

	it('oporClass() should accept multiple JS classes', () => {
		const result = opor.oporClass({
			block: 'select',
			js: ['select', 'button'],
		});
		expect(result).to.eql('select js-select js-button');
	});

	it('oporClass() should return an array if the second argument is true', () => {
		const result = opor.oporClass({
			block: 'select',
			mods: 'blue',
		}, true);
		expect(result).to.eql(['select', 'select_blue']);
	});

	it('oporElement() should return a DOM element with attached class name', () => {
		const result = opor.oporElement({
			block: 'select',
			elem: 'box',
		});
		expect(result.tagName).to.eql('DIV');
		expect(result.className).to.eql('select__box');
	});

	it('oporElement() should be able to create an element with a custom tag', () => {
		const result = opor.oporElement({
			block: 'select',
			tag: 'span',
		});
		expect(result.tagName).to.eql('SPAN');
	});

	it('oporElement() should be able to use existing DOM elements', () => {
		const elem = document.createElement('div');
		elem.className = 'was-here';
		const result = opor.oporElement({
			block: 'select',
			element: '@root',
		}, elem);
		expect(result.tagName).to.eql('DIV');
		expect(result.className).to.eql('was-here select');
	});

	it('oporElement() should be able to use existing DOM elements', () => {
		const elem = document.createElement('div');
		const inner = document.createElement('span');
		inner.className = 'js-foo';
		elem.appendChild(inner);
		const result = opor.oporElement({
			block: 'select',
			content: {
				block: 'select',
				elem: 'foo',
				element: '.js-foo',
			},
		}, elem);
		expect(result.firstChild.tagName).to.eql('SPAN');
	});

	it('oporElement() should be able to attach custom attributes', () => {
		const result = opor.oporElement({
			block: 'select',
			attrs: {
				title: 'Hello',
				'data-foo': 42,
			},
		});
		expect(result.title).to.eql('Hello');
		expect(result.dataset.foo).to.eql('42');
	});

	it('oporElement() should return links object', () => {
		const [elem, links] = opor.oporElement({
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
		const result = opor.oporElement({
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
		const result = opor.oporElement({
			block: 'select',
			content: 'Hello world',
		});
		expect(result.innerHTML).to.eql('Hello world');
	});
});
