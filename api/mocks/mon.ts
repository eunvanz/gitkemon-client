import { CardMon, ModalMon } from "../../types";

const cardMon: CardMon = {
  id: 1,
  firstType: "bug",
  secondType: "rock",
  tier: "elite",
  stars: 6,
  level: 1,
  potential: "SS",
  imageUrl:
    "https://firebasestorage.googleapis.com/v0/b/hand-pokemon-2.appspot.com/o/monImages%2Fdandanji.png?alt=media&token=1289a5d8-e684-4b0f-abd9-80fd8d0bc971",
};

const modalMon: ModalMon = {
  id: 1,
  name: "단단지",
  description:
    "항아리 같은 등껍질 안에 비축된 나무열매가 녹아서 걸쭉한 액체가 된다고 한다.",
  firstType: "bug",
  secondType: "rock",
  height: 0.5,
  weight: 14.5,
  tier: "elite",
  hp: 20,
  attack: 11,
  defense: 247,
  specialAttack: 10,
  specialDefense: 280,
  speed: 4,
  total: 572,
  colPoint: 60,
  stars: 6,
};

const modalMonCollection: ModalMon = {
  id: 1,
  name: "단단지",
  description:
    "항아리 같은 등껍질 안에 비축된 나무열매가 녹아서 걸쭉한 액체가 된다고 한다.",
  firstType: "bug",
  secondType: "rock",
  height: 0.5,
  weight: 14.5,
  tier: "elite",
  hp: 20,
  baseHp: 18,
  attack: 11,
  baseAttack: 8,
  defense: 247,
  baseDefense: 232,
  specialAttack: 10,
  baseSpecialAttack: 9,
  specialDefense: 280,
  baseSpecialDefense: 268,
  speed: 4,
  baseSpeed: 4,
  total: 639,
  baseTotal: 572,
  colPoint: 60,
  potential: "SS",
  stars: 6,
  image: {
    designerName: "웅이",
    id: 1,
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/hand-pokemon-2.appspot.com/o/monImages%2Fdandanji.png?alt=media&token=1289a5d8-e684-4b0f-abd9-80fd8d0bc971",
  },
  level: 3,
};

const mockMons = {
  cardMon,
  modalMon,
  modalMonCollection,
};

export default mockMons;
