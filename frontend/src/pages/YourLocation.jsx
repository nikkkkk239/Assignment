import React from 'react'
import { useAddressStore } from '../store/AddressStore'

function YourLocation() {
  const {address} = useAddressStore()
  return (
    <div>{address.home}</div>
  )
}

export default YourLocation