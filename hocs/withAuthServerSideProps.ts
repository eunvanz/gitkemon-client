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
    user?: User
  ) => Promise<{ props: T }>
) => {
  return async (ctx: GetServerSidePropsContext) => {
    const user = await api.loginWithToken(ctx.req.cookies.gkmat);
    if (!user && isAuthRequired) {
      // ctx.res.writeHead(302, {
      //   Location: ROUTES.SIGN_IN,
      // });
      // ctx.res.end();
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
