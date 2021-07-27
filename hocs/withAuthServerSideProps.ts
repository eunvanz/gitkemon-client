import { GetServerSidePropsContext } from "next";
import api from "../api";
import ROUTES from "../paths";
import { User } from "../types";

const withAuthServerSideProps = <T>(
  isAuthRequired?: boolean,
  getServerSidePropsFunc?: (
    ctx: GetServerSidePropsContext,
    user?: User
  ) => Promise<{ props: T }>
) => {
  return async (ctx: GetServerSidePropsContext) => {
    const user = await api.loginWithToken(ctx.req.cookies.gkmat);
    if (!user && isAuthRequired) {
      ctx.res.writeHead(302, {
        Location: ROUTES.SIGN_IN,
      });
      ctx.res.end();
    }
    if (getServerSidePropsFunc) {
      return { props: { user, data: await getServerSidePropsFunc(ctx, user) } };
    }
    return { props: { user, data: { props: {} } } };
  };
};

export default withAuthServerSideProps;
