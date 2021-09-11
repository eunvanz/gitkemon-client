import { useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import api from "../../api";
import ROUTES from "../../paths";
import { userState } from "../../state/user";
import { User } from "../../types";
import { AdminBaseLayoutProps } from "./AdminBaseLayout";

const useAdminBaseLayoutProps: ({
  children,
  user,
}: {
  children: React.ReactNode;
  user?: User;
}) => AdminBaseLayoutProps = ({ children, user: userProp }) => {
  const stateUser = useRecoilValue(userState);

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
      {
        name: "Mons",
        onClick: () => router.push(ROUTES.ADMIN__MONS),
      },
      {
        name: "Contents",
        onClick: () => router.push(ROUTES.ADMIN__CONTENTS),
      },
    ];
  }, [router]);

  const user = useMemo(() => {
    return stateUser || userProp;
  }, [stateUser, userProp]);

  useEffect(() => {
    if (user?.role !== "admin") {
      router.replace(ROUTES.HOME);
    }
  }, [router, user?.role]);

  return {
    user,
    children,
    onSignOut,
    menuItems,
  };
};

export default useAdminBaseLayoutProps;
