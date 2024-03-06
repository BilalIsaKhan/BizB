import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import globalSearch from "./globalSearch.gql";
/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default function useGlobalSearch(searchType, searchQuery, skip, limit) {
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
    console.log("search2 2 global", data)

    refetch();
  }, [authToken]);
  return [search, loading, refetch];
}
