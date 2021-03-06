import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEY } from "~/types";
import api from "../api";

const useUploadPaintingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(api.postPainting, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.PAINTING_LIST);
    },
  });
};

export default useUploadPaintingMutation;
