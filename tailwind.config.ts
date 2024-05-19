import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		fontFamily: {
			sans: "var(--font-montserrat)",
		},
		extend: {
			colors: {
				blue: {
					1000: "#1E2733",
					1200: "#151F2B",
				},
				orange: { 450: "#FE8A00" },
				neutral: { 450: "#CFCFCF" },
				gray: { 850: "#D9D9D90D" },
			},
			fontSize: {
				"2xs": ["12px", "14.63px"],
				"2lg": ["21.52px", "26.23px"],
			},
			spacing: {
				85: "22rem",
			},
		},
	},
	plugins: [],
};
export default config;
