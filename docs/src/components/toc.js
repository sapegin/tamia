import { Component, registerComponent, onEvent } from '../../../src';
import throttle from 'lodash/throttle';
import 'Stickyfill/dist/stickyfill';

class Toc extends Component {
	init() {
		const checkScroll = () => {
			headers.forEach(headerElem => {
				let topOffset = headerElem.offsetTop - (headerElem.offsetHeight / 3) - 50;
				let lowOffset = headerElem.offsetTop + headerElem.offsetHeight;

				if (window.pageYOffset >= topOffset && window.pageYOffset < lowOffset) {
					let linkElem = this.elem.querySelector(`a[href="#${headerElem.id}"]`);
					if (linkElem && !linkElem.classList.contains('is-active')) {
						let activeLinkElem = this.elem.querySelector(`.is-active`);
						if (activeLinkElem) {
							activeLinkElem.classList.remove('is-active');
						}
						linkElem.classList.add('is-active');
					}
				}
			});
		};

		let headers = [...document.querySelectorAll('[data-toc]')];

		// TOC
		let links = headers.map(headerElem => {
			return `
				<li class="toc__item">
					<a href="#${headerElem.id}" class="toc__link link">
						${headerElem.textContent}
					</a>
				</li>
			`;
		});

		this.elem.innerHTML = `
			<ul class="toc__list">
				${links.join('\n')}
			</ul>
		`;

		// position:sticky ponyfill
		window.Stickyfill.add(this.elem);

		// Scroll spy
		onEvent(window, 'scroll', throttle(checkScroll, 50));
		checkScroll();
	}
}

registerComponent('u-toc', Toc);
