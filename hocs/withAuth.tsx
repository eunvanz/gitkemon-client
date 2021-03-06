import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import useUserQuery from "../queries/useUserQuery";
import { userState } from "../state/user";

/**
 * user를 전달 받아서 전역 상태에 세팅
 * user가 없을 경우 토큰으로 로그인 수행
 * 서버사이드 렌더링 시 withAuthServerSideProps와 같이 쓰여야 함
 * @param WrappedComponent
 * @returns
 */
const withAuth = (WrappedComponent: React.FC<any>) => {
  const Wrapper = ({ user: userProp, ...restProps }: any) => {
    const setUser = useSetRecoilState(userState);

    useUserQuery({
      enabled: !userProp,
      initialData: userProp,
    });

    useEffect(() => {
      if (userProp) {
        setUser(userProp);
      }
    }, [setUser, userProp]);

    return <WrappedComponent user={userProp} {...restProps} />;
  };

  return Wrapper;
};

export default withAuth;
