var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {
	devtool: 'eval',

	entry: './test/specs/specs.js',

	output: {
		path: path.resolve(__dirname, '../test/specs'),
		publicPath: '/build/',
		filename: 'bundle.js',
	},

	resolve: {
		modulesDirectories: [
			path.resolve(__dirname, '../node_modules'),
		],
		extensions: ['', '.js'],
	},

	plugins: [
		new webpack.DefinePlugin({
			DEBUG: JSON.stringify('true'),
		}),
	],

	module: {
		noParse: /\.min\.js/,

		loaders: [
			{
				test: /\.js$/,
				include: [
					path.resolve(__dirname, '../src'),
					path.resolve(__dirname, '../test/specs'),
					path.resolve(__dirname, '../docs_src'),
				],
				loader: 'babel',
			},
			{
				test: /\.styl$/,
				loaders: [
					'style',
					'css',
					'postcss',
					'stylus',
				],
			},
		],
	},

	stylus: {
		define: {
			DEBUG: true,
			embedurl: require('stylus').url(),
		},
	},

	postcss: function() {
		return [
			autoprefixer,
		];
	},
};
