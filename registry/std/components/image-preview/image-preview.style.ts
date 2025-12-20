import { createVariants } from '~/utils/styles'

export const useImagePreviewStyle = createVariants({
  slots: {
    base: '',
    overlay: '',
    preview: 'abs-(~ center) z-tooltip',
    previewImage: '',
    previewPlaceholder: 'flex-(~ center) bg-primary text-primary-1 p-4 rounded-lg',
    loading: 'size-5 animate-spin',
  },
})

export type ImagePreviewStyleSlots = typeof useImagePreviewStyle['slots']
