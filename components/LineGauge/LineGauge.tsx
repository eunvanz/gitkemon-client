import cx from "classnames";
import { ExtendableHTMLProps } from "~/types";

export interface LineGaugeProps extends ExtendableHTMLProps<HTMLDivElement> {
  values: {
    color: string;
    value: number;
  }[];
  height?: number;
}

const LineGauge: React.FC<LineGaugeProps> = ({
  values,
  height = 2,
  className,
  ...restProps
}) => {
  return (
    <div className={className} {...restProps}>
      <div className={cx(`h-${height} bg-gray-200 w-full rounded-md flex`)}>
        {values.map(({ color, value }, index) => {
          const restValue =
            Array.from({ length: index }).reduce(
              (prevValue: number, _, currentIndex) =>
                prevValue - values[index - currentIndex - 1].value,
              100,
            ) || 100;

          return (
            <div
              key={index}
              className={cx(`h-${height} bg-${color} transition-all`, {
                ["rounded-l-md"]: index === 0,
                ["rounded-r-md"]: (index === 0 && value === 100) || restValue === 0,
              })}
              style={{
                width: `${Math.min(value, restValue)}%`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LineGauge;
