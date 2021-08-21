import cx from "classnames";
import PokeBallImage from "../PokeBallImage";
import Typography from "../Typography";

export interface LoadingProps {
  isFullHeight?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isFullHeight }) => {
  return (
    <div
      className={cx("flex justify-center flex-col w-full", { "h-full": isFullHeight })}
    >
      <div className="w-6 h-6 mx-auto animate-bounce">
        <PokeBallImage type="basic" />
      </div>
      <Typography className="mx-auto text-center" color="hint" size="xs" as="div">
        Loading...
      </Typography>
    </div>
  );
};

export default Loading;
