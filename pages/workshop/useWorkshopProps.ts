import { useCallback } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import useList from "~/hooks/useList";
import ROUTES from "~/paths";
import useDeletePaintingMutation from "~/queries/useDeletePaintingMutation";
import useLikeMutation from "~/queries/useLikeMutation";
import usePaintingListQuery from "~/queries/usePaintingListQuery";
import { userState } from "~/state/user";
import { Painting } from "~/types";
import { WorkshopProps } from "./Workshop.view";

const useWorkshopProps: () => WorkshopProps = () => {
  const user = useRecoilValue(userState);

  const router = useRouter();

  const { data: paintings, fetchNextPage, hasNextPage } = useList(usePaintingListQuery);

  const { mutate: like } = useLikeMutation();

  const { mutate: deletePainting } = useDeletePaintingMutation();

  const onClickLike = useCallback(
    (painting: Painting) => {
      like({
        contentId: painting.id,
        contentType: "painting",
        isLike: !painting.isLiked,
      });
    },
    [like],
  );

  const onDelete = useCallback(
    (painting: Painting) => {
      deletePainting(painting.id);
    },
    [deletePainting],
  );

  const onEdit = useCallback(
    (painting: Painting) => {
      router.push(`${ROUTES.WORKSHOP}/${painting.id}`);
    },
    [router],
  );

  const onNavigateToUpload = useCallback(() => {
    router.push(`${ROUTES.WORKSHOP}/new`);
  }, [router]);

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
