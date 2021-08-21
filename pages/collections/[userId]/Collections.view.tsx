import { useMemo } from "react";
import orderBy from "lodash/orderBy";
import CollectionStatus from "../../../components/CollectionStatus";
import MonCard from "../../../components/MonCard";
import MonCardGrid from "../../../components/MonCardGrid";
import Typography from "../../../components/Typography";
import { MON_TIERS } from "../../../constants/rules";
import {
  convertCollectionToCardMon,
  convertMonToCardMon,
  convertMonToModalMon,
} from "../../../helpers/projectHelpers";
import { Collection, Mon, User } from "../../../types";

export interface CollectionsProps {
  collections?: Collection[];
  mons?: Mon[];
  user: User;
}

const Collections: React.FC<CollectionsProps> = ({ collections, mons, user }) => {
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

  const colPointInfo = useMemo(() => {
    if (!collections || !mons) {
      return undefined;
    }
    const value = collections.reduce((prev, collection) => {
      const colPoint = mons.find((mon) => mon.id === collection.monId)!.colPoint;
      return prev + colPoint;
    }, 0);
    const max = mons.reduce((prev, mon) => prev + mon.colPoint, 0);
    return { value, max };
  }, [collections, mons]);

  const countInfo = useMemo(() => {
    if (!collections || !mons) {
      return undefined;
    }
    const result: any = {};
    MON_TIERS.forEach((tier) => {
      const value = collections.filter((col) => col.tier === tier).length;
      const max = mons.filter((mon) => mon.tier === tier).length;
      result[tier] = { value, max };
    });
    return result;
  }, [collections, mons]);

  return !isLoading ? (
    <div className="flex flex-col justify-start p-4">
      <Typography as="h1" size="2xl">
        {user?.nickname}&apos;s collection
      </Typography>
      {colPointInfo && countInfo && (
        <CollectionStatus colPointInfo={colPointInfo} countInfo={countInfo} />
      )}
      <MonCardGrid>
        {orderedCollections!.map((collection) => {
          const isCollection = (collection as Collection).monImageUrl;
          return (
            <MonCard
              key={`${isCollection ? "col" : "mon"}-${collection.id}`}
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
