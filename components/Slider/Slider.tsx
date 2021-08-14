import cx from "classnames";
import ReactSlider, { ReactSliderProps } from "react-slider";
import { colors } from "../../constants/styles";

export interface SliderProps extends ReactSliderProps {}

const Slider: React.FC<SliderProps> = ({ className, ...props }) => {
  return (
    <div className={cx("relative", className)}>
      <ReactSlider
        className="absolute w-full h-1 top-1 bg-gray-300 rounded"
        thumbClassName={`absolute w-3 h-3 -top-1 bg-${colors.PRIMARY_COLOR} rounded-full cursor-pointer`}
        trackClassName={cx("h-1", "track")}
        {...props}
      />
    </div>
  );
};

export default Slider;
