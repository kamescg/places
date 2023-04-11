'use client'

import { motion } from 'framer-motion'

import { ButtonPlaceFactoryDeploy } from '@/components/places-factory-deploy'
import PlaceFactoryEventPlaceCreated from '@/components/places-factory-event-place-created'
import { PlacesFactoriyWriteCreatePlace } from '@/components/places-factory-write-create-place'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'

export default function PageCreate1() {
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
            <div className="container mx-auto flex max-w-screen-lg items-center justify-between gap-10">
              <h3 className="text-lg font-normal">Create Factory</h3>
              <span className="flex items-center gap-3">
                <ButtonPlaceFactoryDeploy />
              </span>
            </div>
            <div className="container mx-auto mt-6 flex max-w-screen-lg flex-col gap-10">
              <div className="card">
                <PlacesFactoriyWriteCreatePlace />
              </div>
              <div className="card">
                Events
                <PlaceFactoryEventPlaceCreated />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}
