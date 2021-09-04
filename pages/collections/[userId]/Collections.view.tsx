import { useMemo, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import orderBy from "lodash/orderBy";
import { useRouter } from "next/router";
import Button from "~/components/Button";
import CollectionFilter, { CollectionFilterState } from "~/components/CollectionFilter";
import CollectionStatus from "~/components/CollectionStatus";
import Loading from "~/components/Loading";
import MonCard from "~/components/MonCard";
import MonCardGrid from "~/components/MonCardGrid";
import Typography from "~/components/Typography";
import { MON_STARS, MON_TIERS, MON_TYPES } from "~/constants/rules";
import { capitalize } from "~/helpers/commonHelpers";
import {
  convertCollectionToCardMon,
  convertMonToCardMon,
  convertMonToModalMon,
  getLocaleProperty,
} from "~/helpers/projectHelpers";
import ROUTES from "~/paths";
import { Collection, Mon, User, UserProfile } from "~/types";

export interface CollectionsProps {
  collections?: Collection[];
  mons?: Mon[];
  user?: User;
  isBlendMode?: boolean;
  monToBlend?: Collection;
  onSelectItem?: (collection: Collection) => void;
  onCancelBlendMode: VoidFunction;
  collectionUser?: UserProfile;
}

const Collections: React.FC<CollectionsProps> = ({
  collections,
  mons,
  user,
  isBlendMode,
  monToBlend,
  onSelectItem,
  onCancelBlendMode,
  collectionUser,
}) => {
  const [filterState, setFilterState] = useState<CollectionFilterState>({
    has: [true, false],
    stars: MON_STARS,
    tier: MON_TIERS,
    type: MON_TYPES,
  });

  const isLoading = useMemo(() => {
    return !collections || !mons;
  }, [collections, mons]);

  const filteredMons = useMemo(() => {
    if (!filterState.has.includes(false) || isBlendMode) {
      return [];
    }
    return mons?.filter(
      (mon) => !collections?.some((collection) => collection.monId === mon.id),
    );
  }, [collections, filterState.has, isBlendMode, mons]);

  const filteredBlendCollections = useMemo(() => {
    if (isBlendMode) {
      return collections?.filter(
        (collection) =>
          collection.id !== monToBlend!.id && collection.tier === monToBlend!.tier,
      );
    } else {
      return collections;
    }
  }, [collections, isBlendMode, monToBlend]);

  const orderedCollections = useMemo(() => {
    if (filteredBlendCollections && filteredMons) {
      const mergedCollections = [
        ...(filterState.has.includes(true) ? filteredBlendCollections : []),
        ...filteredMons.map((mon) => ({ ...mon, monId: mon.id })),
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
    filterState.has,
    filterState.stars,
    filterState.tier,
    filterState.type,
    filteredBlendCollections,
    filteredMons,
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

  const router = useRouter();

  return !isLoading ? (
    <div className="flex flex-col justify-start max-w-screen-xl m-auto p-1 sm:p-4">
      <Typography as="h1" size="2xl">
        <a onClick={() => router.push(`${ROUTES.PROFILE}/${collectionUser?.id}`)}>
          {collectionUser?.nickname}
        </a>
        &apos;s collection
      </Typography>
      {!isBlendMode && colPointInfo && countInfo && (
        <CollectionStatus colPointInfo={colPointInfo} countInfo={countInfo} />
      )}
      {isBlendMode && (
        <div className="sticky top-0 z-10 border-b mb-2">
          <div className="flex justify-between items-center p-2 bg-white">
            <Typography as="div">
              Choose a Pokémon to blend with{" "}
              <Typography color="primary">
                {capitalize(getLocaleProperty(monToBlend!.__mon__!, "name"))}
              </Typography>
            </Typography>
            <Button
              icon={XIcon}
              className="ml-2"
              size="xs"
              color="white"
              onClick={onCancelBlendMode}
            >
              Cancel
            </Button>
          </div>
        </div>
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
              onSelect={
                isBlendMode ? () => onSelectItem?.(collection as Collection) : undefined
              }
              isOwned={collectionUser?.id === user?.id}
              user={user}
              isStatic
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
