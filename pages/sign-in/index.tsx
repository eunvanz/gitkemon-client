import { useCallback } from "react";
import qs from "query-string";
import ROUTES from "../../paths";

export interface SignInPageProps {}

const SignInPage = ({}: SignInPageProps) => {
  const signIn = useCallback(() => {
    const query = {
      client_id: process.env.GITHUB_CLIENT_ID,
      redirect_uri: `${window.origin}${ROUTES.EXCHANGE_CODE}`,
    };
    window.location.replace(
      `https://github.com/login/oauth/authorize?${qs.stringify(query)}`
    );
  }, []);

  return (
    <>
      <button onClick={signIn}>Sign in with Github</button>
    </>
  );
};

export default SignInPage;
