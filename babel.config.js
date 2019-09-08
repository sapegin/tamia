/* eslint-disable */
module.exports = {
	presets: ['@babel/typescript', '@babel/env', '@babel/react'],
	plugins: ['@babel/plugin-proposal-class-properties'],
	env: {
		esm: {
			presets: [
				'@babel/typescript',
				[
					'@babel/env',
					{
						modules: false,
					},
				],
				'@babel/react',
			],
		},
	},
};
