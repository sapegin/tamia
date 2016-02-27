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
import fs from 'fs-extra';
import glob from 'glob';
import hljs from 'highlight.js';
import Sequelize from 'sequelize';
import slugify from 'underscore.string/slugify';

/* eslint-disable no-console */

const blocksRegEx = /\n((?:^[\t ]*\/\/.*?$\n)+)(^.*?$)?/mg;

const stylusModules = [
	'skin/layout',
	'skin/links',
	'skin/misc',
	'core/layout',
	'core/links',
	'core/images',
	'core/mediaqueries',
	'core/functions',
	'core/misc',
	'config',
];

start('Building the docs...');

hljs.configure({
	tabReplace: '<span class="indent">\t</span>',
});

const config = {
	base: {
		lang: 'en',
		menu: {
			javascript: 'JavaScript',
			styles: 'Styles',
			modules: 'Modules',
		},
	},
};

const dashPath = p => path.resolve(__dirname, `../Tamia.docset/${p}`);
const publicPath = p => path.resolve(__dirname, `../public/${p}`);
const sourcePath = p => path.resolve(__dirname, `../../src/${p}`);

let renderMarkdown = createMarkdownRenderer();
let renderTemplate = createTemplateRenderer({
	root: path.join(__dirname, 'templates'),
});

let dashList = [];

let documents = [
	{
		page: 'index',
		sourcePath: 'index.md',
		content: renderMarkdown(generateIndex()),
	},
	{
		page: 'styles',
		sourcePath: 'styles.md',
		content: renderMarkdown(generateStyles()),
		title: 'Styles: CSS classes and Stylus mixins',
	},
	{
		page: 'javascript',
		sourcePath: 'javascript.md',
		content: renderMarkdown(generateApi()),
		title: 'JavaScript API',
	},
	{
		page: 'modules',
		sourcePath: 'modules.md',
		content: generateModules(),
		title: 'Modules',
	},
];

// Site
generateWithTemplate(documents, 'template', publicPath(''));

console.log('Building Dash docset...');

// Dash
documents.shift();  // Exclude index page
generateWithTemplate(documents, 'dash', dashPath('Contents/Resources/Documents'));
docsDashIndexDb();

console.log('Copying files...');

// Copy files
const filesToCopy = [
	['favicon.ico', publicPath('')],
	['icon.png', dashPath('')],
	['Info.plist', dashPath('Contents')],
	['../public/styles.css', dashPath('Contents/Resources/Documents')],
	['../public/bundle.js', dashPath('Contents/Resources/Documents')],
];
filesToCopy.forEach(file => {
	let filename = path.basename(file[0]);
	fs.copySync(path.resolve(__dirname, file[0]), path.join(file[1], filename));
});

/*
 * Functions
 */

function generateWithTemplate(documents, template, folder) {
	documents = documents.map(doc => {
		doc.layout = template;
		return doc;
	});
	let pages = generatePages(documents, config, helpers, { ect: renderTemplate });
	savePages(pages, folder);
}

function generateIndex() {
	let readme = readFile(path.resolve(__dirname, '../../Readme.md'));
	readme = readme.replace(/^[\S\s]*?##/, '##');
	readme = readme.replace(
		/The MIT License, see the included `License.md` file./,
		'The [MIT License](https://github.com/tamiadev/tamia/blob/master/License.md).'
	);
	return readme;
}

function generateApi() {
	let api = readFile(publicPath('../md/api.md'));

	// Add IDs to headings and decrease their level
	api = api.replace(/^## (.*?)$/gm, (m, name) => {
		dashList.push([name, 'Method', `javascript.html#${name}`]);
		return `<h3 id="${name}">${name}</h3>`;
	});
	api = api.replace(/^# (.*?)$/gm, (m, name) => {
		let type = name[0] === name[0].toUpperCase() ? 'Class' : 'Function';
		dashList.push([name, type, `javascript.html#${name}`]);
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
	return stylusModules.map(module => {
		let contents = readFile(sourcePath(`styles/${module}.styl`));
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
			dashList.push([title.replace('()', ''), 'Mixin', `styles.html#${m[1]}`]);
		}

		// Variable
		m = /^\s*([-\w]+) \??=/m.exec(firstLine);
		if (!title && m) {
			title = m[1];
			dashList.push([title, 'Define', `styles.html#${m[1]}`]);
		}

		// Class
		m = /^\s*(\.[-\w]+)(,| \{)?$/m.exec(firstLine);
		if (!title && m) {
			title = m[1];
			dashList.push([title, 'Style', `styles.html#${m[1]}`]);
		}

		if (title && text) {
			docs.push(`<h3 id="${title}">${title}</h3>\n\n${text}`);
		}
	}
	return docs.join('\n\n');
}

function generateModules() {
	let modules = glob.sync(sourcePath('modules/*'));

	let exampleId = 0;

	return modules.map((folder) => {
		let name = path.basename(folder);
		let moduleDoc = readFile(path.join(folder, 'Readme.md'));

		// Main heading
		moduleDoc = moduleDoc.replace(/^# (.*?)$/gm, (m, title) => {
			dashList.push([title, 'Package', `modules.html#${name}`]);
			return `<h1 id="${name}">${title}</h1>`;
		});

		// Increase headings level
		moduleDoc = moduleDoc.replace(/^#/gm, '##');

		moduleDoc = moduleDoc.replace(/^([#]*) (.*?)$/gm, (m, level, title) => {
			let slug = slugify(title);
			let names = title.split(' / ');
			names.forEach(name => {
				name = name.replace(/\\/g, '');
				let type;
				if (name[0] === '.') {
					type = 'Style';
				}
				else if (/^tamia\./.test(name)) {
					type = 'Event';
				}
				else if (/^data-/.test(name)) {
					type = 'Attribute';
				}
				else if (/_/.test(name)) {
					type = 'Define';
				}
				if (type) {
					dashList.push([name, type, `modules.html#${slug}`]);
				}
			});

			level = level.length - 1;
			return `<h${level} id="${slug}">${title}</h${level}>`;
		});

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

function docsDashIndexDb() {
	let rows = dashList.map(item => ({ name: item[0], type: item[1], path: item[2] }));

	let sequelize = new Sequelize('database', 'username', 'password', {
		dialect: 'sqlite',
		storage: dashPath('Contents/Resources/docSet.dsidx'),
		logging: false,
	});

	let searchIndex = sequelize.define('searchIndex', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: Sequelize.STRING,
		},
		type: {
			type: Sequelize.STRING,
		},
		path: {
			type: Sequelize.STRING,
		},
	}, {
		freezeTableName: true,
		timestamps: false,
	});

	sequelize.sync({ force: true }).then(() => {
		searchIndex.bulkCreate(rows)
			.catch(message => console.log(`Error when saving Dash index: ${message}`))
		;
	});
}
