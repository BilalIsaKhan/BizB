import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import getShipping from "./getShippingprice.gql";

export default function useGetShipping(address, city, amount) {
  const { loading, data, refetch } = useQuery(getShipping, {
    variables: { address, city, amount },
  });

  const shippingData = data?.getOrderShippingByAddress;

  useEffect(() => {
    refetch();
   
  }, [ city]);

  return [shippingData, loading, refetch];
}
