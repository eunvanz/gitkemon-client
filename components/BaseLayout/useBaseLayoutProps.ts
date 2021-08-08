import { ReactNode, useCallback } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import api from "../../api";
import { userState } from "../../state/user";
import { User } from "../../types";
import { BaseLayoutProps } from "./BaseLayout";

const useBaseLayoutProps: ({
  children,
  user,
}: {
  children: ReactNode;
  user?: User;
}) => BaseLayoutProps = ({ children, user: userProp }) => {
  const user = useRecoilValue(userState);

  const router = useRouter();

  const onSignOut = useCallback(async () => {
    await api.logout();
    router.reload();
  }, [router]);

  return {
    user: user || userProp,
    children,
    onSignOut,
  };
};

export default useBaseLayoutProps;
