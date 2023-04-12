import * as React from 'react'

import classNames from 'clsx'
import { utils } from 'ethers'
import { useAccount, useContractWrite } from 'wagmi'

import { usePreparePlaceMint } from '@/lib/blockchain'
import { useHandleWagmiState } from '@/lib/hooks/use-handle-wagmi-state'

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

  const action = useContractWrite(mintPlaceAction.config)
  const handleOnClick = async () => {
    if (action.write) {
      action.write()
    }
  }

  useHandleWagmiState({
    isSuccess: action.isSuccess,
    isError: action.isError,
    error: action.error,
  })

  const classes = classNames(className, 'ButtonPlaceMint')
  return (
    <button className={classes} onClick={handleOnClick}>
      {children}
    </button>
  )
}

export default ButtonPlaceMint
