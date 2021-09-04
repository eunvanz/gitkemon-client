import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import ROUTES from "~/paths";
import useDeletePaintingMutation from "~/queries/useDeletePaintingMutation";
import useLikeMutation from "~/queries/useLikeMutation";
import { userState } from "~/state/user";
import { PaintingCardContainerProps } from ".";
import { PaintingCardProps } from "./PaintingCard";

const usePaintingCardProps: (
  containerProps: PaintingCardContainerProps,
) => PaintingCardProps = ({ painting, customSize }) => {
  const user = useRecoilValue(userState);

  const router = useRouter();

  const { mutate: like } = useLikeMutation();

  const { mutate: deletePainting } = useDeletePaintingMutation();

  const onClickLike = useCallback(() => {
    like({
      contentId: painting.id,
      contentType: "painting",
      isLike: !painting.isLiked,
    });
  }, [like, painting.id, painting.isLiked]);

  const onDelete = useCallback(() => {
    deletePainting(painting.id);
  }, [deletePainting, painting.id]);

  const onEdit = useCallback(() => {
    router.push(`${ROUTES.WORKSHOP}/${painting.id}`);
  }, [painting.id, router]);

  const isManageable = useMemo(() => {
    return painting.designerId === user?.id;
  }, [painting.designerId, user?.id]);

  return {
    onClickLike,
    onDelete,
    onEdit,
    user,
    painting,
    isManageable,
    customSize,
  };
};

export default usePaintingCardProps;
