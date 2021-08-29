import { useMutation } from "react-query";
import api from "~/api";

const useLikeMutation = () => {
  return useMutation(api.postLike);
};

export default useLikeMutation;
