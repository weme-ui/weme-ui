import type { EmblaOptionsType } from 'embla-carousel'
import type { AutoplayOptionsType } from 'embla-carousel-autoplay'
import type { FadeOptionsType } from 'embla-carousel-fade'
import type { WheelGesturesPluginOptions } from 'embla-carousel-wheel-gestures'
import type { PrimitiveProps } from 'reka-ui'
import type { IconButtonProps } from '../icon-button/icon-button.props'
import type { CarouselStyleProps, CarouselStyleSlots } from './carousel.style'

export type CarouselValue = string
export type CarouselItem = CarouselValue | {
  class?: any
  [key: string]: any
}

export interface CarouselProps<T extends CarouselItem = CarouselItem> extends Pick<PrimitiveProps, 'as'>, Omit<EmblaOptionsType, 'axis' | 'container' | 'slides' | 'direction'> {
  items?: T[]
  orientation?: CarouselStyleProps['orientation']
  prev?: Partial<IconButtonProps>
  prevIcon?: string
  next?: Partial<IconButtonProps>
  nextIcon?: string
  arrows?: boolean
  dots?: boolean
  autoplay?: boolean | AutoplayOptionsType
  fade?: boolean | FadeOptionsType
  wheelGestures?: boolean | WheelGesturesPluginOptions
  class?: any
  ui?: Partial<CarouselStyleSlots>
}

export interface CarouselEmits {
  (e: 'select', index: number): void
}
