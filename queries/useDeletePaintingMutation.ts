import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEY } from "~/types";
import api from "../api";

const useUpdatePaintingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(api.deletePainting, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.PAINTING_LIST);
    },
  });
};

export default useUpdatePaintingMutation;
