import { useMutation, useQueryClient } from "react-query";
import api from "~/api";

const useContentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(api.postContent, {
    onSuccess: () => {
      // TODO: invalidate content list of type
    },
  });
};

export default useContentMutation;
