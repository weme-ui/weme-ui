import type { MaybeRef } from 'vue'
import { highlightWord } from '@zag-js/highlight-word'
import { computed, toValue } from 'vue'

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
