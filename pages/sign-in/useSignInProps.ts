import { useCallback } from "react";
import qs from "query-string";
import ROUTES from "../../paths";
import { SignInProps } from "./SignIn.view";

const useSignInProps: () => SignInProps = () => {
  const onSignIn = useCallback(() => {
    const query = {
      client_id: process.env.GITHUB_CLIENT_ID,
      redirect_uri: `${window.origin}${ROUTES.EXCHANGE_CODE}`,
    };
    window.location.replace(
      `https://github.com/login/oauth/authorize?${qs.stringify(query)}`,
    );
  }, []);

  return {
    onSignIn,
  };
};

export default useSignInProps;
