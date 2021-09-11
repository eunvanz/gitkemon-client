import { useMutation, useQueryClient } from "react-query";
import api from "~/api";
import { ContentType, QUERY_KEY } from "~/types";

const usePostContentMutation = (type: ContentType) => {
  const queryClient = useQueryClient();

  return useMutation(api.postContent, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.CONTENT_LIST, type]);
    },
  });
};

export default usePostContentMutation;
