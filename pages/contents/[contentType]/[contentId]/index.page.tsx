import { GetServerSideProps } from "next";
import withBaseLayout from "~/hocs/withBaseLayout";
import { ContentType } from "~/types";
import ContentDetail from "./ContentDetail.view";
import useContentDetailProps from "./useContentDetailProps";

export interface ContentDetailPageProps {
  contentId: string;
  contentType: ContentType;
}

const ContentDetailPage: React.FC<ContentDetailPageProps> = (pageProps) => {
  const props = useContentDetailProps(pageProps);

  return <ContentDetail {...props} />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { contentId, contentType } = ctx.params as {
    contentId: string;
    contentType: ContentType;
  };
  return {
    props: {
      contentId,
      contentType,
    },
  };
};

export default withBaseLayout(ContentDetailPage);
