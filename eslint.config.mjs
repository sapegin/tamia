import tamiaTypeScriptReact from 'eslint-config-tamia/typescript-react';
import eslintPluginAstro from 'eslint-plugin-astro';

export default [
	...tamiaTypeScriptReact,
	...eslintPluginAstro.configs.recommended,
	{
		files: ['**/*.astro'],
		rules: {
			// Stop linter from replacing `class` with `className`
			'react/no-unknown-property': 'off',
		},
	},
	{
		files: ['src/env.d.ts'],
		rules: {
			'@typescript-eslint/triple-slash-reference': 'off',
		},
	},
	{
		ignores: [
			'.astro/',
			'lib/',
			'dist/',
			'styled-system/',
			'styled-system-studio/',
		],
	},
];
