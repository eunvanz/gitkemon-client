import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { getMergedPageData } from "~/helpers/projectHelpers";
import ROUTES from "~/paths";
import useContentListQuery from "~/queries/useContentListQuery";
import { ContentType } from "~/types";
import { ContentsProps } from "./Contents.view";

const useContentsProps: () => ContentsProps = () => {
  const [contentType, setContentType] = useState<ContentType>("notice");

  const { data: contentData } = useContentListQuery({ type: contentType, size: 9999 });

  const router = useRouter();

  const onEdit = useCallback(
    (id: number) => {
      router.push(`${ROUTES.ADMIN__CONTENTS}/${id}`);
    },
    [router],
  );

  return {
    contentType,
    onChangeContentType: setContentType,
    contents: contentData ? getMergedPageData(contentData.pages) : undefined,
    onEdit,
  };
};

export default useContentsProps;
