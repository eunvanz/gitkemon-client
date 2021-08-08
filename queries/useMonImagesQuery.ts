import { useQuery } from "react-query";
import api from "../api";
import { QUERY_KEY } from "../types";

const useMonImagesQuery = () => {
  const query = useQuery(QUERY_KEY.MON_IMAGES, api);
  return query;
};

export default useMonImagesQuery;
