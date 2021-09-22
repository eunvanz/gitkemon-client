import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import api from "~/api";
import { ContentType, QUERY_KEY } from "~/types";

const useDeleteContentMutation = (type: ContentType) => {
  const queryClient = useQueryClient();

  return useMutation(api.deleteContent, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.CONTENT_LIST, type]);
      toast.dark("Posting has been deleted.");
    },
  });
};

export default useDeleteContentMutation;
