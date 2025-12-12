import type { ImageProps } from '../image/image.props'
import type { ImagePreviewStyleSlots } from './image-preview.style'

export interface ImagePreviewProps extends ImageProps {
  previewSrc?: string
  placeholder?: string
  disabled?: boolean
  portal?: string | HTMLElement
  class?: any
  ui?: Partial<ImagePreviewStyleSlots>
}

export interface ImagePreviewEmits {
  (e: 'open'): void
  (e: 'close'): void
  (e: 'update:show', value: boolean): void
}
