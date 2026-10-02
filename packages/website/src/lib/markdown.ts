import { marked } from 'marked'

marked.setOptions({
  gfm: true,
  breaks: false,
})

export function stripLeadingH1(source = ''): string {
  if (!source.startsWith('# '))
    return source
  const newline = source.indexOf('\n')
  if (newline < 0)
    return ''
  let end = newline + 1
  while (end < source.length && (source[end] === '\n' || source[end] === '\r'))
    end++
  return source.slice(end)
}

export function renderMarkdown(source = ''): string {
  return marked.parse(source, { async: false }) as string
}

export interface TocItem {
  id: string
  text: string
  level: number
}

export function extractToc(markdown = ''): TocItem[] {
  const items: TocItem[] = []
  const used = new Map<string, number>()

  for (const line of markdown.split('\n')) {
    const hashes = line.match(/^#{2,3}(?= )/)?.[0]
    if (!hashes)
      continue

    const text = line.slice(hashes.length).trim().replace(/[#`*_]/g, '').trim()
    if (!text)
      continue

    const level = hashes.length
    const base = text
      .toLowerCase()
      .replace(/[^\w\u4E00-\u9FFF\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
    const count = used.get(base) || 0
    used.set(base, count + 1)
    const id = count === 0 ? base : `${base}-${count}`

    items.push({ id, text, level })
  }

  return items
}

export function injectHeadingIds(html: string, toc: TocItem[]): string {
  let index = 0
  return html.replace(/<h([23])>(.*?)<\/h\1>/g, (_, level, inner) => {
    const item = toc[index++]
    const id = item?.id || `section-${index}`
    return `<h${level} id="${id}">${inner}</h${level}>`
  })
}
