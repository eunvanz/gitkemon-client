import { config } from "@fortawesome/fontawesome-svg-core";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";
import queryClient from "../helpers/queryClient";
import "../styles/globals.css";
import "../styles/slider.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ToastContainer position="bottom-center" newestOnTop />
        <Component {...pageProps} />
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default MyApp;
