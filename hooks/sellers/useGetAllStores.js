import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import getAllStores from "./getAllStores.gql";
/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default function useGetAllStores(first, offset, search) {
  const authToken = typeof window !== "undefined" ? window.localStorage.getItem("accounts:accessToken") : undefined;
  const { loading, data, refetch, fetchMore } = useQuery(getAllStores, {
    variables: {
      first,
      offset,
      searchQuery: search,
    },
  });
  const sellers = data?.getAllStore?.nodes
  const totalCount = data?.getAllStore?.totalCount;
  useEffect(() => {
    console.log("sss search" ,search)
    refetch();
  }, [authToken, search]);
  return [sellers, totalCount, loading, refetch];
}
