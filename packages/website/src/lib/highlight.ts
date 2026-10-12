import type { BundledLanguage, Highlighter, SpecialLanguage } from 'shiki'
import { createHighlighter } from 'shiki'

const LIGHT_THEME = 'vitesse-light' as const
const DARK_THEME = 'vitesse-dark' as const

type HighlightLang = BundledLanguage | SpecialLanguage

const LANGS = [
  'vue',
  'typescript',
  'javascript',
  'tsx',
  'jsx',
  'bash',
  'shellscript',
  'json',
  'html',
  'css',
  'markdown',
  'yaml',
] as const satisfies readonly BundledLanguage[]

const LANG_ALIASES: Record<string, HighlightLang> = {
  ts: 'typescript',
  js: 'javascript',
  sh: 'shellscript',
  shell: 'shellscript',
  bash: 'bash',
  zsh: 'shellscript',
  md: 'markdown',
  yml: 'yaml',
  text: 'text',
  txt: 'text',
  plaintext: 'text',
  vue: 'vue',
  html: 'html',
  css: 'css',
  json: 'json',
  tsx: 'tsx',
  jsx: 'jsx',
}

let highlighterPromise: Promise<Highlighter> | null = null

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [LIGHT_THEME, DARK_THEME],
      langs: [...LANGS],
    })
  }
  return highlighterPromise
}

export function resolveHighlightLang(lang?: string | null): HighlightLang {
  if (!lang)
    return 'text'
  const key = lang.trim().toLowerCase()
  if (key in LANG_ALIASES)
    return LANG_ALIASES[key]!
  if ((LANGS as readonly string[]).includes(key))
    return key as BundledLanguage
  return 'text'
}

/**
 * Highlight a code string with Shiki dual themes (light / dark).
 * Token colors use CSS variables; pair with `.light` / `.dark` on `<html>`.
 */
export async function highlightCode(
  code: string,
  lang?: string | null,
): Promise<string> {
  const highlighter = await getHighlighter()
  const resolved = resolveHighlightLang(lang)

  return highlighter.codeToHtml(code.replace(/\n$/, ''), {
    lang: resolved,
    themes: {
      light: LIGHT_THEME,
      dark: DARK_THEME,
    },
    defaultColor: false,
  })
}
