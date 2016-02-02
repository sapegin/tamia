import sinon from 'sinon';
import * as anim from '../src/animation';

const doneFunc = () => {};

describe('animation', () => {
	it('runAnimation() should call a registered animation function', () => {
		let handler = sinon.spy();
		let elem = document.createElement('div');

		anim.registerAnimations({
			foo: handler,
		});
		anim.runAnimation(elem, 'foo', doneFunc);

		expect(handler.called).to.be.true;
		expect(handler.firstCall.args[0]).to.eql(elem);
		expect(handler.firstCall.args[1]).to.eql(doneFunc);
	});

	it('runAnimation() should accept animation as a function', () => {
		let handler = sinon.spy();
		let elem = document.createElement('div');

		anim.runAnimation(elem, handler, doneFunc);

		expect(handler.called).to.be.true;
		expect(handler.firstCall.args[0]).to.eql(elem);
		expect(handler.firstCall.args[1]).to.eql(doneFunc);
	});

	it('runAnimation() should work when there is no callback function', () => {
		let handler = sinon.spy();
		let elem = document.createElement('div');

		anim.runAnimation(elem, handler);

		expect(handler.called).to.be.true;
		expect(handler.firstCall.args[0]).to.eql(elem);
		expect(handler.firstCall.args[1]).to.be.a('function');
	});

	it('runAnimation() should accept CSS class name', (done) => {
		let handler = sinon.spy();
		let elem = document.createElement('div');
		anim.runAnimation(elem, 'bar', handler);

		expect(elem.className).to.eql('bar');
		setTimeout(() => {
			expect(elem.className).to.eql('');
			expect(handler.called).to.be.true;
			done();
		}, 1);
	});

	it('parseTimes() should return an array of milliseconds', () => {
		let result = anim.parseTimes('4s, 30s');

		expect(result).to.eql([4000, 30000]);
	});

	it('getTransitionsEndTime() should return time when the latest transition ends', () => {
		let elem = document.createElement('div');
		elem.style['transition-property'] = 'margin-left, margin-right';
		elem.style['transition-duration'] = '1s, 3s';
		elem.style['transition-delay'] = '4s, 0s';

		let result = anim.getTransitionsEndTime(elem);

		expect(result).to.eql(8000);
	});

	it('getTransitionsEndTime() should use single duration or delay for every property', () => {
		let elem = document.createElement('div');
		elem.style['transition-property'] = 'margin-left, margin-right';
		elem.style['transition-duration'] = '1s';
		elem.style['transition-delay'] = '4s';

		let result = anim.getTransitionsEndTime(elem);

		expect(result).to.eql(10000);
	});

	it('getTransitionsEndTime() should return 0 when element has no transitions', () => {
		let elem = document.createElement('div');

		let result = anim.getTransitionsEndTime(elem);

		expect(result).to.eql(0);
	});
});
