import type { PrimitiveProps } from 'reka-ui'
import type { ImgHTMLAttributes } from 'vue'
import type { ImageStyleProps, ImageStyleSlots } from './image.style'
import type { ImageLoadingStatus } from '~/composables/use-image-loading-status'

export interface ImageProps extends PrimitiveProps {
  src: string
  fallbackSrc?: string
  fallbackDelayMs?: number
  width?: string
  height?: string
  alt?: string
  loading?: ImgHTMLAttributes['loading']
  referrerPolicy?: ImgHTMLAttributes['referrerpolicy']
  crossOrigin?: ImgHTMLAttributes['crossorigin']
  fit?: ImageStyleProps['fit']
  radius?: ImageStyleProps['radius']
  class?: any
  ui?: Partial<ImageStyleSlots>
}

export interface ImageEmits {
  loadingStatusChange: [value: ImageLoadingStatus]
}
