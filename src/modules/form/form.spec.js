import { toggleElem, toggleAll, toggleFields, toggleSubmit } from './form';

describe('modules/form', () => {
	it('toggleElem() should disable enabled form element', () => {
		let elem = document.createElement('input');
		elem.classList.add('foo');
		toggleElem(elem, false);

		expect(elem.className).to.eql('foo is-disabled');
		expect(elem.getAttribute('disabled')).to.eql('disabled');
	});

	it('toggleElem() should enable disabled form element', () => {
		let elem = document.createElement('input');
		elem.setAttribute('disabled', 'disabled');
		elem.classList.add('foo', 'is-disabled');
		toggleElem(elem, true);

		expect(elem.className).to.eql('foo');
		expect(elem.getAttribute('disabled')).to.eql(null);
	});

	it('toggleAll() should disable all elements that match selector in a container', () => {
		let form = document.createElement('form');
		let input = document.createElement('input');
		form.appendChild(input);
		let button = document.createElement('button');
		form.appendChild(button);
		let div = document.createElement('div');
		form.appendChild(div);
		toggleAll(form, 'input, button', false);

		expect(input.className).to.eql('is-disabled');
		expect(input.getAttribute('disabled')).to.eql('disabled');
		expect(button.className).to.eql('is-disabled');
		expect(button.getAttribute('disabled')).to.eql('disabled');
		expect(div.className).to.eql('');
		expect(div.getAttribute('disabled')).to.eql(null);
	});

	it('toggleAll() should disable container if it matches selector', () => {
		let form = document.createElement('form');
		toggleAll(form, 'form', false);

		expect(form.className).to.eql('is-disabled');
		expect(form.getAttribute('disabled')).to.eql('disabled');
	});

	it('toggleFields() should disable all fields in a form', () => {
		let form = document.createElement('form');
		let input = document.createElement('input');
		input.classList.add('field');
		form.appendChild(input);
		toggleFields(form, false);

		expect(input.className).to.eql('field is-disabled');
		expect(input.getAttribute('disabled')).to.eql('disabled');
	});

	it('toggleSubmit() should disable submit button', () => {
		let form = document.createElement('form');
		let button = document.createElement('button');
		button.setAttribute('type', 'submit');
		form.appendChild(button);
		toggleSubmit(form, false);

		expect(button.className).to.eql('is-disabled');
		expect(button.getAttribute('disabled')).to.eql('disabled');
	});
});
