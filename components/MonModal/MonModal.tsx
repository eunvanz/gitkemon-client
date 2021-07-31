import Image from "next/image";
import { CardMon } from "../../types";
import Badge from "../Badge";
import BaseModal, { BaseModalProps } from "../BaseModal";
import MonStars from "../MonStars";
import MonTierBadge from "../MonTierBadge";
import MonTypeBadge from "../MonTypeBadge";
import Typography from "../Typography";

export interface MonModalProps extends BaseModalProps {
  mon: CardMon;
}

const MonModal: React.FC<MonModalProps> = ({ mon, ...restProps }) => {
  return (
    <BaseModal className="w-full md:max-w-2xl" {...restProps}>
      <div className="md:flex w-full">
        <div className="flex flex-col mb-6 md:mx-0 md:mb-0 md:mr-8">
          <div className="w-48 border border-dotted mb-2 mx-auto flex-shrink-0">
            <Image
              src={mon.image ? mon.image.imageUrl : ""}
              alt={mon.name}
              layout="fill"
            />
          </div>
          <div className="text-center">
            <Typography size="sm" color="hint">
              Painting by{" "}
              <Typography color="primary" weight="bold">
                {mon.image?.designerName}
              </Typography>
            </Typography>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex mb-2">
            <div className="flex-shrink-0 w-32">
              <Typography weight="bold">Name</Typography>
            </div>
            <div className="flex-1">
              <Typography>{mon.name}</Typography>
            </div>
          </div>
          {mon.potential && (
            <div className="flex mb-2">
              <div className="flex-shrink-0 w-32">
                <Typography weight="bold">Potential</Typography>
              </div>
              <div className="flex-1">
                <Badge label={mon.potential} color="blue" size="sm" />
              </div>
            </div>
          )}
          <div className="flex mb-2">
            <div className="flex-shrink-0 w-32">
              <Typography weight="bold">Tier</Typography>
            </div>
            <div className="flex-1">
              <MonTierBadge tier={mon.tier} />
            </div>
          </div>
          <div className="flex mb-2">
            <div className="flex-shrink-0 w-32">
              <Typography weight="bold">Types</Typography>
            </div>
            <div className="flex-1">
              <MonTypeBadge className="mr-0.5" type={mon.firstType} />
              {mon.secondType && <MonTypeBadge type={mon.secondType} />}
            </div>
          </div>
          <div className="flex mb-2">
            <div className="flex-shrink-0 w-32">
              <Typography weight="bold">Stars</Typography>
            </div>
            <div className="flex-1">
              <MonStars stars={mon.stars} />
            </div>
          </div>
          <div className="flex mb-2">
            <div className="flex-shrink-0 w-32">
              <Typography weight="bold">Total Stats</Typography>
            </div>
            <div className="flex-1">
              <Typography color="primary" weight="bold">
                {mon.total}
              </Typography>
            </div>
          </div>
          <div className="flex mb-2">
            <div className="flex-shrink-0 w-32">
              <Typography weight="bold">Physical</Typography>
            </div>
            <div className="flex-1">
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
            </div>
          </div>
          <div className="flex mb-2">
            <div className="flex-shrink-0 w-32">
              <Typography weight="bold">Evolution</Typography>
            </div>
            <div className="flex-1">
              {mon.evolutionLevel ? `Available from ${mon.evolutionLevel}` : "-"}
            </div>
          </div>
          <div className="flex mb-2">
            <Typography>{mon.description}</Typography>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default MonModal;
