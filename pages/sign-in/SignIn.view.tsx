import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface SignInProps {
  onSignIn: VoidFunction;
}

const SignIn = ({ onSignIn }: SignInProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-600">
            GITHUB <span className="text-green-600">컨트리뷰션</span>을
            <br /> <span className="text-blue-500">귀여운 포켓몬</span>으로
            보상받으세요
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <button
            onClick={onSignIn}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <FontAwesomeIcon
                className="h-5 w-5 text-gray-400 group-hover:text-gray-200"
                icon={faGithub}
              />
            </span>
            GITHUB 계정으로 로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
