import { useContext, useEffect, useState } from 'react'
import createWalletMutation from './createWallet.gql'
import { useMutation } from '@apollo/client'

export default function useCreateWallet() {
    const [createWallet, { data, loading }] = useMutation(createWalletMutation)

    return [createWallet, loading]
}