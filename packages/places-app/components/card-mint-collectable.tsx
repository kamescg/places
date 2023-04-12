import * as React from 'react'

import classNames from 'clsx'
import Image from 'next/image'

import ButtonPlaceMint from './button-place-mint'
import { LinkComponent } from './shared/link-component'
import { Dialog, DialogContentXL, DialogTrigger } from './ui/dialog'

interface CardMintCollectibleProps {
  className?: string
  name?: string
  description?: string
  price?: string
  image?: string
  address: `0x${string}`
  dialogEnabled?: boolean
}

export const CardMintCollectible = ({ className, name, description, price, image, address, dialogEnabled }: CardMintCollectibleProps) => {
  const classes = classNames(className, 'CardMintCollectible')
  return (
    <div className={classes}>
      {!dialogEnabled ? (
        <LinkComponent href={`/place/${address}`}>
          <Image width={600} height={600} className="CardMintCollectible_image" src={image as string} alt="Collectible" />
        </LinkComponent>
      ) : (
        <Dialog>
          <DialogTrigger>
            <Image width={600} height={600} className="CardMintCollectible_image" src={image as string} alt="Collectible" />
          </DialogTrigger>
          <DialogContentXL className="p-10">
            <Image width={800} height={800} className="CardMintCollectible_image" src={image as string} alt="Collectible" />
            <div className="">
              <h3 className="text-lg font-normal">{name}</h3>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </DialogContentXL>
        </Dialog>
      )}

      <h3 className="text-lg font-normal">{name}</h3>
      <p className="mt-2 text-sm text-gray-500">{description}</p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-bold text-gray-500">Price: Ξ {price}</span>
        <ButtonPlaceMint address={address} price={price}>
          <span className="tag tag-emerald">Mint</span>
        </ButtonPlaceMint>
      </div>
    </div>
  )
}

export default CardMintCollectible
