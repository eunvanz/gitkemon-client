import { useMutation, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import api from "../api";
import { userState } from "../state/user";
import { QUERY_KEY } from "../types";

const useEvolveMutation = () => {
  const queryClient = useQueryClient();

  const user = useRecoilValue(userState);

  return useMutation(api.evolve, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.COLLECTIONS, user!.id]);
      queryClient.invalidateQueries(QUERY_KEY.USER);
    },
  });
};

export default useEvolveMutation;
