import { describe, expect, it } from 'vitest'
import {
  accessibility,
  appearances,
  backgroundBlendModes,
  breaks,
  contains,
  contents,
  contentVisibility,
  cursors,
  displays,
  dynamicViewportHeight,
  fieldSizing,
  fontSmoothings,
  fontStyles,
  hyphens,
  isolations,
  mixBlendModes,
  objectPositions,
  pointerEvents,
  resizes,
  screenReadersAccess,
  textOverflows,
  textTransforms,
  textWraps,
  userSelects,
  whitespaces,
  writingModes,
  writingOrientations,
} from '~/rules/static'
import { globalKeywords } from '~/utils/mappings'
import { expectUtilities, matchRule } from './_utils'

describe('static rules', () => {
  it('resolves display, visibility, cursor and containment', () => {
    expect(matchRule(displays, 'inline')).toEqual({ display: 'inline' })
    expect(matchRule(displays, 'block')).toEqual({ display: 'block' })
    expect(matchRule(displays, 'inline-block')).toEqual({ display: 'inline-block' })
    expect(matchRule(displays, 'contents')).toEqual({ display: 'contents' })
    expect(matchRule(displays, 'flow-root')).toEqual({ display: 'flow-root' })
    expect(matchRule(displays, 'list-item')).toEqual({ display: 'list-item' })
    expect(matchRule(displays, 'hidden')).toEqual({ display: 'none' })
    expect(matchRule(displays, 'display-flex')).toBeUndefined()
    expect(matchRule(displays, 'display-[inline-flex]')).toEqual({ display: 'inline-flex' })
    expect(matchRule(displays, 'display-inherit')).toEqual({ display: 'inherit' })

    expect(matchRule(appearances, 'visible')).toEqual({ visibility: 'visible' })
    expect(matchRule(appearances, 'invisible')).toEqual({ visibility: 'hidden' })
    expect(matchRule(appearances, 'collapse')).toEqual({ visibility: 'collapse' })
    expect(matchRule(appearances, 'backface-visible')).toEqual({ 'backface-visibility': 'visible' })
    expect(matchRule(appearances, 'backface-hidden')).toEqual({ 'backface-visibility': 'hidden' })
    for (const keyword of globalKeywords)
      expect(matchRule(appearances, `backface-${keyword}`)).toEqual({ 'backface-visibility': keyword })

    expect(matchRule(cursors, 'cursor-pointer')).toEqual({ cursor: 'pointer' })
    expect(matchRule(cursors, 'cursor-not-allowed')).toEqual({ cursor: 'not-allowed' })
    expect(matchRule(cursors, 'cursor-[grab]')).toEqual({ cursor: 'grab' })
    expect(matchRule(cursors, 'cursor-inherit')).toEqual({ cursor: 'inherit' })

    expectUtilities(contains, {
      'contain-size': { '--un-contain-size': 'size', 'contain': 'var(--un-contain-size) var(--un-contain-layout) var(--un-contain-paint) var(--un-contain-style)' },
      'contain-layout': { '--un-contain-size': 'layout', 'contain': 'var(--un-contain-size) var(--un-contain-layout) var(--un-contain-paint) var(--un-contain-style)' },
      'contain-strict': { contain: 'strict' },
      'contain-content': { contain: 'content' },
      'contain-none': { contain: 'none' },
      'contain-[size_layout]': { contain: 'size layout' },
    })
  })

  it('resolves interaction, whitespace, content and breaks', () => {
    expect(matchRule(pointerEvents, 'pointer-events-auto')).toEqual({ 'pointer-events': 'auto' })
    expect(matchRule(pointerEvents, 'pointer-events-none')).toEqual({ 'pointer-events': 'none' })
    expect(matchRule(resizes, 'resize-x')).toEqual({ resize: 'horizontal' })
    expect(matchRule(resizes, 'resize-y')).toEqual({ resize: 'vertical' })
    expect(matchRule(resizes, 'resize')).toEqual({ resize: 'both' })
    expect(matchRule(resizes, 'resize-none')).toEqual({ resize: 'none' })
    expect(matchRule(userSelects, 'select-none')).toEqual({ '-webkit-user-select': 'none', 'user-select': 'none' })
    expect(matchRule(userSelects, 'select-text')).toEqual({ '-webkit-user-select': 'text', 'user-select': 'text' })

    for (const value of ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'break-spaces', ...globalKeywords]) {
      expect(matchRule(whitespaces, `whitespace-${value}`)).toEqual({ 'white-space': value })
      expect(matchRule(whitespaces, `ws-${value}`)).toEqual({ 'white-space': value })
    }
    expect(matchRule(whitespaces, 'ws-wrap')).toBeUndefined()

    expectUtilities(contentVisibility, {
      'intrinsic-size-4': { 'contain-intrinsic-size': '1rem' },
      'intrinsic-w-10': { 'contain-intrinsic-width': '2.5rem' },
      'intrinsic-h-full': { 'contain-intrinsic-height': '100%' },
      'content-visibility-auto': { 'content-visibility': 'auto' },
      'content-visibility-hidden': { 'content-visibility': 'hidden' },
      'content-visibility-visible': { 'content-visibility': 'visible' },
    })
    expectUtilities(contents, {
      'content-empty': { content: '""' },
      'content-none': { content: 'none' },
      'content-[attr(data-x)]': { '--un-content': 'attr(data-x)', 'content': 'var(--un-content)' },
      'content-plain': undefined,
    })

    expect(matchRule(breaks, 'break-normal')).toEqual({ 'overflow-wrap': 'normal', 'word-break': 'normal' })
    expect(matchRule(breaks, 'break-words')).toEqual({ 'overflow-wrap': 'break-word' })
    expect(matchRule(breaks, 'break-all')).toEqual({ 'word-break': 'break-all' })
    expect(matchRule(breaks, 'break-keep')).toEqual({ 'word-break': 'keep-all' })
    expect(matchRule(breaks, 'wrap-anywhere')).toEqual({ 'overflow-wrap': 'anywhere' })
    expect(matchRule(textWraps, 'text-wrap')).toEqual({ 'text-wrap': 'wrap' })
    expect(matchRule(textWraps, 'text-nowrap')).toEqual({ 'text-wrap': 'nowrap' })
    expect(matchRule(textWraps, 'text-balance')).toEqual({ 'text-wrap': 'balance' })
    expect(matchRule(textWraps, 'text-pretty')).toEqual({ 'text-wrap': 'pretty' })
    expect(matchRule(textOverflows, 'truncate')).toEqual({ 'overflow': 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' })
    expect(matchRule(textOverflows, 'text-ellipsis')).toEqual({ 'text-overflow': 'ellipsis' })
    expect(matchRule(textOverflows, 'text-clip')).toEqual({ 'text-overflow': 'clip' })
  })

  it('resolves typography, writing mode and accessibility utilities', () => {
    expect(matchRule(textTransforms, 'uppercase')).toEqual({ 'text-transform': 'uppercase' })
    expect(matchRule(textTransforms, 'case-capital')).toEqual({ 'text-transform': 'capitalize' })
    expect(matchRule(textTransforms, 'normal-case')).toEqual({ 'text-transform': 'none' })
    expect(matchRule(fontStyles, 'italic')).toEqual({ 'font-style': 'italic' })
    expect(matchRule(fontStyles, 'not-italic')).toEqual({ 'font-style': 'normal' })
    expect(matchRule(fontStyles, 'font-oblique')).toEqual({ 'font-style': 'oblique' })
    expect(matchRule(fontSmoothings, 'antialiased')).toEqual({
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
    })
    expect(matchRule(fontSmoothings, 'subpixel-antialiased')).toEqual({
      '-webkit-font-smoothing': 'auto',
      '-moz-osx-font-smoothing': 'auto',
    })

    for (const keyword of ['manual', 'auto', 'none', ...globalKeywords]) {
      expect(matchRule(hyphens, `hyphens-${keyword}`)).toEqual({
        '-webkit-hyphens': keyword,
        '-ms-hyphens': keyword,
        'hyphens': keyword,
      })
    }

    expect(matchRule(writingModes, 'write-vertical-right')).toEqual({ 'writing-mode': 'vertical-rl' })
    expect(matchRule(writingModes, 'write-vertical-left')).toEqual({ 'writing-mode': 'vertical-lr' })
    expect(matchRule(writingModes, 'write-normal')).toEqual({ 'writing-mode': 'horizontal-tb' })
    expect(matchRule(writingOrientations, 'write-orient-mixed')).toEqual({ 'text-orientation': 'mixed' })
    expect(matchRule(writingOrientations, 'write-orient-upright')).toEqual({ 'text-orientation': 'upright' })
    expect(matchRule(screenReadersAccess, 'sr-only')).toMatchObject({
      position: 'absolute',
      width: '1px',
      height: '1px',
      overflow: 'hidden',
    })
    expect(matchRule(screenReadersAccess, 'not-sr-only')).toMatchObject({
      position: 'static',
      width: 'auto',
      overflow: 'visible',
    })
    expect(matchRule(accessibility, 'forced-color-adjust-auto')).toEqual({ 'forced-color-adjust': 'auto' })
    expect(matchRule(accessibility, 'forced-color-adjust-none')).toEqual({ 'forced-color-adjust': 'none' })
    expect(matchRule(fieldSizing, 'field-sizing-fixed')).toEqual({ 'field-sizing': 'fixed' })
    expect(matchRule(fieldSizing, 'field-sizing-content')).toEqual({ 'field-sizing': 'content' })
  })

  it('resolves blend modes, object position, isolation and dynamic viewport height', () => {
    expect(matchRule(isolations, 'isolate')).toEqual({ isolation: 'isolate' })
    expect(matchRule(isolations, 'isolate-auto')).toEqual({ isolation: 'auto' })
    expect(matchRule(isolations, 'isolation-auto')).toEqual({ isolation: 'auto' })
    expect(matchRule(objectPositions, 'object-cover')).toEqual({ 'object-fit': 'cover' })
    expect(matchRule(objectPositions, 'object-contain')).toEqual({ 'object-fit': 'contain' })
    expect(matchRule(objectPositions, 'object-top')).toEqual({ 'object-position': 'top' })
    expect(matchRule(objectPositions, 'object-[center_top]')).toEqual({ 'object-position': 'center top' })
    expect(matchRule(backgroundBlendModes, 'bg-blend-multiply')).toEqual({ 'background-blend-mode': 'multiply' })
    expect(matchRule(backgroundBlendModes, 'bg-blend-color-dodge')).toEqual({ 'background-blend-mode': 'color-dodge' })
    expect(matchRule(mixBlendModes, 'mix-blend-plus-lighter')).toEqual({ 'mix-blend-mode': 'plus-lighter' })
    expect(matchRule(mixBlendModes, 'mix-blend-normal')).toEqual({ 'mix-blend-mode': 'normal' })
    for (const keyword of globalKeywords) {
      expect(matchRule(backgroundBlendModes, `bg-blend-${keyword}`)).toEqual({ 'background-blend-mode': keyword })
      expect(matchRule(mixBlendModes, `mix-blend-${keyword}`)).toEqual({ 'mix-blend-mode': keyword })
    }

    expect(matchRule(dynamicViewportHeight, 'h-dvh')).toEqual({ height: '100dvh' })
    expect(matchRule(dynamicViewportHeight, 'min-h-svh')).toEqual({ 'min-height': '100svh' })
    expect(matchRule(dynamicViewportHeight, 'max-h-lvh')).toEqual({ 'max-height': '100lvh' })
  })
})
