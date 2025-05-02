import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { nodeLoaderPlugin } from '@vavite/node-loader/plugin';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [nodeLoaderPlugin(), tailwindcss(), sveltekit()]
});
