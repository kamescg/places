/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'

import { constants } from 'ethers'
import { useContractEvent } from 'wagmi'

import { placeFactoryContracts } from '@/data/place-factory-contracts'
import { placeFactoryABI, usePlaceFactoryCreatePlace } from '@/lib/blockchain'
import { useLoadContractFromChainId } from '@/lib/hooks/use-load-contract-from-chain-id.ts'

export default function PlaceFactoryEventPlaceCreated() {
  const [event, setEvent] = useState<{
    owner: string
    place: string
  }>()
  const contract = useLoadContractFromChainId(placeFactoryContracts)
  // @ts-ignore
  const createPlaceAction = usePlaceFactoryCreatePlace({
    address: contract as `0x${string}`,
  })

  useContractEvent({
    address: contract as `0x${string}`,
    abi: placeFactoryABI,
    eventName: 'PlaceCreated',

    // @ts-ignore
    listener(owner: string, place: string) {
      if (owner !== constants.AddressZero) {
        setEvent({
          owner,
          place,
        })
      }
    },
  })

  if (!event) return null
  return (
    <div className="content py-6">
      {!event?.owner ? null : (
        <>
          <p className="">owner: {event?.owner}</p>
          <p className="">place: {event?.place}</p>
        </>
      )}
    </div>
  )
}
