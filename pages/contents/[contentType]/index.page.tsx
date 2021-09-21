import { useMemo } from "react";
import Head from "next/head";
import withBaseLayout from "~/hocs/withBaseLayout";
import ContentTypeList from "./ContentTypeList.view";
import useContentTypeListProps from "./useContentTypeListProps";

const ContentTypeListPage: React.FC<void> = () => {
  const props = useContentTypeListProps();

  const title = useMemo(() => {
    switch (props.contentType) {
      case "notice":
        return "Notices - Gitkémon";
      case "tip":
        return "Tips - Gitkémon";
      default:
        return "Gitkémon";
    }
  }, [props.contentType]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <ContentTypeList {...props} />
    </>
  );
};

export default withBaseLayout(ContentTypeListPage);
