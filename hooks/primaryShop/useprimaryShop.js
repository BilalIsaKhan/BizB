import { useEffect, useState } from 'react'
import primaryShopQuery from './primaryShop.gql'
import { useQuery, useLazyQuery } from '@apollo/client'
export default function useprimaryShop() {
    const { loading, data, refetch } = useQuery(primaryShopQuery)
    const primaryShopId = data?.primaryShop?._id
    useEffect(() => {
        console.log('primaryShopId', primaryShopId)
        // setpublishprod(publishProducts)
        refetch()
    }, [data])

    return [primaryShopId, refetch]
}