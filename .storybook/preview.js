import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import "swiper/swiper.scss";
import "../styles/globals.css";
import "antd/dist/antd.css";
import "react-easy-crop/react-easy-crop.css";
import "react-toastify/dist/ReactToastify.css";

// Storybook executes this module in both bootstrap phase (Node)
// and a story's runtime (browser). However, we cannot call `setupWorker`
// in Node environment, so need to check if we're in a browser.
if (typeof global.process === "undefined") {
  const { worker } = require("../mocks/browser");

  // Start the mocking when each story is loaded.
  // Repetitive calls to the `.start()` method do not register a new worker,
  // but check whether there's an existing once, reusing it, if so.
  worker.start();
}

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
