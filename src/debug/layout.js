import { toggle } from '../appear';
import { onEvent } from '../events';

/**
* Layout debugger.
*
* Hotkeys:
*
* - ? - Toggle help.
* - g - Toggle grid.
* - o - Toggle layout outlines.
* - a - Toggle all elements outlines.
*/

const NUMBER_OF_COLUMNS = 12;
const body = document.body;
let layoutClassesAdded = false;
let gridDebugger;

function toggleGrid() {
	addLayoutClasses();
	addGrid();
	toggle(gridDebugger);
}

function toggleOutline() {
	addLayoutClasses();
	body.classList.toggle('tamia__show-layout-outlines');
}

function toggleAllOutline() {
	body.classList.toggle('tamia__show-all-outlines');
}

function toggleHelp() {
	let getHelpElem = () => document.querySelector('.tamia__help');
	let helpElem = getHelpElem();
	if (helpElem) {
		toggle(helpElem);
	}
	else {
		body.insertAdjacentHTML('beforeend', `
			<div class="tamia__help is-hidden">
				<div class="tamia__help-i">
					<ul>
						<li><kbd>G</kbd> Toggle grid</li>
						<li><kbd>O</kbd> Toggle columns outlines</li>
						<li><kbd>A</kbd> Toggle all elements outlines</li>
					</ul>
				</div>
			</div>
		`);
		toggle(getHelpElem());
	}
}

function addLayoutClasses() {
	if (layoutClassesAdded) {
		return;
	}
	[...document.querySelectorAll('*')].forEach((elem) => {
		let content = getComputedStyle(elem).content;
		if (/^"tamia__/.test(content)) {
			elem.classList.add(content.replace(/"(.*?)"/, '$1'));
		}
	});
	layoutClassesAdded = true;
}

function addGrid() {
	let firstRow = getFirstRow();
	if (!firstRow) {
		return;
	}

	if (!gridDebugger) {
		// let columns = new Array(NUMBER_OF_COLUMNS + 1).join('<b class="tamia__grid-debugger-col"></b>');
		let columns = '<b class="tamia__grid-debugger-col"></b>'.repeat(NUMBER_OF_COLUMNS);
		firstRow.insertAdjacentHTML('afterbegin', `
			<div class="tamia__grid-debugger is-hidden">
				${columns}
			</div>
		`);
		gridDebugger = document.querySelector('.tamia__grid-debugger');
	}

	let top = firstRow.getBoundingClientRect().top + document.body.scrollTop;
	let paddingTop = parseInt(getComputedStyle(firstRow).paddingTop || 0, 10);
	gridDebugger.style.marginTop = -(top + paddingTop) + 'px';
	gridDebugger.style.height = document.body.offsetHeight + 'px';
}

function getFirstRow() {
	let rows = [...document.querySelectorAll('.tamia__grid-row, .tamia__layout-row')];
	for (let row of rows) {
		if (row.offsetHeight || row.offsetWidth) {
			return row;
		}
	}
	return null;
}

onEvent(document, 'keydown', (event) => {
	let activeTag = document.activeElement.tagName;
	if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') {
		return;
	}

	let keycode = event.which;
	let func = {
		71: toggleGrid,  // G
		79: toggleOutline,  // O
		65: toggleAllOutline,  // A
		191: toggleHelp,  // ?
	}[keycode];
	if (!func) {
		return;
	}

	func();
	event.preventDefault();
});
