import { CardMon, ModalMon, Mon } from "../../types";

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

const activeMons: Mon[] = [
  {
    createdAt: "2021-07-21T16:16:03.739Z",
    updatedAt: "2021-07-29T13:33:18.000Z",
    id: 1,
    order: 1,
    name: "bulbasaur",
    nameKo: "이상해씨",
    nameJa: "フシギダネ",
    nameZh: "妙蛙種子",
    description:
      "A strange seed was\nplanted on its\nback at birth.\fThe plant sprouts\nand grows with\nthis POKéMON.",
    descriptionKo:
      "태어났을 때부터 등에\n이상한 씨앗이 심어져 있으며\n몸과 함께 자란다고 한다.",
    descriptionJa:
      "うまれたときから　せなかに\nふしぎな　タネが　うえてあって\nからだと　ともに　そだつという。",
    descriptionZh: "背上的種子裡存著很多營養，\n所以就算好幾天不吃東西\n也能活得好好的！",
    firstType: "grass",
    secondType: "poison",
    height: 7,
    weight: 69,
    tier: "basic",
    evolutionLevel: 4,
    hp: 45,
    attack: 49,
    defense: 49,
    specialAttack: 65,
    specialDefense: 65,
    speed: 45,
    total: 318,
    colPoint: 1,
    stars: 3,
    evolveFromId: undefined,
  },
  {
    createdAt: "2021-07-21T16:16:03.759Z",
    updatedAt: "2021-08-18T15:09:54.080Z",
    id: 2,
    order: 2,
    name: "ivysaur",
    nameKo: "이상해풀",
    nameJa: "フシギソウ",
    nameZh: "妙蛙草",
    description:
      "When the bulb on\nits back grows\nlarge, it appears\fto lose the\nability to stand\non its hind legs.",
    descriptionKo:
      "꽃봉오리가 등에 붙어 있으며\n양분을 흡수해가면\n커다란 꽃이 핀다고 한다.",
    descriptionJa:
      "つぼみが　せなかに　ついていて\nようぶんを　きゅうしゅうしていくと\nおおきな　はなが　さくという。",
    descriptionZh: "在吸收了養分後，\n變大的花苞開始飄出香氣時，\n就表示快要開花了。",
    firstType: "grass",
    secondType: "poison",
    height: 10,
    weight: 130,
    tier: "special",
    evolutionLevel: 5,
    hp: 60,
    attack: 62,
    defense: 63,
    specialAttack: 80,
    specialDefense: 80,
    speed: 60,
    total: 405,
    colPoint: 4,
    stars: 5,
    evolveFromId: 1,
  },
  {
    createdAt: "2021-07-21T16:16:03.761Z",
    updatedAt: "2021-08-18T15:09:54.081Z",
    id: 3,
    order: 3,
    name: "venusaur",
    nameKo: "이상해꽃",
    nameJa: "フシギバナ",
    nameZh: "妙蛙花",
    description:
      "The plant blooms\nwhen it is\nabsorbing solar\fenergy. It stays\non the move to\nseek sunlight.",
    descriptionKo: "큰 꽃잎을 펼쳐\n햇빛을 받고 있으면\n몸에 힘이 넘쳐흐른다.",
    descriptionJa:
      "おおきな　はなびらを　ひろげ\nたいようの　ひかりを　あびていると\nからだに　げんきが　みなぎっていく。",
    descriptionZh: "為了支撐超級進化之後\n變得更大的花，下盤的\n筋骨變得更加強壯了。",
    firstType: "grass",
    secondType: "poison",
    height: 20,
    weight: 1000,
    tier: "special",
    evolutionLevel: undefined,
    hp: 80,
    attack: 82,
    defense: 83,
    specialAttack: 100,
    specialDefense: 100,
    speed: 80,
    total: 525,
    colPoint: 20,
    stars: 7,
    evolveFromId: 2,
  },
  {
    createdAt: "2021-07-21T16:16:03.670Z",
    updatedAt: "2021-07-29T13:33:18.000Z",
    id: 4,
    order: 5,
    name: "charmander",
    nameKo: "파이리",
    nameJa: "ヒトカゲ",
    nameZh: "小火龍",
    description:
      "Obviously prefers\nhot places. When\nit rains, steam\fis said to spout\nfrom the tip of\nits tail.",
    descriptionKo:
      "꼬리의 불꽃은 파이리의\n생명력의 상징이다.\n건강할 때 왕성하게 불타오른다.",
    descriptionJa:
      "しっぽの　ほのおは　ヒトカゲの\nせいめいりょくの　あかし。\nげんきだと　さかんに　もえさかる。",
    descriptionZh: "要是把牠帶到安靜的地方，\n就能聽見牠的尾巴燃燒時\n發出的微小聲音。",
    firstType: "fire",
    secondType: undefined,
    height: 6,
    weight: 85,
    tier: "basic",
    evolutionLevel: 4,
    hp: 39,
    attack: 52,
    defense: 43,
    specialAttack: 60,
    specialDefense: 50,
    speed: 65,
    total: 309,
    colPoint: 1,
    stars: 3,
    evolveFromId: undefined,
  },
  {
    createdAt: "2021-07-21T16:16:03.763Z",
    updatedAt: "2021-07-29T13:33:20.000Z",
    id: 5,
    order: 6,
    name: "charmeleon",
    nameKo: "리자드",
    nameJa: "リザード",
    nameZh: "火恐龍",
    description:
      "When it swings\nits burning tail,\nit elevates the\ftemperature to\nunbearably high\nlevels.",
    descriptionKo:
      "꼬리를 휘둘러 상대를\n쓰러트리고 날카로운 발톱으로\n갈기갈기 찢어버린다.",
    descriptionJa:
      "しっぽを　ふりまわして　あいてを\nなぎたおし　するどい　ツメで\nズタズタに　ひきさいてしまう。",
    descriptionZh:
      "在與強敵戰鬥的過程中，\n如果情緒變得興奮起來，\n有時會噴出藍白色的火焰。",
    firstType: "fire",
    secondType: undefined,
    height: 11,
    weight: 190,
    tier: "special",
    evolutionLevel: 5,
    hp: 58,
    attack: 64,
    defense: 58,
    specialAttack: 80,
    specialDefense: 65,
    speed: 80,
    total: 405,
    colPoint: 4,
    stars: 5,
    evolveFromId: 4,
  },
  {
    createdAt: "2021-07-21T16:16:03.700Z",
    updatedAt: "2021-07-29T13:40:39.000Z",
    id: 6,
    order: 7,
    name: "charizard",
    nameKo: "리자몽",
    nameJa: "リザードン",
    nameZh: "噴火龍",
    description:
      "Spits fire that\nis hot enough to\nmelt boulders.\fKnown to cause\nforest fires\nunintentionally.",
    descriptionKo:
      "입에서 작렬하는 불꽃을\n토해낼 때 꼬리의 끝이\n더욱 붉고 격렬하게 타오른다.",
    descriptionJa:
      "くちから　しゃくねつの　ほのおを\nはきだすとき　しっぽの　さきは\nより　あかく　はげしく　もえあがる。",
    descriptionZh:
      "全身湧出超乎尋常的力量，\n將身體染成了黑色，同時\n熊熊燃燒著藍色的火焰。",
    firstType: "fire",
    secondType: "flying",
    height: 17,
    weight: 905,
    tier: "special",
    evolutionLevel: undefined,
    hp: 78,
    attack: 84,
    defense: 78,
    specialAttack: 109,
    specialDefense: 85,
    speed: 100,
    total: 534,
    colPoint: 20,
    stars: 7,
    evolveFromId: 5,
  },
  {
    createdAt: "2021-07-21T16:16:03.723Z",
    updatedAt: "2021-08-17T16:58:43.643Z",
    id: 7,
    order: 10,
    name: "squirtle",
    nameKo: "꼬부기",
    nameJa: "ゼニガメ",
    nameZh: "傑尼龜",
    description:
      "Shoots water at\nprey while in the\nwater.\fWithdraws into\nits shell when in\ndanger.",
    descriptionKo:
      "등껍질에 숨어 몸을 보호한다.\n상대의 빈틈을 놓치지 않고\n물을 뿜어내어 반격한다.",
    descriptionJa:
      "こうらに　とじこもり　みを　まもる。\nあいての　すきを　みのがさず\nみずを　ふきだして　はんげきする。",
    descriptionZh:
      "會從水面噴水來擊落獵物。\n當遇到危險時，會把手腳\n縮進甲殼裡保護自己。",
    firstType: "water",
    secondType: undefined,
    height: 5,
    weight: 90,
    tier: "basic",
    evolutionLevel: 4,
    hp: 44,
    attack: 48,
    defense: 65,
    specialAttack: 50,
    specialDefense: 64,
    speed: 43,
    total: 314,
    colPoint: 1,
    stars: 3,
    evolveFromId: undefined,
  },
  {
    createdAt: "2021-07-21T16:16:03.658Z",
    updatedAt: "2021-07-29T13:33:15.000Z",
    id: 8,
    order: 11,
    name: "wartortle",
    nameKo: "어니부기",
    nameJa: "カメール",
    nameZh: "卡咪龜",
    description:
      "When tapped, this\nPOKéMON will pull\nin its head, but\fits tail will\nstill stick out a\nlittle bit.",
    descriptionKo:
      "딱 하고 머리를 맞을 때\n등껍질로 숨어서 피한다. 하지만\n꼬리가 살짝 삐져나와 있다.",
    descriptionJa:
      "ポカンと　あたまを　たたかれるとき\nこうらに　ひっこんで　よける。でも\nちょっとだけ　しっぽが　でているよ。",
    descriptionZh: "如果有人打牠的頭，\n牠會縮進殼裡來躲避，\n但會留下一小截尾巴在外面。",
    firstType: "water",
    secondType: undefined,
    height: 10,
    weight: 225,
    tier: "special",
    evolutionLevel: 5,
    hp: 59,
    attack: 63,
    defense: 80,
    specialAttack: 65,
    specialDefense: 80,
    speed: 58,
    total: 405,
    colPoint: 4,
    stars: 5,
    evolveFromId: 7,
  },
  {
    createdAt: "2021-07-21T16:16:03.790Z",
    updatedAt: "2021-07-29T13:20:58.000Z",
    id: 9,
    order: 12,
    name: "blastoise",
    nameKo: "거북왕",
    nameJa: "カメックス",
    nameZh: "水箭龜",
    description:
      "It deliberately\nmakes itself heavy\nso it can with­\fstand the recoil\nof the water jets\nit fires.",
    descriptionKo:
      "무거운 몸으로 상대를\n덮쳐서 기절시킨다.\n위기에 처하면 등껍질에 숨는다.",
    descriptionJa:
      "からだが　おもたく　のしかかって\nあいてを　きぜつさせる。\nピンチの　ときは　カラに　かくれる。",
    descriptionZh: "在鎖定了目標之後，\n會用比消防車的水龍\n更強的力道來射出水柱。",
    firstType: "water",
    secondType: undefined,
    height: 16,
    weight: 855,
    tier: "special",
    evolutionLevel: undefined,
    hp: 79,
    attack: 83,
    defense: 100,
    specialAttack: 85,
    specialDefense: 105,
    speed: 78,
    total: 530,
    colPoint: 20,
    stars: 7,
    evolveFromId: 8,
  },
  {
    createdAt: "2021-07-21T16:16:03.419Z",
    updatedAt: "2021-07-29T10:24:04.000Z",
    id: 10,
    order: 14,
    name: "caterpie",
    nameKo: "캐터피",
    nameJa: "キャタピー",
    nameZh: "綠毛蟲",
    description:
      "It releases a stench from its red\nantenna to repel enemies. It\ngrows by molting repeatedly.",
    descriptionKo:
      "머리의 더듬이로부터\n강렬한 냄새를 내어\n적을 물리치고 몸을 보호한다.",
    descriptionJa:
      "あたまの　しょっかく　から\nきょうれつな　においを　だして\nてきを　おいはらい　みをまもる。",
    descriptionZh: "被鳥寶可夢襲擊時，\n會從觸角釋放出臭氣抵抗，\n但還是經常淪為獵物。",
    firstType: "bug",
    secondType: undefined,
    height: 3,
    weight: 29,
    tier: "basic",
    evolutionLevel: 2,
    hp: 45,
    attack: 30,
    defense: 35,
    specialAttack: 20,
    specialDefense: 20,
    speed: 45,
    total: 195,
    colPoint: 1,
    stars: 1,
    evolveFromId: undefined,
  },
  {
    createdAt: "2021-07-21T16:22:49.370Z",
    updatedAt: "2021-07-29T10:24:04.000Z",
    id: 11,
    order: 15,
    name: "metapod",
    nameKo: "단데기",
    nameJa: "トランセル",
    nameZh: "鐵甲蛹",
    description:
      "This POKéMON is\nvulnerable to\nattack while its\fshell is soft,\nexposing its weak\nand tender body.",
    descriptionKo:
      "강철같이 단단한 껍질로\n부드러운 몸을 보호하고 있다.\n진화할 때까지 가만히 참고 있다.",
    descriptionJa:
      "こうてつのように　かたい　カラで\nやわらかい　なかみを　まもっている。\nしんかするまで　じっと　たえている。",
    descriptionZh:
      "殼中塞滿了軟綿綿的身體。\n幾乎動也不動是為了防止\n身體在不留神時露出來。",
    firstType: "bug",
    secondType: undefined,
    height: 7,
    weight: 99,
    tier: "special",
    evolutionLevel: 3,
    hp: 50,
    attack: 20,
    defense: 55,
    specialAttack: 25,
    specialDefense: 25,
    speed: 30,
    total: 205,
    colPoint: 2,
    stars: 1,
    evolveFromId: 10,
  },
  {
    createdAt: "2021-07-21T16:22:54.373Z",
    updatedAt: "2021-08-17T16:58:43.645Z",
    id: 12,
    order: 16,
    name: "butterfree",
    nameKo: "버터플",
    nameJa: "バタフリー",
    nameZh: "巴大蝶",
    description:
      "In battle, it\nflaps its wings\nat high speed to\frelease highly\ntoxic dust into\nthe air.",
    descriptionKo:
      "꽃의 꿀을 매우 좋아한다.\n약간의 꽃가루만으로 꽃밭이\n있는 장소를 찾아낼 수 있다.",
    descriptionJa:
      "はなの　ミツが　だいこうぶつ。\nわずかな　かふんで　はなばたけの\nばしょを　さがしだすことが　できる。",
    descriptionZh:
      "仔細觀察那雙大眼睛的話，\n會發現那其實是由無數小眼睛\n聚集在一起而形成的。",
    firstType: "bug",
    secondType: "flying",
    height: 11,
    weight: 320,
    tier: "special",
    evolutionLevel: undefined,
    hp: 60,
    attack: 45,
    defense: 50,
    specialAttack: 90,
    specialDefense: 80,
    speed: 70,
    total: 395,
    colPoint: 6,
    stars: 5,
    evolveFromId: 11,
  },
  {
    createdAt: "2021-07-21T16:22:48.259Z",
    updatedAt: "2021-08-17T16:58:43.646Z",
    id: 13,
    order: 17,
    name: "weedle",
    nameKo: "뿔충이",
    nameJa: "ビードル",
    nameZh: "獨角蟲",
    description:
      "Often found in\nforests, eating\nleaves.\fIt has a sharp\nvenomous stinger\non its head.",
    descriptionKo:
      "숲이나 풀밭에 많이 서식한다.\n머리끝에 5cm 정도의\n작고 날카로운 독침을 지니고 있다.",
    descriptionJa:
      "もりや　くさちに　おおく　せいそく。\nあたまの　さきに　５センチぐらいの\nちいさく　するどい　どくばりをもつ。",
    descriptionZh: "头上长有尖锐的针。\n它喜欢藏在森林或\n草丛里大量吞食树叶。",
    firstType: "bug",
    secondType: "poison",
    height: 3,
    weight: 32,
    tier: "basic",
    evolutionLevel: 2,
    hp: 40,
    attack: 35,
    defense: 30,
    specialAttack: 20,
    specialDefense: 20,
    speed: 50,
    total: 195,
    colPoint: 1,
    stars: 1,
    evolveFromId: undefined,
  },
  {
    createdAt: "2021-07-21T16:22:48.559Z",
    updatedAt: "2021-07-29T10:26:26.000Z",
    id: 14,
    order: 18,
    name: "kakuna",
    nameKo: "딱충이",
    nameJa: "コクーン",
    nameZh: "鐵殼蛹",
    description:
      "Almost incapable\nof moving, this\nPOKéMON can only\fharden its shell\nto protect itself\nfrom predators.",
    descriptionKo:
      "스스로는 거의 움직일 수 없지만\n위험할 때는 단단해져서\n몸을 보호하고 있는 것 같다.",
    descriptionJa:
      "じぶんでは　ほとんど　うごけないが\nあぶないときは　かたくなって\nみを　まもっているようだ。",
    descriptionZh:
      "雖然幾乎動也動不了，\n但如果遭遇到了危險，\n有時似乎會豎起毒刺來反抗。",
    firstType: "bug",
    secondType: "poison",
    height: 6,
    weight: 100,
    tier: "special",
    evolutionLevel: 3,
    hp: 45,
    attack: 25,
    defense: 50,
    specialAttack: 25,
    specialDefense: 25,
    speed: 35,
    total: 205,
    colPoint: 2,
    stars: 1,
    evolveFromId: 13,
  },
  {
    createdAt: "2021-07-21T16:22:53.394Z",
    updatedAt: "2021-07-29T13:33:19.000Z",
    id: 15,
    order: 19,
    name: "beedrill",
    nameKo: "독침붕",
    nameJa: "スピアー",
    nameZh: "大針蜂",
    description:
      "Flies at high\nspeed and attacks\nusing its large\fvenomous stingers\non its forelegs\nand tail.",
    descriptionKo:
      "양손과 엉덩이에 있는 3개의\n독침으로 상대를 찌르고 찌르고\n또 찌르며 공격한다.",
    descriptionJa:
      "りょうてと　おしりにある　３ぼんの\nどくばりで　あいてを　さして　さして\nさしまくって　こうげきする。",
    descriptionZh: "會用雙手和屁股上的\n３根毒針不斷猛刺\n來攻擊對手。",
    firstType: "bug",
    secondType: "poison",
    height: 10,
    weight: 295,
    tier: "special",
    evolutionLevel: undefined,
    hp: 65,
    attack: 90,
    defense: 40,
    specialAttack: 45,
    specialDefense: 80,
    speed: 75,
    total: 395,
    colPoint: 6,
    stars: 5,
    evolveFromId: 14,
  },
  {
    createdAt: "2021-07-21T16:22:50.077Z",
    updatedAt: "2021-07-29T13:33:18.000Z",
    id: 16,
    order: 21,
    name: "pidgey",
    nameKo: "구구",
    nameJa: "ポッポ",
    nameZh: "波波",
    description:
      "A common sight in\nforests and woods.\nIt flaps its\fwings at ground\nlevel to kick up\nblinding sand.",
    descriptionKo:
      "숲이나 수풀에 많이 분포해 있다.\n땅에서도 격렬한 날갯짓으로\n모래를 뿌리기도 한다.",
    descriptionJa:
      "もりや　はやしに　おおく　ぶんぷ。\nちじょうでも　はげしく　はばたいて\nすなを　かけたりする。",
    descriptionZh: "性情溫馴，即使遭到襲擊\n也很少反擊，只會朝對手\n潑沙子來保護自己。",
    firstType: "normal",
    secondType: "flying",
    height: 3,
    weight: 18,
    tier: "basic",
    evolutionLevel: 4,
    hp: 40,
    attack: 45,
    defense: 40,
    specialAttack: 35,
    specialDefense: 35,
    speed: 56,
    total: 251,
    colPoint: 1,
    stars: 2,
    evolveFromId: undefined,
  },
  {
    createdAt: "2021-07-21T16:22:52.594Z",
    updatedAt: "2021-07-29T13:33:17.000Z",
    id: 17,
    order: 22,
    name: "pidgeotto",
    nameKo: "피죤",
    nameJa: "ピジョン",
    nameZh: "比比鳥",
    description:
      "Very protective\nof its sprawling\nterritorial area,\fthis POKéMON will\nfiercely peck at\nany intruder.",
    descriptionKo:
      "발톱이 발달해 있다.\n먹이인 아라리를 잡아\n100km 떨어져 있는 둥지까지 나른다.",
    descriptionJa:
      "あしの　ツメが　はったつしている。\nエサの　タマタマを　つかんで\n１００キロさきの　す　まで　はこぶ。",
    descriptionZh:
      "擁有著超乎尋常的體力，\n會在廣大的地盤裡四處飛行，\n到遠處去尋找食物。",
    firstType: "normal",
    secondType: "flying",
    height: 11,
    weight: 300,
    tier: "special",
    evolutionLevel: 4,
    hp: 63,
    attack: 60,
    defense: 55,
    specialAttack: 50,
    specialDefense: 50,
    speed: 71,
    total: 349,
    colPoint: 4,
    stars: 4,
    evolveFromId: 16,
  },
  {
    createdAt: "2021-07-21T16:22:53.116Z",
    updatedAt: "2021-07-29T13:33:17.000Z",
    id: 18,
    order: 23,
    name: "pidgeot",
    nameKo: "피죤투",
    nameJa: "ピジョット",
    nameZh: "大比鳥",
    description:
      "When hunting, it\nskims the surface\nof water at high\fspeed to pick off\nunwary prey such\nas MAGIKARP.",
    descriptionKo:
      "먹이를 찾을 때 수면을\n아슬아슬하게 미끄러지듯 날아\n잉어킹 등을 움켜잡는다.",
    descriptionJa:
      "エサを　さがすとき　すいめん\nすれすれを　すべるように　とんで\nコイキングなどを　わしづかみにする。",
    descriptionZh: "會以２馬赫的速度飛行\n來尋找食物。巨大的爪子\n是很可怕的武器。",
    firstType: "normal",
    secondType: "flying",
    height: 15,
    weight: 395,
    tier: "special",
    evolutionLevel: undefined,
    hp: 83,
    attack: 80,
    defense: 75,
    specialAttack: 70,
    specialDefense: 70,
    speed: 101,
    total: 479,
    colPoint: 16,
    stars: 6,
    evolveFromId: 17,
  },
  {
    createdAt: "2021-07-21T16:22:51.838Z",
    updatedAt: "2021-07-29T13:33:17.000Z",
    id: 19,
    order: 25,
    name: "rattata",
    nameKo: "꼬렛",
    nameJa: "コラッタ",
    nameZh: "小拉達",
    description:
      "Bites anything\nwhen it attacks.\nSmall and very\fquick, it is a\ncommon sight in\nmany places.",
    descriptionKo:
      "먹을 것이 있는 곳이라면\n어디서든 서식한다.\n온종일 먹이를 찾아다닌다.",
    descriptionJa:
      "たべるものが　あるところなら\nどこにだって　せいそくする。\n１にちじゅう　エサを　さがしている。",
    descriptionZh:
      "門牙會終生生長，所以要隨時保養。\n不幫牠準備好銼刀的話，\n牠就會去咬柱子來磨牙。",
    firstType: "normal",
    secondType: undefined,
    height: 3,
    weight: 35,
    tier: "basic",
    evolutionLevel: 8,
    hp: 30,
    attack: 56,
    defense: 35,
    specialAttack: 25,
    specialDefense: 35,
    speed: 72,
    total: 253,
    colPoint: 1,
    stars: 2,
    evolveFromId: undefined,
  },
  {
    createdAt: "2021-07-21T16:22:54.237Z",
    updatedAt: "2021-08-17T16:58:43.646Z",
    id: 20,
    order: 27,
    name: "raticate",
    nameKo: "레트라",
    nameJa: "ラッタ",
    nameZh: "拉達",
    description:
      "It uses its whis­\nkers to maintain\nits balance.\fIt apparently\nslows down if\nthey are cut off.",
    descriptionKo:
      "계속 자라는 앞니를 갈아내려고\n딱딱한 것을 갉는 습성이 있다.\n벽돌로 된 벽도 갉아서 부순다.",
    descriptionJa:
      "のびつづける　まえばを　けずるため\nかたい　ものを　かじる　しゅうせい。\nブロックべいも　かじって　こわす。",
    descriptionZh: "擅長游泳。後腳帶有小小的足蹼，\n會游過河流，有時還會渡過大海。",
    firstType: "normal",
    secondType: undefined,
    height: 7,
    weight: 185,
    tier: "special",
    evolutionLevel: undefined,
    hp: 55,
    attack: 81,
    defense: 60,
    specialAttack: 50,
    specialDefense: 70,
    speed: 97,
    total: 413,
    colPoint: 8,
    stars: 5,
    evolveFromId: 19,
  },
  {
    createdAt: "2021-07-21T16:22:50.383Z",
    updatedAt: "2021-07-29T13:33:20.000Z",
    id: 23,
    order: 32,
    name: "ekans",
    nameKo: "아보",
    nameJa: "アーボ",
    nameZh: "阿柏蛇",
    description:
      "Moves silently\nand stealthily.\nEats the eggs of\fbirds, such as\nPIDGEY and\nSPEAROW, whole.",
    descriptionKo: "성장할수록 점점 길어진다.\n밤에는 나뭇가지에\n몸을 돌돌 말고 쉰다.",
    descriptionJa:
      "そだつほどに　どんどん　ながくなる。\nそして　よなかは　きのえだに\nグルグルと　からまって　やすむ。",
    descriptionZh:
      "會藉由讓下顎脫臼\n來吞食比自己更大的獵物。\n進食之後會蜷縮起身子休息。",
    firstType: "poison",
    secondType: undefined,
    height: 20,
    weight: 69,
    tier: "basic",
    evolutionLevel: 12,
    hp: 35,
    attack: 60,
    defense: 44,
    specialAttack: 40,
    specialDefense: 54,
    speed: 55,
    total: 288,
    colPoint: 1,
    stars: 3,
    evolveFromId: undefined,
  },
  {
    createdAt: "2021-07-21T16:22:49.435Z",
    updatedAt: "2021-07-29T13:33:18.000Z",
    id: 24,
    order: 33,
    name: "arbok",
    nameKo: "아보크",
    nameJa: "アーボック",
    nameZh: "阿柏怪",
    description:
      "It is rumored that\nthe ferocious\nwarning markings\fon its belly\ndiffer from area\nto area.",
    descriptionKo:
      "배의 무늬가 무서운 얼굴로\n보인다. 약한 적은 그 무늬만\n보고도 도망치고 만다.",
    descriptionJa:
      "おなかの　もようが　こわいかおに\nみえる。よわいてきは　そのもようを\nみただけで　にげだしてしまう。",
    descriptionZh: "最新的研究結果顯示，\n牠們肚子上的花紋\n有２０種以上的不同圖案。",
    firstType: "poison",
    secondType: undefined,
    height: 35,
    weight: 650,
    tier: "special",
    evolutionLevel: undefined,
    hp: 60,
    attack: 95,
    defense: 69,
    specialAttack: 65,
    specialDefense: 79,
    speed: 80,
    total: 448,
    colPoint: 12,
    stars: 6,
    evolveFromId: 23,
  },
  {
    createdAt: "2021-07-21T16:22:49.103Z",
    updatedAt: "2021-08-18T15:26:33.499Z",
    id: 25,
    order: 35,
    name: "pikachu",
    nameKo: "피카츄",
    nameJa: "ピカチュウ",
    nameZh: "皮卡丘",
    description:
      "When several of\nthese POKéMON\ngather, their\felectricity could\nbuild and cause\nlightning storms.",
    descriptionKo: "꼬리를 세우고 주변의\n상황을 살피다 보면 가끔\n꼬리에 번개가 친다.",
    descriptionJa:
      "しっぽを　たてて　まわりの\nようすを　さぐっていると　ときどき\nかみなりが　しっぽに　おちてくる。",
    descriptionZh: "最近發表了聚集大量皮卡丘\n來建造發電廠的計畫。",
    firstType: "electric",
    secondType: undefined,
    height: 4,
    weight: 60,
    tier: "special",
    evolutionLevel: undefined,
    hp: 35,
    attack: 55,
    defense: 40,
    specialAttack: 50,
    specialDefense: 50,
    speed: 90,
    total: 320,
    colPoint: 4,
    stars: 3,
    evolveFromId: 172,
  },
  {
    createdAt: "2021-07-21T16:22:48.984Z",
    updatedAt: "2021-08-18T15:26:02.950Z",
    id: 172,
    order: 34,
    name: "pichu",
    nameKo: "피츄",
    nameJa: "ピチュー",
    nameZh: "皮丘",
    description:
      "It is not yet\nskilled at storing\nelectricity.\fIt may send out a\njolt if amused\nor startled.",
    descriptionKo:
      "동료와 꼬리의 끝을 맞추면서\n불티를 튀기는 놀이를 한다.\n담력 시험을 하고 있는 듯하다.",
    descriptionJa:
      "なかまと　しっぽの　さきを　あわせて\nひばなを　とばす　あそびをする。\nどきょうだめしを　しているらしい。",
    descriptionZh: "還未能熟練地操縱電力。\n有時候稍不留神就會被\n自己的電麻痺到。",
    firstType: "electric",
    secondType: undefined,
    height: 3,
    weight: 20,
    tier: "basic",
    evolutionLevel: 4,
    hp: 20,
    attack: 40,
    defense: 15,
    specialAttack: 35,
    specialDefense: 35,
    speed: 60,
    total: 205,
    colPoint: 1,
    stars: 1,
    evolveFromId: undefined,
  },
];

const mockMons = {
  cardMon,
  modalMon,
  modalMonCollection,
  activeMons,
};

export default mockMons;
