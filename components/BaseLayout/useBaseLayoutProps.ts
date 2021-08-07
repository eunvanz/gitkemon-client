import { ReactNode, useCallback } from "react";
import { useRouter } from "next/router";
import api from "../../api";
import useUserQuery from "../../queries/useUserQuery";
import { User } from "../../types";
import { BaseLayoutProps } from "./BaseLayout";

const useBaseLayoutProps: ({
  children,
  user,
}: {
  children: ReactNode;
  user?: User;
}) => BaseLayoutProps = ({ children, user: userProp }) => {
  const { data: user } = useUserQuery({ enabled: false });

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
