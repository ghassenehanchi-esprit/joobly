import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./lib/components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				primary: {
					DEFAULT: "#009c77",
					dark: "#006c53",
				},
				secondary: {
					DEFAULT: "#c5f06d",
					light: "#c5f06d26",
				},
				geryButtonTex: "#848fac",
				required: "#e04f33",
				dark: "#1d2124",
				grey: {
					dark: "#4a4a4a",
					medium: "#7f879e",
					light: {
						DEFAULT: "#f3f3f3",
						helpIcon: "#bdc3c3",
					},
				},
				baseBlack50: "#b8b9b9",
				light: "#fff",
				greyButtonBorder: "#dfe8f6",
				inputBg: "#f6f8f9",
				borderGradient: "#c7ff47",
				linearGradient: "#e5ebf5",
			},
		},
	},
	plugins: [],
};
export default config;
