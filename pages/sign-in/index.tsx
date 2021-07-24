import SignIn from "./SignIn.view";
import useSignInProps from "./useSignInProps";

const SignInPage = () => {
  const props = useSignInProps();

  return <SignIn {...props} />;
};

export default SignInPage;
