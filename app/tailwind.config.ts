import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./sections/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				primary: '#6C61D0',
				textSecondary: '#9C9CB4',
				chartGreen: '#79F785',
				chartBlue: '#3C9DFF',
			},
		},
	},
	plugins: [],
};
export default config;
