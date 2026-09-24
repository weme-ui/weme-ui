import { describe, expect, it } from 'vitest'
import { alignments, boxSizing, flexGridJustifiesAlignments, floats, insets, justifies, orders, placements, positions, zIndexes } from '~/rules/position'
import { globalKeywords } from '~/utils/mappings'
import { expectUtilities, matchRule } from './_utils'

describe('position rules', () => {
  it('resolves position keywords', () => {
    for (const value of ['relative', 'absolute', 'fixed', 'sticky', 'static']) {
      expect(matchRule(positions, value)).toEqual({ position: value })
      expect(matchRule(positions, `pos-${value}`)).toEqual({ position: value })
      expect(matchRule(positions, `position-${value}`)).toEqual({ position: value })
    }
    for (const keyword of globalKeywords)
      expect(matchRule(positions, `pos-${keyword}`)).toEqual({ position: keyword })

    expect(matchRule(positions, 'pos-running')).toBeUndefined()
  })

  it('resolves justify, align and place utilities, including flex and grid prefixes', () => {
    expect(matchRule(justifies, 'justify-start')).toEqual({ 'justify-content': 'flex-start' })
    expect(matchRule(justifies, 'justify-between')).toEqual({ 'justify-content': 'space-between' })
    expect(matchRule(justifies, 'justify-items-center-safe')).toEqual({ 'justify-items': 'safe center' })
    expect(matchRule(justifies, 'justify-self-end-safe')).toEqual({ 'justify-self': 'safe flex-end' })
    expect(matchRule(alignments, 'content-center')).toEqual({ 'align-content': 'center' })
    expect(matchRule(alignments, 'items-baseline-last')).toEqual({ 'align-items': 'last baseline' })
    expect(matchRule(alignments, 'self-start')).toEqual({ 'align-self': 'flex-start' })
    expect(matchRule(placements, 'place-content-evenly')).toEqual({ 'place-content': 'space-evenly' })
    expect(matchRule(placements, 'place-items-end-safe')).toEqual({ 'place-items': 'safe flex-end' })
    expect(matchRule(placements, 'place-self-auto')).toEqual({ 'place-self': 'auto' })

    expect(matchRule(flexGridJustifiesAlignments, 'flex-justify-center')).toEqual({ 'justify-content': 'center' })
    expect(matchRule(flexGridJustifiesAlignments, 'grid-items-stretch')).toEqual({ 'align-items': 'stretch' })
    expect(flexGridJustifiesAlignments).toHaveLength((justifies.length + alignments.length + placements.length) * 2)

    for (const keyword of globalKeywords) {
      expect(matchRule(justifies, `justify-${keyword}`)).toEqual({ 'justify-content': keyword })
      expect(matchRule(alignments, `items-${keyword}`)).toEqual({ 'align-items': keyword })
      expect(matchRule(placements, `place-self-${keyword}`)).toEqual({ 'place-self': keyword })
    }
  })

  it('resolves insets, floats, order, z-index and box sizing', () => {
    expectUtilities(insets, {
      'inset-4': { inset: 'calc(var(--spacing) * 4)' },
      'top-4': { top: 'calc(var(--spacing) * 4)' },
      'inset-x-2': { 'inset-inline': 'calc(var(--spacing) * 2)' },
      'start-0': { 'inset-inline-start': 'calc(var(--spacing) * 0)' },
      'pos-bottom-auto': { bottom: 'auto' },
      'left-1/2': { left: '50%' },
    })

    expect(matchRule(floats, 'float-start')).toEqual({ float: 'inline-start' })
    expect(matchRule(floats, 'float-none')).toEqual({ float: 'none' })
    expect(matchRule(floats, 'clear-both')).toEqual({ clear: 'both' })
    expect(matchRule(floats, 'clear-end')).toEqual({ clear: 'inline-end' })
    for (const keyword of globalKeywords) {
      expect(matchRule(floats, `float-${keyword}`)).toEqual({ float: keyword })
      expect(matchRule(floats, `clear-${keyword}`)).toEqual({ clear: keyword })
    }

    expectUtilities(orders, {
      'order-first': { order: 'calc(-infinity)' },
      'order-last': { order: 'calc(infinity)' },
      'order-none': { order: '0' },
      'order-3': { order: 3 },
      'order-[var(--n)]': { order: 'var(--n)' },
    })
    expectUtilities(zIndexes, {
      'z10': { 'z-index': 10 },
      'z-auto': { 'z-index': 'auto' },
      'z-[var(--layer)]': { 'z-index': 'var(--layer)' },
      'pos-z-0': { 'z-index': 0 },
    })
    expect(matchRule(boxSizing, 'box-border')).toEqual({ 'box-sizing': 'border-box' })
    expect(matchRule(boxSizing, 'box-content')).toEqual({ 'box-sizing': 'content-box' })
    for (const keyword of globalKeywords)
      expect(matchRule(boxSizing, `box-${keyword}`)).toEqual({ 'box-sizing': keyword })
  })
})
