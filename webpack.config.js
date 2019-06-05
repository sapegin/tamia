module.exports = {
	module: {
		rules: [
			{
				test: /\.(js|tsx?)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
		],
	},
};
