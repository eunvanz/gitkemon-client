import { RareNews } from "~/types";
import mockCollections from "./collection";
import mockUsers from "./user";

const rareNewsItem: RareNews = {
  id: 1,
  userId: "test",
  user: mockUsers.user,
  collectionId: 1,
  collection: {
    ...mockCollections.collections[0],
    tier: "legend",
    potential: "SS",
  },
  method: "hunt",
  createdAt: "2020-12-21",
};

const rareNewsItems: RareNews[] = Array.from({ length: 5 }).map((_, index) => ({
  ...rareNewsItem,
  id: index,
}));

const mockRareNews = {
  rareNewsItem,
  rareNewsItems,
};

export default mockRareNews;
