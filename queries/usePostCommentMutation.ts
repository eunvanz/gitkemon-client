import { useMutation, useQueryClient } from "react-query";
import api from "~/api";
import { QUERY_KEY } from "~/types";

const usePostCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(api.postComment, {
    onSuccess: (_, { contentId }) => {
      queryClient.refetchQueries([
        [QUERY_KEY.COMMENTS, contentId],
        [QUERY_KEY.CONTENT, contentId],
      ]);
    },
  });
};

export default usePostCommentMutation;
