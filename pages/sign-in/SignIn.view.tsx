import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import ROUTES from "../../paths";

export interface SignInProps {
  onSignIn: VoidFunction;
}

const SignIn = ({ onSignIn }: SignInProps) => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl text-gray-600">
            Donate <span className="text-green-600 font-extrabold">Contributions</span>
            <br />
            Get <span className="text-blue-500 font-extrabold">Pokemons</span>
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
            Sign in with Github
          </button>
        </div>
        <div className="text-center">
          <a
            onClick={() => router.replace(ROUTES.HOME)}
            className="text-gray-400 hover:text-gray-600 cursor-pointer text-sm"
          >
            <ArrowLeftIcon className="h-3 w-3 inline mr-1" />
            Give up rewards
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
