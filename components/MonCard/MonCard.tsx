import { useCallback, useMemo, useState } from "react";
import { ArrowNarrowUpIcon } from "@heroicons/react/outline";
import cx from "classnames";
import Image from "next/image";
import { Img } from "react-image";
import Skeleton from "react-loading-skeleton";
import { EMPTY_SQUARE_IMAGE_DATA, MON_CARD_WIDTH } from "~/constants/styles";
import { checkIsCollectionMaxLevel } from "~/helpers/projectHelpers";
import { CardMon, ExtendableHTMLProps, ModalMon, User } from "~/types";
import Button from "../Button";
import CardBack from "../CardBack";
import LevelBadge from "../LevelBadge";
import MonModalContainer from "../MonModal";
import MonModal from "../MonModal/MonModal";
import MonStars from "../MonStars";
import MonTierBadge from "../MonTierBadge";
import MonTypeBadge from "../MonTypeBadge";
import PotentialBadge from "../PotentialBadge";
import styles from "./MonCard.module.css";

export interface MonCardProps extends ExtendableHTMLProps<HTMLDivElement> {
  mon?: CardMon;
  /** 레벨업을 했을 때 비교하기 위해 사용하는 필드 */
  oldMon?: ModalMon;
  /** 레벨업을 했을 때 비교하기 위해 사용하는 필드 */
  newMon?: ModalMon;
  /** 콜렉션이 아닌 Mon 타입의 경우에 사용하는 필드 */
  modalMon?: ModalMon;
  isFlipped?: boolean;
  isFullWidth?: boolean;
  onSelect?: VoidFunction;
  isClickDisabled?: boolean;
  isOwned?: boolean;
  user?: User;
  customSize?: string;
  isStatic?: boolean;
  isFlippable?: boolean;
}

const MonCard: React.FC<MonCardProps> = ({
  mon,
  oldMon,
  newMon,
  modalMon,
  className,
  isFlipped,
  isFullWidth,
  onSelect,
  isClickDisabled,
  isOwned,
  user,
  customSize,
  isStatic,
  isFlippable,
  ...restProps
}) => {
  const [isMonModalOpen, setIsMonModalOpen] = useState(false);

  const isHidden = useMemo(() => {
    return !mon?.imageUrl;
  }, [mon?.imageUrl]);

  const Front = useCallback(
    ({ isPlaceholder }: { isPlaceholder?: boolean }) => {
      return (
        <div className={cx(isPlaceholder || !isFlippable ? undefined : styles.surface)}>
          <div
            className={cx("border rounded shadow", {
              "sm:transition-shadow sm:hover:shadow-lg": !isClickDisabled && !!mon,
            })}
          >
            <div className="flex-1 p-1 bg-white rounded">
              {mon ? (
                <>
                  {mon.level && (
                    <div
                      className={cx("absolute left-1 top-0.5 sm:left-2 sm:top-1.5 z-10")}
                    >
                      <LevelBadge
                        level={mon.level}
                        evolvableLevel={mon.evolutionLevel}
                        isMax={
                          user && isOwned ? checkIsCollectionMaxLevel(user, mon) : false
                        }
                      />
                    </div>
                  )}
                  {mon.potential && (
                    <div
                      className={cx(
                        "absolute right-1 top-0.5 sm:right-2 sm:top-1.5 z-10",
                      )}
                    >
                      <PotentialBadge potential={mon.potential} />
                    </div>
                  )}
                  <div className={cx("relative", { "h-36": isStatic })}>
                    {isStatic ? (
                      mon.imageUrl ? (
                        // @ts-ignore
                        <Image
                          className="mx-auto"
                          src={mon.imageUrl}
                          alt="mon image"
                          draggable={false}
                          layout="fill"
                          objectFit="contain"
                          priority
                        />
                      ) : (
                        <CardBack />
                      )
                    ) : mon.imageUrl ? (
                      // eslint-disable-next-line
                      <Img
                        className="mx-auto"
                        src={mon.imageUrl}
                        loader={
                          // eslint-disable-next-line
                          <img src={EMPTY_SQUARE_IMAGE_DATA} />
                        }
                        alt="mon image"
                        draggable={false}
                      />
                    ) : (
                      <div className="relative">
                        {/* eslint-disable-next-line */}
                        <img src={EMPTY_SQUARE_IMAGE_DATA} />
                        <div className="absolute top-0 w-full h-full">
                          <CardBack />
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <Skeleton style={{ display: "block", width: "100%", height: "9rem" }} />
              )}
            </div>
            <div className="flex-col bg-gray-50 py-1 w-full rounded-b">
              <div className="flex flex-row flex-1 my-1.5 justify-center">
                <MonStars stars={mon?.stars || 0} />
              </div>
              <div className="flex flex-row flex-1 my-1 justify-center">
                {mon ? (
                  <>
                    <MonTierBadge tier={mon.tier} className="mr-0.5" />
                    <MonTypeBadge
                      type={mon.firstType}
                      className={mon.secondType ? "mr-0.5" : undefined}
                    />
                    {mon.secondType && <MonTypeBadge type={mon.secondType} />}
                  </>
                ) : (
                  <>
                    <Skeleton style={{ width: 40, height: 20, marginRight: 2 }} />
                    <Skeleton style={{ width: 40, height: 20 }} />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    },
    [isClickDisabled, isFlippable, isOwned, isStatic, mon, user],
  );

  const widthCLassName = useMemo(() => {
    return isFullWidth ? "w-full" : customSize || MON_CARD_WIDTH;
  }, [customSize, isFullWidth]);

  return (
    <>
      <div
        className={cx(
          "flex flex-col p-1 items-center",
          widthCLassName,
          className,
          styles.card,
        )}
        {...restProps}
      >
        <div
          className={cx(
            "relative w-full h-full transform",
            styles.cardInner,
            {
              "cursor-pointer sm:hover:-translate-y-1 sm:transition-transform": !isClickDisabled,
            },
            {
              [styles.isFlipped]: isFlipped,
            },
          )}
          onClick={isClickDisabled ? undefined : () => setIsMonModalOpen(true)}
        >
          <div className={cx(isFlippable ? styles.hiddenBackface : undefined)}>
            <Front />
          </div>
          {isFlippable && (
            <>
              <div className="invisible">
                <Front isPlaceholder />
              </div>
              <div className={cx(styles.surface, styles.back)}>
                <div className="border rounded h-full">
                  <CardBack />
                </div>
              </div>
            </>
          )}
        </div>
        {onSelect && (
          <div className="text-center mt-2 w-full">
            <Button icon={ArrowNarrowUpIcon} onClick={onSelect} size="xs">
              Select
            </Button>
          </div>
        )}
      </div>
      {isHidden ? (
        <MonModal
          isOpen={isMonModalOpen}
          onClose={() => setIsMonModalOpen(false)}
          mon={modalMon}
          isOwned={isOwned}
        />
      ) : (
        <MonModalContainer
          collectionId={mon!.id}
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
