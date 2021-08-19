import { useRouter } from "next/router";
import useActiveMonsQuery from "../../../queries/useActiveMonsQuery";
import useCollectionsQuery from "../../../queries/useCollectionsQuery";
import { CollectionsProps } from "./Collections.view";

const useCollectionsProps: () => CollectionsProps = () => {
  const router = useRouter();
  const { userId } = router.query as { userId: string };
  const { data: mons } = useActiveMonsQuery();
  const { data: collections } = useCollectionsQuery(userId);

  return {
    collections,
    mons,
  };
};

export default useCollectionsProps;
