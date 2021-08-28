import { useMutation } from "react-query";
import api from "../api";

const useUploadPaintingMutation = () => {
  return useMutation(api.postPainting);
};

export default useUploadPaintingMutation;
