import { useQuery, UseQueryOptions } from "react-query";
import { Painting, QUERY_KEY } from "~/types";
import api from "../api";

const usePaintingQuery = (
  paintingId: number,
  queryOptions?: UseQueryOptions<Painting>,
) => {
  const query = useQuery<Painting>(
    [QUERY_KEY.PAINTING, paintingId],
    () => api.getPainting(paintingId),
    queryOptions,
  );
  return query;
};

export default usePaintingQuery;
