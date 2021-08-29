import produce from "immer";
import { useMutation, useQueryClient } from "react-query";
import api from "~/api";
import { assertNotEmpty } from "~/helpers/commonHelpers";
import { Pageable, Painting, QUERY_KEY } from "~/types";

const useLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(api.postLike, {
    onMutate: ({ contentId, contentType }) => {
      switch (contentType) {
        case "painting":
          queryClient.setQueriesData<Pageable<Painting>>(
            QUERY_KEY.PAINTING_LIST,
            (oldData) => {
              assertNotEmpty(oldData);
              return {
                ...oldData,
                items: oldData.items.map((item) =>
                  item.id !== contentId
                    ? item
                    : {
                        ...item,
                        likesCnt: item.likesCnt + 1,
                      },
                ),
              };
            },
          );
          break;
      }
    },
  });
};

export default useLikeMutation;
