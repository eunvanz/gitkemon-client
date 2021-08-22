import { useCallback, useEffect, useState } from "react";
import { FilterIcon } from "@heroicons/react/outline";
import union from "lodash/union";
import without from "lodash/without";
import { MON_STARS, MON_TIERS, MON_TYPES } from "../../constants/rules";
import { isArrayEqual } from "../../helpers/commonHelpers";
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

  const [innerFilterState, setInnerFilterState] = useState(filterState);

  useEffect(() => {
    if (isModalVisible) {
      setInnerFilterState(filterState);
    }
  }, [filterState, isModalVisible]);

  const handleOnApply = useCallback(() => {
    onChangeFilter(innerFilterState);
    setIsModalVisible(false);
  }, [innerFilterState, onChangeFilter]);

  return (
    <button
      className="fixed bottom-5 right-5 rounded-full bg-blue-500 p-5 cursor-pointer shadow-md hover:bg-blue-400"
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
            <Button color="primary" className="mr-2" onClick={handleOnApply}>
              Apply
            </Button>
            <Button color="transparent" onClick={() => setIsModalVisible(false)}>
              Close
            </Button>
          </div>
        }
      >
        <Accordion
          title="Possession"
          isOpenDefault={
            !innerFilterState.has.includes(true) || !innerFilterState.has.includes(false)
          }
        >
          <div className="grid grid-cols-3 gap-2">
            <Checkbox
              className="mr-4"
              label="All"
              name="has-all"
              checked={
                innerFilterState.has.includes(true) &&
                innerFilterState.has.includes(false)
              }
              onChange={(checked) =>
                setInnerFilterState((innerFilterState) => ({
                  ...innerFilterState,
                  has: checked ? [true, false] : [],
                }))
              }
            />
            <Checkbox
              className="mr-4"
              label="Owned"
              name="has-owned"
              checked={innerFilterState.has.includes(true)}
              onChange={(checked) =>
                setInnerFilterState((innerFilterState) => ({
                  ...innerFilterState,
                  has: checked
                    ? union(innerFilterState.has, [true])
                    : without(innerFilterState.has, true),
                }))
              }
            />
            <Checkbox
              className="mr-4"
              label="Not owned"
              name="has-not-owned"
              checked={innerFilterState.has.includes(false)}
              onChange={(checked) =>
                setInnerFilterState((innerFilterState) => ({
                  ...innerFilterState,
                  has: checked
                    ? union(innerFilterState.has, [false])
                    : without(innerFilterState.has, false),
                }))
              }
            />
          </div>
        </Accordion>
        <Accordion
          title="Tier"
          isOpenDefault={!isArrayEqual(innerFilterState.tier, MON_TIERS)}
        >
          <div className="grid grid-cols-3 gap-2">
            <Checkbox
              label="All"
              name="tier-all"
              checked={isArrayEqual(innerFilterState.tier, MON_TIERS)}
              onChange={(checked) =>
                setInnerFilterState((innerFilterState) => ({
                  ...innerFilterState,
                  tier: checked ? MON_TIERS : [],
                }))
              }
            />
            {MON_TIERS.map((tier) => (
              <Checkbox
                key={tier}
                label={<MonTierBadge tier={tier} />}
                name={`tier-${tier}`}
                checked={innerFilterState.tier.includes(tier)}
                onChange={(checked) =>
                  setInnerFilterState((innerFilterState) => ({
                    ...innerFilterState,
                    tier: checked
                      ? union(innerFilterState.tier, [tier])
                      : without(innerFilterState.tier, tier),
                  }))
                }
              />
            ))}
          </div>
        </Accordion>
        <Accordion
          title="Stars"
          isOpenDefault={!isArrayEqual(innerFilterState.stars, MON_STARS)}
        >
          <div className="grid grid-cols-3 gap-2">
            <Checkbox
              label="All"
              name="stars-all"
              checked={isArrayEqual(innerFilterState.stars, MON_STARS)}
              onChange={(checked) =>
                setInnerFilterState((innerFilterState) => ({
                  ...innerFilterState,
                  stars: checked ? MON_STARS : [],
                }))
              }
            />
            {MON_STARS.map((stars) => (
              <Checkbox
                key={stars}
                label={<MonStars size="xs" stars={stars} />}
                name={`stars-${stars}`}
                checked={innerFilterState.stars.includes(stars)}
                onChange={(checked) =>
                  setInnerFilterState((innerFilterState) => ({
                    ...innerFilterState,
                    stars: checked
                      ? union(innerFilterState.stars, [stars])
                      : without(innerFilterState.stars, stars),
                  }))
                }
              />
            ))}
          </div>
        </Accordion>
        <Accordion
          title="Type"
          isOpenDefault={!isArrayEqual(innerFilterState.type, MON_TYPES)}
        >
          <div className="grid grid-cols-3 gap-2">
            <Checkbox
              label="All"
              name="type-all"
              checked={isArrayEqual(innerFilterState.type, MON_TYPES)}
              onChange={(checked) =>
                setInnerFilterState((innerFilterState) => ({
                  ...innerFilterState,
                  type: checked ? MON_TYPES : [],
                }))
              }
            />
            {MON_TYPES.map((type) => (
              <Checkbox
                key={type}
                label={<MonTypeBadge type={type} />}
                name={`type-${type}`}
                checked={innerFilterState.type.includes(type)}
                onChange={(checked) =>
                  setInnerFilterState((innerFilterState) => ({
                    ...innerFilterState,
                    type: checked
                      ? union(innerFilterState.type, [type])
                      : without(innerFilterState.type, type),
                  }))
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
