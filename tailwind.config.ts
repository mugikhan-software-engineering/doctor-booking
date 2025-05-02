import { join } from 'path';
import type { Config } from 'tailwindcss';
import { skeleton } from '@skeletonlabs/tw-plugin';
import forms from '@tailwindcss/forms';
import { doctorTheme } from './theme';
import defaultTheme from 'tailwindcss/defaultTheme';

const config = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Monsterrat', ...defaultTheme.fontFamily.sans]
			},
			screens: {
				xxs: { max: '290px' },
				xs: { max: '639px' }
			}
		}
	},
	plugins: [
		forms,
	]
} satisfies Config;

export default config;
