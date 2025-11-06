import { describe, expect, it } from 'vitest'
import { merge } from '../../src/utils/utilities'

describe('utils/utilities', () => {
  it('should merge packages', async () => {
    expect(merge(
      '@vueuse/core',
      'nuxt',
      'vue',
      'vue-router',
      '@vueuse/core',
      'nuxt',
      'vue',
      'vue-router',
    )).toMatchInlineSnapshot(`
      [
        "@vueuse/core",
        "nuxt",
        "vue",
        "vue-router",
      ]
    `)
  })
})
