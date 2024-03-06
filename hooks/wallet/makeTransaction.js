import { useContext, useEffect, useState } from 'react'
import makeTransactionQuery from './makeTransaction.gql'
import { useMutation } from '@apollo/client'

export default function useMakeTransaction() {
    const [makeTransaction, { data, loading }] = useMutation(makeTransactionQuery)

    return [makeTransaction, loading]
}