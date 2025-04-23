// global.d.ts
import { HSCarousel, IStaticMethods } from 'flyonui/flyonui'

declare global {
  interface Window {
    HSCarouse: typeof HSCarousel

    HSStaticMethods: IStaticMethods
  }
}

export {}
