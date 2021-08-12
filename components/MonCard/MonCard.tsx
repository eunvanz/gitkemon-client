import { useState } from "react";
import cx from "classnames";
import Image from "next/image";
import { CardMon } from "../../types";
import LevelBadge from "../LevelBadge";
import MonModal from "../MonModal";
import MonStars from "../MonStars";
import MonTierBadge from "../MonTierBadge";
import MonTypeBadge from "../MonTypeBadge";
import PotentialBadge from "../PotentialBadge";

export interface MonCardProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  mon: CardMon;
}

const MonCard: React.FC<MonCardProps> = ({ mon, className, ...restProps }) => {
  const [isMonModalOpen, setIsMonModalOpen] = useState(false);

  return (
    <>
      <div
        className={cx(
          "flex flex-col shadow-lg max-w-full items-center border rounded transform transition-transform hover:-translate-y-0.5 cursor-pointer",
          className,
        )}
        {...restProps}
        onClick={() => setIsMonModalOpen(true)}
      >
        <div>
          <div className="flex-1 p-1">
            {mon.level && (
              <div className="absolute left-1 top-0 sm:left-2 sm:top-1">
                <LevelBadge level={mon.level} evolvableLevel={mon.evolutionLevel} />
              </div>
            )}
            {mon.potential && (
              <div className="absolute right-1 top-0 sm:right-2 sm:top-1">
                <PotentialBadge potential={mon.potential} />
              </div>
            )}
            <Image
              src={mon.image ? mon.image.imageUrl : ""}
              alt={mon.name}
              layout="fill"
            />
          </div>
          <div className="flex-col bg-gray-50 py-1 w-full">
            <div className="flex flex-row flex-1 my-1.5 justify-center">
              <MonStars stars={mon.stars} />
            </div>
            <div className="flex flex-row flex-1 my-1 justify-center">
              <MonTierBadge tier={mon.tier} className="mr-0.5" />
              <MonTypeBadge
                type={mon.firstType}
                className={mon.secondType ? "mr-0.5" : undefined}
              />
              {mon.secondType && <MonTypeBadge type={mon.secondType} />}
            </div>
          </div>
        </div>
      </div>
      <MonModal
        mon={mon}
        isOpen={isMonModalOpen}
        onClose={() => setIsMonModalOpen(false)}
      />
    </>
  );
};

export default MonCard;
