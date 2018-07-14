const path = require('path');
const { createConfig, match, css, babel, resolve } = require('webpack-blocks');

module.exports = createConfig([
	css(),
	match(
		['*.js'],
		{
			include: [
				path.resolve(__dirname, 'src'),
				path.resolve(__dirname, 'styleguide'),
			],
		},
		[babel()]
	),
	resolve({
		alias: {
			// react: 'preact-compat',
			// 'react-dom': 'preact-compat',
			'tamia-theme': path.resolve(__dirname, 'theme.js'),
		},
	}),
]);
