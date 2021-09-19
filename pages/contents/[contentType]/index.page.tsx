import withBaseLayout from "~/hocs/withBaseLayout";
import ContentTypeList from "./ContentTypeList.view";
import useContentTypeListProps from "./useContentTypeListProps";

const ContentTypeListPage: React.FC<void> = () => {
  const props = useContentTypeListProps();

  return <ContentTypeList {...props} />;
};

export default withBaseLayout(ContentTypeListPage);
