import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import api, { CreateMonImageDTO, UpdateMonDTO } from "../../../../api";
import { convertURLtoFile } from "../../../../helpers/commonHelpers";
import ROUTES from "../../../../paths";
import useMonImageQuery from "../../../../queries/useMonImageQuery";
import useMonsQuery from "../../../../queries/useMonsQuery";
import { Mon, MonImage } from "../../../../types";
import { MonImageFormValues, MonImageProps } from "./MonImage.view";

export interface UseMonImagePropsParams {
  ssrMons?: Mon[];
  ssrMonImage?: MonImage | null;
}

const useMonImageProps: (params: UseMonImagePropsParams) => MonImageProps = ({
  ssrMonImage,
  ssrMons,
}) => {
  const router = useRouter();

  const { monImageId } = router.query as { monImageId: string };

  const isNewMonImage = useMemo(() => {
    return monImageId === "new";
  }, [monImageId]);

  const { data: monImage, isFetching: isMonImageFetching } = useMonImageQuery(
    Number(monImageId),
    {
      enabled: !isNaN(Number(monImageId)),
      initialData: ssrMonImage || undefined,
    },
  );

  const { data: mons, isFetching: isMonsFetching } = useMonsQuery({
    initialData: ssrMons,
  });

  const defaultFormValues = useMemo(() => {
    return monImage
      ? {
          monId: monImage.__mon__!.id,
          colPoint: monImage.__mon__!.colPoint,
          evolveFromId: monImage.__mon__!.evolveFromId || undefined,
          tier: monImage.__mon__!.tier,
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

  const onNavigateToList = useCallback(() => {
    router.push(ROUTES.ADMIN__MON_IMAGES);
  }, [router]);

  const isLoading = useMemo(() => {
    return isMonImageFetching || isMonsFetching;
  }, [isMonImageFetching, isMonsFetching]);

  const setFileFromMonImage = useCallback(async () => {
    if (!monImage) {
      return undefined;
    }
    const monImageFile = await convertURLtoFile(monImage.imageUrl);
    setImageFile(monImageFile);
  }, [monImage]);

  useEffect(() => {
    if (monImage) {
      setFileFromMonImage();
    }
  }, [monImage, setFileFromMonImage]);

  return {
    defaultFormValues,
    mons,
    imageFile,
    onSelectImageFile,
    onDeleteImageFile,
    isSubmitting,
    onSubmit,
    onNavigateToList,
    isLoading,
  };
};

export default useMonImageProps;
