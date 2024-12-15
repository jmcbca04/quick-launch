/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "primary": "#f5f5f5",        // Light gray
          "primary-focus": "#e5e5e5",  // Slightly darker gray
          "primary-content": "#171717", // Near black
          "base-100": "#171717",       // Near black background
          "base-200": "#262626",       // Dark gray background
          "base-300": "#404040",       // Medium gray
          "base-content": "#f5f5f5",   // Light gray text
        },
      },
    ],
  },
};
