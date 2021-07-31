import cx from "classnames";
import { ExtendableHTMLProps } from "../../types";

export interface LineGaugeProps extends ExtendableHTMLProps<HTMLDivElement> {
  values: {
    color: string;
    value: number;
  }[];
  height?: number;
}

const LineGauge: React.FC<LineGaugeProps> = ({
  values,
  height = 3,
  className,
  ...restProps
}) => {
  return (
    <div className={cx("relative", className)} {...restProps}>
      <div className={cx(`h-${height} bg-gray-200 w-full rounded-sm flex`)}>
        {values.map(({ color, value }, index) => (
          <div
            key={index}
            className={cx(`h-${height} bg-${color}`, {
              ["rounded-l-sm"]: index === 0,
              ["rounded-r-sm"]: index === values.length - 1,
            })}
            style={{
              width: `${value}%`,
              left: index > 0 ? `${values[index - 1].value}%` : undefined,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LineGauge;
