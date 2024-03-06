import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import getAllBrands from "./getAllBrands.gql";
/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default function useGetAllBrands(first, offset,searchQuery) {
    const authToken = typeof window !== "undefined" ? window.localStorage.getItem("accounts:accessToken") : undefined;
    const { loading, data, refetch, fetchMore } = useQuery(getAllBrands, {
        variables: {
            first,
            offset,
            searchQuery
        },
    });
    const brands = data?.getAllBrands?.nodes;
    const totalCount = data?.getAllBrands?.totalCount;
    useEffect(() => {
        refetch();
    }, [authToken]);
    return [brands, totalCount, loading, refetch];
}
