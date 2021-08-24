import { atom } from "recoil";
import { Collection, STATE_KEY } from "../types";

export const blendMonState = atom<Collection[] | undefined>({
  key: STATE_KEY.BLEND_MON,
  default: undefined,
});
