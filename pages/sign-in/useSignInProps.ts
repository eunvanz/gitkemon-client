import { useCallback } from "react";
import { signInWithGithub } from "~/helpers/projectHelpers";
import { SignInProps } from "./SignIn.view";

const useSignInProps: () => SignInProps = () => {
  const onSignIn = useCallback(() => {
    signInWithGithub();
  }, []);

  return {
    onSignIn,
  };
};

export default useSignInProps;
