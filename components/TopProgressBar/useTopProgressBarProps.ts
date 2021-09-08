import { useNProgress } from "@tanem/react-nprogress";
import { TopProgressBarProps } from "./TopProgressBar";

const useTopProgressBarProps: ({
  isAnimating,
}: {
  isAnimating: boolean;
}) => TopProgressBarProps = ({ isAnimating }) => {
  const { isFinished, progress } = useNProgress({ isAnimating });

  return {
    isFinished,
    progress,
  };
};

export default useTopProgressBarProps;
