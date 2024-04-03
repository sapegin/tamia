import react from '@astrojs/react';
import studio from '@pandacss/astro-plugin-studio';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	integrations: [react(), studio()],
});
