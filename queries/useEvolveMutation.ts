import { useMutation, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import api from "../api";
import { userState } from "../state/user";
import { QUERY_KEY } from "../types";

const useEvolveMutation = () => {
  const queryClient = useQueryClient();

  const user = useRecoilValue(userState);

  return useMutation(api.evolve, {
    onMutate: ({ collectionId }) => {
      queryClient.invalidateQueries([QUERY_KEY.COLLECTION, collectionId]);
    },
    onSuccess: (data) => {
      queryClient.refetchQueries([QUERY_KEY.COLLECTIONS, user!.id]);
      queryClient.invalidateQueries(QUERY_KEY.USER);
      queryClient.invalidateQueries([QUERY_KEY.COLLECTION, data.newCollection.id]);
    },
  });
};

export default useEvolveMutation;
