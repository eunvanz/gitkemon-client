import { useRecoilValue } from "recoil";
import useReferredCountQuery from "~/queries/useReferredCountQuery";
import { userState } from "~/state/user";
import { ShareUrlProps } from "./ShareUrl";

const useShareUrlProps: () => ShareUrlProps = () => {
  const user = useRecoilValue(userState);

  const { data: count, refetch } = useReferredCountQuery({
    enabled: false,
  });

  return {
    user,
    onFetchCount: refetch,
    count,
  };
};

export default useShareUrlProps;
