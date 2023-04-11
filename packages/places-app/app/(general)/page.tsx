'use client'

import { motion } from 'framer-motion'
import Balancer from 'react-wrap-balancer'

import CardMintCollectable from '@/components/card-mint-collectable'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { collection } from '@/data/collection'

export default function Home() {
  return (
    <>
      <section className="w-full">
        <div className="container mx-auto grid max-w-screen-lg">
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
            <motion.h1 className="font-title" variants={FADE_DOWN_ANIMATION_VARIANTS}>
              <Balancer>Places</Balancer>
            </motion.h1>
            <motion.p className="font-subtitle mt-6" variants={FADE_DOWN_ANIMATION_VARIANTS}>
              <Balancer>A collection of places I&apos;ve traveled during my Ethereal adventures.</Balancer>
            </motion.p>
          </motion.div>
        </div>
      </section>
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
            <div className="container mx-auto grid max-w-screen-lg grid-cols-3 gap-10">
              {collection.map((item, index) => {
                // @ts-ignore
                return <CardMintCollectable className="col-span-1" {...item} key={index} />
              })}
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}
