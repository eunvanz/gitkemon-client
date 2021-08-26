import { CardMon, Collection, HuntResult, ModalMon, Mon } from "../types";

export const convertCollectionToModalMon: (collection: Collection) => ModalMon = (
  collection,
) => {
  const {
    id,
    __mon__,
    firstType,
    secondType,
    weight,
    height,
    tier,
    hp,
    attack,
    defense,
    specialAttack,
    specialDefense,
    speed,
    total,
    baseHp,
    baseAttack,
    baseDefense,
    baseSpecialAttack,
    baseSpecialDefense,
    baseSpeed,
    baseTotal,
    stars,
    level,
    potential,
    monImageUrl,
    __monImage__,
  } = collection;
  return {
    id: id,
    name: __mon__!.name,
    description: __mon__!.description,
    firstType,
    secondType,
    weight,
    height,
    tier,
    evolutionLevel: __mon__!.evolutionLevel || undefined,
    hp,
    attack,
    defense,
    specialAttack,
    specialDefense,
    speed,
    total,
    baseHp,
    baseAttack,
    baseDefense,
    baseSpecialAttack,
    baseSpecialDefense,
    baseSpeed,
    baseTotal,
    stars,
    colPoint: __mon__!.colPoint,
    level,
    potential,
    imageUrl: monImageUrl,
    image: __monImage__!,
  };
};

export const convertCollectionToCardMon: (collection: Collection) => CardMon = (
  collection,
) => {
  const {
    id,
    firstType,
    secondType,
    tier,
    stars,
    monImageUrl,
    evolutionLevel,
    level,
    potential,
  } = collection;
  return {
    id,
    firstType,
    secondType,
    tier,
    stars,
    evolutionLevel,
    imageUrl: monImageUrl,
    level,
    potential,
  };
};

export const convertMonToCardMon: (mon: Mon) => CardMon = (mon) => {
  const { id, firstType, secondType, tier, stars, evolutionLevel } = mon;
  return {
    id,
    firstType,
    secondType,
    tier,
    stars,
    evolutionLevel,
  };
};

export const convertMonToModalMon: (mon: Mon) => ModalMon = (mon) => {
  const {
    id,
    name,
    description,
    firstType,
    secondType,
    height,
    weight,
    tier,
    evolutionLevel,
    hp,
    attack,
    defense,
    specialAttack,
    specialDefense,
    speed,
    total,
    stars,
    colPoint,
  } = mon;
  return {
    id,
    name,
    description,
    firstType,
    secondType,
    height,
    weight,
    tier,
    evolutionLevel,
    hp,
    attack,
    defense,
    specialAttack,
    specialDefense,
    speed,
    total,
    stars,
    colPoint,
  };
};

export const checkIsLuckyHuntResult = (resultItem: HuntResult) => {
  return (
    resultItem.newCollection.tier === "myth" ||
    (resultItem.newCollection.potential.includes("S") &&
      resultItem.newCollection.level === 1)
  );
};

export const getUpdatedColPointMessage = (updatedColPoint: number) => {
  return `You've got CP ${updatedColPoint > 0 ? "+" : ""}${updatedColPoint}`;
};
