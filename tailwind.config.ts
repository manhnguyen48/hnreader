import type { Config } from 'tailwindcss';

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
			'sunset'
		]
	}
} satisfies Config;
