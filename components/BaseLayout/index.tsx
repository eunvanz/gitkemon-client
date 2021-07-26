import BaseLayout, { BaseLayoutProps } from "./BaseLayout";
import useBaseLayoutProps from "./useBaseLayoutProps";

const BaseLayoutContainer: React.FC<BaseLayoutProps> = ({ children }) => {
  const props = useBaseLayoutProps({ children });

  return <BaseLayout {...props} />;
};

export default BaseLayoutContainer;
