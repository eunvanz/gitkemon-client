import { ReactNode, useCallback } from "react";
import { useRecoilState } from "recoil";
import api from "../../api";
import { userState } from "../../state/user";
import { BaseLayoutProps } from "./BaseLayout";

const useBaseLayoutProps: ({
  children,
}: {
  children: ReactNode;
}) => BaseLayoutProps = ({ children }) => {
  const [user, setUser] = useRecoilState(userState);

  const onSignOut = useCallback(async () => {
    await api.logout();
    setUser(undefined);
  }, [setUser]);

  return {
    user,
    children,
    onSignOut,
  };
};

export default useBaseLayoutProps;
