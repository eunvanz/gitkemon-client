import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { convertURLtoFile } from "~/helpers/commonHelpers";
import ROUTES from "~/paths";
import useMonsQuery from "~/queries/useMonsQuery";
import usePaintingQuery from "~/queries/usePaintingQuery";
import useUpdatePaintingMutation from "~/queries/useUpdatePaintingMutation";
import useUploadPaintingMutation from "~/queries/useUploadPaintingMutation";
import { userState } from "~/state/user";
import { PaintingUploadFormValues, PaintingUploadProps } from "./PaintingUpload.view";
import { PaintingUploadPageProps } from "./index.page";

const usePaintingUploadProps: (props: PaintingUploadPageProps) => PaintingUploadProps = ({
  ssrMons,
  ssrPainting,
  ssrUser,
}) => {
  const router = useRouter();
  const { paintingId } = router.query as { paintingId: string };

  const isNew = useMemo(() => {
    return paintingId === "new";
  }, [paintingId]);

  const { data: painting } = usePaintingQuery(Number(paintingId), {
    enabled: !isNew,
    initialData: ssrPainting || undefined,
  });

  const { data: mons } = useMonsQuery(undefined, {
    enabled: !ssrMons,
    initialData: ssrMons,
  });

  const user = useRecoilValue(userState);

  const defaultValues = useMemo(() => {
    return {
      monId: painting ? painting.monId : undefined,
      designerName: painting
        ? painting.designerName
        : user?.nickname || ssrUser?.nickname,
    };
  }, [painting, ssrUser?.nickname, user?.nickname]);

  const defaultImage = useMemo(() => {
    return painting?.imageUrl;
  }, [painting?.imageUrl]);

  const onNavigateToList = useCallback(() => {
    router.push(ROUTES.WORKSHOP);
  }, [router]);

  const {
    mutateAsync: uploadPainting,
    isLoading: isUploading,
  } = useUploadPaintingMutation();

  const {
    mutateAsync: updatePainting,
    isLoading: isUpdating,
  } = useUpdatePaintingMutation();

  const onSubmit = useCallback(
    async (values: PaintingUploadFormValues & { image: string }) => {
      const file = await convertURLtoFile(values.image, "png");
      if (isNew) {
        await uploadPainting({
          designerName: values.designerName!,
          monId: values.monId!,
          file,
        });
      } else {
        await updatePainting({
          paintingId: Number(paintingId),
          designerName: values.designerName!,
          monId: values.monId!,
          file,
        });
      }
      onNavigateToList();
    },
    [isNew, onNavigateToList, paintingId, updatePainting, uploadPainting],
  );

  return {
    isSubmitting: isUploading || isUpdating,
    mons,
    onNavigateToList,
    onSubmit,
    defaultValues,
    defaultImage,
  };
};

export default usePaintingUploadProps;
