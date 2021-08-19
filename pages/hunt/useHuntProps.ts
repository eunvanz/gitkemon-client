import { useCallback } from "react";
import { useRouter } from "next/router";
import useHunt from "../../hooks/useHunt";
import ROUTES from "../../paths";
import { HuntProps } from "./Hunt.view";

const useHuntProps: () => HuntProps = () => {
  const { pokeBalls, onHunt } = useHunt();

  const router = useRouter();

  const onFinish = useCallback(() => {
    router.replace(ROUTES.HUNT_RESULT);
  }, [router]);

  return {
    pokeBalls,
    onSubmit: onHunt,
    onFinish,
  };
};

export default useHuntProps;
