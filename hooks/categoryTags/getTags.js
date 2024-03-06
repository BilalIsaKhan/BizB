import { useEffect, useState } from 'react'
import getTagsQuery from './getTags.gql'
import { useQuery } from '@apollo/client'
export default function getTags(input, type) {
  const { loading, data, refetch } = useQuery(getTagsQuery, {
    variables: { shopId: input, filter: type },
  })
  const categoryTags = data?.tags?.nodes

  useEffect(() => {
    console.log(' input is ', categoryTags)

    refetch()
  }, [data])

  return [categoryTags, loading, refetch]
}
