import { describe, expect, it } from 'vitest'
import { media } from '~/theme/media'

describe('media', () => {
  it('exposes orientation, preference and pointer queries', () => {
    expect(media.portrait).toBe('(orientation: portrait)')
    expect(media.os_dark).toBe('(prefers-color-scheme: dark)')
    expect(media.motion_not_ok).toBe('(prefers-reduced-motion: reduce)')
    expect(media.touch).toBe('(hover: none) and (pointer: coarse)')
    expect(media.mouse).toBe('(hover) and (pointer: fine)')
    expect(media.hd_color).toBe('(dynamic-range: high)')
  })
})
