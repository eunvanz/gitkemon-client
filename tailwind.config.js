const colors = require("tailwindcss/colors");
const defaultConfig = require("tailwindcss/defaultConfig");

module.exports = {
  purge: {
    content: ["./**/*.tsx"],
    safelist: [
      "text-blue-500",
      "text-gray-500",
      "text-red-500",
      "text-green-500",
      "text-xxs",
      "text-xs",
      "text-sm",
      "text-base",
      "text-lg",
      "text-xl",
      "text-2xl",
      "text-3xl",
      "text-4xl",
      "text-5xl",
      "font-thin",
      "font-extralight",
      "font-light",
      "font-normal",
      "font-medium",
      "font-semibold",
      "font-bold",
      "font-extrabold",
      "font-black",
      "hover:bg-blue-500",
      "hover:bg-blue-400",
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      ...defaultConfig.theme.fontSize,
      xxs: ".5rem",
    },
    colors: {
      ...colors,
    },
    extend: {
      width: {
        "1/5": "20%",
        "1/8": "12.5%",
      },
      height: {
        98: "25rem",
      },
      opacity: {
        15: ".15",
        35: ".35",
        45: ".45",
        55: ".55",
        65: ".65",
        85: ".85",
      },
      cursor: {
        grab: "grab",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
  corePlugins: {
    ringWith: false,
  },
};
