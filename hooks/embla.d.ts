declare module 'embla-carousel-react' {
  import { EmblaCarouselType } from 'embla-carousel'
  import { HTMLAttributes, RefCallback } from 'react'

  export default function useEmblaCarousel(
    options?: EmblaOptionsType,
    plugins?: EmblaPluginType[]
  ): [RefCallback<HTMLElement>, EmblaCarouselType | undefined]

  export type UseEmblaCarouselType = [
    RefCallback<HTMLElement>,
    EmblaCarouselType | undefined
  ]

  export type EmblaOptionsType = {
    align?: 'start' | 'center' | 'end' | number
    axis?: 'x' | 'y'
    containScroll?: boolean
    direction?: 'ltr' | 'rtl'
    dragFree?: boolean
    draggable?: boolean
    inViewThreshold?: number
    loop?: boolean
    skipSnaps?: boolean
    slidesToScroll?: number | 'auto'
    speed?: number
    startIndex?: number
  }

  export type EmblaPluginType = {
    name: string
    options: Record<string, unknown>
    init: (embla: EmblaCarouselType) => void
    destroy: () => void
  }
}
