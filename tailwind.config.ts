import type { Config } from 'tailwindcss';

import { skeleton, contentPath } from '@skeletonlabs/skeleton/plugin';
import * as themes from '@skeletonlabs/skeleton/themes';
import theme from './theme';

export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		contentPath(import.meta.url, 'svelte')
	],
	darkMode: "class",
	theme: {
		extend: {}
	},

	plugins: [
		skeleton({
			themes: [ theme ]
		})
	]
} satisfies Config;
