import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";

export interface ConfettiProps {
  isVisible: boolean;
}

const Confetti: React.FC<ConfettiProps> = ({ isVisible }) => {
  const { width, height } = useWindowSize();

  return isVisible ? (
    <ReactConfetti width={width} height={height} recycle={false} />
  ) : null;
};

export default Confetti;
