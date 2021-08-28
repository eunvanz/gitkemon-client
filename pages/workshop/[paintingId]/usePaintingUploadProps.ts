import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { PaintingUploadPageProps } from ".";
import { convertURLtoFile } from "../../../helpers/commonHelpers";
import ROUTES from "../../../paths";
import useMonsQuery from "../../../queries/useMonsQuery";
import useUploadPaintingMutation from "../../../queries/useUploadPaintingMutation";
import { userState } from "../../../state/user";
import { PaintingUploadFormValues, PaintingUploadProps } from "./PaintingUpload.view";

const usePaintingUploadProps: (props: PaintingUploadPageProps) => PaintingUploadProps = ({
  ssrMons,
}) => {
  const { data: mons } = useMonsQuery(undefined, {
    enabled: !ssrMons,
    initialData: ssrMons,
  });

  const user = useRecoilValue(userState);

  const defaultValues = useMemo(() => {
    return {
      designerName: user ? user.nickname : undefined,
    };
  }, [user]);

  const router = useRouter();

  const onNavigateToList = useCallback(() => {
    router.push(ROUTES.WORKSHOP);
  }, [router]);

  const { mutate: uploadPainting, isLoading: isSubmitting } = useUploadPaintingMutation();

  const onSubmit = useCallback(
    async (values: PaintingUploadFormValues & { image: string }) => {
      const file = await convertURLtoFile(values.image, "png");
      uploadPainting({
        designerName: values.designerName!,
        monId: values.monId!,
        file,
      });
    },
    [uploadPainting],
  );

  return {
    isSubmitting,
    mons,
    onNavigateToList,
    onSubmit,
    defaultValues,
  };
};

export default usePaintingUploadProps;
