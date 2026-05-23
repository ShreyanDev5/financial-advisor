import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  safelist: [
    "from-emerald-600",
    "to-green-600",
    "from-blue-600",
    "to-purple-600",
    "from-orange-500",
    "to-yellow-500",
    "from-purple-500",
    "to-violet-500",
    "bg-teal-50/50",
    "bg-emerald-50/50",
    "bg-blue-50/50",
    "bg-purple-50/50",
    "bg-blue-500",
    "border-blue-600",
    "border-blue-200",
    "bg-blue-50",
    "text-blue-700",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        green: {
          DEFAULT: "#22c55e",
          foreground: "#ffffff",
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      animation: {
        "accordion-down": "accordion-down 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "accordion-up": "accordion-up 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "infinite-scroll": "infinite-scroll 25s linear infinite",
        "pulse-slow": "pulse-slow 12s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        }
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config