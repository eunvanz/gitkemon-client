import { User, UserProfile } from "~/types";

const user: User = {
  id: "mock-uuid",
  nickname: "Benjamin",
  introduce: "자기소개가 음슴",
  lastContributions: 2112,
  lastPaybackDate: "2021-08-31T15:10:02.000Z",
  contributionBaseDate: "2020-07-24T06:38:12.000Z",
  isActive: true,
  githubLogin: "eunvanz",
  colPoint: 1111,
  trainerClass: 1,
  createdAt: "2016-02-20T08:30:27Z",
  updatedAt: "2021-07-24T17:42:24Z",
  pokeBallId: 74,
  role: "user",
  referrerCode: "mockReferrer",
  githubUser: {
    login: "eunvanz",
    id: 17351661,
    node_id: "MDQ6VXNlcjE3MzUxNjYx",
    avatar_url: "https://avatars.githubusercontent.com/u/17351661?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/eunvanz",
    html_url: "https://github.com/eunvanz",
    followers_url: "https://api.github.com/users/eunvanz/followers",
    following_url: "https://api.github.com/users/eunvanz/following{/other_user}",
    gists_url: "https://api.github.com/users/eunvanz/gists{/gist_id}",
    starred_url: "https://api.github.com/users/eunvanz/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/eunvanz/subscriptions",
    organizations_url: "https://api.github.com/users/eunvanz/orgs",
    repos_url: "https://api.github.com/users/eunvanz/repos",
    events_url: "https://api.github.com/users/eunvanz/events{/privacy}",
    received_events_url: "https://api.github.com/users/eunvanz/received_events",
    type: "User",
    site_admin: false,
    name: "Benjamin",
    company: "Kakaopay",
    blog: "",
    location: "Seoul, South Korea",
    email: null,
    hireable: null,
    bio: null,
    twitter_username: null,
    public_repos: 18,
    public_gists: 11,
    followers: 3,
    following: 1,
    created_at: "2016-02-20T08:30:27Z",
    updated_at: "2021-07-24T17:42:24Z",
  },
  __pokeBall__: {
    createdAt: "2021-08-08T17:32:37.163Z",
    updatedAt: "2021-08-12T01:05:02.000Z",
    id: 74,
    basicPokeBalls: 706,
    basicRarePokeBalls: 235,
    rarePokeBalls: 70,
    elitePokeBalls: 4,
    legendPokeBalls: 2,
  },
};

const userProfile: UserProfile = {
  id: "275de423-5b14-4082-bf67-b82e170470d7",
  nickname: "Benjamin",
  introduce: null,
  githubLogin: "eunvanz",
  colPoint: 1096,
  lastContributions: 1071,
  lastPaybackDate: "2021-09-02T10:55:35.000Z",
  avatarUrl: "https://avatars.githubusercontent.com/u/17351661?v=4",
  githubUrl: "https://github.com/eunvanz",
  trainerClass: 3,
  collectionRank: 2,
  contributionsRank: 12,
};

const mockUsers = {
  user,
  userProfile,
};

export default mockUsers;
