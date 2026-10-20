import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { usePopoverContent } from './use-popover-content'

describe('usePopoverContent', () => {
  it('uses default closed motion values', () => {
    const motion = usePopoverContent()

    expect(motion.value.initial).toEqual({ height: 0, opacity: 0, y: 0 })
    expect(motion.value.animate).toEqual({ height: 0, opacity: 0, y: 0 })
    expect(motion.value.transition).toEqual({
      type: 'spring',
      duration: 0.5,
      bounce: 0.2,
    })
  })

  describe('given an open popover', () => {
    it('animates height, opacity, and bottom offset', () => {
      const open = ref(true)
      const motion = usePopoverContent({
        open,
        height: 200,
        side: 'bottom',
        sideOffset: 8,
      })

      expect(motion.value.animate).toEqual({
        height: 200,
        opacity: 1,
        y: 8,
      })
    })

    it('negates y when side is top', () => {
      const open = ref(true)
      const motion = usePopoverContent({
        open,
        height: 120,
        side: 'top',
        sideOffset: 6,
      })

      expect(motion.value.animate).toMatchObject({
        height: 120,
        opacity: 1,
        y: -6,
      })
    })
  })
})
