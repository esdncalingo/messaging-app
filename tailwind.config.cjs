/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-0.7deg)" },
          "50%": { transform: "rotate(0.7deg)" },
        },
        swing: {
          "0%": {
            transform: "translateY(-100px) rotate(-15deg)",
          },
          "100%": {
            transform: "translateY(100px) rotate(15deg)",
          },
        },
        pass: {
          "0%": {
            transform: "translateX(1000%)",
          },
          "100%": {
            transform: "translateX(-1000%)",
          },
        },
        slideDown: {
          "0%": {
            filter: "brightness(1.75);",
            transform: "translateY(-100%)",
          },
          "100%": {
            filter: "brightness(1);",
            transform: "translateY(0%)",
          },
        },
        swipeUp: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "75%": {
            transform: "translateY(10%)",
          },
          "100%": {
            transform: "translateY(0%)",
          },
        },
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        spin: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        wave: {
          "0%": {
            transform: "rotate(-30deg)",
          },
          "100%": {
            transform: "rotate(10deg)",
          },
        },
        point: {
          "0%": {
            transform: "translateY(-20%) scaleX(0.9)",
          },
          "100%": {
            transform: "translateY(0) scaleX(1.1)",
          },
        },
      },
      animation: {
        wiggle: "wiggle 100ms ease-in-out",
        swing: "swing 2s ease-in-out infinite alternate",
        pass: "pass 2s linear infinite normal",
        slideDown: "slideDown 250ms ease-in-out",
        swipeUp: "swipeUp 500ms ease-in-out",
        fadeIn: "fadeIn 500ms ease",
        spin: "spin 2s ease infinite",
        wave: "wave 2s ease infinite alternate",
        point: "point 500ms ease-in infinite alternate",
      },
    },
    plugins: [],
  },
};
