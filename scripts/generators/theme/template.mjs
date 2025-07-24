import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { consola } from 'consola'
import { mkdirp } from 'mkdirp'
import { camelCase } from 'scule'
import { asyncWriteFile } from '../../utils/file.mjs'
import { renderTemplate } from '../../utils/template.mjs'

export async function generateTemplates(name, registry, root, data) {
  consola.start(`Generating \`${registry}\` theme \`${name}\`...`)

  const themesDestFile = join(root, `${data.themeId}.ts`)

  if (!existsSync(root))
    await mkdirp(root)

  const content = renderTemplate('theme/theme.ts.hbs', data)

  if (!content) {
    consola.error(`Failed to render theme template \`theme/theme.ts.hbs\``)
    return
  }

  // Theme
  await asyncWriteFile(themesDestFile, content)

  // Index
  const indexPath = join(root, 'index.ts')

  await asyncWriteFile(
    indexPath,
    `export { default as ${camelCase(data.themeId)}Theme } from './${data.themeId}.ts'\n`,
    true,
    'a',
  )

  const indexContent = readFileSync(indexPath, 'utf8')
  const sortedIndexContentLines = indexContent
    .trim()
    .split('\n')
    .filter(Boolean)
    .sort()

  await asyncWriteFile(
    indexPath,
    [...new Set(sortedIndexContentLines)].join('\n'),
    true,
  )

  consola.success('Theme generated!')
}
