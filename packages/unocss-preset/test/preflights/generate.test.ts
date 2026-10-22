import { createGenerator } from '@unocss/core'
import { beforeEach, describe, expect, it } from 'vitest'
import presetWemeUI from '~/index'
import { theme as buildTheme } from '~/theme/default'
import { DEFAULT_NAME } from '~/tokens'
import { resetTracking } from './_utils'

describe('on-demand theme generation', () => {
  beforeEach(resetTracking)

  it('emits resolved palette variables for fancy-accent in one generate', async () => {
    const uno = await createGenerator({
      presets: [presetWemeUI({
        preflights: { reset: false },
      })],
    })

    const { css } = await uno.generate('fancy-accent')
    const puerto = buildTheme({}).colors.puerto

    expect(css).toContain('--accent-9:')
    expect(css).toContain(`--puerto-9: ${puerto['9']}`)
    expect(css).toContain(`--puerto-1: ${puerto['1']}`)
    expect(css).toContain(`--puerto-10: ${puerto['10']}`)
  })

  it('emits the mapped palette for a custom accent alias', async () => {
    const uno = await createGenerator({
      presets: [presetWemeUI({
        preflights: { reset: false },
        themes: [{
          name: DEFAULT_NAME,
          colors: { accent: 'blue' },
        }],
      })],
    })

    const { css } = await uno.generate('bg-accent')
    const blue = buildTheme({}).colors.blue

    expect(css).toContain('--accent-9:')
    expect(css).toContain(`--blue-9: ${blue['9']}`)
    expect(css).not.toContain('--puerto-9:')
  })
})
