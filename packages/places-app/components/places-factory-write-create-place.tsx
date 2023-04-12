import { ConnectButton } from '@rainbow-me/rainbowkit'
import { utils } from 'ethers'
import { useForm } from 'react-hook-form'

import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import { placeFactoryContracts } from '@/data/place-factory-contracts'
import { usePlaceFactoryCreatePlace } from '@/lib/blockchain'
import { useLoadContractFromChainId } from '@/lib/hooks/use-load-contract-from-chain-id.ts'

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const contract = useLoadContractFromChainId(placeFactoryContracts)
  // @ts-ignore
  const createPlaceAction = usePlaceFactoryCreatePlace({
    address: contract as `0x${string}`,
    overrides: {
      gasLimit: 10000000,
    },
  })

  const onSubmit = async (data: any) => {
    console.log(data, 'data')
    // @ts-ignore
    const tx = await createPlaceAction.writeAsync({
      recklesslySetUnpreparedArgs: [
        data.name,
        data.symbol,
        data.uri,
        utils.parseEther(data.price || '0'),
        {
          name: data.name,
          description: data.description,
          image: data.uri,
          externalLink: 'https://places.kames.me',
          sellerFeeBasisPoints: '0',
          feeRecipient: '0x0000000000000000000000000000000000000000',
        },
      ],
    })
  }

  return (
    <>
      <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <label>Name</label>
          <input
            className="input"
            {...register('name', {
              required: true,
            })}
          />
          {errors.name && <span>This field is required</span>}
        </div>
        <div className="">
          <label>Symbol</label>
          <input
            className="input"
            {...register('symbol', {
              required: true,
            })}
          />
          {errors.symbol && <span>This field is required</span>}
        </div>
        <div className="">
          <label>Description</label>
          <input
            className="input"
            {...register('description', {
              required: true,
            })}
          />
          {errors.description && <span>This field is required</span>}
        </div>
        <div className="">
          <label>Image URI</label>
          <input
            className="input"
            placeholder="ipfs://Qm..."
            {...register('uri', {
              required: true,
            })}
          />
          {errors.uri && <span>This field is required</span>}
        </div>
        <div className="">
          <label>Price</label>
          <input className="input" {...register('price')} placeholder="0.01" />
          {errors.price && <span>This field is required</span>}
        </div>
        <button type="submit" className="btn btn-emerald">
          Create Place
        </button>
      </form>
    </>
  )
}

export function PlacesFactoriyWriteCreatePlace() {
  return (
    <BranchIsWalletConnected>
      <div className="w-full">
        <Form />
      </div>
      <div className="flex items-center justify-center gap-10">
        <>
          <ConnectButton />
        </>
      </div>
    </BranchIsWalletConnected>
  )
}
