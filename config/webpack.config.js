var path = require('path');

module.exports = {
	devtool: 'cheap-module-source-map',

	entry: [
		'./specs/specs.js',
	],

	output: {
		path: path.resolve(__dirname, '../specs'),
		publicPath: '/build/',
		filename: 'bundle.js',
	},

	resolve: {
		modulesDirectories: [
			path.resolve(__dirname, '../node_modules'),
		],
		extensions: ['', '.js', '.jsx', '.scss'],
	},

	plugins: [
	],

	module: {
		noParse: /\.min\.js/,

		loaders: [
			{
				test: /\.js$/,
				include: [
					path.resolve(__dirname, '../src'),
					path.resolve(__dirname, '../specs'),
				],
				loader: 'babel',
			},
		],
	},
};
