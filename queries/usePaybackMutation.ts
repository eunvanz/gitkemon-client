import { useMutation, useQueryClient } from "react-query";
import api from "~/api";
import { QUERY_KEY } from "~/types";

const usePaybackMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(api.postPaybacks, {
    onSuccess: () => {
      queryClient.refetchQueries(QUERY_KEY.AVAILABLE_CONTRIBUTIONS);
      queryClient.refetchQueries(QUERY_KEY.USER);
      queryClient.invalidateQueries(QUERY_KEY.LAST_PAYBACK);
    },
  });
};

export default usePaybackMutation;
