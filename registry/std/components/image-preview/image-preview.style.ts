import { createVariants } from '~/utils/styles'

export const useImagePreviewStyle = createVariants({
  slots: {
    base: '',
    overlay: '',
    preview: 'abs-(~ center) z-tooltip',
    previewImage: '',
    previewPlaceholder: 'flex-(~ center) bg-primary text-primary-1 px-6 py-3 rounded-lg',
  },
})

export type ImagePreviewStyleSlots = typeof useImagePreviewStyle['slots']
