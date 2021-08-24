import { useMemo, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import cx from "classnames";
import orderBy from "lodash/orderBy";
import { StickyContainer, Sticky } from "react-sticky";
import Button from "../../../components/Button";
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
import styles from "./Collections.module.css";

export interface CollectionsProps {
  collections?: Collection[];
  mons?: Mon[];
  user: User;
  isBlendMode?: boolean;
  monToBlend?: Collection;
  onSelectItem?: (collection: Collection) => void;
}

const Collections: React.FC<CollectionsProps> = ({
  collections,
  mons,
  user,
  isBlendMode,
  monToBlend,
  onSelectItem,
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

  const filteredMon = useMemo(() => {
    if (!filterState.has.includes(false) || isBlendMode) {
      return [];
    }
    return mons?.filter(
      (mon) => !collections?.some((collection) => collection.monId === mon.id),
    );
  }, [collections, filterState.has, isBlendMode, mons]);

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
    <div className="flex flex-col justify-start max-w-screen-xl m-auto p-1 sm:p-4">
      <Typography as="h1" size="2xl">
        {user?.nickname}&apos;s collection
      </Typography>
      {!isBlendMode && colPointInfo && countInfo && (
        <CollectionStatus colPointInfo={colPointInfo} countInfo={countInfo} />
      )}
      <StickyContainer>
        {isBlendMode && (
          <Sticky>
            {({ isSticky }) => (
              <div
                className={cx(
                  isSticky ? "fixed top-0 max-w-screen-xl z-10" : undefined,
                  isSticky ? styles.stickyWidth : undefined,
                )}
              >
                <div
                  className={cx(
                    "flex justify-between items-center p-2 bg-white",
                    isSticky ? "border-b" : undefined,
                  )}
                >
                  <Typography as="div">
                    Choose a Pokémon to blend with{" "}
                    <Typography color="primary">{monToBlend?.__mon__?.name}</Typography>
                  </Typography>
                  <Button icon={XIcon} className="ml-2" size="xs" color="white">
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </Sticky>
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
              />
            );
          })}
        </MonCardGrid>
      </StickyContainer>
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
