import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import api from "~/api";
import { ContentType, QUERY_KEY } from "~/types";

const usePatchContentMutation = (type: ContentType) => {
  const queryClient = useQueryClient();

  return useMutation(api.patchContent, {
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries([QUERY_KEY.CONTENT_LIST, type]);
      queryClient.refetchQueries([QUERY_KEY.CONTENT, id]);
      toast.dark("Posting has been updated.");
    },
  });
};

export default usePatchContentMutation;
