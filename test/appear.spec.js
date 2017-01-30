import { appear, disappear, toggle } from '../src/appear';

describe('appear', () => {
	it('appear() should remove is-hidden state', (done) => {
		const elem = document.createElement('div');
		elem.classList.add('is-hidden');

		appear(elem);

		expect(elem.className).to.be.eql('');
		expect(elem.style.display).to.be.eql('block');
		setTimeout(() => {
			expect(elem.className).to.eql('');
			expect(elem.style.display).to.be.eql(undefined);
			done();
		}, 1);
	});

	it('disappear() should add is-hidden state', (done) => {
		const elem = document.createElement('div');

		disappear(elem);

		expect(elem.className).to.be.eql('is-hidden');
		expect(elem.style.display).to.be.eql('block');
		setTimeout(() => {
			expect(elem.className).to.eql('is-hidden');
			expect(elem.style.display).to.be.eql(undefined);
			done();
		}, 1);
	});

	it('toggle() should show hidden element', () => {
		const elem = document.createElement('div');
		elem.classList.add('is-hidden');

		toggle(elem);

		expect(elem.className).to.be.eql('');
	});

	it('toggle() should show hide visible element', () => {
		const elem = document.createElement('div');

		toggle(elem);

		expect(elem.className).to.be.eql('is-hidden');
	});
});
