import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import ROUTES from "~/paths";
import useContentMutation from "~/queries/useContentMutation";
import { ContentType } from "~/types";
import { ContentProps } from "./Content.view";

const useContentProps: () => ContentProps = () => {
  const { mutateAsync: postContent, isLoading: isSubmitting } = useContentMutation();

  const router = useRouter();

  const onSubmit = useCallback(
    async (type: ContentType, value: string) => {
      const content = {
        type,
        body: value,
      };
      await postContent(content);
      router.push(ROUTES.ADMIN__CONTENTS);
    },
    [postContent, router],
  );

  const onCancel = useCallback(() => {
    router.push(ROUTES.ADMIN__CONTENTS);
  }, [router]);

  const defaultValue = useMemo(() => {
    return "";
  }, []);

  return {
    onSubmit,
    isSubmitting,
    onCancel,
    defaultValue,
  };
};

export default useContentProps;
