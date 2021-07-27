import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import withAuthServerSideProps from "../hocs/withAuthServerSideProps";
import withBaseLayout from "../hocs/withBaseLayout";

const Home: NextPage<{}> = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      메인화면
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{}> = withAuthServerSideProps<{}>(
  { isAuthRequired: false }
)();

export default withBaseLayout(Home);
