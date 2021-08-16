import { useCallback, useMemo, useState } from "react";
import { RefreshIcon } from "@heroicons/react/outline";
import random from "lodash/random";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import { ModalMon } from "../../types";
import BaseModal, { BaseModalProps } from "../BaseModal";
import Button from "../Button";
import LevelBadge from "../LevelBadge";
import LineGauge from "../LineGauge";
import MonStars from "../MonStars";
import MonTierBadge from "../MonTierBadge";
import MonTypeBadge from "../MonTypeBadge";
import PotentialBadge from "../PotentialBadge";
import Typography from "../Typography";

export interface MonModalProps extends Omit<BaseModalProps, "children"> {
  mon?: ModalMon;
  oldMon?: ModalMon;
  isInitialBack?: boolean;
}

const MonModal: React.FC<MonModalProps> = ({
  mon,
  oldMon,
  isInitialBack = false,
  ...restProps
}) => {
  const [isFlipped, setIsFlipped] = useState(isInitialBack);

  const isCollection = useMemo(() => {
    return !!mon?.baseTotal;
  }, [mon?.baseTotal]);

  const renderStat = useCallback(
    (props: {
      title: string;
      baseValue: number;
      addedValue?: number;
      updatedValue?: number;
    }) => {
      return (
        <div className="mb-5">
          <div className="flex-shrink-0 mb-1">
            <Typography weight="bold" className="mr-2">
              {props.title}
            </Typography>
            <Typography color="hint" weight="bold">
              {props.baseValue}
            </Typography>
            {isCollection && props.addedValue! > 0 && (
              <Typography color="amber" weight="bold">
                +{props.addedValue}
              </Typography>
            )}
            {!!props.updatedValue && (
              <Typography color="blue" weight="bold">
                +{props.updatedValue}
              </Typography>
            )}
          </div>
          <div className="flex">
            <LineGauge
              className="flex-grow mr-2 pt-2"
              values={[
                {
                  color: "yellow-400",
                  value: (props.baseValue * 100) / 400,
                },
                {
                  color: "amber-500",
                  value: ((props.addedValue || 0) * 100) / 400,
                },
                {
                  color: "blue-500",
                  value: ((props.updatedValue || 0) * 100) / 400,
                },
              ]}
            />
            <div className="flex-shrink-0 w-10 text-right">
              <Typography color="primary" weight="bold">
                {props.baseValue + (props.addedValue || 0)}
              </Typography>
            </div>
          </div>
        </div>
      );
    },
    [isCollection],
  );

  const renderProfile = useCallback(
    (props: { title: string; content: React.ReactNode }) => {
      return (
        <div className="flex mb-4">
          <div className="flex-shrink-0 w-32">
            <Typography weight="bold">{props.title}</Typography>
          </div>
          <div className="flex-1">{props.content}</div>
        </div>
      );
    },
    [],
  );

  return (
    <BaseMonModal mon={mon} onFlip={() => setIsFlipped(!isFlipped)} {...restProps}>
      {mon ? (
        !isFlipped ? (
          <div className="flex flex-col w-full h-96">
            {renderProfile({
              title: "Name",
              content: <Typography>{isCollection ? mon.name : "?????"}</Typography>,
            })}
            {mon.level &&
              renderProfile({
                title: "Level",
                content: (
                  <LevelBadge level={mon.level} evolvableLevel={mon.evolutionLevel} />
                ),
              })}
            {mon.potential &&
              renderProfile({
                title: "Potential",
                content: <PotentialBadge potential={mon.potential} />,
              })}
            {renderProfile({
              title: "Tier",
              content: <MonTierBadge tier={mon.tier} />,
            })}
            {renderProfile({
              title: "Types",
              content: (
                <>
                  <MonTypeBadge className="mr-0.5" type={mon.firstType} />
                  {mon.secondType && <MonTypeBadge type={mon.secondType} />}
                </>
              ),
            })}
            {renderProfile({
              title: "Stars",
              content: <MonStars stars={mon.stars} />,
            })}
            {renderProfile({
              title: "Total stats",
              content: (
                <Typography>
                  {isCollection ? "" : "Avg. "}
                  <Typography color="primary" weight="bold">
                    {mon.total}{" "}
                  </Typography>
                  {isCollection && (
                    <Typography color="gray" weight="bold">
                      ({mon.baseTotal}
                      {mon.total - mon.baseTotal! > 0 && (
                        <Typography color="amber">
                          +{mon.total - mon.baseTotal!}
                        </Typography>
                      )}
                      {oldMon && (
                        <Typography color="blue">+{mon.total - oldMon.total}</Typography>
                      )}
                      )
                    </Typography>
                  )}
                </Typography>
              ),
            })}
            {renderProfile({
              title: "Physical",
              content: (
                <Typography>
                  {isCollection ? "" : "Avg. "}
                  <Typography color="primary" weight="bold">
                    {mon.height}
                  </Typography>
                  m /{" "}
                  <Typography color="primary" weight="bold">
                    {mon.weight}
                  </Typography>
                  kg
                </Typography>
              ),
            })}
            {renderProfile({
              title: "Evolution",
              content: (
                <Typography>
                  {mon.evolutionLevel ? (
                    <>
                      Available from <LevelBadge level={mon.evolutionLevel} />
                    </>
                  ) : (
                    "-"
                  )}
                </Typography>
              ),
            })}
            <div className="flex mb-2">
              <Typography>{mon.description}</Typography>
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full h-96">
            {renderStat({
              title: "HP",
              baseValue: isCollection ? mon.baseHp! : mon.hp,
              addedValue: isCollection ? mon.hp - mon.baseHp! : undefined,
              updatedValue: oldMon ? mon.hp - oldMon.hp : undefined,
            })}
            {renderStat({
              title: "Attack",
              baseValue: isCollection ? mon.baseAttack! : mon.attack,
              addedValue: isCollection ? mon.attack - mon.baseAttack! : undefined,
              updatedValue: oldMon ? mon.attack - oldMon.attack : undefined,
            })}
            {renderStat({
              title: "Defense",
              baseValue: isCollection ? mon.baseDefense! : mon.defense,
              addedValue: isCollection ? mon.defense - mon.baseDefense! : undefined,
              updatedValue: oldMon ? mon.defense - oldMon.defense : undefined,
            })}
            {renderStat({
              title: "Special attack",
              baseValue: isCollection ? mon.baseSpecialAttack! : mon.specialAttack,
              addedValue: isCollection
                ? mon.specialAttack - mon.baseSpecialAttack!
                : undefined,
              updatedValue: oldMon ? mon.specialAttack - oldMon.specialAttack : undefined,
            })}
            {renderStat({
              title: "Special defense",
              baseValue: isCollection ? mon.baseSpecialDefense! : mon.specialDefense,
              addedValue: isCollection
                ? mon.specialDefense - mon.baseSpecialDefense!
                : undefined,
              updatedValue: oldMon
                ? mon.specialDefense - oldMon.specialDefense
                : undefined,
            })}
            {renderStat({
              title: "Speed",
              baseValue: isCollection ? mon.baseSpeed! : mon.speed,
              addedValue: isCollection ? mon.speed - mon.baseSpeed! : undefined,
              updatedValue: oldMon ? mon.speed - oldMon.speed : undefined,
            })}
          </div>
        )
      ) : (
        <div className="flex flex-col w-full h-96">
          {Array.from({ length: 9 }).map((_, index) => (
            <div className="flex mb-4" key={index}>
              <div className="flex-shrink-0 w-32">
                <Skeleton width={random(30, 80)} height={16} />
              </div>
              <div className="flex-1">
                <Skeleton width={random(60, 180)} height={16} />
              </div>
            </div>
          ))}
          <Skeleton width={random(250, 300)} height={16} />
        </div>
      )}
    </BaseMonModal>
  );
};

interface BaseMonModalProps extends MonModalProps {
  onFlip: VoidFunction;
  onClose: VoidFunction;
}

const BaseMonModal: React.FC<BaseMonModalProps> = ({
  mon,
  onFlip,
  children,
  ...restProps
}) => {
  return (
    <BaseModal
      className="w-full md:max-w-xl"
      footer={
        <div className="text-right">
          <Button className="mr-1" icon={RefreshIcon} onClick={onFlip}>
            Flip
          </Button>
          <Button color="transparent" onClick={restProps.onClose}>
            Close
          </Button>
        </div>
      }
      {...restProps}
    >
      <div className="md:flex w-full">
        <div className="flex flex-col mb-4 md:mx-0 md:mb-0 md:mr-8">
          {mon ? (
            <div className="w-48 border border-dotted mb-1 mx-auto flex-shrink-0">
              <Image
                src={mon.image ? mon.image.imageUrl : ""}
                alt={mon.name}
                layout="fill"
              />
            </div>
          ) : (
            <div className="w-48 mb-1 mx-auto flex-shrink-0">
              <Skeleton width={190} height={190} />
            </div>
          )}
          <div className="text-center mb-1">
            {mon ? (
              mon.image ? (
                <Typography size="sm" color="hint">
                  Painting by{" "}
                  <Typography color="primary" weight="bold">
                    {mon.image?.designerName}
                  </Typography>
                </Typography>
              ) : null
            ) : (
              <Skeleton width={120} height={16} />
            )}
          </div>
        </div>
        <div className="md:flex w-full">{children}</div>
      </div>
    </BaseModal>
  );
};

export default MonModal;
