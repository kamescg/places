// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Site
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
interface SiteConfig {
  name: string
  title: string
  emoji: string
  description: string
  localeDefault: string
  author: string
  links: {
    twitter: string
    github: string
  }
}

export const SITE_CANONICAL = 'https://places.kames.me'

export const siteConfig: SiteConfig = {
  name: 'places',
  title: 'places - ethereal adventures',
  emoji: '⍢',
  description: "A collection of places I've traveled during my Ethereal adventures.",
  localeDefault: 'en',
  author: 'Kames Geraghty',
  links: {
    twitter: 'https://twitter.com/KamesGeraghty',
    github: 'https://github.com/kamescg/places',
  },
}
