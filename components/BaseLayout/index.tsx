import { User } from "../../types";
import BaseLayout from "./BaseLayout";
import useBaseLayoutProps from "./useBaseLayoutProps";

export interface BaseLayoutContainerProps {
  user?: User;
}

const BaseLayoutContainer: React.FC<BaseLayoutContainerProps> = ({
  children,
  user,
}) => {
  const props = useBaseLayoutProps({ children, user });

  return <BaseLayout {...props} />;
};

export default BaseLayoutContainer;
