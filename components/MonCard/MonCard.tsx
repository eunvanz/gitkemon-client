import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "classnames";
import Image from "next/image";
import { CardMon } from "../../types";
import MonTierBadge from "../MonTierBadge";
import MonTypeBadge from "../MonTypeBadge";

export interface MonCardProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  mon: CardMon;
}

const MonCard: React.FC<MonCardProps> = ({ mon, className, ...restProps }) => {
  return (
    <div
      className={cx(
        "flex flex-col shadow-lg max-w-full items-center border rounded p-1 transform transition-transform hover:-translate-y-1",
        className,
      )}
      {...restProps}
    >
      <div className="flex-1 border border-dashed">
        <Image src={mon.image ? mon.image.imageUrl : ""} alt={mon.name} layout="fill" />
      </div>
      <div className="flex flex-row flex-1 m-1.5">
        <FontAwesomeIcon className="text-gray-200 w-4" icon={faStar} />
        <FontAwesomeIcon className="text-gray-200 w-4" icon={faStar} />
        <FontAwesomeIcon className="text-gray-200 w-4" icon={faStar} />
        <FontAwesomeIcon className="text-gray-200 w-4" icon={faStar} />
        <FontAwesomeIcon className="text-gray-200 w-4" icon={faStar} />
      </div>
      <div className="flex flex-row flex-1 m-1">
        <MonTierBadge
          tier={mon.tier}
          isShorten={window.screen.width < 400}
          className="mr-0.5"
        />
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
