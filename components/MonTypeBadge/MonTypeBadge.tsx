import { useMemo } from "react";
import cx from "classnames";
import { MonType } from "../../types";
import Badge, { BadgeProps } from "../Badge";

export interface MonTypeBadgeProps extends Omit<BadgeProps, "label"> {
  type: MonType;
}

const MonTypeBadge: React.FC<MonTypeBadgeProps> = ({ type, className, ...restProps }) => {
  const classNameByType = useMemo(() => {
    switch (type) {
      case "bug":
        return "bg-green-600 text-white";
      case "dark":
        return "bg-black text-white";
      case "dragon":
        return "bg-indigo-700 text-white";
      case "electric":
        return "bg-yellow-500 text-white";
      case "fairy":
        return "bg-pink-600 text-white";
      case "fighting":
        return "bg-red-400 text-white";
      case "fire":
        return "bg-red-600 text-white";
      case "flying":
        return "bg-gray-400 text-white";
      case "ghost":
        return "bg-purple-600 text-white";
      case "grass":
        return "bg-green-500 text-white";
      case "ground":
        return "bg-yellow-900 text-white";
      case "ice":
        return "bg-blue-300 text-white";
      case "normal":
        return "bg-gray-500 text-white";
      case "poison":
        return "bg-purple-400 text-white";
      case "psychic":
        return "bg-pink-400 text-white";
      case "rock":
        return "bg-green-800 text-white";
      case "steel":
        return "bg-gray-600 text-white";
      case "water":
        return "bg-blue-400 text-white";
    }
  }, [type]);

  const labelByType = useMemo(() => {
    switch (type) {
      case "bug":
        return "BUG";
      case "dark":
        return "DRK";
      case "dragon":
        return "DRG";
      case "electric":
        return "ELC";
      case "fairy":
        return "FAR";
      case "fighting":
        return "FTN";
      case "fire":
        return "FIR";
      case "flying":
        return "FLY";
      case "ghost":
        return "GST";
      case "grass":
        return "GRS";
      case "ground":
        return "GRN";
      case "ice":
        return "ICE";
      case "normal":
        return "NML";
      case "poison":
        return "PSN";
      case "psychic":
        return "PSY";
      case "rock":
        return "RCK";
      case "steel":
        return "STL";
      case "water":
        return "WTR";
    }
  }, [type]);

  return (
    <Badge
      label={labelByType}
      size="sm"
      isSquare
      className={cx(classNameByType, className)}
      {...restProps}
    />
  );
};

export default MonTypeBadge;
