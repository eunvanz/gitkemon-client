import { toast } from "react-toastify";
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
    name: getLocaleProperty(__mon__!, "name"),
    description: getLocaleProperty(__mon__!, "description"),
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
    name: getLocaleProperty(mon, "name"),
    description: getLocaleProperty(mon, "description"),
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
  return `You've got ${
    updatedColPoint > 0 ? "+" : ""
  }${updatedColPoint} collection points`;
};

export const getMessagesFromHuntResult = (result: HuntResult[] | HuntResult) => {
  const resultArray = Array.isArray(result) ? result : [result];
  const updatedColPoints = resultArray?.reduce(
    (prev, item) => prev + item.updatedColPoint,
    0,
  );
  const hasSuperior = resultArray.find((item) =>
    item.newCollection.potential.includes("S"),
  );
  const hasMyth = resultArray.find((item) => item.newCollection.tier === "myth");
  const messages = [];
  updatedColPoints && messages.push(getUpdatedColPointMessage(updatedColPoints));
  hasSuperior && messages.push("You've got a superior Pokemon!");
  hasMyth && messages.push("You've got a mythical Pokemon!");
  return messages;
};

export const showHuntResultMessages = (result: HuntResult[] | HuntResult) => {
  const messages = getMessagesFromHuntResult(result);
  messages.forEach((message) => toast.dark(message));
};

export const getLocaleProperty = (object: any, property: string) => {
  try {
    const lang = window.navigator.language;
    if (/^ko/.test(lang)) {
      return object[`${property}Ko`];
    } else if (/^ja/.test(lang)) {
      return object[`${property}Ja`];
    } else if (/^zh/.test(lang)) {
      return object[`${property}Zh`];
    } else {
      return object[property];
    }
  } catch (error) {
    // for ssr
    return object[property];
  }
};
