import { join } from 'path';
import type { Config } from 'tailwindcss';
import { skeleton } from '@skeletonlabs/tw-plugin';
import forms from '@tailwindcss/forms';
import { doctorTheme } from './theme';

const config = {
	// 1. Apply the dark mode class setting:
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 2. Append the path for the Skeleton NPM package and files:
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Monsterrat', 'sans-serif']
			},
			screens: {
				xs: { max: '639px' }
			}
		}
	},
	plugins: [
		forms,
		skeleton({
			themes: { custom: [doctorTheme] }
		})
	]
} satisfies Config;

export default config;
