import { config } from "@fortawesome/fontawesome-svg-core";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";
import queryClient from "../helpers/queryClient";
import "swiper/swiper.scss";
import "../styles/globals.css";
import "../styles/slider.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "antd/dist/antd.css";

// import "antd/dist/antd.css";

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default MyApp;
