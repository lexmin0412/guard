import { tailwindPreset } from 'paintartisan'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [
    tailwindPreset,
  ],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
  theme: {
    extend: {},
  },
  plugins: [
    
  ],
}

