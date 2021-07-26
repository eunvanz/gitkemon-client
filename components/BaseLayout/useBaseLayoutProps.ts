import { ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../state/user";
import { BaseLayoutProps } from "./BaseLayout";

const useBaseLayoutProps: ({
  children,
}: {
  children: ReactNode;
}) => BaseLayoutProps = ({ children }) => {
  const user = useRecoilValue(userState);

  console.log("===== user", user);
  return {
    user,
    children,
  };
};

export default useBaseLayoutProps;
