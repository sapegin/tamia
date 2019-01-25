const path = require('path');

module.exports = {
	resolve: {
		alias: {
			'tamia-theme': path.resolve(__dirname, 'theme.js'),
		},
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
		],
	},
};
