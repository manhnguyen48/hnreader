import type { Config } from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
	],
	plugins: [require("@tailwindcss/typography"), require('daisyui')],
	daisyui: {
		themes: [
			'light',
			'dark',
			'emerald',
			'cyberpunk',
			'valentine',
			'retro',
			'garden',
			'forest',
			'aqua',
			'winter',
			'sunset', 
			'cmyk', 
			'pastel', 
			'synthwave'
		]
	}
} satisfies Config;
