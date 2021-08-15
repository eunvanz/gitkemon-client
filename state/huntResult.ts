import { atom } from "recoil";
import { Collection, STATE_KEY } from "../types";

export const huntResultState = atom<Collection[] | undefined>({
  key: STATE_KEY.HUNT_RESULT,
  default: undefined,
});
