import Component from '../src/Component';

describe('Component', () => {
	it('Component() should bind methods listed as "binded"', () => {
		let elem = document.createElement('div');
		class Test extends Component {
			static binded = 'foo bar';
			constructor(elem) {
				super(elem);
				this.fooValue = 1;
				this.barValue = 2;
			}
			foo() {
				return this.fooValue;
			}
			bar() {
				return this.barValue;
			}
		}

		let instance = new Test(elem);

		expect(instance.foo).to.be.a('function');
		expect(instance.bar).to.be.a('function');

		let foo = instance.foo;
		let bar = instance.bar;

		expect(foo()).to.eql(1);
		expect(bar()).to.eql(2);
	});

	it('Component() should create HTML according to a template', () => {
		let elem = document.createElement('div');
		class Test extends Component {
			static template = {
				block: 'foo',
				element: '@root',
				content: {
					block: 'foo',
					elem: 'bar',
				},
			};
		}

		let instance = new Test(elem);
		instance._attached();

		expect(instance.elem.outerHTML).to.eql('<div class="foo is-ok"><div class="foo__bar"></div></div>');
	});

	it('Component() should attach links to created DOM element to a component instance', () => {
		let elem = document.createElement('div');
		class Test extends Component {
			static template = {
				block: 'foo',
				element: '@root',
				content: {
					block: 'foo',
					elem: 'bar',
					link: true,
				},
			};
		}

		let instance = new Test(elem);
		instance._attached();

		expect(instance.barElem).to.be.an('object');
		expect(instance.barElem.className).to.eql('foo__bar');
	});
});
