import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import Dialog from "~/components/Dialog";
import ROUTES from "~/paths";
import useCommentsQuery from "~/queries/useCommentsQuery";
import useContentQuery from "~/queries/useContentQuery";
import useDeleteCommentMutation from "~/queries/useDeleteCommentMutation";
import useDeleteContentMutation from "~/queries/useDeleteContentMutation";
import useLikeMutation from "~/queries/useLikeMutation";
import usePatchCommentMutation from "~/queries/usePatchCommentMutation";
import usePatchContentMutation from "~/queries/usePatchContentMutation";
import usePostCommentMutation from "~/queries/usePostCommentMutation";
import usePostContentMutation from "~/queries/usePostContentMutation";
import { userState } from "~/state/user";
import { Comment, Content, ContentType } from "~/types";
import { ContentDetailProps } from "./ContentDetail.view";

const useContentDetailProps: () => ContentDetailProps = () => {
  const router = useRouter();
  const { contentId, contentType } = router.query as {
    contentId: string;
    contentType: ContentType;
  };

  const isNew = isNaN(Number(contentId));

  const { data: content } = useContentQuery(Number(contentId), {
    enabled: !isNew,
  });

  const { data: comments } = useCommentsQuery(Number(contentId), {
    enabled: !isNew,
  });

  const {
    mutateAsync: postContent,
    isLoading: isSubmittingNewContent,
  } = usePostContentMutation(contentType);

  const {
    mutateAsync: patchContent,
    isLoading: isSubmittingExistingContent,
  } = usePatchContentMutation(contentType);

  const {
    mutateAsync: deleteContent,
    isLoading: isDeletingContent,
  } = useDeleteContentMutation(contentType);

  const {
    mutateAsync: postComment,
    isLoading: isSubmittingNewComment,
  } = usePostCommentMutation();

  const {
    mutateAsync: patchComment,
    isLoading: isSubmittingExistingComment,
  } = usePatchCommentMutation(Number(contentId));

  const { mutateAsync: deleteComment } = useDeleteCommentMutation(Number(contentId));

  const user = useRecoilValue(userState);

  const [isEditMode, setIsEditMode] = useState(isNew);

  const onEditContent = useCallback(() => {
    setIsEditMode(true);
  }, []);

  const { mutate: like } = useLikeMutation();

  const onClickLike = useCallback(async () => {
    if (!user) {
      const isConfirmed = await Dialog.confirm({
        content: "Sign in is required. Would you like to sign in?",
        okText: "Yes",
        cancelText: "No",
      });
      if (isConfirmed) {
        router.push(ROUTES.SIGN_IN);
      }
    } else {
      like({
        contentId: Number(contentId),
        contentType,
        isLike: !content?.isLiked,
      });
    }
  }, [content?.isLiked, contentId, contentType, like, router, user]);

  const onSubmitContent = useCallback(
    async (values: { type: ContentType; body: string; title: string }) => {
      if (isNew) {
        await postContent(values);
        toast.dark("New posting has been created.");
      } else {
        await patchContent({ id: Number(contentId), ...values });
        toast.dark("Posting has been updated.");
      }
      router.back();
    },
    [contentId, isNew, patchContent, postContent, router],
  );

  const onDeleteContent = useCallback(async () => {
    await deleteContent(Number(contentId));
    toast.dark("Posting has been deleted.");
    router.back();
  }, [contentId, deleteContent, router]);

  const onNavigateBack = useCallback(() => {
    router.back();
  }, [router]);

  const onSubmitComment = useCallback(
    async (value: string, comment?: Comment<Content>) => {
      if (comment) {
        await patchComment({
          body: value,
          commentId: comment!.id,
        });
      } else {
        await postComment({
          body: value,
          contentType,
          contentId: Number(contentId),
        });
      }
    },
    [contentId, contentType, patchComment, postComment],
  );

  const onDeleteComment = useCallback(
    (comment: Comment<Content>) => {
      deleteComment(comment.id);
    },
    [deleteComment],
  );

  return {
    comments,
    contentType,
    isDeletingContent,
    isSubmittingExistingComment,
    isSubmittingNewComment,
    isSubmittingContent: isSubmittingExistingContent || isSubmittingNewContent,
    onClickLike,
    onDeleteComment,
    onDeleteContent,
    onEditContent,
    onNavigateBack,
    onSubmitComment,
    onSubmitContent,
    content,
    isEditMode,
    user,
  };
};

export default useContentDetailProps;
