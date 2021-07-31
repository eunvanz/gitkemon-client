import cx from "classnames";
import Image from "next/image";
import { CardMon } from "../../types";
import MonStars from "../MonStars";
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
        "flex flex-col shadow-lg max-w-full items-center border rounded p-1 transform transition-transform hover:-translate-y-0.5 cursor-pointer",
        className,
      )}
      {...restProps}
    >
      <div className="flex-1 border border-dotted">
        <Image src={mon.image ? mon.image.imageUrl : ""} alt={mon.name} layout="fill" />
      </div>
      <div className="flex flex-row flex-1 m-1.5">
        <MonStars stars={mon.stars} />
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
