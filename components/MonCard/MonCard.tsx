import { useCallback, useMemo, useState } from "react";
import cx from "classnames";
import { CardMon, ModalMon } from "../../types";
import LevelBadge from "../LevelBadge";
import MonModalContainer from "../MonModal";
import MonModal from "../MonModal/MonModal";
import MonStars from "../MonStars";
import MonTierBadge from "../MonTierBadge";
import MonTypeBadge from "../MonTypeBadge";
import PotentialBadge from "../PotentialBadge";
import styles from "./MonCard.module.css";

export interface MonCardProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  mon: CardMon;
  /** 레벨업을 했을 때 비교하기 위해 사용하는 필드 */
  oldMon?: ModalMon;
  /** 레벨업을 했을 때 비교하기 위해 사용하는 필드 */
  newMon?: ModalMon;
  /** 콜렉션이 아닌 Mon 타입의 경우에 사용하는 필드 */
  modalMon?: ModalMon;
  isFlipped?: boolean;
  isFullWidth?: boolean;
}

const MonCard: React.FC<MonCardProps> = ({
  mon,
  oldMon,
  newMon,
  modalMon,
  className,
  isFlipped,
  isFullWidth,
  ...restProps
}) => {
  const [isMonModalOpen, setIsMonModalOpen] = useState(false);

  const isHidden = useMemo(() => {
    return !mon.imageUrl;
  }, [mon.imageUrl]);

  const Front = useCallback(
    ({ isPlaceholder }: { isPlaceholder?: boolean }) => {
      return (
        <div className={cx(isPlaceholder ? undefined : styles.surface)}>
          <div className="border rounded transition-shadow shadow hover:shadow-lg">
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
                {/* TODO: 플레이스홀더 이미지 대체 */}
                {/* eslint-disable-next-line */}
                <img src={mon.imageUrl || "https://via.placeholder.com/250"} alt="" />
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
    return isFullWidth ? "w-full" : "w-1/3 sm:w-1/4 lg:w-1/6 xl:w-1/8";
  }, [isFullWidth]);

  return (
    <>
      <div
        className={cx(
          "flex flex-col p-1 items-center transform transition-transform cursor-pointer hover:-translate-y-1",
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
            <div className="border rounded transition-shadow shadow hover:shadow-lg h-full">
              {/* TODO: 뒷면 디자인 */}
              <div className="h-full w-full p-1 bg-gray-100" />
            </div>
          </div>
        </div>
      </div>
      {isHidden ? (
        <MonModal
          isOpen={isMonModalOpen}
          onClose={() => setIsMonModalOpen(false)}
          mon={modalMon}
        />
      ) : (
        <MonModalContainer
          collectionId={mon.id}
          oldMon={oldMon}
          newMon={newMon}
          isOpen={isMonModalOpen}
          onOpen={() => setIsMonModalOpen(true)}
          onClose={() => setIsMonModalOpen(false)}
        />
      )}
    </>
  );
};

export default MonCard;
