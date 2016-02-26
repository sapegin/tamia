var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var baseConfig = require('./webpack.config');


module.exports = merge.smart(baseConfig, {
	devtool: false,

	entry: './docs_src/docs.js',

	output: {
		path: path.resolve(__dirname, '../docs'),
		publicPath: '/build/',
		filename: 'bundle.js',
	},

	module: {
		loaders: [
			{
				test: /\.styl$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!stylus-loader'),
			},
		],
	},

	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: false,
			compress: {
				warnings: false,
			},
		}),
		new ExtractTextPlugin('styles.css'),
	],
});
