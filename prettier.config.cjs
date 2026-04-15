/** @type {import("prettier").Config} */
module.exports = {
	useTabs: true,
	singleQuote: true,
	trailingComma: 'es5',
	overrides: [
		{
			files: '*.md',
			options: {
				arrowParens: 'avoid',
				printWidth: 70,
				proseWrap: 'preserve',
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
	],
};
