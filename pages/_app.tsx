import { config } from "@fortawesome/fontawesome-svg-core";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";
import queryClient from "../helpers/queryClient";
import { PageWithLayout } from "../types";
import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

type Props = AppProps & {
  Component: PageWithLayout;
};

function MyApp({ Component, pageProps }: Props) {
  const Layout = Component.layout || (({ children }) => children);

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />;
        </Layout>
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default MyApp;
