/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "bg-deep": "#111827",
        "surface-glass": "rgba(15, 23, 42, 0.7)",
        "panel-glass": "rgba(30, 41, 59, 0.6)",
        "text-main": "#cdd6f4",
        "syntax-purple": "#c792ea",
        "syntax-blue": "#82aaff",
        "syntax-green": "#c3e88d",
        "syntax-yellow": "#ffcb6b",
        "syntax-gray": "#637777",
        "border-glass": "rgba(255, 255, 255, 0.08)",
        "glow-blue": "rgba(59, 130, 246, 0.15)",
        "error-red": "#ff5f57",
        "warn-yellow": "#febc2e",
        "success-green": "#28c840",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      spacing: {
        gutter: "24px",
        "margin-desktop": "40px",
        "container-max": "1280px",
        "margin-mobile": "16px",
        unit: "4px",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
}
