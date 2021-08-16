import { atom } from "recoil";
import { HuntResponse, PokeBallType, STATE_KEY } from "../types";

export const huntResultState = atom<
  | {
      pokeBallType?: PokeBallType;
      result?: HuntResponse;
    }
  | undefined
>({
  key: STATE_KEY.HUNT_RESULT,
  default: undefined,
});
