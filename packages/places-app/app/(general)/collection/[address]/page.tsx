'use client'

import { motion } from 'framer-motion'

import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import useERC721Metadata from '@/lib/hooks/use-erc721-metadata'
import { useLoadContractFromChainId } from '@/lib/hooks/use-load-contract-from-chain-id.ts'

export default function PageCreate({ params }: { params: { address: `0x${string}` } }) {
  console.log(params)
  const contract = useLoadContractFromChainId(params.address)
  const metadata = useERC721Metadata({
    address: params.address as `0x${string}`,
    tokenId: 0,
  })

  console.log(metadata, 'metadata')

  return (
    <>
      <section className="mt-10 w-full">
        <motion.div
          initial="hidden"
          whileInView="show"
          animate="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}>
          <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <div className="container mx-auto flex max-w-screen-lg items-center justify-between gap-10"></div>
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}
