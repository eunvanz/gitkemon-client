import { useMutation, useQueryClient } from "react-query";
import api from "~/api";
import { assertNotEmpty } from "~/helpers/commonHelpers";
import { Comment, Content, QUERY_KEY } from "~/types";

const useDeleteCommentMutation = (contentId: number) => {
  const queryClient = useQueryClient();

  return useMutation(api.deleteComment, {
    onMutate: (id) => {
      queryClient.setQueryData<Comment<Content>[]>(
        [QUERY_KEY.COMMENTS, contentId],
        (oldData) => {
          assertNotEmpty(oldData);
          return oldData.filter((data) => data.id !== id);
        },
      );
    },
    onSuccess: () => {
      queryClient.refetchQueries([QUERY_KEY.COMMENTS, contentId]);
      queryClient.refetchQueries([QUERY_KEY.CONTENT, contentId]);
    },
  });
};

export default useDeleteCommentMutation;
