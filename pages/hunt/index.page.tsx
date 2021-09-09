import withAuthServerSideProps from "../../hocs/withAuthServerSideProps";
import withBaseLayout from "../../hocs/withBaseLayout";
import Hunt from "./Hunt.view";
import useHuntProps from "./useHuntProps";

const HuntPage: React.FC<void> = () => {
  const props = useHuntProps();

  return <Hunt {...props} />;
};

// export const getServerSideProps = withAuthServerSideProps({
//   isAuthRequired: true,
// })();

export default withBaseLayout(HuntPage);
