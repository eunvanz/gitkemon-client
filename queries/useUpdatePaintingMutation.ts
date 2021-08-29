import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEY } from "~/types";
import api from "../api";

const useUpdatePaintingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(api.patchPainting, {
    onSuccess: (_, { paintingId }) => {
      queryClient.invalidateQueries(QUERY_KEY.PAINTING_LIST);
      queryClient.invalidateQueries([QUERY_KEY.PAINTING, paintingId]);
    },
  });
};

export default useUpdatePaintingMutation;
