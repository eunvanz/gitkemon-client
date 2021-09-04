import { useRouter } from "next/router";
import Button from "~/components/Button";
import ROUTES from "~/paths";

export interface ErrorProps {
  code: string;
  title: string;
  description: string;
  canRetry?: boolean;
}

const Error: React.FC<ErrorProps> = ({ code, title, description, canRetry }) => {
  const router = useRouter();

  return (
    <div className="bg-white min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          <p className="text-4xl font-extrabold text-blue-500 sm:text-5xl">{code}</p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                {title}
              </h1>
              <p className="mt-1 text-base text-gray-500">{description}</p>
            </div>
            <div className="mt-10 flex space-x-3 sm:pl-6">
              <Button size="xl" color="white" onClick={() => router.push(ROUTES.HOME)}>
                Go back home
              </Button>
              {canRetry && (
                <Button size="xl" color="white" className="ml-4" onClick={router.back}>
                  Retry
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Error;
