const colors = require("tailwindcss/colors");
const defaultConfig = require("tailwindcss/defaultConfig");

module.exports = {
  purge: [],
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
