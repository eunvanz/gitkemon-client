import { useEffect } from "react";
import { useRouter } from "next/router";
import qs from "query-string";
import { useSetRecoilState } from "recoil";
import api from "~/api";
import ROUTES from "~/paths";
import { userState } from "~/state/user";

const useExchangeCodeProps: () => void = () => {
  const router = useRouter();

  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    (async () => {
      const { code } = qs.parse(window.location.search);
      if (!code) {
        router.replace(ROUTES.HOME);
        return;
      }
      const user = await api.exchangeGithubCode(code as string);
      setUser(user);
      router.replace(ROUTES.HOME);
    })();
    // eslint-disable-next-line
  }, []);
};

export default useExchangeCodeProps;
