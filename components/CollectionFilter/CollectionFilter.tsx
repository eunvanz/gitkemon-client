import { useState } from "react";
import { FilterIcon } from "@heroicons/react/outline";
import union from "lodash/union";
import without from "lodash/without";
import { MON_STARS, MON_TIERS, MON_TYPES } from "../../constants/rules";
import { capitalize, isArrayEqual } from "../../helpers/commonHelpers";
import { MonTier, MonType } from "../../types";
import Accordion from "../Accordion";
import BaseModal from "../BaseModal";
import Button from "../Button";
import Checkbox from "../Checkbox";
import MonStars from "../MonStars";
import MonTierBadge from "../MonTierBadge";
import MonTypeBadge from "../MonTypeBadge";

export interface CollectionFilterState {
  has: boolean[];
  tier: MonTier[];
  type: MonType[];
  stars: number[];
}

export interface CollectionFilterProps {
  onChangeFilter: (filter: CollectionFilterState) => void;
  filterState: CollectionFilterState;
}

const CollectionFilter: React.FC<CollectionFilterProps> = ({
  onChangeFilter,
  filterState,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <button
      className="fixed bottom-5 right-5 rounded-full bg-blue-500 p-5 cursor-pointer shadow-sm hover:bg-blue-400"
      onClick={() => setIsModalVisible(true)}
    >
      <FilterIcon className="w-5 h-5 text-white" />
      <BaseModal
        className="w-full sm:w-40"
        isOpen={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title="Collection filter"
        footer={
          <div className="text-right">
            <Button color="transparent" onClick={() => setIsModalVisible(false)}>
              Close
            </Button>
          </div>
        }
      >
        <Accordion
          title="Possession"
          isOpenDefault={
            !filterState.has.includes(true) || !filterState.has.includes(false)
          }
        >
          <div className="grid grid-cols-3 gap-2">
            <Checkbox
              className="mr-4"
              label="All"
              name="has-all"
              checked={filterState.has.includes(true) && filterState.has.includes(false)}
              onChange={(checked) =>
                onChangeFilter({
                  ...filterState,
                  has: checked ? [true, false] : [],
                })
              }
            />
            <Checkbox
              className="mr-4"
              label="Owned"
              name="has-owned"
              checked={filterState.has.includes(true)}
              onChange={(checked) =>
                onChangeFilter({
                  ...filterState,
                  has: checked
                    ? union(filterState.has, [true])
                    : without(filterState.has, true),
                })
              }
            />
            <Checkbox
              className="mr-4"
              label="Not owned"
              name="has-not-owned"
              checked={filterState.has.includes(false)}
              onChange={(checked) =>
                onChangeFilter({
                  ...filterState,
                  has: checked
                    ? union(filterState.has, [false])
                    : without(filterState.has, false),
                })
              }
            />
          </div>
        </Accordion>
        <Accordion
          title="Tier"
          isOpenDefault={!isArrayEqual(filterState.tier, MON_TIERS)}
        >
          <div className="grid grid-cols-3 gap-2">
            <Checkbox
              label="All"
              name="tier-all"
              checked={isArrayEqual(filterState.tier, MON_TIERS)}
              onChange={(checked) =>
                onChangeFilter({
                  ...filterState,
                  tier: checked ? MON_TIERS : [],
                })
              }
            />
            {MON_TIERS.map((tier) => (
              <Checkbox
                key={tier}
                label={<MonTierBadge tier={tier} />}
                name={`tier-${tier}`}
                checked={filterState.tier.includes(tier)}
                onChange={(checked) =>
                  onChangeFilter({
                    ...filterState,
                    tier: checked
                      ? union(filterState.tier, [tier])
                      : without(filterState.tier, tier),
                  })
                }
              />
            ))}
          </div>
        </Accordion>
        <Accordion
          title="Stars"
          isOpenDefault={!isArrayEqual(filterState.stars, MON_STARS)}
        >
          <div className="grid grid-cols-3 gap-2">
            <Checkbox
              label="All"
              name="stars-all"
              checked={isArrayEqual(filterState.stars, MON_STARS)}
              onChange={(checked) =>
                onChangeFilter({
                  ...filterState,
                  stars: checked ? MON_STARS : [],
                })
              }
            />
            {MON_STARS.map((stars) => (
              <Checkbox
                key={stars}
                label={<MonStars size="xs" stars={stars} />}
                name={`stars-${stars}`}
                checked={filterState.stars.includes(stars)}
                onChange={(checked) =>
                  onChangeFilter({
                    ...filterState,
                    stars: checked
                      ? union(filterState.stars, [stars])
                      : without(filterState.stars, stars),
                  })
                }
              />
            ))}
          </div>
        </Accordion>
        <Accordion
          title="Type"
          isOpenDefault={!isArrayEqual(filterState.type, MON_TYPES)}
        >
          <div className="grid grid-cols-3 gap-2">
            <Checkbox
              label="All"
              name="type-all"
              checked={isArrayEqual(filterState.type, MON_TYPES)}
              onChange={(checked) =>
                onChangeFilter({
                  ...filterState,
                  type: checked ? MON_TYPES : [],
                })
              }
            />
            {MON_TYPES.map((type) => (
              <Checkbox
                key={type}
                label={<MonTypeBadge type={type} />}
                name={`type-${type}`}
                checked={filterState.type.includes(type)}
                onChange={(checked) =>
                  onChangeFilter({
                    ...filterState,
                    type: checked
                      ? union(filterState.type, [type])
                      : without(filterState.type, type),
                  })
                }
              />
            ))}
          </div>
        </Accordion>
      </BaseModal>
    </button>
  );
};

export default CollectionFilter;
