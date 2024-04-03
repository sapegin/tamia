/** @type {import("prettier").Config} */
module.exports = {
	useTabs: true,
	singleQuote: true,
	trailingComma: 'es5',
	plugins: [require.resolve('prettier-plugin-astro')],
	overrides: [
		{
			files: '*.md',
			options: {
				arrowParens: 'avoid',
				printWidth: 70,
				proseWrap: 'never',
				trailingComma: 'none',
				useTabs: false,
			},
		},
		{
			files: '*.{json,babelrc,eslintrc,remarkrc,prettierrc}',
			options: {
				useTabs: false,
			},
		},
		{
			files: '*.astro',
			options: {
				parser: 'astro',
			},
		},
	],
};
