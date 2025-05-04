import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { nodeLoaderPlugin } from '@vavite/node-loader/plugin';
import tailwindcss from "@tailwindcss/vite";
import Icons from 'unplugin-icons/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';


export default defineConfig({
	plugins: [
		nodeLoaderPlugin(), 
		tailwindcss(), 
		enhancedImages(),
		sveltekit(),
		Icons({
			compiler: 'svelte',
		}),
	]
	
});
