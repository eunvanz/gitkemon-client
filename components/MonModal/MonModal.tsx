import Image from "next/image";
import { CardMon } from "../../types";
import BaseModal, { BaseModalProps } from "../BaseModal";
import MonStars from "../MonStars";
import MonTierBadge from "../MonTierBadge";
import MonTypeBadge from "../MonTypeBadge";

export interface MonModalProps extends BaseModalProps {
  mon: CardMon;
}

const MonModal: React.FC<MonModalProps> = ({ mon, ...restProps }) => {
  return (
    <BaseModal className="w-full md:max-w-2xl" {...restProps}>
      <div className="md:flex w-full">
        <div className="w-48 border border-dotted mb-4 mx-auto flex-shrink-0 md:mx-0 md:mb-0 md:mr-8">
          <Image src={mon.image ? mon.image.imageUrl : ""} alt={mon.name} layout="fill" />
        </div>
        <div className="flex flex-col">
          <div className="flex mb-2">
            <div className="flex-1 w-40 text-gray-600 font-bold">Name</div>
            <div className="flex-1 text-gray-900">{mon.name}</div>
          </div>
          {mon.potential && (
            <div className="flex mb-2">
              <div className="flex-1 w-40 text-gray-600 font-bold">Potential</div>
              <div className="flex-1 text-gray-900">{mon.potential}</div>
            </div>
          )}
          <div className="flex mb-2">
            <div className="flex-1 w-40 text-gray-600 font-bold">Tier</div>
            <div className="flex-1 text-gray-900">
              <MonTierBadge tier={mon.tier} />
            </div>
          </div>
          <div className="flex mb-2">
            <div className="flex-1 w-40 text-gray-600 font-bold">Types</div>
            <div className="flex-1 text-gray-900">
              <MonTypeBadge className="mr-0.5" type={mon.firstType} />
              {mon.secondType && <MonTypeBadge type={mon.secondType} />}
            </div>
          </div>
          <div className="flex mb-2">
            <div className="flex-1 w-40 text-gray-600 font-bold">Stars</div>
            <div className="flex-1 text-gray-900">
              <MonStars stars={mon.stars} />
            </div>
          </div>
          <div className="flex mb-2">
            <div className="flex-1 w-40 text-gray-600 font-bold">Total Stats</div>
            <div className="flex-1 text-gray-900">{mon.total}</div>
          </div>
          <div className="flex mb-2">
            <div className="flex-1 w-40 text-gray-600 font-bold">Physical</div>
            <div className="flex-1 text-gray-900">
              <span className="text-blue-500 font-bold">{mon.height}</span>m/${mon.weight}
              kg
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default MonModal;
