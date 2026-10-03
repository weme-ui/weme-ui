import type { Highlighter } from 'shiki'
import { createHighlighter } from 'shiki'

/** Dark theme that sits well on the docs shell without custom token colors. */
const THEME = 'vitesse-dark' as const

let highlighterPromise: Promise<Highlighter> | null = null

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [THEME],
      langs: ['vue', 'typescript', 'javascript'],
    })
  }
  return highlighterPromise
}

export async function highlightCode(
  code: string,
  lang: 'vue' | 'typescript' | 'javascript' = 'vue',
): Promise<string> {
  const highlighter = await getHighlighter()
  return highlighter.codeToHtml(code.replace(/\n$/, ''), {
    lang,
    theme: THEME,
  })
}
