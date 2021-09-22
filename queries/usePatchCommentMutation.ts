import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import api from "~/api";
import { QUERY_KEY } from "~/types";

const usePatchCommentMutation = (contentId: number) => {
  const queryClient = useQueryClient();

  return useMutation(api.patchComment, {
    onSuccess: () => {
      queryClient.refetchQueries([QUERY_KEY.COMMENTS, contentId]);
      queryClient.refetchQueries([QUERY_KEY.CONTENT, contentId]);
      toast.dark("Comment has been updated.");
    },
  });
};

export default usePatchCommentMutation;
