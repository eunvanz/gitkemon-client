import { useMemo } from "react";
import cx from "classnames";
import { TRAINER_CLASSES } from "~/constants/rules";
import Badge, { BadgeProps } from "../Badge";

export interface TrainerClassBadgeProps extends Omit<BadgeProps, "label"> {
  trainerClass: number;
}

const TrainerClassBadge: React.FC<TrainerClassBadgeProps> = ({
  trainerClass,
  className,
  ...restProps
}) => {
  const label = useMemo(() => {
    return TRAINER_CLASSES[trainerClass - 1];
  }, [trainerClass]);

  const color = useMemo(() => {
    return [
      "bg-yellow-300 text-black",
      "bg-red-300 text-black",
      "bg-blue-300 text-black",
      "bg-red-300 text-black",
      "bg-indigo-300 text-black",
      "bg-pink-300 text-black",
      "bg-gray-300 text-black",
      "bg-green-300 text-black",
      "bg-purple-300 text-black",
      "bg-orange-300 text-black",
      "bg-teal-300 text-black",
      "bg-sky-600 text-white",
      "bg-green-600 text-white",
      "bg-pink-600 text-white",
      "bg-indigo-600 text-white",
      "bg-black text-white",
    ][trainerClass - 1];
  }, [trainerClass]);

  return <Badge className={cx(color, className)} label={label} {...restProps} />;
};

export default TrainerClassBadge;
