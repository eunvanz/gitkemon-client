import { useCallback, useEffect, useState } from "react";
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
import { ContentDetailPageProps } from "./index.page";

const useContentDetailProps: (
  pageProps: ContentDetailPageProps,
) => ContentDetailProps = ({ contentId, contentType }) => {
  const router = useRouter();

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
      setIsEditMode(false);
    },
    [contentId, isNew, patchContent, postContent],
  );

  const onDeleteContent = useCallback(async () => {
    const isConfirmed = await Dialog.confirm({
      content: "Are you sure to delete posting?",
    });
    if (isConfirmed) {
      await deleteContent(Number(contentId));
      toast.dark("Posting has been deleted.");
      router.back();
    }
  }, [contentId, deleteContent, router]);

  const onNavigateBack = useCallback(() => {
    router.back();
  }, [router]);

  const onSubmitComment = useCallback(
    async (value: string, comment?: Comment<Content>) => {
      if (comment) {
        await patchComment({
          body: value,
          id: comment!.id,
        });
        toast.dark("Comment has been updated.");
      } else {
        await postComment({
          body: value,
          contentType,
          contentId: Number(contentId),
        });
        toast.dark("Comment has been created.");
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

  const onCancelEdit = useCallback(() => {
    if (isNew) {
      router.back();
    } else {
      setIsEditMode(false);
    }
  }, [isNew, router]);

  useEffect(() => {
    if (isNew && !user) {
      router.push(ROUTES.SIGN_IN);
    }
  }, [isNew, router, user]);

  return {
    comments,
    contentType,
    isDeletingContent,
    isSubmittingExistingComment,
    isSubmittingNewComment,
    isSubmittingContent: isSubmittingExistingContent || isSubmittingNewContent,
    onCancelEdit,
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
