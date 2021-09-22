import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { signInWithGithub } from "~/helpers/projectHelpers";
import ROUTES from "~/paths";
import { userState } from "~/state/user";
import { SignInProps } from "./SignIn.view";

const useSignInProps: () => SignInProps = () => {
  const onSignIn = useCallback(() => {
    signInWithGithub();
  }, []);

  const user = useRecoilValue(userState);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace(ROUTES.HOME);
    }
  }, [router, user]);

  return {
    onSignIn,
  };
};

export default useSignInProps;
