import { rest } from "msw";
import mockMonRanking from "~/api/mocks/monRanking";
import API_URL from "~/api/urls";

export const handlers = [
  rest.get(API_URL.COLLECTIONS__RANK, (_req, res, ctx) => {
    return res(ctx.json(mockMonRanking.total));
  }),
];
