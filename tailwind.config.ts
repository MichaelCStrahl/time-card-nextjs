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
			},
		},
	},
	plugins: [],
};
export default config;
