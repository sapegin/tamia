import path from 'path';
import {
	start,
	generatePages,
	savePages,
	createMarkdownRenderer,
	createTemplateRenderer,
	helpers,
} from 'fledermaus';
import { readFile } from 'fledermaus/lib/util';
import fs from 'fs';
import glob from 'glob';
import hljs from 'highlight.js';
import slugify from 'underscore.string/slugify';

const blocksRegEx = /\n((?:^[\t ]*\/\/.*?$\n)+)(^.*?$)?/mg;

const stylusModules = [
	'classes',
	'layout',
	'links',
	'images',
	'mediaqueries',
	'misc',
	'functions',
];

start('Building the docs...');

const DOCS_DIR = path.resolve(__dirname, '../docs');

hljs.configure({
	tabReplace: '<span class="indent">\t</span>',
});

const config = {
	base: {
		lang: 'en',
		menu: {
			api: 'JavaScript',
			styles: 'Styles',
			modules: 'Modules',
		},
	},
};

let renderMarkdown = createMarkdownRenderer();
let renderTemplate = createTemplateRenderer({
	root: path.join(__dirname, 'templates'),
});

let documents = [
	{
		page: 'index',
		sourcePath: 'index.md',
		layout: 'template',
		content: renderMarkdown(generateIndex()),
	},
	{
		page: 'styles',
		sourcePath: 'styles.md',
		layout: 'template',
		content: renderMarkdown(generateStyles()),
		title: 'Styles: CSS classes and Stylus mixins',
	},
	{
		page: 'javascript',
		sourcePath: 'javascript.md',
		layout: 'template',
		content: renderMarkdown(generateApi()),
		title: 'JavaScript API',
	},
	{
		page: 'modules',
		sourcePath: 'modules.md',
		layout: 'template',
		content: generateModules(),
		title: 'Modules',
	},
];

let pages = generatePages(documents, config, helpers, { ect: renderTemplate });
savePages(pages, DOCS_DIR);


/*
 * Functions
 */

function generateIndex() {
	let readme = readFile(path.resolve(__dirname, '../Readme.md'));
	readme = readme.replace(/^[\S\s]*?##/, '##');
	readme = readme.replace(
		/The MIT License, see the included `License.md` file./,
		'The [MIT License](https://github.com/tamiadev/tamia/blob/master/License.md).'
	);
	return readme;
}

function generateApi() {
	let api = readFile(path.join(DOCS_DIR, 'md/api.md'));

	// Add IDs to headings and decrease their level
	api = api.replace(/^## (.*?)$/gm, (m, name) => {
		// dashList.push([name, 'Function', `api.html#${name}`]);
		return `<h3 id="${name}">${name}</h3>`;
	});
	api = api.replace(/^# (.*?)$/gm, (m, name) => {
		// dashList.push([name, 'Function', `api.html#${name}`]);
		return `<h2 id="${name}">${name}</h2>`;
	});

	// Fix language in fenced code blocks
	api = api.replace(/```javascript\n</g, '\`\`\`html\n<');
	api = api.replace(/```javascript\n\./g, '\`\`\`scss\n.');

	// Make “Parameters” and “Examples” real headings
	api = api.replace(/\*\*Parameters\*\*/g, '#### Parameters');
	api = api.replace(/\*\*Examples\*\*/g, '#### Examples');

	return `# JavaScript API\n\n${api}`;
}

function generateStyles() {
	return stylusModules.map(name => {
		let contents = readFile(path.resolve(__dirname, `../src/styles/${name}.styl`));
		let m = contents.match(/^\/\/ (.*?)$/m);
		contents = processStylus(contents);
		let slug = slugify(m[1]);
		return `<h1 id="${slug}">${m[1]}</h1>\n\n${contents}`;
	}).join('\n\n');
}

function processStylus(code) {
	// Remove header comment
	code = code.replace(/^\/\/.*?\n\/\/.*?/, '');

	// Remove ///... comments
	code = code.replace(/^\s*\/\/\/.*?$/mg, '');

	let docs = [];
	while (true) {  // eslint-disable-line no-constant-condition
		let matches = blocksRegEx.exec(code);
		if (!matches) {
			break;
		}

		let text = matches[1];
		let firstLine = matches[2] ? matches[2].split('\n')[0] : null;

		// Heading
		let m = text.match(/^\s*\/\/\n\/\/\s*([-\. \w]+)\n\/\/\s*/);
		if (m) {
			docs.push(`## ${m[1]}`);
			continue;
		}

		text = text
			.replace(/^\s*\/\/ ?/mg, '')
			.replace(/^\s*/, '')
			.replace(/^([-_\.a-z]+) - (.*?\.)/mgi, '* `$1` $2')  // Parameters
			.replace(/^(.*?):$/mg, '#### $1')
			.replace(/^ {2}/mg, '    ')
		;

		let title;

		// Function
		m = /^\s*([-\w]+)\([^)]*\) {$/m.exec(firstLine);
		if (m) {
			// Add “Parameters” heading
			text = text.replace(/\n\n(\* `[a-z]+)/gi, '\n\n#### Parameters\n\n$1');

			title = `${m[1]}()`;
			// dashList.push([name, 'Mixin', `styles.html#${m[1]}`]);
		}

		// Variable
		m = /^\s*([-\w]+) \??=/m.exec(firstLine);
		if (!title && m) {
			title = m[1];
			// dashList.push([title, 'Global', `styles.html#${m[1]}`]);
		}

		// Class
		m = /^\s*(\.[-\w]+)(,| \{)?$/m.exec(firstLine);
		if (!title && m) {
			title = m[1];
			// dashList.push([title, 'Style', `styles.html#${m[1]}`]);
		}

		docs.push(`<h3 id="${title}">${title}</h3>\n\n${text}`);
	}
	return docs.join('\n\n');
}

function generateModules() {
	let modules = glob.sync(path.resolve(__dirname, '../src/modules/*'));

	let exampleId = 0;

	return modules.map((folder) => {
		let name = path.basename(folder);
		let moduleDoc = readFile(path.join(folder, 'Readme.md'));

		// Main heading
		moduleDoc = moduleDoc.replace(/^# (.*?)$/gm, `<h1 id="${name}">$1</h1>`);

		// Increase headings level
		moduleDoc = moduleDoc.replace(/^#/gm, '##');

		moduleDoc = renderMarkdown(moduleDoc);

		// Examples
		let examplesFile = path.join(folder, 'example.html');
		if (fs.existsSync(examplesFile)) {
			moduleDoc += '\n\n<h3>Examples</h3>\n\n';
			let examples = readFile(examplesFile);
			examples = examples.split('\n\n');
			examples = examples.map((example) => {
				exampleId++;
				let exampleHtml = example;
				let exampleCode = example
					.replace(/\s?fixie([^>]+>)</g, '$1...<')
					.replace(/\s?fixie/g, '')
					.replace(/\s?class=""/g, '')
					.replace(/http:\/\/placedog.com[^"]+/g, '...')
					.replace(/\s?style="[^"]*"/g, '')
				;
				exampleCode = highlightHtml(exampleCode);
				return `
					<div class="example">${exampleHtml}</div>
					<div class="example-code">
						<div class="example-code__link">
							<span class="link" data-fire="tamia.toggle" data-target="#example_${exampleId}">
								Show/hide code
							</span>
						</div>
						<div class="is-hidden" id="example_${exampleId}">
							${exampleCode}
						</div>
					</div>
				`;
			});
			moduleDoc += examples.join('\n\n');
			// dashList.push([name, 'Package', "modules.html#" + name]);
		}
		return moduleDoc;
	}).join('\n\n');
}

function highlightHtml(code) {
	let hl = hljs.highlight('html', code);
	return `
		<pre><code class="lang-html">${hl.value}</code></pre>
	`;
}
