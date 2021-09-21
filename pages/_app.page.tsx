import { config } from "@fortawesome/fontawesome-svg-core";
import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";
import TopProgressBarContainer from "~/components/TopProgressBar";
import { colorHashes } from "../constants/styles";
import queryClient from "../helpers/queryClient";
import "../styles/globals.css";
import "../styles/react-easy-crop.css";
import "../styles/slider.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "antd/dist/antd.css";
import "react-markdown-editor-lite/lib/index.css";
import "react-toastify/dist/ReactToastify.css";

config.autoAddCss = false;

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  import("../mocks");
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,user-scalable=no"
        />
        <meta charSet="utf-8" />
        <meta property="og:url" content="https://gitkemon.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Gitkémon" />
        <meta
          property="og:description"
          content="Get Pokémons as payback for Github contributions"
        />
        <meta
          property="og:image"
          content="https://storage.googleapis.com/gitkemon.appspot.com/mon-images/mon_4_밥밥이_1628354906313.png"
        />
        <meta
          property="og:image:url"
          content="https://storage.googleapis.com/gitkemon.appspot.com/mon-images/mon_4_밥밥이_1628354906313.png"
        />
        <meta
          property="og:image:secure_url"
          content="https://storage.googleapis.com/gitkemon.appspot.com/mon-images/mon_4_밥밥이_1628354906313.png"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="250" />
        <meta property="og:image:height" content="250" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ToastContainer
            position="bottom-right"
            newestOnTop
            progressStyle={{ backgroundColor: colorHashes.WATER }}
          />
          <TopProgressBarContainer />
          <Component {...pageProps} />
        </RecoilRoot>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
export default MyApp;
