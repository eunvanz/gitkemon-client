import withBaseLayout from "../../hocs/withBaseLayout";
import ROUTES from "../../paths";
import HuntResult from "./HuntResult.view";
import useHuntResultProps from "./useHuntResultProps";

const HuntResultPage: React.FC<void> = () => {
  const props = useHuntResultProps();

  return <HuntResult {...props} />;
};

export const getServerSideProps = () => {
  // 바로 접근할 경우 hunt 페이지로 리다이렉트
  return {
    redirect: {
      destination: ROUTES.HUNT,
      permanent: false,
    },
  };
};

export default withBaseLayout(HuntResultPage);
