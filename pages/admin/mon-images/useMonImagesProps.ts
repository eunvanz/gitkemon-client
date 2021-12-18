import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "~/api";
import ROUTES from "~/paths";
import useMonImagesQuery, { UseMonImageQueryOptions } from "~/queries/useMonImagesQuery";
import { MonImageSearchCondition } from "~/types";
import { MonImagesProps } from "./MonImages.view";

const useMonImagesProps: () => MonImagesProps = () => {
  const [searchOptions, setSearchOptions] = useState<UseMonImageQueryOptions | undefined>(
    undefined,
  );

  const onSearch = useCallback((condition: MonImageSearchCondition, value) => {
    setSearchOptions({
      condition,
      value,
    });
  }, []);

  const {
    data: monImages,
    isFetching: isSearching,
    refetch: refetchMonImages,
  } = useMonImagesQuery(searchOptions, {
    initialData: [],
    enabled: false,
  });

  useEffect(() => {
    if (searchOptions) {
      refetchMonImages();
    }
  }, [refetchMonImages, searchOptions]);

  const router = useRouter();

  const onEdit = useCallback(
    (id: number) => {
      router.push(`${ROUTES.ADMIN__MON_IMAGES}/${id}`);
    },
    [router],
  );

  const [isDeleting, setIsDeleting] = useState<number | undefined>(undefined);

  const onDelete = useCallback(
    async (id: number) => {
      const isConfirmed = window.confirm("Are you sure to delete image?");
      if (isConfirmed) {
        await api.deleteMonImage(id);
        setIsDeleting(id);
        refetchMonImages();
      }
    },
    [refetchMonImages],
  );

  const onCreate = useCallback(() => {
    router.push(`${ROUTES.ADMIN__MON_IMAGES}/new`);
  }, [router]);

  return {
    onSearch,
    monImages,
    isSearching,
    onEdit,
    onDelete,
    onCreate,
    isDeleting,
  };
};

export default useMonImagesProps;
