import { useMutation, useQueryClient } from "react-query";
import api from "~/api";
import { QUERY_KEY } from "~/types";

const useUserProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(api.patchUserProfile, {
    onSuccess: () => {
      queryClient.refetchQueries(QUERY_KEY.USER);
    },
  });
};

export default useUserProfileMutation;
