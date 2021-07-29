import { config } from "@fortawesome/fontawesome-svg-core";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />;
    </RecoilRoot>
  );
}
export default MyApp;
