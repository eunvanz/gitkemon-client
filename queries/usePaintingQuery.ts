import { useQuery, UseQueryOptions } from "react-query";
import { QUERY_KEY } from "~/types";
import api from "../api";

const usePaintingQuery = (paintingId: number, queryOptions?: UseQueryOptions) => {
  const query = useQuery([QUERY_KEY.PAINTING]);
  return query;
};

export default usePaintingQuery;
