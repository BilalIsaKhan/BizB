import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import instagramKeyQuery from "./instagramKey.gql"
/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default function useInstagramKey() {
  const { loading, data, refetch } = useQuery(instagramKeyQuery);
  const instagramKey = data?.InstagramKey?.key
  useEffect(() => {
    console.log("InstagramKeyInstagramKey" ,instagramKey)
    refetch()
  }, [data])
  
  return [instagramKey, loading, refetch];
}

