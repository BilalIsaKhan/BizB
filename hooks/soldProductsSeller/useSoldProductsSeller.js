import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import soldProductsSellerQuery from "./soldProductsSeller.gql";
/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default function useSoldProductsSeller(userId) {
  const authToken = typeof window !== "undefined" ? window.localStorage.getItem("accounts:accessToken") : undefined;
  const { loading, data, refetch } = useQuery(soldProductsSellerQuery, {
    variables: {
        userId
    },
  });

  const soldProducts = data?.sellerSoldProducts?.totalSoldProductCount
  useEffect(() => {
    console.log("useSoldProductsSelleruseSoldProductsSeller" ,data)
    refetch();
  }, [authToken, data]);
  return [soldProducts, loading, refetch];
}
