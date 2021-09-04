import { useRouter } from "next/router";
import { useMutation } from "react-query";
import api from "~/api";

const useLogoutMutation = () => {
  const router = useRouter();

  return useMutation(api.logout, {
    onSuccess: () => {
      router.reload();
    },
  });
};

export default useLogoutMutation;
