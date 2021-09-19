import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { userState } from "~/state/user";
import { ContentType } from "~/types";
import { ContentTypeListProps } from "./ContentTypeList.view";

const useContentTypeListProps: () => ContentTypeListProps = () => {
  const router = useRouter();

  const { contentType } = router.query as { contentType: ContentType };

  const user = useRecoilValue(userState);

  return {
    contentType,
    user,
  };
};

export default useContentTypeListProps;
