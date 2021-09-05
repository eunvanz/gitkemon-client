import { GetServerSidePropsContext } from "next";
import cookies from "next-cookies";
import api from "../api";
import ROUTES from "../paths";
import { User } from "../types";

export interface WithAuthServerSidePropsOptions {
  isAuthRequired: boolean;
}

const withAuthServerSideProps = <T>({
  isAuthRequired,
}: WithAuthServerSidePropsOptions) => (
  getServerSidePropsFunc?: (
    ctx: GetServerSidePropsContext,
    user: User | null,
  ) => Promise<{ props: T } | { redirect: { destination: string; permanent: boolean } }>,
) => {
  return async (ctx: GetServerSidePropsContext) => {
    const accessToken = cookies(ctx)[process.env.ACCESS_TOKEN_HEADER_NAME as string];
    const user = await api.loginWithToken(accessToken);
    if (!user && isAuthRequired) {
      return {
        redirect: {
          destination: ROUTES.SIGN_IN,
          permanent: false,
        },
      };
    }
    if (getServerSidePropsFunc) {
      return {
        props: {
          user,
          data: { user, ...(await getServerSidePropsFunc(ctx, user)) },
        },
      };
    }
    return { props: { user, data: { props: { user } } } };
  };
};

export default withAuthServerSideProps;
