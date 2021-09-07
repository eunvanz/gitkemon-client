import cx from "classnames";

export interface TopProgressBarProps {
  isFinished: boolean;
  progress: number;
}

const TopProgressBar: React.FC<TopProgressBarProps> = ({ isFinished, progress }) => {
  return (
    <div
      className={cx(
        "pointer-events-none transition-opacity",
        isFinished ? "opacity-0" : "opacity-1",
      )}
    >
      <div
        className="bg-blue-400 h-1 w-full left-0 top-0 fixed z-50"
        style={{
          marginLeft: `${(-1 + progress) * 100}%`,
          transition: `margin-left 200ms linear`,
        }}
      />
    </div>
  );
};

export default TopProgressBar;
