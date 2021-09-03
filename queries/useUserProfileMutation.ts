import { useMutation, useQueryClient } from "react-query";
import api from "~/api";
import { QUERY_KEY } from "~/types";

const useUserProfileMutation = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation(api.patchUserProfile, {
    onSuccess: () => {
      queryClient.refetchQueries(QUERY_KEY.USER);
      queryClient.refetchQueries([QUERY_KEY.USER_PROFILE, userId]);
    },
  });
};

export default useUserProfileMutation;
