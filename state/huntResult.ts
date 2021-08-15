import { atom } from "recoil";
import { Collection, PokeBallType, STATE_KEY } from "../types";

export const huntResultState = atom<
  | {
      pokeBallType?: PokeBallType;
      result?: Collection[];
    }
  | undefined
>({
  key: STATE_KEY.HUNT_RESULT,
  default: undefined,
});
