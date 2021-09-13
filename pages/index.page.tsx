import { GetServerSideProps, NextPage } from "next";
import { User } from "~/types";
import withAuthServerSideProps from "../hocs/withAuthServerSideProps";
import withBaseLayout from "../hocs/withBaseLayout";
import Home from "./Home.view";
import useHomeProps from "./useHomeProps";

export interface HomePageProps {
  user?: User;
}

const HomePage: NextPage<HomePageProps> = (pageProps: HomePageProps) => {
  const props = useHomeProps(pageProps);

  return <Home {...props} />;
};

export const getServerSideProps: GetServerSideProps<{}> = withAuthServerSideProps({
  isAuthRequired: false,
})(async (_ctx, user) => {
  return {
    props: {
      user,
    },
  };
});

export default withBaseLayout(HomePage);
