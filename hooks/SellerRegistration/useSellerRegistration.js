import { useContext, useEffect, useState } from 'react'
import sellerRegistrationMutation from './sellerRegistration.gql'
import { useMutation } from '@apollo/client'

export default function useSellerRegistration() {
    const [sellerRegistrationFunction, { data, loading }] = useMutation(sellerRegistrationMutation)

    return [sellerRegistrationFunction, loading]
}