import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { nodeLoaderPlugin } from '@vavite/node-loader/plugin';
import tailwindcss from "@tailwindcss/vite";
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
	plugins: [
		nodeLoaderPlugin(), 
		tailwindcss(), 
		sveltekit(),
		Icons({
			compiler: 'svelte',
		}),
	]
	
});
