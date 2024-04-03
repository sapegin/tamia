import { defineConfig } from '@pandacss/dev';
import tamia from './src/panda-preset';
import { theme } from './src/panda-preset/theme';

export default defineConfig({
	...theme,

	presets: [tamia],

	// Opt out of all default
	eject: true,

	// Output directory
	outdir: 'styled-system',

	// Generate React components based on patterns
	jsxFramework: 'react',

	// Don't include CSS reset
	preflight: false,

	// Where to look for CSS declarations
	include: ['./src/**/*.{js,jsx,ts,tsx,astro}'],

	// Files to exclude
	exclude: [],
});
