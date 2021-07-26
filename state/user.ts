import { atom } from "recoil";
import { STATE_KEY, User } from "../types";

export const userState = atom<User | undefined>({
  key: STATE_KEY.USER,
  default: undefined,
});
