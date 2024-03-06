import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import sellerItemsQuery from "./getAllproductsbySeller.Id.gql";

/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default function useGetAllSeller(id) {
  const { loading, data, refetch } = useQuery(sellerItemsQuery, {
    variables: {
      sellerIds: id,
    },
  });

  const sellers = data?.sellerCatalogItems?.edges;

  // useEffect(() => {
  //   refetch();
  // });

  return [sellers, loading, refetch];
}
