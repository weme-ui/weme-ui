import { describe, expect, it } from 'vitest'
import { animation } from '~/theme/animation'
import { aria } from '~/theme/aria'
import { colors } from '~/theme/colors'
import { theme } from '~/theme/default'
import { blur } from '~/theme/filters'
import { font, fontWeight, leading, text, textStrokeWidth, tracking } from '~/theme/font'
import { media } from '~/theme/media'
import { defaults, dropShadow, insetShadow, perspective, radius, shadow, spacing, textShadow } from '~/theme/misc'
import { breakpoint, container, verticalBreakpoint } from '~/theme/size'
import { supports } from '~/theme/supports'
import { ease, property } from '~/theme/transition'

describe('theme', () => {
  it('composes all theme modules under expected keys', () => {
    const result = theme({})

    expect(result).toEqual({
      animation,
      aria,
      blur,
      breakpoint,
      container,
      default: defaults,
      dropShadow,
      ease,
      font,
      fontWeight,
      insetShadow,
      leading,
      media,
      perspective,
      property,
      radius,
      shadow,
      spacing,
      supports,
      text,
      textShadow,
      textStrokeWidth,
      colors: colors(undefined),
      tracking,
      verticalBreakpoint,
    })
  })

  it('forwards color options into the colors theme', () => {
    const options = {
      colors: {
        space: 'srgb' as const,
        accent: { brand: '#ff0000' },
        neutral: { mist: '#94a3b8' },
      },
    }

    expect(theme(options).colors).toEqual(colors(options.colors))
    expect(theme(options).colors?.brand?.['9']).toBe('#f00')
    expect(theme(options).colors?.mist).toBeDefined()
  })

  it('forwards undefined colors options as default theme colors', () => {
    expect(theme({}).colors).toEqual(colors(undefined))
  })
})
