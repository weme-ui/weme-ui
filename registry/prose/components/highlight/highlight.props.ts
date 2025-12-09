import type { MarkProps } from '../mark/mark.props'

export interface HighlightProps {
  text: string
  query: string | string[]
  ignoreCase?: boolean
  matchAll?: boolean
  exactMatch?: boolean
  markProps?: Partial<MarkProps>
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
