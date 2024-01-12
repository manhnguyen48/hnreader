import type { Config } from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	theme: {
		extend: {
			fontFamily: { sans: ['Inter Tight', 'sans serif'], mono: ['Spline Sans Mono', 'mono'] }
		}
	},
	daisyui: {
		themes: ['cmyk', 'forest'],
		darkTheme: ['forest'],
		styled: true,
		base: true,
		utils: true
	}
} satisfies Config;
