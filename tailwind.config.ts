import type { Config } from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	daisyui: {
		themes: [
			'cmyk', 'forest'
		],
		darkTheme: ['forest'],
		styled: true,
		base: true,
		utils: true
	}
} satisfies Config;
