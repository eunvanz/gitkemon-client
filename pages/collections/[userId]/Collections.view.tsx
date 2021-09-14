import { useMemo, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import orderBy from "lodash/orderBy";
import Image from "next/image";
import { useRouter } from "next/router";
import { isMobile } from "react-device-detect";
import Skeleton from "react-loading-skeleton";
import Button from "~/components/Button";
import CollectionFilter, { CollectionFilterState } from "~/components/CollectionFilter";
import CollectionStatus from "~/components/CollectionStatus";
import Footer from "~/components/Footer";
import Intersection from "~/components/Intersection";
import MonCard from "~/components/MonCard";
import MonCardGrid from "~/components/MonCardGrid";
import TrainerClassBadge from "~/components/TrainerClassBadge";
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
  const [isAllVisible, setIsAllVisible] = useState(false);

  const [filterState, setFilterState] = useState<CollectionFilterState>({
    has: [true, false],
    stars: MON_STARS,
    tier: MON_TIERS,
    type: MON_TYPES,
  });

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

  return (
    <>
      <div className="flex flex-col justify-start max-w-screen-xl m-auto p-1 sm:p-4">
        <div className="flex items-center mb-4">
          <div className="relative mr-4">
            {collectionUser ? (
              <>
                {/* eslint-disable-next-line */}
                <img
                  className="rounded-full"
                  src={collectionUser.avatarUrl}
                  alt="user image"
                  width={64}
                  height={64}
                />
                <span
                  className="absolute inset-0 shadow-inner rounded-full"
                  aria-hidden="true"
                />
              </>
            ) : (
              <Skeleton style={{ width: "4rem", height: "4rem", borderRadius: "50%" }} />
            )}
          </div>
          <div className="flex flex-col justify-center">
            {collectionUser ? (
              <>
                <Typography className="mb-0" as="h1" size="2xl">
                  <a
                    onClick={() => router.push(`${ROUTES.PROFILE}/${collectionUser?.id}`)}
                  >
                    {collectionUser?.nickname}
                  </a>
                  &apos;s collection
                </Typography>
                <Typography color="hint">
                  {collectionUser?.githubLogin} ·{" "}
                  <TrainerClassBadge trainerClass={collectionUser!.trainerClass} />
                </Typography>
              </>
            ) : (
              <>
                <Skeleton style={{ display: "block", width: 300, height: 30 }} />
                <Skeleton style={{ display: "block", width: 100, marginTop: 4 }} />
              </>
            )}
          </div>
        </div>
        {!isBlendMode && (
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
          {orderedCollections
            ? (isAllVisible ? orderedCollections : orderedCollections.slice(0, 48)).map(
                (collection) => {
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
                        isBlendMode
                          ? () => onSelectItem?.(collection as Collection)
                          : undefined
                      }
                      isOwned={collectionUser?.id === user?.id}
                      user={user}
                      isStatic
                    />
                  );
                },
              )
            : Array.from({ length: isMobile ? 6 : 8 }).map((_, index) => (
                <MonCard key={index} />
              ))}
          {!isAllVisible && orderedCollections && (
            <div className="relative">
              <div className="absolute" style={{ top: "-30vh" }}>
                <Intersection
                  onIntersect={() => setIsAllVisible(true)}
                  threshold={0.01}
                />
              </div>
            </div>
          )}
          {!isAllVisible &&
            orderedCollections &&
            Array.from({ length: isMobile ? 6 : 8 }).map((_, index) => (
              <MonCard key={index} />
            ))}
        </MonCardGrid>
        <CollectionFilter
          filterState={filterState}
          onChangeFilter={(filter) => setFilterState(filter)}
        />
      </div>
      <Footer />
    </>
  );
};

export default Collections;
