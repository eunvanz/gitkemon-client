import { Pageable, Painting } from "~/types";

const painting: Painting = {
  createdAt: "2021-08-28T12:17:34.770Z",
  updatedAt: "2021-08-28T12:17:34.770Z",
  id: 1,
  imageUrl:
    "https://storage.googleapis.com/gitkemon.appspot.com/painting-images/painting_338_Benjamin_1630158513909.png",
  designerName: "나랏님말씀",
  designerId: "275de423-5b14-4082-bf67-b82e170470d7",
  monId: 338,
  likesCnt: 0,
  isRegistered: false,
  commentsCnt: 0,
  isLiked: false,
  mon: {
    createdAt: "2021-07-21T16:24:15.007Z",
    updatedAt: "2021-07-29T13:33:15.000Z",
    id: 338,
    order: 433,
    name: "solrock",
    nameKo: "솔록",
    nameJa: "ソルロック",
    nameZh: "太陽岩",
    description:
      "SOLROCK is a new species of POKéMON\nthat is said to have fallen from space.\nIt floats in air and moves silently.\fIn battle, this POKéMON releases\nintensely bright light.",
    descriptionKo:
      "태양 에너지가 파워의\n근원이라서 낮에는 강하다.\n회전하면 몸이 빛난다.",
    descriptionJa:
      "たいようエネルギーが　パワーの\nみなもと　なので　ひるまは　つよい。\nかいてんすると　からだが　ひかる。",
    descriptionZh: "當牠旋轉自己的身體時，\n會發出太陽般的光芒，\n讓敵人的眼睛暫時失明。",
    firstType: "rock",
    secondType: "psychic",
    height: 12,
    weight: 1540,
    tier: "basic",
    evolutionLevel: null,
    hp: 90,
    attack: 95,
    defense: 85,
    specialAttack: 55,
    specialDefense: 65,
    speed: 70,
    total: 460,
    colPoint: 0,
    stars: 6,
    evolveFromId: null,
  },
};

const pagedPaintings: Pageable<Painting> = {
  items: [
    {
      createdAt: "2021-08-28T12:17:34.770Z",
      updatedAt: "2021-08-28T12:17:34.770Z",
      id: 1,
      imageUrl:
        "https://storage.googleapis.com/gitkemon.appspot.com/painting-images/painting_338_Benjamin_1630158513909.png",
      designerName: "나랏님말씀",
      designerId: "275de423-5b14-4082-bf67-b82e170470d7",
      monId: 338,
      likesCnt: 0,
      isRegistered: false,
      commentsCnt: 0,
      mon: {
        createdAt: "2021-07-21T16:24:15.007Z",
        updatedAt: "2021-07-29T13:33:15.000Z",
        id: 338,
        order: 433,
        name: "solrock",
        nameKo: "솔록",
        nameJa: "ソルロック",
        nameZh: "太陽岩",
        description:
          "SOLROCK is a new species of POKéMON\nthat is said to have fallen from space.\nIt floats in air and moves silently.\fIn battle, this POKéMON releases\nintensely bright light.",
        descriptionKo:
          "태양 에너지가 파워의\n근원이라서 낮에는 강하다.\n회전하면 몸이 빛난다.",
        descriptionJa:
          "たいようエネルギーが　パワーの\nみなもと　なので　ひるまは　つよい。\nかいてんすると　からだが　ひかる。",
        descriptionZh:
          "當牠旋轉自己的身體時，\n會發出太陽般的光芒，\n讓敵人的眼睛暫時失明。",
        firstType: "rock",
        secondType: "psychic",
        height: 12,
        weight: 1540,
        tier: "basic",
        evolutionLevel: null,
        hp: 90,
        attack: 95,
        defense: 85,
        specialAttack: 55,
        specialDefense: 65,
        speed: 70,
        total: 460,
        colPoint: 0,
        stars: 6,
        evolveFromId: null,
      },
      isLiked: false,
    },
  ],
  meta: {
    totalItems: 1,
    itemCount: 1,
    itemsPerPage: 32,
    totalPages: 1,
    currentPage: 1,
  },
};

const mockPainting = {
  painting,
  pagedPaintings,
};

export default mockPainting;
