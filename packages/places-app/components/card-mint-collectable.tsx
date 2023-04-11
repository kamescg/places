import * as React from 'react'

import classNames from 'clsx'
import Image from 'next/image'

import ButtonPlaceMint from './button-place-mint'
import { Dialog, DialogContentXL, DialogTrigger } from './ui/dialog'

interface CardMintCollectableProps {
  className?: string
  name?: string
  description?: string
  price?: string
  image?: string
  address: `0x${string}`
}

export const CardMintCollectable = ({ className, name, description, price, image, address }: CardMintCollectableProps) => {
  const classes = classNames(className, 'CardMintCollectable')
  return (
    <div className={classes}>
      <Dialog>
        <DialogTrigger>
          <Image width={600} height={600} className="CardMintCollectable_image" src={image as string} alt="Collectable" />
        </DialogTrigger>
        <DialogContentXL className="p-10">
          <img className="" src={image} alt="Collectable" />
          <div className="">
            <h3 className="text-lg font-normal">{name}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </DialogContentXL>
      </Dialog>

      <h3 className="text-lg font-normal">{name}</h3>
      <p className="text-sm text-gray-500">{description}</p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-bold text-gray-500">Ξ {price}</span>
        <ButtonPlaceMint address={address} price={price}>
          <span className="tag tag-light">Mint</span>
        </ButtonPlaceMint>
      </div>
    </div>
  )
}

export default CardMintCollectable
