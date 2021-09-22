import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import api from "~/api";
import { ContentType, QUERY_KEY } from "~/types";

const usePostContentMutation = (type: ContentType) => {
  const queryClient = useQueryClient();

  return useMutation(api.postContent, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.CONTENT_LIST, type]);
      toast.dark("New posting has been created.");
    },
  });
};

export default usePostContentMutation;
