import Head from "next/head";
import SignIn from "./SignIn.view";
import useSignInProps from "./useSignInProps";

const SignInPage = () => {
  const props = useSignInProps();

  return (
    <>
      <Head>
        <title>Sign in - Gitkémon</title>
      </Head>
      <SignIn {...props} />
    </>
  );
};

export default SignInPage;
