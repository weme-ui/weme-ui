import type { Theme } from './types'
import type { PresetWemeUIOptions } from '~/options'
import { animation } from './animation'
import { aria } from './aria'
import { colors } from './colors'
import { blur } from './filters'
import { font, fontWeight, leading, text, textStrokeWidth, tracking } from './font'
import { media } from './media'
import { defaults, dropShadow, insetShadow, perspective, radius, shadow, spacing, textShadow } from './misc'
import { breakpoint, container, verticalBreakpoint } from './size'
import { supports } from './supports'
import { ease, property } from './transition'

export function theme(options: PresetWemeUIOptions) {
  return {
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
    colors: colors(options.colors),
    tracking,
    verticalBreakpoint,
  } satisfies Theme
}
