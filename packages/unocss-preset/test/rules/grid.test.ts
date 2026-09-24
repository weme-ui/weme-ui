import { describe, it } from 'vitest'
import { grids } from '~/rules/grid'
import { expectUtilities } from './_utils'

describe('grid rules', () => {
  it('resolves display, span, line and auto flow', () => {
    expectUtilities(grids, {
      'grid': { display: 'grid' },
      'inline-grid': { display: 'inline-grid' },
      'col-span-2': { 'grid-column': 'span 2/span 2' },
      'row-span-full': { 'grid-row': '1/-1' },
      'grid-col-start-2': { 'grid-column-start': '2' },
      'row-end-[last]': { 'grid-row-end': 'last' },
      'col-auto': { 'grid-column': 'auto' },
      'auto-rows-fr': { 'grid-auto-rows': 'minmax(0,1fr)' },
      'auto-cols-min': { 'grid-auto-columns': 'min-content' },
      'grid-flow-row-dense': { 'grid-auto-flow': 'row dense' },
      'auto-flow-col': { 'grid-auto-flow': 'column' },
      'grid-auto-flow-[dense]': { 'grid-auto-flow': 'dense' },
    })
  })

  it('resolves templates, areas and subgrid', () => {
    expectUtilities(grids, {
      'grid-cols-3': { 'grid-template-columns': 'repeat(3,minmax(0,1fr))' },
      'rows-2': { 'grid-template-rows': 'repeat(2,minmax(0,1fr))' },
      'cols-minmax-10rem': { 'grid-template-columns': 'repeat(auto-fill,minmax(10rem,1fr))' },
      'grid-cols-[1fr_2fr]': { 'grid-template-columns': '1fr 2fr' },
      'grid-rows-none': { 'grid-template-rows': 'none' },
      'grid-cols-subgrid': { 'grid-template-columns': 'subgrid' },
      'grid-area-[header]': { 'grid-area': 'header' },
      'rows-none': undefined,
      'grid-area-[': undefined,
    })
  })
})
