import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-gradient": "radial-gradient(circle at top, rgba(99,102,241,0.25), transparent 45%), radial-gradient(circle at 80% 20%, rgba(251,191,36,0.2), transparent 35%), linear-gradient(180deg, #0b1020, #0a0d18 55%, #070b14)"
      },
      boxShadow: {
        glass: "0 12px 30px rgba(15, 23, 42, 0.45)",
        glow: "0 0 0 1px rgba(255,255,255,0.08), 0 10px 50px rgba(56, 189, 248, 0.2)"
      },
      colors: {
        surface: "rgba(15,23,42,0.55)"
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        fadeIn: "fadeIn .45s ease-out"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" }
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
