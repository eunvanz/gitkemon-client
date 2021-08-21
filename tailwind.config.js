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
