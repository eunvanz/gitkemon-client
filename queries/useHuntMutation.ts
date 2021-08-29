import { useMutation, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import api from "../api";
import { userState } from "../state/user";
import { QUERY_KEY } from "../types";

const useHuntMutation = () => {
  const queryClient = useQueryClient();

  const user = useRecoilValue(userState);

  return useMutation(api.hunt, {
    onSuccess: (data) => {
      queryClient.refetchQueries([QUERY_KEY.COLLECTIONS, user!.id]);
      queryClient.invalidateQueries(QUERY_KEY.USER);
      data.forEach((result) => {
        queryClient.invalidateQueries([QUERY_KEY.COLLECTION, result.newCollection.id]);
      });
    },
  });
};

export default useHuntMutation;
