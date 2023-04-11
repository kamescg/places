import { useState } from 'react'

import { Signer, ethers } from 'ethers'
import { useSigner } from 'wagmi'

import { placeFactoryBytecode } from '@/lib/abi/place-factory-bytecode'
import { placeFactoryABI } from '@/lib/blockchain'

export function ButtonPlaceFactoryDeploy() {
  const { data: signer } = useSigner()

  const [contractDeployed, setContractAddress] = useState<string | undefined>()
  const handleDeploy = async (data: any) => {
    // https://docs.ethers.org/v5/api/contract/example/#example-erc-20-contract--deploying-a-contract
    const factory = new ethers.ContractFactory(placeFactoryABI, placeFactoryBytecode, signer as Signer)
    const contract = await factory.deploy()
    const deployed = await contract.deployTransaction.wait()
    setContractAddress(deployed.contractAddress)
  }

  return (
    <>
      {!contractDeployed ? null : (
        <div className="flex items-center justify-between">
          <span className="">{contractDeployed}</span>
        </div>
      )}
      <button type="submit" className="tag tag-emerald" onClick={handleDeploy}>
        Deploy
      </button>
    </>
  )
}
