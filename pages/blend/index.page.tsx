import withAuthServerSideProps from "~/hocs/withAuthServerSideProps";
import withBaseLayout from "../../hocs/withBaseLayout";
import Blend from "./Blend.view";
import useBlendProps from "./useBlendProps";

const BlendPage: React.FC<void> = () => {
  const props = useBlendProps();

  return <Blend {...props} />;
};

// export const getServerSideProps = withAuthServerSideProps({ isAuthRequired: true })();

export default withBaseLayout(BlendPage);
