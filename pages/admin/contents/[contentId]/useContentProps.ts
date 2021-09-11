import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ROUTES from "~/paths";
import useContentQuery from "~/queries/useContentQuery";
import usePatchContentMutation from "~/queries/usePatchContentMutation";
import usePostContentMutation from "~/queries/usePostContentMutation";
import { ContentType } from "~/types";
import { ContentFormValues, ContentProps } from "./Content.view";
import { ContentPageProps } from "./index.page";

const useContentProps: (pageProps: ContentPageProps) => ContentProps = ({
  contentId,
}) => {
  const [type, setType] = useState<ContentType>("notice");

  const { mutateAsync: postContent, isLoading: isPosting } = usePostContentMutation(type);
  const { mutateAsync: patchContent, isLoading: isPatching } = usePatchContentMutation(
    type,
  );

  const { data: content } = useContentQuery(Number(contentId), {
    enabled: contentId !== "new",
  });

  const router = useRouter();

  const onSubmit = useCallback(
    async (formValues: ContentFormValues) => {
      if (contentId === "new") {
        await postContent(formValues);
      } else {
        await patchContent({ id: Number(contentId), ...formValues });
      }
      router.push(ROUTES.ADMIN__CONTENTS);
    },
    [contentId, patchContent, postContent, router],
  );

  const onCancel = useCallback(() => {
    router.push(ROUTES.ADMIN__CONTENTS);
  }, [router]);

  useEffect(() => {
    if (content) {
      setType(content.type);
    }
  }, [content]);

  return {
    onSubmit,
    isSubmitting: isPosting || isPatching,
    onCancel,
    content,
    type,
    onChangeType: setType,
  };
};

export default useContentProps;
