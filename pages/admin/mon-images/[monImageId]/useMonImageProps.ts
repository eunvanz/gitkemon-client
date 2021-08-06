import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/router";
import useMonImageQuery from "../../../../queries/useMonImageQuery";
import useMonsQuery from "../../../../queries/useMonsQuery";
import { MonImageProps } from "./MonImage.view";

const useMonImageProps: () => MonImageProps = () => {
  const router = useRouter();

  const { monImageId } = router.query as { monImageId: string };

  const isNewMonImage = useMemo(() => {
    return monImageId === "new";
  }, [monImageId]);

  const { data: monImage } = useMonImageQuery(Number(monImageId), {
    enabled: !isNaN(Number(monImageId)),
  });

  const { data: mons } = useMonsQuery();

  const defaultFormValues = useMemo(() => {
    return monImage
      ? {
          monId: monImage.mon!.id,
          colPoint: monImage.mon!.colPoint,
          evolveFromId: monImage.mon!.evolveFromId,
          tier: monImage.mon!.tier,
          designerName: monImage.designerName,
        }
      : undefined;
  }, [monImage]);

  const isSubmitting = useMemo(() => {
    return false;
  }, []);

  const [imageFile, setImageFile] = useState<File | undefined>(undefined);

  const onSelectImageFile = useCallback((file: File) => {
    setImageFile(file);
  }, []);

  const onDeleteImageFile = useCallback(() => {
    setImageFile(undefined);
  }, []);

  const onSubmit = useCallback(() => {}, []);

  return {
    defaultFormValues,
    mons,
    imageFile,
    onSelectImageFile,
    onDeleteImageFile,
    isSubmitting,
    onSubmit,
  };
};

export default useMonImageProps;
