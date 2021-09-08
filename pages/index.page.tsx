import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Mon, Pageable, Painting, Payback, RareNews } from "~/types";
import withAuthServerSideProps from "../hocs/withAuthServerSideProps";
import withBaseLayout from "../hocs/withBaseLayout";
import Home from "./Home.view";
import useHomeProps from "./useHomeProps";

export interface HomePageProps {
  ssrNewMons: Mon[];
  ssrNewPaintingList: Pageable<Painting>;
  ssrLastPayback?: Payback;
  ssrAvailableContributions?: number;
  ssrRareNews: RareNews[];
}

const HomePage: NextPage<HomePageProps> = () => {
  const props = useHomeProps();

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

export const getServerSideProps: GetServerSideProps<{}> = withAuthServerSideProps({
  isAuthRequired: false,
})();

export default withBaseLayout(HomePage);
