import { posix } from 'node:path'
import { fileURLToPath } from 'node:url'
import { docIdFromRelative, presetDocPath } from './preset-docs'
import { SITE_BASE } from './site'

const DOCS_MARK = '/unocss-preset/docs/'

interface DocLink {
  url: string
}

interface RewriteContext {
  fileURL: URL | undefined
  setProperty: (node: DocLink, key: 'url', value: string) => void
}

/**
 * 把 Preset 文档里的相对 `.md` 链接改成站点路径。源文件保持不动。
 * 插件形状对齐 Sätteri 的 mdast visitor。
 */
export function rewritePresetDocLinks() {
  return {
    name: 'rewrite-preset-doc-links',
    link(node: DocLink, ctx: RewriteContext) {
      const next = rewriteDocHref(node.url, ctx.fileURL)
      if (next)
        ctx.setProperty(node, 'url', next)
    },
    definition(node: DocLink, ctx: RewriteContext) {
      const next = rewriteDocHref(node.url, ctx.fileURL)
      if (next)
        ctx.setProperty(node, 'url', next)
    },
  }
}

export function rewriteDocHref(url: string, fileURL?: URL) {
  if (!fileURL)
    return

  const filePath = fileURLToPath(fileURL).replace(/\\/g, '/')
  const mark = filePath.indexOf(DOCS_MARK)
  if (mark === -1)
    return

  const docsRoot = filePath.slice(0, mark + DOCS_MARK.length - 1)
  const hashAt = url.indexOf('#')
  const pathPart = hashAt === -1 ? url : url.slice(0, hashAt)
  const hash = hashAt === -1 ? '' : url.slice(hashAt)

  if (!pathPart.endsWith('.md'))
    return
  if (/^[a-z][a-z0-9+.-]*:/i.test(pathPart) || pathPart.startsWith('//'))
    return

  const absolute = posix.normalize(posix.join(posix.dirname(filePath), pathPart))
  const rootPrefix = `${docsRoot}/`
  if (!absolute.startsWith(rootPrefix))
    return

  const id = docIdFromRelative(absolute.slice(rootPrefix.length))
  return `${SITE_BASE}${presetDocPath(id)}${hash}`
}
