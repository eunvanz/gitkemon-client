import qs from "query-string";
import { toast } from "react-toastify";
import { TRAINER_CLASSES, TRAINER_CLASS_LIMIT_UNIT } from "~/constants/rules";
import ROUTES from "~/paths";
import { CardMon, Collection, HuntResult, ModalMon, Mon, Pageable, User } from "../types";
import { capitalize } from "./commonHelpers";

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
    evolutionLevel,
    __monImage__,
    userId,
  } = collection;
  return {
    id: id,
    name: getLocaleProperty(collection, "name"),
    description: getLocaleProperty(__mon__!, "description"),
    firstType,
    secondType,
    weight,
    height,
    tier,
    evolutionLevel,
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
    userId,
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
    baseTotal,
    total,
    colPoint,
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
    name: getLocaleProperty(collection, "name"),
    baseTotal,
    total,
    colPoint,
  };
};

export const convertMonToCardMon: (mon: Mon) => CardMon = (mon) => {
  const { id, firstType, secondType, tier, stars, evolutionLevel, total, colPoint } = mon;
  return {
    id,
    firstType,
    secondType,
    tier,
    stars,
    evolutionLevel,
    name: getLocaleProperty(mon, "name"),
    total,
    colPoint,
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
  const hasSuperior = resultArray.find(
    (item) =>
      item.newCollection.potential.includes("S") && item.newCollection.level === 1,
  );
  const hasMyth = resultArray.find((item) => item.newCollection.tier === "myth");
  let trainerClass = 0;
  const hasPromoted = resultArray.find((item) => {
    trainerClass = item.trainerClass;
    return !!item.trainerClass;
  });
  const messages = [];
  updatedColPoints && messages.push(getUpdatedColPointMessage(updatedColPoints));
  hasSuperior && messages.push("You've got a superior Pokémon!");
  hasMyth && messages.push("You've got a mythical Pokémon!");
  hasPromoted &&
    messages.push(`You've become a ${capitalize(TRAINER_CLASSES[trainerClass - 1])}`);
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

export const getMergedPageData = <T>(data: Pageable<T>[]) => {
  return data.reduce((prev: T[], item) => [...prev, ...item.items], []);
};

export const getTrainerClassLimit = (trainerClass: number) => {
  return trainerClass * TRAINER_CLASS_LIMIT_UNIT;
};

export const checkIsCollectionMaxLevel = (user: User, mon: CardMon | ModalMon) => {
  if (!mon.baseTotal) {
    return false;
  }
  return (
    getTrainerClassLimit(user.trainerClass) < mon.total - mon.baseTotal + mon.colPoint
  );
};

export const signInWithGithub = () => {
  const query = {
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: `${window.origin}${ROUTES.EXCHANGE_CODE}`,
  };
  window.location.replace(
    `https://github.com/login/oauth/authorize?${qs.stringify(query)}`,
  );
};
