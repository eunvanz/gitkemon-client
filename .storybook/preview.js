import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import "swiper/swiper.scss";
import "../styles/globals.css";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  layout: "fullscreen",
};
