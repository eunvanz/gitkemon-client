import ContentDetail from "./ContentDetail.view";
import useContentDetailProps from "./useContentDetailProps";

const ContentDetailPage: React.FC<void> = () => {
  const props = useContentDetailProps();

  return <ContentDetail {...props} />;
};

export default ContentDetailPage;
