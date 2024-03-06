import { useContext, useEffect, useState } from 'react'
import createanalytics from './createanalytics.gql'
import { useMutation } from '@apollo/client'

export default function usecreateanalytics() {
    const [createanalyticsFunction, { data, loading }] = useMutation(createanalytics)

    return [createanalyticsFunction, loading]
}