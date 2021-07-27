import { ReactNode, useCallback } from "react";
import { useRecoilState } from "recoil";
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
  const [user, setUser] = useRecoilState(userState);

  const onSignOut = useCallback(async () => {
    await api.logout();
    setUser(undefined);
  }, [setUser]);

  return {
    user: user || userProp,
    children,
    onSignOut,
  };
};

export default useBaseLayoutProps;
