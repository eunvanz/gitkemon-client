import produce from "immer";
import { InfiniteData, useMutation, useQueryClient } from "react-query";
import api from "~/api";
import { assertNotEmpty } from "~/helpers/commonHelpers";
import { Content, ContentType, Pageable, Painting, QUERY_KEY } from "~/types";

export interface LikeMutationParam {
  contentId: number;
  contentType: ContentType;
  isLike: boolean;
}

const useLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ contentId, contentType, isLike }: LikeMutationParam) =>
      isLike
        ? api.postLike({ contentId, contentType })
        : api.postUnlike({ contentId, contentType }),
    {
      onMutate: ({ contentId, contentType, isLike }) => {
        switch (contentType) {
          case "painting":
            queryClient.setQueriesData<InfiniteData<Pageable<Painting>>>(
              QUERY_KEY.PAINTING_LIST,
              (oldData) => {
                assertNotEmpty(oldData);
                return produce(oldData, (draft) => {
                  draft.pages.forEach((page) => {
                    const index = page.items.findIndex((item) => item.id === contentId);
                    if (index > -1) {
                      const item = page.items[index];
                      page.items[index].likesCnt = item.likesCnt + (isLike ? 1 : -1);
                      page.items[index].isLiked = isLike;
                    }
                  });
                });
              },
            );
            break;
          default:
            queryClient.setQueriesData<InfiniteData<Pageable<Content>>>(
              [QUERY_KEY.CONTENT_LIST, contentType],
              (oldData) => {
                assertNotEmpty(oldData);
                return produce(oldData, (draft) => {
                  draft.pages.forEach((page) => {
                    const index = page.items.findIndex((item) => item.id === contentId);
                    if (index > -1) {
                      const item = page.items[index];
                      page.items[index].likesCnt = item.likesCnt + (isLike ? 1 : -1);
                      page.items[index].isLiked = isLike;
                    }
                  });
                });
              },
            );
        }
      },
    },
  );
};

export default useLikeMutation;
