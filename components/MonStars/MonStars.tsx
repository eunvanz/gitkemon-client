import { useMemo } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import cx from "classnames";

export interface MonStarsProps extends Omit<FontAwesomeIconProps, "icon"> {
  stars: number;
}

const MonStars: React.FC<MonStarsProps> = ({ stars, className, ...restProps }) => {
  const { emptyColor, fillColor } = useMemo(() => {
    if (stars > 5) {
      return { emptyColor: "text-gray-500", fillColor: "text-yellow-400" };
    } else {
      return { emptyColor: "text-gray-200", fillColor: "text-gray-500" };
    }
  }, [stars]);

  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <FontAwesomeIcon
          key={index}
          className={cx(
            stars % 5 === 0 || (stars % 5) - index - 1 >= 0 ? fillColor : emptyColor,
            className,
          )}
          icon={faStar}
          {...restProps}
        />
      ))}
    </>
  );
};

export default MonStars;
