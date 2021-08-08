import React, { ComponentType } from "react";
import { NextPage } from "next";

export interface User {
  id: string;
  nickname: string;
  introduce: string;
  lastContributions: number;
  lastRewardedDate: Date;
  contributionBaseDate: Date;
  accessToken: string;
  isActive: boolean;
  githubUser: GithubUser;
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
  firstType: string;
  secondType?: string | null;
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
  nextMon?: Mon[];
  createdAt?: string;
  updatedAt?: string;
  __monImages__?: MonImage[];
  __has_monImages__?: boolean;
}

export type MonTier = "basic" | "special" | "rare" | "s.rare" | "elite" | "legend";

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
  stars: number;
  colPoint: number;
  level?: number;
  potential?: MonPotential;
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
  MONS = "MONS",
  MON_IMAGES = "MON_IMAGES",
}
