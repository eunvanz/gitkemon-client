import { useQuery, UseQueryOptions } from "react-query";
import api from "../api";
import { Mon, QUERY_KEY } from "../types";

const useMonsQuery = (queryOptions?: UseQueryOptions<Mon[]>) => {
  const query = useQuery<Mon[]>(QUERY_KEY.MONS, api.getAllMons, queryOptions);
  return query;
};

export default useMonsQuery;
