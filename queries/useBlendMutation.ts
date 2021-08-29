import { useMutation, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import api from "../api";
import { userState } from "../state/user";
import { QUERY_KEY } from "../types";

const useBlendMutation = (blendMonIds: number[]) => {
  const queryClient = useQueryClient();

  const user = useRecoilValue(userState);

  return useMutation(() => api.blend(blendMonIds), {
    onMutate: () => {
      blendMonIds.forEach((id) => {
        queryClient.invalidateQueries([QUERY_KEY.COLLECTION, id]);
      });
    },
    onSuccess: (data) => {
      queryClient.refetchQueries([QUERY_KEY.COLLECTIONS, user!.id]);
      queryClient.invalidateQueries(QUERY_KEY.USER);
      queryClient.invalidateQueries([QUERY_KEY.COLLECTION, data.newCollection.id]);
    },
  });
};

export default useBlendMutation;
