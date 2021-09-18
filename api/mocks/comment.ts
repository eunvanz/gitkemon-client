import { Comment, Content } from "~/types";
import mockContents from "./content";
import mockUsers from "./user";

const comment: Comment<Content> = {
  id: 1,
  userId: mockUsers.user.id,
  user: mockUsers.user,
  body: mockContents.content.body,
  contentType: "notice",
  createdAt: "2021-09-05T21:14:24.119Z",
  updatedAt: "2021-09-17T08:41:09.000Z",
};

const comments: Comment<Content>[] = [
  {
    id: 1,
    userId: mockUsers.user.id,
    user: mockUsers.user,
    body: mockContents.content.body,
    contentType: "notice",
    createdAt: "2021-09-05T21:14:24.119Z",
    updatedAt: "2021-09-17T08:41:09.000Z",
  },
  {
    id: 1,
    userId: mockUsers.user.id,
    user: mockUsers.user,
    body: mockContents.content.body,
    contentType: "notice",
    createdAt: "2021-09-05T21:14:24.119Z",
    updatedAt: "2021-09-17T08:41:09.000Z",
  },
  {
    id: 1,
    userId: mockUsers.user.id,
    user: mockUsers.user,
    body: mockContents.content.body,
    contentType: "notice",
    createdAt: "2021-09-05T21:14:24.119Z",
    updatedAt: "2021-09-17T08:41:09.000Z",
  },
];

const mockComments = {
  comment,
  comments,
};

export default mockComments;
