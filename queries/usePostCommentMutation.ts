import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import api from "~/api";
import { QUERY_KEY } from "~/types";

const usePostCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(api.postComment, {
    onSuccess: (_, { contentId }) => {
      queryClient.refetchQueries([QUERY_KEY.COMMENTS, contentId]);
      queryClient.refetchQueries([QUERY_KEY.CONTENT, contentId]);
      toast.dark("Comment has been posted.");
    },
  });
};

export default usePostCommentMutation;
