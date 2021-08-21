import { useMemo } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import useActiveMonsQuery from "../../../queries/useActiveMonsQuery";
import useCollectionsQuery from "../../../queries/useCollectionsQuery";
import { userState } from "../../../state/user";
import { CollectionsProps } from "./Collections.view";

const useCollectionsProps: () => CollectionsProps = () => {
  const router = useRouter();
  const { userId } = router.query as { userId: string };
  const { data: mons } = useActiveMonsQuery();
  const { data: collections } = useCollectionsQuery(userId);
  const user = useRecoilValue(userState);

  const isMyCollection = useMemo(() => {
    return user && userId === user.id;
  }, [user, userId]);

  const collectionUser = useMemo(() => {
    return isMyCollection ? user : user;
  }, [isMyCollection, user]);

  return {
    collections,
    mons,
    user: collectionUser!,
  };
};

export default useCollectionsProps;
