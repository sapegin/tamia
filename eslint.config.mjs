import tamiaTypeScriptReact from 'eslint-config-tamia/typescript-react';
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss';

export default [
	...tamiaTypeScriptReact,
	{
		...eslintPluginBetterTailwindcss.configs.recommended,
		files: ['src/**/*.{ts,tsx}'],
		settings: {
			'better-tailwindcss': {
				entryPoint: 'index.css',
			},
		},
	},
	{
		ignores: ['dist/'],
	},
];
