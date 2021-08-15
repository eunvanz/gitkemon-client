import HuntResult from "./HuntResult.view";
import useHuntResultProps from "./useHuntResultProps";

const HuntResultPage: React.FC<void> = () => {
  const props = useHuntResultProps();

  return <HuntResult {...props} />;
};

export default HuntResultPage;
