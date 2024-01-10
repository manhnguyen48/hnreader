import type { Config } from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	daisyui: {
		themes: [
			'light',
			'dark',
			'cyberpunk',
			'valentine',
			'retro',
			'forest',
			'sunset',
			'cmyk',
			'pastel',
			'black', 
		],
		darkTheme: ['dark', 'forest', 'sunset', 'black'],
		styled: true,
		base: true,
		utils: true
	}
} satisfies Config;
