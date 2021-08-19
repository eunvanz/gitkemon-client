import { useMemo } from "react";
import orderBy from "lodash/orderBy";
import MonCard from "../../../components/MonCard";
import MonCardGrid from "../../../components/MonCardGrid";
import {
  convertCollectionToCardMon,
  convertMonToCardMon,
  convertMonToModalMon,
} from "../../../helpers/projectHelpers";
import { Collection, Mon } from "../../../types";

export interface CollectionsProps {
  collections?: Collection[];
  mons?: Mon[];
}

const Collections: React.FC<CollectionsProps> = ({ collections, mons }) => {
  const isLoading = useMemo(() => {
    return !collections || !mons;
  }, [collections, mons]);

  const filteredMon = useMemo(() => {
    return mons?.filter(
      (mon) => !collections?.some((collection) => collection.monId === mon.id),
    );
  }, [collections, mons]);

  const orderedCollections = useMemo(() => {
    if (collections && filteredMon) {
      const mergedCollections = [
        ...collections,
        ...filteredMon.map((mon) => ({ ...mon, monId: mon.id })),
      ];
      return orderBy(mergedCollections, ["monId"], ["asc"]);
    } else {
      return undefined;
    }
  }, [collections, filteredMon]);

  return !isLoading ? (
    <div className="flex flex-col justify-start p-4">
      <MonCardGrid>
        {orderedCollections!.map((collection) => {
          const isCollection = (collection as Collection).monImageUrl;
          return (
            <MonCard
              key={collection.id}
              mon={
                isCollection
                  ? convertCollectionToCardMon(collection as Collection)
                  : convertMonToCardMon(collection as Mon)
              }
              modalMon={
                isCollection ? undefined : convertMonToModalMon(collection as Mon)
              }
            />
          );
        })}
      </MonCardGrid>
    </div>
  ) : (
    <>{/* TODO: 스켈레톤 */}</>
  );
};

export default Collections;
