import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { assertNotEmpty } from "../../helpers/commonHelpers";
import ROUTES from "../../paths";
import useBlendMutation from "../../queries/useBlendMutation";
import { blendMonState } from "../../state/blendMon";
import { userState } from "../../state/user";
import { BlendProps } from "./Blend.view";

const useBlendProps: () => BlendProps = () => {
  const [blendMons, setBlendMons] = useRecoilState(blendMonState);

  const user = useRecoilValue(userState);

  assertNotEmpty(user);
  assertNotEmpty(blendMons);

  const router = useRouter();

  const onNavigateToMyCollection = useCallback(() => {
    router.replace(`${ROUTES.COLLECTIONS}/${user!.id}`);
  }, [router, user]);

  const { mutate: blend, data: result } = useBlendMutation(
    blendMons.map((mon) => mon.id),
  );

  const getBlendResult = useCallback(async () => {
    blend();
  }, [blend]);

  useEffect(() => {
    getBlendResult();
    return () => {
      setBlendMons(undefined);
    };
  }, [getBlendResult, setBlendMons]);

  return {
    blendMons: blendMons!,
    onNavigateToMyCollection,
    result,
  };
};

export default useBlendProps;
