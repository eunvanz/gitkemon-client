import { useState } from "react";
import { FilterIcon } from "@heroicons/react/outline";
import union from "lodash/union";
import without from "lodash/without";
import { MonTier, MonType } from "../../types";
import Accordion from "../Accordion";
import BaseModal from "../BaseModal";
import Button from "../Button";
import Checkbox from "../Checkbox";

export interface CollectionFilter {
  has: boolean[];
  tier: MonTier[];
  type: MonType[];
  stars: number[];
}

export interface CollectionFilterProps {
  onChangeFilter: (filter: CollectionFilter) => void;
  filterState: CollectionFilter;
}

const CollectionFilter: React.FC<CollectionFilterProps> = ({
  onChangeFilter,
  filterState,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <button
      className="absolute bottom-5 right-5 rounded-full bg-blue-500 p-5 cursor-pointer shadow-sm hover:bg-blue-400"
      onClick={() => setIsModalVisible(true)}
    >
      <FilterIcon className="w-5 h-5 text-white" />
      <BaseModal
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
          <div>
            <Checkbox
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
      </BaseModal>
    </button>
  );
};

export default CollectionFilter;
