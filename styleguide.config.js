const path = require('path');

const file = filepath => path.join(__dirname, filepath);

module.exports = {
	title: 'Tâmia',
	propsParser: require('react-docgen-typescript').withCustomConfig(
		file('tsconfig.json')
		// {
		// 	componentNameResolver: (exp, source) =>
		// 		// exp.getName() === 'StyledComponentClass' &&
		// 		require('react-docgen-typescript').getDefaultExportForFile(source),
		// }
	).parse,
	assetsDir: path.resolve(__dirname, 'styleguide/assets'),
	styleguideDir: path.resolve(__dirname, 'styleguide/public'),
	template: {
		favicon: '/tamia/favicon.ico',
	},
	getComponentPathLine(componentPath) {
		const name = path.basename(componentPath, '.tsx');
		return `import { ${name} } from 'tamia';`;
	},
	styleguideComponents: {
		Wrapper: file('styleguide/Provider.tsx'),
	},
	skipComponentsWithoutExample: true,
	sections: [
		{
			name: 'Introduction',
			content: 'Readme.md',
		},
		{
			name: 'Components',
			components: 'src/components/*.tsx',
		},
	],
	ribbon: {
		url: 'https://github.com/tamiadev/tamia/',
	},
};
