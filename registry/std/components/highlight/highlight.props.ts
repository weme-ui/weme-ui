import type { HighlightStyleProps } from './highlight.style'

export interface HighlightProps {
  text: string
  query: string | string[]
  ignoreCase?: boolean
  matchAll?: boolean
  exactMatch?: boolean
  color?: HighlightStyleProps['color']
  variant?: HighlightStyleProps['variant']
  radius?: HighlightStyleProps['radius']
  class?: any
}

export interface HighlightChunk {
  text: string
  match: boolean
}

export interface HighlightSpan {
  start: number
  end: number
  match?: boolean
}
