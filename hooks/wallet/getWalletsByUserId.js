import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import getWalletsByUserIdQuery from "./getWalletsByUserId.gql";
/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default function useGetWalletsByUserId(userId) {
  const { loading, data, refetch } = useQuery(getWalletsByUserIdQuery, {
    variables: {
        userId
    },
  });

  const getUserWallet = data?.getWalletsByUserId
  useEffect(() => {
    console.log("getUserWalletgetUserWallet" ,getUserWallet)
    refetch();
  }, [data]);
  return [getUserWallet, loading, refetch];
}
