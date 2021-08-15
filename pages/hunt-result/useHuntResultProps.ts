import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { assertNotEmpty } from "../../helpers/commonHelpers";
import ROUTES from "../../paths";
import { huntResultState } from "../../state/huntResult";
import { HuntResultProps } from "./HuntResult.view";

const useHuntResultProps: () => HuntResultProps = () => {
  const [huntResult, setHuntResult] = useRecoilState(huntResultState);

  const router = useRouter();

  assertNotEmpty(huntResult?.pokeBallType);

  return {
    pokeBallType: huntResult.pokeBallType,
    result: huntResult.result,
  };
};

export default useHuntResultProps;
