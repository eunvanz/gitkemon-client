import { useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import api from "../../api";
import ROUTES from "../../paths";
import useUserQuery from "../../queries/useUserQuery";
import { User } from "../../types";
import { AdminBaseLayoutProps } from "./AdminBaseLayout";

const useAdminBaseLayoutProps: ({
  children,
  user,
}: {
  children: React.ReactNode;
  user?: User;
}) => AdminBaseLayoutProps = ({ children, user: userProp }) => {
  const { data: queryUser } = useUserQuery({ enabled: false });

  const router = useRouter();

  const onSignOut = useCallback(async () => {
    await api.logout();
    router.reload();
  }, [router]);

  const menuItems = useMemo(() => {
    return [
      {
        name: "Mon Images",
        onClick: () => router.push(ROUTES.ADMIN__MON_IMAGES),
      },
    ];
  }, [router]);

  const user = useMemo(() => {
    return queryUser || userProp;
  }, [queryUser, userProp]);

  useEffect(() => {
    !user && router.push(ROUTES.HOME);
  }, [router, user]);

  return {
    user,
    children,
    onSignOut,
    menuItems,
  };
};

export default useAdminBaseLayoutProps;
