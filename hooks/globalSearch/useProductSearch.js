import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import globalSearch from "./globalSearch.gql";
/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default function useProductSearch(searchType, searchQuery, skip, limit) {
  const authToken = typeof window !== "undefined" ? window.localStorage.getItem("accounts:accessToken") : undefined;
  const { loading, data, refetch, fetchMore } = useQuery(globalSearch, {
    variables: {
      searchType,
      searchQuery,
      skip,
      limit,
    },
  });
  const search = data?.globalSearch;
  useEffect(() => {
    refetch();
    console.log("search2 2 product", data)
  }, []);
  return [search, loading, refetch];
}
