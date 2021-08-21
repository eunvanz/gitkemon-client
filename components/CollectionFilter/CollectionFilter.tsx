import { useCallback, useState } from "react";
import { FilterIcon } from "@heroicons/react/outline";
import { MonTier, MonType } from "../../types";
import Accordion from "../Accordion";
import BaseModal from "../BaseModal";
import Button from "../Button";

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

  const handleOnApply = useCallback(() => {}, []);

  return (
    <div className="absolute bottom-5 right-5 rounded-full bg-blue-500 p-5 cursor-pointer shadow-sm hover:bg-blue-400">
      <FilterIcon className="w-5 h-5 text-white" />
      <BaseModal
        isOpen={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title="Collection filter"
        footer={
          <div className="text-right">
            <Button className="mr-1" onClick={handleOnApply}>
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
            !filterState.has.includes(true) || !filterState.has.includes(false)
          }
        >
          <div></div>
        </Accordion>
      </BaseModal>
    </div>
  );
};

export default CollectionFilter;
