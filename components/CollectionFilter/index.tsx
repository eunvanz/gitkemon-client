import CollectionFilter from "./CollectionFilter";
import useCollectionFilterProps from "./useCollectionFilterProps";

const CollectionFilterContainer: React.FC<{}> = () => {
  const props = useCollectionFilterProps();

  return <CollectionFilter {...props} />;
};

export default CollectionFilterContainer;
