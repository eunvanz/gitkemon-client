import { config } from "@fortawesome/fontawesome-svg-core";
import { random } from "lodash";
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

const images = [
  "https://storage.googleapis.com/gitkemon.appspot.com/mon-images/mon_4_밥밥이_1628354906313.png",
  "https://storage.googleapis.com/gitkemon.appspot.com/mon-images/mon_1_웅이_1628398611186.png",
  "https://storage.googleapis.com/gitkemon.appspot.com/mon-images/mon_25_날지못하는새_1632043389835.png",
  "https://storage.googleapis.com/gitkemon.appspot.com/mon-images/mon_91_밥밥이_1629640220468.png",
  "https://storage.googleapis.com/gitkemon.appspot.com/mon-images/mon_172_련찌_1629298428532.png",
  "https://storage.googleapis.com/gitkemon.appspot.com/mon-images/mon_209_anonymous_1630336218244.png",
  "https://storage.googleapis.com/gitkemon.appspot.com/mon-images/mon_258_이론맛치즈쿠키_1630336031788.png",
  "https://storage.googleapis.com/gitkemon.appspot.com/mon-images/mon_674_나무판_1630337529596.png",
  "https://storage.googleapis.com/gitkemon.appspot.com/mon-images/painting_94_이론맛치즈쿠키_1630930675273.png",
  "https://storage.googleapis.com/gitkemon.appspot.com/mon-images/mon_133_웅이_1629455901824.png",
  "https://storage.googleapis.com/gitkemon.appspot.com/mon-images/mon_130_레옹엄마_1629455468665.png",
  "https://storage.googleapis.com/gitkemon.appspot.com/mon-images/mon_557_나랏님말씀_1630336392146.png",
  "https://storage.googleapis.com/gitkemon.appspot.com/mon-images/mon_621_로코_1630337176315.png",
];

const image = images[random(0, images.length - 1)];

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
        <meta property="og:image" content={image} />
        <meta property="og:image:url" content={image} />
        <meta property="og:image:secure_url" content={image} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="250" />
        <meta property="og:image:height" content="250" />
        <link rel="icon" href="/favicon.ico" />
        <title>Gitkémon</title>
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
