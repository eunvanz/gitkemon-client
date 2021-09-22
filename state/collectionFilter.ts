import { atom } from "recoil";
import {
  CollectionFilterState,
  initialFilterState,
} from "~/components/CollectionFilter/CollectionFilter";
import { STATE_KEY } from "~/types";

export const collectionFilterState = atom<CollectionFilterState>({
  key: STATE_KEY.COLLECTION_FILTER,
  default: initialFilterState,
});
