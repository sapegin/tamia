const path = require('path');
module.exports = {
	title: 'Tâmia',
	assetsDir: path.resolve(__dirname, 'styleguide/assets'),
	styleguideDir: path.resolve(__dirname, 'styleguide/public'),
	template: {
		favicon: '/tamia/favicon.ico',
	},
	getComponentPathLine(componentPath) {
		const name = path.basename(componentPath, '.js');
		return `import { ${name} } from 'tamia';`;
	},
	styleguideComponents: {
		// StyleGuideRenderer: path.join(__dirname, 'styleguide/StyleGuide.js'),
		Wrapper: path.join(__dirname, 'styleguide/Provider.js'),
	},
	require: [path.join(__dirname, 'styleguide/styleguide.js')],
	skipComponentsWithoutExample: true,
	sections: [
		{
			name: 'Introduction',
			content: 'Readme.md',
		},
		{
			name: 'Components',
			components: 'src/components/*.js',
		},
	],
};
