import BaseLayout from "./BaseLayout";
import useBaseLayoutProps from "./useBaseLayoutProps";

const BaseLayoutContainer: React.FC<{}> = ({ children }) => {
  const props = useBaseLayoutProps({ children });

  return <BaseLayout {...props} />;
};

export default BaseLayoutContainer;
