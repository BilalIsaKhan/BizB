import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import getAllSeller from "./getAllSeller.gql";
/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default function useGetAllSeller(itemPerPage, PageNumber, tagsId) {
  const authToken = typeof window !== "undefined" ? window.localStorage.getItem("accounts:accessToken") : undefined;
  const { loading, data, refetch, fetchMore } = useQuery(getAllSeller, {
    variables: {
      itemPerPage,
      PageNumber,
      tagsId,
    },
  });
  const sellers = data?.getAllNewSeller?.AccountDetail;
  const totalCount = data?.getAllNewSeller?.totalPage;
  useEffect(() => {
    refetch();
  }, [authToken]);
  return [sellers, totalCount, loading, refetch];
}
