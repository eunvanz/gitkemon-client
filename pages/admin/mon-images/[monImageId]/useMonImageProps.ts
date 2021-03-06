import { useCallback, useEffect, useMemo, useState } from "react";
import { message } from "antd";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import api, { CreateMonImageDto, UpdateMonDto, UpdateMonImageDto } from "~/api";
import { convertURLtoFile } from "~/helpers/commonHelpers";
import ROUTES from "~/paths";
import useMonImageQuery from "~/queries/useMonImageQuery";
import useMonQuery from "~/queries/useMonQuery";
import useMonsQuery from "~/queries/useMonsQuery";
import { Mon, MonImage, QUERY_KEY } from "~/types";
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

  const queryClient = useQueryClient();

  const { monImageId } = router.query as { monImageId: string };

  const isNewMonImage = useMemo(() => {
    return monImageId === "new";
  }, [monImageId]);

  const { data: monImage, isLoading: isMonImageLoading } = useMonImageQuery(
    Number(monImageId),
    {
      enabled: !isNewMonImage,
      initialData: ssrMonImage || undefined,
    },
  );

  const { data: mons, isLoading: isMonsLoading, refetch: refetchMons } = useMonsQuery(
    undefined,
    {
      initialData: ssrMons,
      enabled: !ssrMons,
    },
  );

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

  const [isImageModified, setIsImageModified] = useState(false);

  const onSelectImageFile = useCallback((file: File) => {
    setImageFile(file);
  }, []);

  const onDeleteImageFile = useCallback(() => {
    setImageFile(undefined);
    setIsImageModified(true);
  }, []);

  const [selectedMonId, setSelectedMonId] = useState<number | undefined>(undefined);

  const onSelectMon = useCallback((monId: number) => {
    setSelectedMonId(monId);
  }, []);

  const { data: selectedMon, refetch: refetchMon } = useMonQuery(selectedMonId, {
    enabled: !!selectedMonId,
  });

  useEffect(() => {
    if (selectedMonId) {
      refetchMon();
    }
  }, [refetchMon, selectedMonId]);

  const onSubmit = useCallback(
    async (values: MonImageFormValues) => {
      if (!imageFile) {
        return alert("Image file is not attached.");
      }
      setIsSubmitting(true);
      if (isNewMonImage) {
        const monImage: CreateMonImageDto = {
          file: imageFile,
          monId: values.monId,
          designerName: values.designerName,
        };
        const mon: UpdateMonDto = {
          colPoint: Number(values.colPoint),
          tier: values.tier,
        };
        const evolveFromMon: UpdateMonDto = {
          evolutionLevel: Number(values.evolutionRequiredLevel),
        };
        try {
          await Promise.all([
            api.postMonImage(monImage),
            api.patchMon(values.monId, mon),
            selectedMon?.evolveFromId
              ? api.patchMon(selectedMon.evolveFromId, evolveFromMon)
              : Promise.resolve(),
          ]);
          queryClient.resetQueries(QUERY_KEY.MON_IMAGES);
          router.push(ROUTES.ADMIN__MON_IMAGES);
          message.success("Mon image has been created.");
        } catch (error) {
          setIsSubmitting(false);
        }
      } else {
        // ????????? ??????
        const monImage: UpdateMonImageDto = {
          file: isImageModified ? imageFile : undefined,
          monId: values.monId,
          designerName: values.designerName,
        };
        try {
          await api.patchMonImage(Number(monImageId), monImage);
          queryClient.resetQueries([QUERY_KEY.MON_IMAGES]);
          router.push(ROUTES.ADMIN__MON_IMAGES);
          message.success("Mon image has been modified");
        } catch (error) {
          setIsSubmitting(false);
        }
        queryClient.resetQueries(QUERY_KEY.MONS);
      }
      refetchMons();
    },
    [
      imageFile,
      isImageModified,
      isNewMonImage,
      monImageId,
      queryClient,
      refetchMons,
      router,
      selectedMon?.evolveFromId,
    ],
  );

  const onNavigateToList = useCallback(() => {
    router.push(ROUTES.ADMIN__MON_IMAGES);
  }, [router]);

  const isLoading = useMemo(() => {
    return isMonImageLoading || isMonsLoading;
  }, [isMonImageLoading, isMonsLoading]);

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
    onSelectMon,
    selectedMon,
  };
};

export default useMonImageProps;
