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
  }, [router]);

  return <></>;
};

export default ExchangeCodePage;
