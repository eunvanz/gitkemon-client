import { useCallback, useState } from "react";
import { RefreshIcon } from "@heroicons/react/outline";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { CardMon } from "../../types";
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
  mon: CardMon;
  isInitialBack?: boolean;
}

const MonModal: React.FC<MonModalProps> = ({
  mon,
  isInitialBack = false,
  ...restProps
}) => {
  const [isFlipped, setIsFlipped] = useState(isInitialBack);

  const renderImageSection = useCallback(() => {
    return (
      <div className="flex flex-col mb-4 md:mx-0 md:mb-0 md:mr-8">
        <div className="w-48 border border-dotted mb-1 mx-auto flex-shrink-0">
          <Image src={mon.image ? mon.image.imageUrl : ""} alt={mon.name} layout="fill" />
        </div>
        <div className="text-center mb-1">
          <Typography size="sm" color="hint">
            Painting by{" "}
            <Typography color="primary" weight="bold">
              {mon.image?.designerName}
            </Typography>
          </Typography>
        </div>
      </div>
    );
  }, [mon.image, mon.name]);

  const renderStat = useCallback(
    (props: { title: string; baseValue: number; addedValue?: number }) => {
      return (
        <div className="mb-5">
          <div className="flex-shrink-0 mb-1">
            <Typography weight="bold" className="mr-2">
              {props.title}
            </Typography>
            <Typography color="hint" weight="bold">
              {props.baseValue}
            </Typography>
          </div>
          <div className="flex">
            <LineGauge
              className="flex-grow mr-2 pt-2"
              values={[
                {
                  color: "yellow-400",
                  value: (props.baseValue * 100) / 400,
                },
              ]}
            />
            <div className="flex-shrink-0 w-10 text-right">
              <Typography color="primary" weight="bold">
                {props.baseValue}
              </Typography>
            </div>
          </div>
        </div>
      );
    },
    [],
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
      {!isFlipped ? (
        <div className="md:flex w-full">
          <div className="flex flex-col w-full h-96">
            {renderProfile({
              title: "Name",
              content: <Typography>{mon.name}</Typography>,
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
                <Typography color="primary" weight="bold">
                  {mon.total}
                </Typography>
              ),
            })}
            {renderProfile({
              title: "Physical",
              content: (
                <Typography>
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
        </div>
      ) : (
        <div className="flex flex-col w-full h-96">
          {renderStat({
            title: "HP",
            baseValue: mon.hp,
          })}
          {renderStat({
            title: "Attack",
            baseValue: mon.attack,
          })}
          {renderStat({
            title: "Defense",
            baseValue: mon.defense,
          })}
          {renderStat({
            title: "Special attack",
            baseValue: mon.specialAttack,
          })}
          {renderStat({
            title: "Special defense",
            baseValue: mon.specialDefense,
          })}
          {renderStat({
            title: "Speed",
            baseValue: mon.speed,
          })}
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
          <div className="w-48 border border-dotted mb-1 mx-auto flex-shrink-0">
            <Image
              src={mon.image ? mon.image.imageUrl : ""}
              alt={mon.name}
              layout="fill"
            />
          </div>
          <div className="text-center mb-1">
            <Typography size="sm" color="hint">
              Painting by{" "}
              <Typography color="primary" weight="bold">
                {mon.image?.designerName}
              </Typography>
            </Typography>
          </div>
        </div>
        <div className="md:flex w-full">{children}</div>
      </div>
    </BaseModal>
  );
};

export default MonModal;
