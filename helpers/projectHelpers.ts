import { CardMon, Collection, ModalMon } from "../types";

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
  } = collection;
  return {
    id,
    firstType,
    secondType,
    tier,
    stars,
    evolutionLevel,
    imageUrl: monImageUrl,
  };
};
