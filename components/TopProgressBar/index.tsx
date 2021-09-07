import TopProgressBar from "./TopProgressBar";
import useTopProgressBarProps from "./useTopProgressBarProps";

const TopProgressBarContainer: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const props = useTopProgressBarProps({ isAnimating });

  return <TopProgressBar {...props} />;
};

export default TopProgressBarContainer;
