import * as React from 'react'

import classNames from 'clsx'
import { BigNumber, utils } from 'ethers'
import { useAccount, useContractWrite } from 'wagmi'

import { usePreparePlaceMint } from '@/lib/blockchain'

interface ButtonPlaceMintProps {
  children?: React.ReactNode
  className?: string
  address: `0x${string}`
  price?: string
}

export const ButtonPlaceMint = ({ children, className, address, price = '0' }: ButtonPlaceMintProps) => {
  const { address: userAddress } = useAccount()
  const mintPlaceAction = usePreparePlaceMint({
    address,
    args: [userAddress as `0x${string}`],
    overrides: {
      value: utils.parseEther(price),
    },
  })
  const { write } = useContractWrite(mintPlaceAction.config)
  const handleOnClick = async () => {
    if (write) {
      write()
    }
  }
  const classes = classNames(className, 'ButtonPlaceMint')
  return (
    <button className={classes} onClick={handleOnClick}>
      {children}
    </button>
  )
}

export default ButtonPlaceMint
