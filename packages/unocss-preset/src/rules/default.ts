import type { Rule } from '@unocss/core'
import type { ResolvedWemeUIOptions } from '../options'
import type { Theme } from '../theme'
import { textAligns, verticalAligns } from './align'
import { animations } from './animation'
import { backgroundStyles } from './background'
import { accents, appearance, carets, imageRenderings, listStyle, outline, overscrolls, scrollBehaviors, willChange } from './behaviors'
import { borders } from './border'
import { bgColors, colorScheme, opacity } from './color'
import { columns } from './columns'
import { container, containerParent } from './container'
import { textDecorations } from './decoration'
import { divides } from './divide'
import { filters } from './filters'
import { flex } from './flex'
import { gapRules, gaps } from './gap'
import { grids } from './grid'
import { overflows } from './layout'
import { lineClamps } from './line-clamp'
import { masks } from './mask'
import { placeholders } from './placeholder'
import { alignments, boxSizing, flexGridJustifiesAlignments, floats, insets, justifies, orders, placements, positions, zIndexes } from './position'
import { questionMark } from './question-mark'
import { rings } from './ring'
import { scrolls } from './scrolls'
import { boxShadows } from './shadow'
import { aspectRatio, sizes } from './size'
import { margins, paddings, spaces } from './spacing'
import { accessibility, appearances, backgroundBlendModes, breaks, contains, contents, contentVisibility, cursors, displays, dynamicViewportHeight, fieldSizing, fontSmoothings, fontStyles, hyphens, isolations, mixBlendModes, objectPositions, pointerEvents, resizes, screenReadersAccess, textOverflows, textTransforms, textWraps, userSelects, whitespaces, writingModes, writingOrientations } from './static'
import { svgUtilities } from './svg'
import { tables } from './table'
import { touchActions } from './touch-actions'
import { transforms } from './transform'
import { transitions } from './transition'
import { fonts, fontVariantNumeric, tabSizes, textIndents, textShadows, textStrokes } from './typography'
import { cssProperty, cssVariables } from './variables'
import { viewTransition } from './view-transition'

export function rules(options: ResolvedWemeUIOptions): Rule<Theme>[] {
  return [
    fonts,
    tabSizes,
    textIndents,
    textStrokes,
    textShadows,
    margins,
    paddings,
    textAligns,
    verticalAligns,
    appearance,
    outline(options),
    willChange,
    listStyle,
    accents(options),
    carets(options),
    imageRenderings,
    overscrolls,
    scrollBehaviors,

    borders(options),
    bgColors(options),
    opacity,
    colorScheme,
    container,
    containerParent,
    textDecorations(options),
    flex,
    gaps,
    grids,
    sizes,
    aspectRatio,
    displays,
    appearances,
    cursors,
    contains,
    pointerEvents,
    resizes,
    userSelects,
    whitespaces,
    contentVisibility,
    contents,
    breaks,
    textWraps,
    textOverflows,
    textTransforms,
    fontStyles,
    fontSmoothings,
    rings,
    boxShadows,
    transforms,
    transitions,
    cssVariables,
    cssProperty,
    alignments,
    boxSizing,
    flexGridJustifiesAlignments,
    floats,
    insets,
    justifies,
    orders,
    placements,
    positions,
    zIndexes,
    overflows,
    svgUtilities(options),
    animations,
    backgroundStyles(options),
    hyphens,
    writingModes,
    writingOrientations,
    accessibility,
    screenReadersAccess,
    isolations,
    objectPositions,
    backgroundBlendModes,
    mixBlendModes,
    dynamicViewportHeight,
    masks,

    columns,
    filters,
    lineClamps,
    placeholders(options),
    scrolls,
    tables,
    touchActions,
    fontVariantNumeric,
    viewTransition,
    spaces,
    divides(options),
    fieldSizing,

    // experimental rules, may be updated in the future
    gapRules,

    // should be the last
    questionMark,
  ].flat()
}
