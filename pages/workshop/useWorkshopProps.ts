import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { getMergedPageData } from "~/helpers/projectHelpers";
import ROUTES from "~/paths";
import useLikeMutation from "~/queries/useLikeMutation";
import usePaintingListQuery from "~/queries/usePaintingListQuery";
import { userState } from "~/state/user";
import { Painting } from "~/types";
import { WorkshopProps } from "./Workshop.view";

const useWorkshopProps: () => WorkshopProps = () => {
  const user = useRecoilValue(userState);

  const router = useRouter();

  const { data: paintingListData, fetchNextPage, hasNextPage } = usePaintingListQuery();

  const { mutate: like } = useLikeMutation();

  const onClickLike = useCallback(
    (painting: Painting) => {
      like({ contentId: painting.id, contentType: "painting" });
    },
    [like],
  );

  const onDelete = useCallback((painting: Painting) => {}, []);

  const onEdit = useCallback(
    (painting: Painting) => {
      router.push(`${ROUTES.WORKSHOP}/${painting.id}`);
    },
    [router],
  );

  const onNavigateToUpload = useCallback(() => {
    router.push(`${ROUTES.WORKSHOP}/new`);
  }, [router]);

  const paintings = useMemo(() => {
    return paintingListData ? getMergedPageData(paintingListData.pages) : undefined;
  }, [paintingListData]);

  return {
    onClickLike,
    onDelete,
    onEdit,
    onNavigateToUpload,
    paintings,
    user,
    onFetchNextPage: fetchNextPage,
    hasNextPage: hasNextPage || false,
  };
};

export default useWorkshopProps;
