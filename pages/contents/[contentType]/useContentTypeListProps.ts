import { useRouter } from "next/router";
import { ContentType } from "~/types";
import { ContentTypeListProps } from "./ContentTypeList.view";

const useContentTypeListProps: () => ContentTypeListProps = () => {
  const router = useRouter();

  const { contentType } = router.query as { contentType: ContentType };

  return {
    contentType,
  };
};

export default useContentTypeListProps;
