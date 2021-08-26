import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import api from "../../api";
import { assertNotEmpty } from "../../helpers/commonHelpers";
import ROUTES from "../../paths";
import { blendMonState } from "../../state/blendMon";
import { userState } from "../../state/user";
import { HuntResult } from "../../types";
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

  const [result, setResult] = useState<HuntResult | undefined>(undefined);

  const getBlendResult = useCallback(async () => {
    const blendResult = await api.blend(blendMons.map((mon) => mon.id));
    setResult(blendResult);
  }, [blendMons]);

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
