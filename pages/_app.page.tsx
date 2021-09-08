import { useEffect, useState } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
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
import "react-toastify/dist/ReactToastify.css";

config.autoAddCss = false;

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  import("../mocks");
}

function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
    };
    const handleStop = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router, setIsLoading]);

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ToastContainer
          position="bottom-right"
          newestOnTop
          progressStyle={{ backgroundColor: colorHashes.WATER }}
        />
        <TopProgressBarContainer isAnimating={isLoading} />
        <Component {...pageProps} />
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default MyApp;
