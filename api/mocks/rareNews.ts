import { RareNews } from "~/types";
import mockCollections from "./collection";
import mockUsers from "./user";

const rareNewsItem: RareNews = {
  id: 1,
  userId: "test",
  user: mockUsers.user,
  collectionId: 1,
  collection: mockCollections.collections[0],
  method: "hunt",
  createdAt: "2020-12-21",
};

const mockRareNews = {
  rareNewsItem,
};

export default mockRareNews;
