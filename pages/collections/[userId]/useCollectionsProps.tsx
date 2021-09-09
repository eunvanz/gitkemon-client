import { Fragment, useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import useUserProfileQuery from "~/queries/useUserProfileQuery";
import Dialog from "../../../components/Dialog";
import Typography from "../../../components/Typography";
import { capitalize } from "../../../helpers/commonHelpers";
import { getLocaleProperty } from "../../../helpers/projectHelpers";
import ROUTES from "../../../paths";
import useActiveMonsQuery from "../../../queries/useActiveMonsQuery";
import useCollectionsQuery from "../../../queries/useCollectionsQuery";
import { blendMonState } from "../../../state/blendMon";
import { userState } from "../../../state/user";
import { Collection } from "../../../types";
import { CollectionsProps } from "./Collections.view";

const useCollectionsProps: () => CollectionsProps = () => {
  const router = useRouter();
  const { userId } = router.query as { userId: string };

  const { data: mons } = useActiveMonsQuery();
  const { data: collections } = useCollectionsQuery(userId, { enabled: router.isReady });
  const { data: collectionUser } = useUserProfileQuery(userId, {
    enabled: router.isReady,
  });
  const user = useRecoilValue(userState);
  const [blendMon, setBlendMon] = useRecoilState(blendMonState);

  const isBlendMode = useMemo(() => {
    return !!blendMon && blendMon.length === 1;
  }, [blendMon]);

  useEffect(() => {
    return () => {
      setBlendMon((blendMon) => (blendMon?.length === 2 ? blendMon : undefined));
    };
  }, [setBlendMon]);

  const onSelectItem = useCallback(
    async (collection: Collection) => {
      if (isBlendMode) {
        const messages = [blendMon![0], collection].map((mon, index) => {
          const { level } = mon;
          return (
            <Fragment key={mon.id}>
              <Typography color="primary">
                {capitalize(getLocaleProperty(mon, "name"))}
              </Typography>
              {level === 1 ? (
                " will disappear"
              ) : (
                <>
                  &apos;s level will be down to{" "}
                  <Typography color="primary">{level - 1}</Typography>
                </>
              )}
              {index === 0 ? ", " : "."}
            </Fragment>
          );
        });
        const isConfirmed = await Dialog.confirm({
          title: "Blend",
          content: <>{messages} Are you sure to proceed?</>,
        });
        if (isConfirmed) {
          router.replace(ROUTES.BLEND);
          setBlendMon([blendMon![0], collection]);
        }
      }
    },
    [blendMon, isBlendMode, router, setBlendMon],
  );

  const onCancelBlendMode = useCallback(() => {
    setBlendMon(undefined);
  }, [setBlendMon]);

  return {
    collections,
    mons,
    user,
    isBlendMode,
    monToBlend: blendMon?.[0],
    onSelectItem,
    onCancelBlendMode,
    collectionUser,
  };
};

export default useCollectionsProps;
