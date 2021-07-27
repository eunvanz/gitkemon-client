import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import BaseLayout from "../components/BaseLayout";
import withAuth from "../hocs/withAuth";
import withAuthServerSideProps from "../hocs/withAuthServerSideProps";
import { User } from "../types";

export interface HomeProps {
  user?: User;
}

const Home: NextPage<HomeProps> = ({ user }) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BaseLayout user={user}>메인화면</BaseLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{}> = withAuthServerSideProps<{}>(
  { isAuthRequired: false }
)();

export default withAuth(Home);
