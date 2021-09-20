import { GetServerSideProps } from "next";
import Head from "next/head";
import api from "~/api";
import withBaseLayout from "~/hocs/withBaseLayout";
import { Content, ContentType } from "~/types";
import ContentDetail from "./ContentDetail.view";
import useContentDetailProps from "./useContentDetailProps";

export interface ContentDetailPageProps {
  contentId: string;
  contentType: ContentType;
  content?: Content;
}

const ContentDetailPage: React.FC<ContentDetailPageProps> = (pageProps) => {
  const props = useContentDetailProps(pageProps);

  const title = pageProps.content
    ? `${pageProps.content.title} - by ${pageProps.content.user.nickname}`
    : "Gitkémon";

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <ContentDetail {...props} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { contentId, contentType } = ctx.params as {
    contentId: string;
    contentType: ContentType;
  };
  let content;
  if (!isNaN(Number(contentId))) {
    await api.incrementContentView(Number(contentId));
    const [fetchedContent] = await Promise.all([
      api.getContent(Number(contentId)),
      api.incrementContentView(Number(contentId)),
    ]);
    content = fetchedContent;
  }
  return {
    props: {
      contentId,
      contentType,
      content,
    },
  };
};

export default withBaseLayout(ContentDetailPage);
