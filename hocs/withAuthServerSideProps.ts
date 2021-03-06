import { GetServerSidePropsContext } from "next";
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
  ) => Promise<
    { props?: T } | { redirect: { destination: string; permanent: boolean } } | undefined
  >,
) => {
  return async (ctx: GetServerSidePropsContext) => {
    const accessToken = ctx.req.cookies[process.env.ACCESS_TOKEN_COOKIE_NAME as string];
    let user = null;
    if (accessToken) {
      user = await api.loginWithToken(accessToken);
    }
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
          // @ts-ignore
          ...(await getServerSidePropsFunc(ctx, user))?.props,
        },
      };
    }
    return { props: { user } };
  };
};

export default withAuthServerSideProps;
