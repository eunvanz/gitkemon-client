import { useMemo } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { MON_TIERS } from "~/constants/rules";
import useActiveMonsQuery from "~/queries/useActiveMonsQuery";
import useCollectionsQuery from "~/queries/useCollectionsQuery";
import usePaybackHistoryQuery from "~/queries/usePaybackHistoryQuery";
import useProfileMonQuery from "~/queries/useProfileMonQuery";
import useUserProfileQuery from "~/queries/useUserProfileQuery";
import { userState } from "~/state/user";
import { ProfileProps } from "./Profile.view";

const useProfileProps: () => ProfileProps = () => {
  const user = useRecoilValue(userState);
  const router = useRouter();

  const { userId } = router.query as { userId: string };

  const { data: userProfile } = useUserProfileQuery(userId);
  const { data: profileMon } = useProfileMonQuery(userId);
  const { data: mons } = useActiveMonsQuery();
  const { data: collections } = useCollectionsQuery(userId);
  const { data: paybacks } = usePaybackHistoryQuery(userId);

  const colPointInfo = useMemo(() => {
    if (!collections || !mons) {
      return undefined;
    }
    const value = collections.reduce((prev, collection) => {
      const colPoint = mons.find((mon) => mon.id === collection.monId)!.colPoint;
      return prev + colPoint;
    }, 0);
    const max = mons.reduce((prev, mon) => prev + mon.colPoint, 0);
    return { value, max };
  }, [collections, mons]);

  const countInfo = useMemo(() => {
    if (!collections || !mons) {
      return undefined;
    }
    const result: any = {};
    MON_TIERS.forEach((tier) => {
      const value = collections.filter((col) => col.tier === tier).length;
      const max = mons.filter((mon) => mon.tier === tier).length;
      result[tier] = { value, max };
    });
    return result;
  }, [collections, mons]);

  const collectionStatus = useMemo(() => {
    if (!countInfo || !colPointInfo) {
      return undefined;
    }
    return {
      countInfo,
      colPointInfo,
    };
  }, [colPointInfo, countInfo]);

  return {
    user,
    userProfile,
    profileMon,
    collectionStatus,
    paybacks,
  };
};

export default useProfileProps;
