import { highlightWord } from '@zag-js/highlight-word'

export interface UseHighlightOptions {
  text: string
  query: string | string[]
  ignoreCase?: boolean
  matchAll?: boolean
  exactMatch?: boolean
}

export function useHighlight(options: MaybeRef<UseHighlightOptions>) {
  return computed(() => highlightWord(toValue(options)))
}
