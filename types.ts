import React from "react";

export interface User {
  id: string;
  nickname: string;
  introduce?: string | null;
  lastContributions: number;
  lastPaybackDate: string;
  contributionBaseDate: string;
  isActive: boolean;
  githubLogin: string;
  githubUser?: GithubUser;
  colPoint: number;
  trainerClass: number;
  createdAt: string;
  updatedAt: string;
  pokeBallId: number;
  role: Role;
  referrerCode: string;
  referredBy?: string | null;
  __pokeBall__?: PokeBall | null;
}

export type Role = "admin" | "user";

export interface PokeBall {
  id: number;
  basicPokeBalls: number;
  basicRarePokeBalls: number;
  rarePokeBalls: number;
  elitePokeBalls: number;
  legendPokeBalls: number;
  createdAt: string;
  updatedAt: string;
}

export interface GithubUser {
  id: number;
  login: string;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string | null;
  hireable: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export enum STATE_KEY {
  USER = "USER",
  HUNT_RESULT = "HUNT_RESULT",
  EVOLVE_MON = "EVOLVE_MON",
  BLEND_MON = "BLEND_MON",
  COLLECTION_FILTER = "COLLECTION_FILTER",
}

export interface Mon {
  id: number;
  order: number;
  name: string;
  nameKo?: string | null;
  nameJa?: string | null;
  nameZh?: string | null;
  description: string;
  descriptionKo?: string | null;
  descriptionJa?: string | null;
  descriptionZh?: string | null;
  firstType: MonType;
  secondType?: MonType | null;
  height: number;
  weight: number;
  tier: MonTier;
  evolutionLevel?: number | null;
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  total: number;
  stars: number;
  colPoint: number;
  evolveFromId?: number | null;
  createdAt?: string;
  updatedAt?: string;
  __monImages__?: MonImage[] | null;
  __nextMons__?: Mon[] | null;
  __has_monImages__?: boolean;
}

export type MonTier =
  | "basic"
  | "special"
  | "rare"
  | "s.rare"
  | "elite"
  | "legend"
  | "myth";

export interface MonImage {
  id: number;
  designerId?: string | null;
  designerName: string;
  imageUrl: string;
  __mon__?: Mon | null;
  createdAt?: string;
  updatedAt?: string;
}

export type MonPotential = "SS" | "S" | "A" | "B" | "C" | "D" | "E" | "F";

export interface CardMon {
  id: number;
  firstType: MonType;
  secondType?: MonType | null;
  tier: MonTier;
  evolutionLevel?: number | null;
  stars: number;
  level?: number | null;
  potential?: MonPotential | null;
  imageUrl?: string | null;
  name: string;
  total: number;
  baseTotal?: number;
  colPoint: number;
}

export interface ModalMon {
  id: number;
  name: string;
  description: string;
  firstType: MonType;
  secondType?: MonType | null;
  height: number;
  weight: number;
  tier: MonTier;
  evolutionLevel?: number | null;
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  total: number;
  baseHp?: number | null;
  baseAttack?: number | null;
  baseDefense?: number | null;
  baseSpecialAttack?: number | null;
  baseSpecialDefense?: number | null;
  baseSpeed?: number | null;
  baseTotal?: number | null;
  stars: number;
  colPoint: number;
  level?: number | null;
  potential?: MonPotential | null;
  imageUrl?: string | null;
  image?: MonImage | null;
  userId?: string;
}

export type MonType =
  | "grass"
  | "water"
  | "psychic"
  | "normal"
  | "bug"
  | "ice"
  | "fairy"
  | "dark"
  | "electric"
  | "poison"
  | "ground"
  | "fighting"
  | "fire"
  | "flying"
  | "rock"
  | "ghost"
  | "dragon"
  | "steel";

export type ExtendableHTMLProps<T extends HTMLElement> = React.HTMLProps<T>;

export enum QUERY_KEY {
  USER = "USER",
  MON_IMAGE = "MON_IMAGE",
  MON = "MON",
  MONS = "MONS",
  ACTIVE_MONS = "ACTIVE_MONS",
  INACTIVE_MONS = "INACTIVE_MONS",
  MONS_WITH_IMAGES = "MONS_WITH_IMAGES",
  NEXT_MONS = "NEXT_MONS",
  MON_IMAGES = "MON_IMAGES",
  AVAILABLE_CONTRIBUTIONS = "AVAILABLE_CONTRIBUTIONS",
  COLLECTION = "COLLECTION",
  COLLECTIONS = "COLLECTIONS",
  PAINTING_LIST = "PAINTING_LIST",
  PAINTING = "PAINTING",
  MON_RANKING = "MON_RANKING",
  USER_COLLECTION_RANKING = "USER_COLLECTION_RANKING",
  USER_CONTRIBUTIONS_RANKING = "USER_CONTRIBUTIONS_RANKING",
  USER_PROFILE = "USER_PROFILE",
  PROFILE_MON = "PROFILE_MON",
  PAYBACK_HISTORY = "PAYBACK_HISTORY",
  RECENT_MONS = "RECENT_MONS",
  RECENT_RARE_NEWS = "RECENT_RARE_NEWS",
  LAST_PAYBACK = "LAST_PAYBACK",
  CONTENT_LIST = "CONTENT_LIST",
  CONTENT = "CONTENT",
  COMMENTS = "COMMENTS",
  REFERRED_COUNT = "REFERRED_COUNT",
}

export type MonImageSearchCondition = "monName" | "designerName";

export interface Payback {
  id: number;
  userId: string;
  contributions: number;
  totalContributions: number;
  daysInARow: number;
  basicPokeBalls: number;
  basicRarePokeBalls: number;
  rarePokeBalls: number;
  elitePokeBalls: number;
  legendPokeBalls: number;
  paybackDateString: string;
  hasDaysInARowReward: boolean;
  hasContributionsCountReward: boolean;
}

export type PokeBallType = "basic" | "basicRare" | "rare" | "elite" | "legend";

export interface Collection {
  id: number;
  height: number;
  weight: number;
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  total: number;
  baseHp: number;
  baseAttack: number;
  baseDefense: number;
  baseSpecialAttack: number;
  baseSpecialDefense: number;
  baseSpeed: number;
  baseTotal: number;
  monImageId: number;
  monImageUrl: string;
  __monImage__?: MonImage | null;
  monId: number;
  __mon__?: Mon | null;
  potential: MonPotential;
  level: number;
  userId: string;
  __user__?: User | null;
  stars: number;
  tier: MonTier;
  firstType: MonType;
  secondType?: MonType | null;
  evolutionLevel?: number | null;
  createdAt: string;
  updatedAt: string;
  name: string;
  nameKo?: string | null;
  nameJa?: string | null;
  nameZh?: string | null;
  colPoint: number;
  __has_mon__?: boolean;
  __has_monImage__?: boolean;
}

export type HuntResponse = HuntResult[];

export interface HuntResult {
  oldCollection: Collection | null;
  newCollection: Collection;
  updatedColPoint: number;
  trainerClass: number;
}

export interface EvolveMonDto {
  collectionId: number;
  monId: number;
}

export interface Painting {
  id: number;
  imageUrl: string;
  designerName: string;
  designerId?: string;
  monId: number;
  mon: Mon;
  likesCnt: number;
  __likes__?: Like<Painting>[] | null;
  isRegistered: boolean;
  commentsCnt: number;
  __comments__?: Comment<Painting>[] | null;
  createdAt: string;
  updatedAt: string;
  isLiked: boolean;
}

export interface Comment<T> {
  id: number;
  userId: string;
  user: User;
  body: string;
  parentId?: number | null;
  __parent__?: Comment<T> | null;
  contentType: ContentType;
  __content__?: T | null;
  createdAt: string;
  updatedAt: string;
}

export interface Like<T> {
  id: number;
  userId: string;
  __user__?: User | null;
  contentType: string;
  contentId: string;
  __content__?: T | null;
  createdAt: string;
  updatedAt: string;
}

export interface Pageable<T> {
  items: T[];
  meta: {
    itemCount: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface PageRequestOptions {
  page?: number;
  limit?: number;
}

export type ContentType = "painting" | "notice" | "tip";

export interface PaybackLog {
  date: string;
  totalContributions: number;
}

export interface UserProfile {
  id: string;
  nickname: string;
  introduce: string | null;
  githubLogin: string;
  colPoint: number;
  lastContributions: number;
  lastPaybackDate: string;
  avatarUrl: string;
  githubUrl: string;
  trainerClass: number;
  collectionRank: number;
  contributionsRank: number;
}

export interface ProfileMon {
  topMons: Collection[];
  topMonRanks: number[];
  recentMons: Collection[];
}

export interface RareNews {
  id: number;
  userId: string;
  user: User;
  collectionId: number;
  collection: Collection;
  method: HuntMethod;
  createdAt: string;
}

export type HuntMethod = "hunt" | "evolve" | "blend";

export interface Content {
  id: number;
  type: ContentType;
  title: string;
  userId: string;
  user: User;
  body: string;
  commentsCnt: number;
  likesCnt: number;
  viewsCnt: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
  isLiked: boolean;
}
