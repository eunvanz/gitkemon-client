import { useMemo, useState } from "react";
import { has } from "lodash";
import orderBy from "lodash/orderBy";
import CollectionFilter, {
  CollectionFilterState,
} from "../../../components/CollectionFilter";
import CollectionStatus from "../../../components/CollectionStatus";
import Loading from "../../../components/Loading";
import MonCard from "../../../components/MonCard";
import MonCardGrid from "../../../components/MonCardGrid";
import Typography from "../../../components/Typography";
import { MON_STARS, MON_TIERS, MON_TYPES } from "../../../constants/rules";
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
  const [filterState, setFilterState] = useState<CollectionFilterState>({
    has: [true, false],
    stars: MON_STARS,
    tier: MON_TIERS,
    type: MON_TYPES,
  });

  const isLoading = useMemo(() => {
    return !collections || !mons;
  }, [collections, mons]);

  const filteredMon = useMemo(() => {
    if (!filterState.has.includes(false)) {
      return [];
    }
    return mons?.filter(
      (mon) => !collections?.some((collection) => collection.monId === mon.id),
    );
  }, [collections, filterState.has, mons]);

  const orderedCollections = useMemo(() => {
    if (collections && filteredMon) {
      const mergedCollections = [
        ...(filterState.has.includes(true) ? collections : []),
        ...filteredMon.map((mon) => ({ ...mon, monId: mon.id })),
      ];
      const filteredCollections = mergedCollections
        .filter((collection) => {
          return filterState.tier.includes(collection.tier);
        })
        .filter((collection) => {
          return filterState.stars.includes(collection.stars);
        })
        .filter((collection) => {
          return (
            filterState.type.includes(collection.firstType) ||
            (collection.secondType
              ? filterState.type.includes(collection.secondType!)
              : false)
          );
        });
      return orderBy(filteredCollections, ["monId"], ["asc"]);
    } else {
      return undefined;
    }
  }, [
    collections,
    filterState.has,
    filterState.stars,
    filterState.tier,
    filterState.type,
    filteredMon,
  ]);

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
    <div className="flex flex-col justify-start max-w-screen-xl m-auto">
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
      <CollectionFilter
        filterState={filterState}
        onChangeFilter={(filter) => setFilterState(filter)}
      />
    </div>
  ) : (
    <div className="h-full">
      <Loading isFullHeight />
    </div>
  );
};

export default Collections;
