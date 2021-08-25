import withBaseLayout from "../../hocs/withBaseLayout";
import Blend from "./Blend.view";
import useBlendProps from "./useBlendProps";

const BlendPage: React.FC<void> = () => {
  const props = useBlendProps();

  return <Blend {...props} />;
};

export default withBaseLayout(BlendPage);
