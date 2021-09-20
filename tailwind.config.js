const colors = require("tailwindcss/colors");
const defaultConfig = require("tailwindcss/defaultConfig");

module.exports = {
  purge: {
    content: ["./**/*.tsx"],
    safelist: [
      "text-blue-400",
      "text-purple-400",
      "text-red-400",
      "text-orange-400",
      "text-amber-400",
      "text-yellow-400",
      "text-lime-400",
      "text-green-400",
      "text-sky-400",
      "text-blue-500",
      "text-gray-500",
      "text-red-500",
      "text-green-500",
      "text-amber-500",
      "text-blue-700",
      "text-green-700",
      "text-yellow-700",
      "text-red-700",
      "text-blue-800",
      "text-purple-800",
      "text-red-800",
      "text-orange-800",
      "text-amber-800",
      "text-yellow-800",
      "text-lime-800",
      "text-green-800",
      "text-sky-800",
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
      "h-2",
      "bg-green-50",
      "bg-blue-50",
      "bg-yellow-50",
      "bg-red-50",
      "bg-blue-400",
      "bg-yellow-400",
      "bg-green-400",
      "bg-sky-400",
      "bg-purple-400",
      "bg-pink-400",
      "bg-orange-400",
      "bg-indigo-400",
      "bg-amber-500",
      "bg-blue-500",
      "bg-blue-100",
      "bg-purple-100",
      "bg-red-100",
      "bg-orange-100",
      "bg-amber-100",
      "bg-yellow-100",
      "bg-lime-100",
      "bg-green-100",
      "bg-sky-100",
      "w-1/3",
      "sm:w-1/4",
      "lg:w-1/6",
      "xl:w-1/8",
      "opacity-0",
      "opacity-5",
      "opacity-10",
      "opacity-15",
      "opacity-20",
      "opacity-25",
      "opacity-30",
      "opacity-35",
      "opacity-40",
      "opacity-45",
      "opacity-50",
      "opacity-55",
      "opacity-60",
      "opacity-65",
      "opacity-70",
      "opacity-75",
      "opacity-80",
      "opacity-85",
      "opacity-90",
      "opacity-95",
      "opacity-100",
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
