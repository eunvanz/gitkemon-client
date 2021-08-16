import { useCallback, useMemo, useState } from "react";
import cx from "classnames";
import { CardMon, ModalMon } from "../../types";
import LevelBadge from "../LevelBadge";
import MonModalContainer from "../MonModal";
import MonStars from "../MonStars";
import MonTierBadge from "../MonTierBadge";
import MonTypeBadge from "../MonTypeBadge";
import PotentialBadge from "../PotentialBadge";
import styles from "./MonCard.module.css";

export interface MonCardProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  mon: CardMon;
  oldMon?: ModalMon;
  isFlipped?: boolean;
  isFullWidth?: boolean;
}

const MonCard: React.FC<MonCardProps> = ({
  mon,
  oldMon,
  className,
  isFlipped,
  isFullWidth,
  ...restProps
}) => {
  const [isMonModalOpen, setIsMonModalOpen] = useState(false);

  const Front = useCallback(
    ({ isPlaceholder }: { isPlaceholder?: boolean }) => {
      return (
        <div className={cx(isPlaceholder ? undefined : styles.surface)}>
          <div className="border rounded shadow-md hover:shadow-lg">
            <div className="flex-1 p-1 bg-white rounded">
              {mon.level && (
                <div className={cx("absolute left-1 top-0.5 sm:left-2 sm:top-1.5")}>
                  <LevelBadge level={mon.level} evolvableLevel={mon.evolutionLevel} />
                </div>
              )}
              {mon.potential && (
                <div className={cx("absolute right-1 top-0.5 sm:right-2 sm:top-1.5")}>
                  <PotentialBadge potential={mon.potential} />
                </div>
              )}
              <div className="flex justify-center">
                {/* eslint-disable-next-line */}
                <img src={mon.imageUrl || ""} alt="" />
              </div>
            </div>
            <div className="flex-col bg-gray-50 py-1 w-full rounded-b">
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
      );
    },
    [
      mon.evolutionLevel,
      mon.firstType,
      mon.imageUrl,
      mon.level,
      mon.potential,
      mon.secondType,
      mon.stars,
      mon.tier,
    ],
  );

  const widthCLassName = useMemo(() => {
    return isFullWidth ? "w-full" : "w-1/3 sm:w-1/4 md:w-1/6 lg:w-1/8";
  }, [isFullWidth]);

  return (
    <>
      <div
        className={cx(
          "flex flex-col p-1 items-center transform transition-transform cursor-pointer",
          widthCLassName,
          className,
          styles.card,
          styles.maxWidth,
        )}
        {...restProps}
        onClick={() => setIsMonModalOpen(true)}
      >
        <div
          className={cx("relative w-full h-full", styles.cardInner, {
            [styles.isFlipped]: isFlipped,
          })}
        >
          <div className={cx(styles.hiddenBackface)}>
            <Front />
          </div>
          <div className={cx(styles.hidden)}>
            <Front isPlaceholder />
          </div>
          <div className={cx(styles.surface, styles.back)}>
            <div className="border rounded shadow-md hover:shadow-lg h-full">
              {/* TODO: 뒷면 디자인 */}
              <div className="h-full w-full p-1 bg-gray-100" />
            </div>
          </div>
        </div>
      </div>
      <MonModalContainer
        collectionId={mon.id}
        oldMon={oldMon}
        isOpen={isMonModalOpen}
        onClose={() => setIsMonModalOpen(false)}
      />
    </>
  );
};

export default MonCard;
