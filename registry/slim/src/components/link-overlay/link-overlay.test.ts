import { describe, expect, it } from 'vitest'
import { useLinkOverlayStyle } from './link-overlay.style'

describe('link-overlay', () => {
  it('applies overlay base styles', () => {
    const ui = useLinkOverlayStyle()
    expect(ui.base()).toContain('static')
    expect(ui.base()).toContain('before:(abs block inset-0 content-[""] cursor-inherit)')
  })
})
