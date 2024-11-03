import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./lib/components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			screens: {
				xs: "320px",
				sm: "375px",
				sml: "500px",
				md: "667px",
				mdl: "768px",
				lg: "960px",
				lgl: "1024px",
				xl: "1280px",
				"2x1": "1400px",
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
