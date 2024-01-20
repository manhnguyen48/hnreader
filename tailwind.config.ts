import type { Config } from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter Tight', 'ui-sans-serif', 'sans-serif', 'system-ui'],
				mono: ['Spline Sans Mono', 'ui-monospace', 'monospace']
			}
		}
	},
	daisyui: {
		themes: ['retro', 'black'],
		darkTheme: ['black'],
		styled: true,
		base: true,
		utils: true
	}
} satisfies Config;
