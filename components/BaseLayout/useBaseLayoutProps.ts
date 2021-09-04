import { ReactNode, useCallback } from "react";
import { useRecoilValue } from "recoil";
import useLogoutMutation from "~/queries/useLogoutMutation";
import useAvailableContributionsQuery from "../../queries/useAvailableContributionsQuery";
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

  const { data: availableContributions } = useAvailableContributionsQuery({
    enabled: !!user,
  });

  const { mutate: logout } = useLogoutMutation();

  const onSignOut = useCallback(() => {
    logout();
  }, [logout]);

  return {
    user: user || userProp,
    children,
    onSignOut,
    availableContributions,
  };
};

export default useBaseLayoutProps;
