import { appear, disappear, toggle } from '../src/appear';

describe('appear', () => {
	it('appear() should remove is-hidden state', (done) => {
		let elem = document.createElement('div');
		elem.classList.add('is-hidden');

		appear(elem);

		expect(elem.className).to.be.eql('is-transit');
		setTimeout(() => {
			expect(elem.className).to.eql('');
			done();
		}, 1);
	});

	it('disappear() should add is-hidden state', (done) => {
		let elem = document.createElement('div');

		disappear(elem);

		expect(elem.className).to.be.eql('is-transit is-hidden');
		setTimeout(() => {
			expect(elem.className).to.eql('is-hidden');
			done();
		}, 1);
	});

	it('toggle() should show hidden element', (done) => {
		let elem = document.createElement('div');
		elem.classList.add('is-hidden');

		toggle(elem);

		expect(elem.className).to.be.eql('is-transit');
		setTimeout(() => {
			expect(elem.className).to.eql('');
			done();
		}, 1);
	});

	it('toggle() should show hide visible element', (done) => {
		let elem = document.createElement('div');

		toggle(elem);

		expect(elem.className).to.be.eql('is-transit is-hidden');
		setTimeout(() => {
			expect(elem.className).to.eql('is-hidden');
			done();
		}, 1);
	});
});
