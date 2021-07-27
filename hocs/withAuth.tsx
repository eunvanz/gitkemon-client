import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "../state/user";
import { User } from "../types";

const withUser = (WrappedComponent: React.FC<any>) => {
  const Wrapper = ({ user, data }: { user: User; data: any }) => {
    const setUser = useSetRecoilState(userState);

    const router = useRouter();

    useEffect(() => {
      setUser(user);
    }, [router, setUser, user]);

    return <WrappedComponent {...data.props} />;
  };

  return Wrapper;
};

export default withUser;
