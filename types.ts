import React from "react";

export interface User {
  id: string;
  nickname: string;
  introduce: string;
  lastContributions: number;
  lastPaybackDate: Date;
  contributionBaseDate: Date;
  accessToken: string;
  isActive: boolean;
  githubUser: GithubUser;
  __pokeBall__?: PokeBall;
}

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
}

export interface Mon {
  id: number;
  order: number;
  name: string;
  nameKo?: string;
  nameJa?: string;
  nameZh?: string;
  description: string;
  descriptionKo?: string;
  descriptionJa?: string;
  descriptionZh?: string;
  firstType: MonType;
  secondType?: MonType;
  height: number;
  weight: number;
  tier: MonTier;
  evolutionLevel?: number;
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  total: number;
  stars: number;
  colPoint: number;
  evolveFromId?: number;
  createdAt?: string;
  updatedAt?: string;
  __monImages__?: MonImage[];
  __nextMons__?: Mon[];
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
  __mon__?: Mon;
  createdAt?: string;
  updatedAt?: string;
}

export type MonPotential = "SS" | "S" | "A" | "B" | "C" | "D" | "E" | "F";

export interface CardMon {
  id: number;
  firstType: MonType;
  secondType?: MonType;
  tier: MonTier;
  evolutionLevel?: number;
  stars: number;
  level?: number;
  potential?: MonPotential;
  imageUrl?: string;
}

export interface ModalMon {
  id: number;
  name: string;
  description: string;
  firstType: MonType;
  secondType?: MonType;
  height: number;
  weight: number;
  tier: MonTier;
  evolutionLevel?: number;
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  total: number;
  baseHp?: number;
  baseAttack?: number;
  baseDefense?: number;
  baseSpecialAttack?: number;
  baseSpecialDefense?: number;
  baseSpeed?: number;
  baseTotal?: number;
  stars: number;
  colPoint: number;
  level?: number;
  potential?: MonPotential;
  imageUrl?: string;
  image?: MonImage;
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
  __monImage__?: MonImage;
  monId: number;
  __mon__?: Mon;
  potential: MonPotential;
  level: number;
  userId: string;
  __user__?: User;
  stars: number;
  tier: MonTier;
  firstType: MonType;
  secondType?: MonType;
  evolutionLevel?: number;
  createdAt: string;
  updatedAt: string;
}

export type HuntResponse = HuntResult[];

export interface HuntResult {
  oldCollection: Collection | null;
  newCollection: Collection;
}

export interface EvolveMonDto {
  collectionId: number;
  monId: number;
}
