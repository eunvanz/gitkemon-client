import React, { useEffect } from "react";
import qs from "query-string";
import api from "../../api";
import { useRouter } from "next/router";

export interface ExchangeCodePageProps {}

const ExchangeCodePage: React.FC<ExchangeCodePageProps> = ({}) => {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { code } = qs.parse(window.location.search);
      if (!code) {
        router.replace("/");
        return;
      }
      await api.exchangeGithubCode(code as string);
      if (document.referrer.startsWith(window.origin)) {
        router.back();
      } else {
        router.replace("/");
      }
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center text-3xl text-gray-600 font-extrabold">
        <h3>Connecting with Github...</h3>
      </div>
    </div>
  );
};

export default ExchangeCodePage;
