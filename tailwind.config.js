/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: '#90CA4B',
          100: "#32A932"
        },
        gray: {
          DEFAULT: "#6F8293",
          100: "#1A2229BF",
          200: "#DDE0E2",
          300: "#F2F3F4",
          400: "#4E5C68"
        },
        white: {
          DEFAULT: "#FFFFFF",
          100: "#FFFFFFA6"
        },
        red: "#FF5BF7",
        blue: {
          DEFAULT: "#348FE2",
          100: "#49B6D6",
          200: "#00ACAC"
        },
        orange: "#F59C1A",
        yellow: "#FFD900",
        purple: "#8753DE"
      }
    },
  },
  plugins: [],
}
