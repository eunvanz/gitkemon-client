import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import qs from "query-string";
import { userState } from "../../state/user";
import api from "../../api";

const useExchangeCodeProps: () => void = () => {
  const router = useRouter();

  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    (async () => {
      const { code } = qs.parse(window.location.search);
      if (!code) {
        router.replace("/");
        return;
      }
      const user = await api.exchangeGithubCode(code as string);
      setUser(user);
      if (document.referrer.startsWith(window.origin)) {
        router.back();
      } else {
        router.replace("/");
      }
    })();
    // eslint-disable-next-line
  }, []);
};

export default useExchangeCodeProps;
