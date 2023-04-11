import React from 'react'

import classNames from 'clsx'
import Image from 'next/image'

import { siteConfig } from '@/config/site'
import useScroll from '@/lib/hooks/use-scroll'

import { BranchColorMode } from '../shared/branch-color-mode'
import { LinkComponent } from '../shared/link-component'
import { ResponsiveMobileAndDesktop } from '../shared/responsive-mobile-and-desktop'
import { ThemeToggle } from '../shared/theme-toggle'

interface Props {
  className?: string
}

export function Header(props: Props) {
  const scrolled = useScroll(50)
  const classes = classNames(
    props.className,
    'Header',
    'fixed top-0 w-full',
    'px-6 lg:px-10 py-3 mb-8 flex items-center',
    {
      'border-b border-gray-200 bg-white/50 backdrop-blur-xl dark:bg-black/50 dark:border-gray-800': scrolled,
    },
    'z-30 transition-all'
  )
  return (
    <header className={classes}>
      <ResponsiveMobileAndDesktop>
        <>
          <div className="flex w-full justify-between p-4">
            <LinkComponent href="/" className="flex flex-1 items-center ">
              <BranchColorMode>
                <Image alt="Logo" src="/logo-dark.png" width={32} height={32} />
                <Image alt="Logo" src="/logo-white.png" width={32} height={32} />
              </BranchColorMode>
            </LinkComponent>
          </div>
        </>
        <>
          <LinkComponent className="flex items-center" href="/">
            <span className="text-lg">{siteConfig.emoji}</span>
            <h1 className="text-gradient-sand ml-2 text-2xl font-light">{siteConfig.name}</h1>
          </LinkComponent>
          <div className="flex flex-1 justify-center lg:px-10"></div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </>
      </ResponsiveMobileAndDesktop>
    </header>
  )
}
