import { useRecoilState } from "recoil";
import { collectionFilterState } from "~/state/collectionFilter";
import { CollectionFilterProps } from "./CollectionFilter";

const useCollectionFilterProps: () => CollectionFilterProps = () => {
  const [filterState, setFilterState] = useRecoilState(collectionFilterState);

  return {
    filterState,
    onChangeFilter: setFilterState,
  };
};

export default useCollectionFilterProps;
