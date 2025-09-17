import { createVariants } from '~/utils/styles'

export const useSkeletonStyle = createVariants({
  base: [
    'relative overflow-hidden rounded-md bg-neutral-3',
    'after:(abs top-0 left-0 right-0 bottom-0 content-[""] transform-gpu animate-marquee will-change-transform)',
    'after:(bg-linear-to-r/oklch from-neutral-1/0 via-neutral-5 to-neutral-1/0)',
  ],
})
