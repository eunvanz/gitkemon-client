import { useQuery, UseQueryOptions } from "react-query";
import { Content, Comment, QUERY_KEY } from "~/types";
import api from "../api";

const useCommentsQuery = (
  contentId: number,
  queryOptions?: UseQueryOptions<Comment<Content>[]>,
) => {
  const query = useQuery<Comment<Content>[]>(
    [QUERY_KEY.COMMENTS, contentId],
    () => api.getCommentsByContentId(contentId),
    { ...queryOptions },
  );
  return query;
};

export default useCommentsQuery;
