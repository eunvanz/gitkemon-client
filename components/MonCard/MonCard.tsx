import { StarIcon } from "@heroicons/react/solid";
import cx from "classnames";
import Image from "next/image";
import { CardMon } from "../../types";
import Badge from "../Badge";
import MonTypeBadge from "../MonTypeBadge";

export interface MonCardProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  mon: CardMon;
}

const MonCard: React.FC<MonCardProps> = ({ mon, className, ...restProps }) => {
  return (
    <div
      className={cx(
        "flex flex-col shadow-lg max-w-full items-center border rounded p-1",
        className,
      )}
      {...restProps}
    >
      <div className="flex-1 border border-dashed">
        <Image src={mon.image ? mon.image.imageUrl : ""} alt={mon.name} layout="fill" />
      </div>
      <div className="flex flex-row flex-1 m-1">
        <StarIcon className="text-gray-200 w-5" />
        <StarIcon className="text-gray-200 w-5" />
        <StarIcon className="text-gray-200 w-5" />
        <StarIcon className="text-gray-200 w-5" />
        <StarIcon className="text-gray-200 w-5" />
      </div>
      <div className="flex flex-row flex-1 m-1">
        <Badge label="S.RARE" color="purple" className="mr-0.5" isSquare size="sm" />
        <MonTypeBadge
          type={mon.firstType}
          className={mon.secondType ? "mr-0.5" : undefined}
        />
        {mon.secondType && <MonTypeBadge type={mon.secondType} />}
      </div>
    </div>
  );
};

export default MonCard;
