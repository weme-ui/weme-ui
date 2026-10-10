import { expect } from 'vitest'
import * as matchers from 'vitest-axe/matchers'

expect.extend(matchers)

if (typeof window !== 'undefined') {
  window.HTMLElement.prototype.scrollIntoView ??= () => {}
  window.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
}
