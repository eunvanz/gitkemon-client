import { Collection } from "../../types";

const huntResultNew: Collection[] = [
  {
    monId: 1,
    level: 1,
    height: 5.3,
    weight: 39.6,
    hp: 56,
    attack: 53,
    defense: 48,
    specialAttack: 76,
    specialDefense: 57,
    speed: 47,
    total: 337,
    baseHp: 56,
    baseAttack: 53,
    baseDefense: 48,
    baseSpecialAttack: 76,
    baseSpecialDefense: 57,
    baseSpeed: 47,
    baseTotal: 337,
    monImageId: 23,
    monImageUrl:
      "https://storage.googleapis.com/gitkemon.appspot.com/mon-images/mon_1_웅이_1628398611186.png",
    potential: "B",
    userId: "275de423-5b14-4082-bf67-b82e170470d7",
    stars: 3,
    tier: "basic",
    firstType: "grass",
    secondType: "poison",
    createdAt: "2021-08-15T07:31:07.328Z",
    updatedAt: "2021-08-15T07:31:07.328Z",
    id: 1,
  },
];

const huntResultLevelUp: Collection[] = [
  {
    createdAt: "2021-08-15T07:31:07.328Z",
    updatedAt: "2021-08-15T07:54:13.000Z",
    id: 1,
    height: 5,
    weight: 40,
    hp: 56,
    attack: 56,
    defense: 48,
    specialAttack: 76,
    specialDefense: 58,
    speed: 47,
    total: 341,
    baseHp: 56,
    baseAttack: 53,
    baseDefense: 48,
    baseSpecialAttack: 76,
    baseSpecialDefense: 57,
    baseSpeed: 47,
    baseTotal: 337,
    monImageId: 23,
    monImageUrl:
      "https://storage.googleapis.com/gitkemon.appspot.com/mon-images/mon_1_웅이_1628398611186.png",
    monId: 1,
    potential: "B",
    level: 5,
    userId: "275de423-5b14-4082-bf67-b82e170470d7",
    stars: 3,
    tier: "basic",
    firstType: "grass",
    secondType: "poison",
  },
];

const mockCollection = {
  huntResultNew,
  huntResultLevelUp,
};

export default mockCollection;
