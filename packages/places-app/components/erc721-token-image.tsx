import * as React from 'react'

import classNames from 'classnames'

interface ERC721TokenImageProps {
  className?: string
  alt?: string
  href?: string
}

export const ERC721TokenImage = ({ className, alt, href }: ERC721TokenImageProps) => {
  const classes = classNames(className)
  const [imgSrc, setImgSrc] = React.useState<string>()
  React.useEffect(() => {
    if (href && href.startsWith('ipfs://')) {
      setImgSrc(`https://cloudflare-ipfs.com/ipfs/${href.split('ipfs://')[1]}`)
    } else {
      setImgSrc(href)
    }
  }, [href])
  if (!href) return null
  return <img className={classes} alt={alt} src={imgSrc} />
}

export default ERC721TokenImage
