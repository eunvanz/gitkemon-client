import { atom } from "recoil";
import { Collection, STATE_KEY } from "../types";

export const evolveMonState = atom<Collection | undefined>({
  key: STATE_KEY.EVOLVE_MON,
  default: undefined,
});
