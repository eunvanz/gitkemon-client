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

  return {
    user,
    children,
  };
};

export default useBaseLayoutProps;
