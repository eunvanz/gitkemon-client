import withBaseLayout from "../../../hocs/withBaseLayout";
import Collections from "./Collections.view";
import useCollectionsProps from "./useCollectionsProps";

const CollectionsPage: React.FC<void> = () => {
  const props = useCollectionsProps();

  return <Collections {...props} />;
};

export default withBaseLayout(CollectionsPage);
