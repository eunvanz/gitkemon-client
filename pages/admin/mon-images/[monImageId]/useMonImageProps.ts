import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/router";
import api, { CreateMonImageDTO, UpdateMonDTO } from "../../../../api";
import useMonImageQuery from "../../../../queries/useMonImageQuery";
import useMonsQuery from "../../../../queries/useMonsQuery";
import { MonImageFormValues, MonImageProps } from "./MonImage.view";

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
          evolveFromId: monImage.mon!.evolveFromId || undefined,
          tier: monImage.mon!.tier,
          designerName: monImage.designerName,
        }
      : undefined;
  }, [monImage]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [imageFile, setImageFile] = useState<File | undefined>(undefined);

  const onSelectImageFile = useCallback((file: File) => {
    setImageFile(file);
  }, []);

  const onDeleteImageFile = useCallback(() => {
    setImageFile(undefined);
  }, []);

  const onSubmit = useCallback(
    async (values: MonImageFormValues) => {
      if (!imageFile) {
        return alert("Image file is not attached.");
      }
      setIsSubmitting(true);
      if (isNewMonImage) {
        const monImage: CreateMonImageDTO = {
          file: imageFile,
          monId: values.monId,
          designerName: values.designerName,
        };
        const mon: UpdateMonDTO = {
          colPoint: Number(values.colPoint),
          tier: values.tier,
          evolveFromId: values.evolveFromId,
        };
        const evolveFromMon: UpdateMonDTO = {
          evolutionLevel: Number(values.evolutionRequiredLevel),
        };
        try {
          await Promise.all([
            api.postMonImage(monImage),
            api.patchMon(values.monId, mon),
            values.evolveFromId
              ? api.patchMon(values.evolveFromId, evolveFromMon)
              : Promise.resolve(),
          ]);
        } catch (error) {
          // TODO:
        } finally {
          setIsSubmitting(false);
        }
      } else {
        // TODO:
      }
    },
    [imageFile, isNewMonImage],
  );

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
