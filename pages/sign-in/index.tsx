import { useCallback } from "react";

export interface SignInViewProps {}

const SignInView = ({}: SignInViewProps) => {
  const signIn = useCallback(() => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
    );
  }, []);

  return (
    <>
      <button onClick={signIn}>Sign in with Github</button>
    </>
  );
};

export default SignInView;
