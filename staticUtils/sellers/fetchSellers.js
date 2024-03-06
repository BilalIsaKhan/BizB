import { useEffect } from "react";
import graphQLRequest from "staticUtils/graphQLRequest";
import getAllSeller from "./seller.js";

/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default async function useGetAllSeller() {
  const authToken = typeof window !== "undefined" ? window.localStorage.getItem("accounts:accessToken") : undefined;

  const data = await graphQLRequest(getAllSeller);
  // console.log("data",data)
  const sellers = data?.getAllSeller;

  return sellers;
}
