import { useMutation, useQueryClient } from "react-query";
import api from "~/api";
import { ContentType, QUERY_KEY } from "~/types";

const usePatchContentMutation = (type: ContentType) => {
  const queryClient = useQueryClient();

  return useMutation(api.patchContent, {
    onSuccess: (_, { id }) => {
      queryClient.refetchQueries([
        [QUERY_KEY.CONTENT_LIST, type],
        [QUERY_KEY.CONTENT, id],
      ]);
    },
  });
};

export default usePatchContentMutation;
