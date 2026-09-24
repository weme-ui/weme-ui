/**
 * 方向映射
 *
 * @category Utils
 */
export const directionMap: Record<string, string[]> = {
  'l': ['-left'],
  'r': ['-right'],
  't': ['-top'],
  'b': ['-bottom'],
  's': ['-inline-start'],
  'e': ['-inline-end'],
  'x': ['-inline'],
  'y': ['-block'],
  '': [''],
  'bs': ['-block-start'],
  'be': ['-block-end'],
  'is': ['-inline-start'],
  'ie': ['-inline-end'],
  'block': ['-block-start', '-block-end'],
  'inline': ['-inline-start', '-inline-end'],
}

/**
 * 内边距映射
 *
 * @category Utils
 */
export const insetMap: Record<string, string[]> = {
  ...directionMap,
  x: ['-inset-inline'],
  y: ['-inset-block'],
  s: ['-inset-inline-start'],
  start: ['-inset-inline-start'],
  e: ['-inset-inline-end'],
  end: ['-inset-inline-end'],
  bs: ['-inset-block-start'],
  be: ['-inset-block-end'],
  is: ['-inset-inline-start'],
  ie: ['-inset-inline-end'],
  block: ['-inset-block-start', '-inset-block-end'],
  inline: ['-inset-inline-start', '-inset-inline-end'],
}

/**
 * 角落映射
 *
 * @category Utils
 */
export const cornerMap: Record<string, string[]> = {
  'l': ['-top-left', '-bottom-left'],
  'r': ['-top-right', '-bottom-right'],
  't': ['-top-left', '-top-right'],
  'b': ['-bottom-left', '-bottom-right'],
  'tl': ['-top-left'],
  'lt': ['-top-left'],
  'tr': ['-top-right'],
  'rt': ['-top-right'],
  'bl': ['-bottom-left'],
  'lb': ['-bottom-left'],
  'br': ['-bottom-right'],
  'rb': ['-bottom-right'],
  '': [''],
  'bs': ['-start-start', '-start-end'],
  'be': ['-end-start', '-end-end'],
  's': ['-end-start', '-start-start'],
  'is': ['-end-start', '-start-start'],
  'e': ['-start-end', '-end-end'],
  'ie': ['-start-end', '-end-end'],
  'ss': ['-start-start'],
  'bs-is': ['-start-start'],
  'is-bs': ['-start-start'],
  'se': ['-start-end'],
  'bs-ie': ['-start-end'],
  'ie-bs': ['-start-end'],
  'es': ['-end-start'],
  'be-is': ['-end-start'],
  'is-be': ['-end-start'],
  'ee': ['-end-end'],
  'be-ie': ['-end-end'],
  'ie-be': ['-end-end'],
}

/**
 * XYZ 映射
 *
 * @category Utils
 */
export const xyzMap: Record<string, string[]> = {
  'x': ['-x'],
  'y': ['-y'],
  'z': ['-z'],
  '': ['-x', '-y'],
}

/**
 * XYZ 数组
 *
 * @category Utils
 */
export const xyzArray = ['x', 'y', 'z']

/**
 * 基础位置映射
 *
 * @category Utils
 */
export const basePositionMap = [
  'top',
  'top center',
  'top left',
  'top right',
  'bottom',
  'bottom center',
  'bottom left',
  'bottom right',
  'left',
  'left center',
  'left top',
  'left bottom',
  'right',
  'right center',
  'right top',
  'right bottom',
  'center',
  'center top',
  'center bottom',
  'center left',
  'center right',
  'center center',
]

/**
 * 位置映射
 *
 * @category Utils
 */
export const positionMap: Record<string, string> = Object.assign(
  {},

  // [{ top: 'top' }, { 'top-center': 'top center' }, ...]
  ...basePositionMap.map(p => ({ [p.replace(/ /, '-')]: p })),

  // [{ t: 'top' }, { tc: 'top center' }, ...]
  // eslint-disable-next-line regexp/optimal-quantifier-concatenation
  ...basePositionMap.map(p => ({ [p.replace(/\b(\w)\w+/g, '$1').replace(/ /, '')]: p })),
)

/**
 * 全局关键字
 *
 * @category Utils
 */
export const globalKeywords = [
  'inherit',
  'initial',
  'revert',
  'revert-layer',
  'unset',
]

/**
 * CSS 数学函数正则表达式
 *
 * @category Utils
 */
export const cssMathFnRE = /^(calc|clamp|min|max)\s*\((.+)\)(.*)/

/**
 * CSS 变量函数正则表达式
 *
 * @category Utils
 */
export const cssVarFnRE = /^(var)\s*\((.+)\)(.*)/
