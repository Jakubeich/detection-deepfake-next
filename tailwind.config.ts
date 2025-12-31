import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "cyber-black": "var(--color-cyber-black)",
        "cyber-dark": "var(--color-cyber-dark)",
        "cyber-gray": "var(--color-cyber-gray)",
        "cyber-light": "var(--color-cyber-light)",
        "neon-red": "var(--color-neon-red)",
        "neon-green": "var(--color-neon-green)",
        "neon-blue": "var(--color-neon-blue)",
        "neon-purple": "var(--color-neon-purple)",
        "neon-yellow": "var(--color-neon-yellow)",
      },
      fontFamily: {
        display: ["Orbitron", "Arial Black", "sans-serif"],
        body: ["JetBrains Mono", "Courier New", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
