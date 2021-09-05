import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import api from "~/api";
import { Mon, Pageable, Painting, Payback } from "~/types";
import withAuthServerSideProps from "../hocs/withAuthServerSideProps";
import withBaseLayout from "../hocs/withBaseLayout";
import Home from "./Home.view";
import useHomeProps from "./useHomeProps";

export interface HomePageProps {
  ssrNewMons: Mon[];
  ssrNewPaintingList: Pageable<Painting>;
  ssrLastPayback?: Payback;
  ssrAvailableContributions?: number;
}

const HomePage: NextPage<HomePageProps> = (pageProps) => {
  const props = useHomeProps(pageProps);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home {...props} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{}> = withAuthServerSideProps<{}>({
  isAuthRequired: false,
})(async (ctx, user) => {
  const accessToken = ctx.req.cookies[process.env.ACCESS_TOKEN_HEADER_NAME as string];
  const [
    ssrNewMons,
    ssrNewPaintingList,
    ssrLastPayback,
    ssrAvailableContributions,
  ] = await Promise.all([
    api.getRecentMons(),
    api.getPaintingList({ page: 1, limit: 3 }),
    user ? api.getLastPayback(accessToken) : undefined,
    user ? api.getAvailableContributions(accessToken) : undefined,
  ]);
  return {
    props: {
      ssrNewMons,
      ssrNewPaintingList,
      ssrLastPayback,
      ssrAvailableContributions,
    },
  };
});

export default withBaseLayout(HomePage);
