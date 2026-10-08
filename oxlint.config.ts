import { defineConfig } from 'oxlint';
import typescriptReactTailwind from 'oxlint-config-raccoon/typescript-react-tailwind';

export default defineConfig({
	extends: [typescriptReactTailwind],
	options: { typeAware: true, typeCheck: true },
	settings: {
		tailwindcss: {
			entryPoint: 'index.css',
		},
	},
	ignorePatterns: ['dist/'],
});
