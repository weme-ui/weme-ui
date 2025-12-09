import chalk from 'chalk'

export function createHighlightedPatch(patch: string) {
  const lines: string[] = []

  for (const line of patch.split('\n')) {
    if (
      line.startsWith('---')
      || line.startsWith('+++')
      || line.startsWith('Index: ')
      || line.startsWith('@@')
      || line.startsWith('====')
    ) {
      continue
    }

    if (line.startsWith('-'))
      lines.push(chalk.bgRed(line))
    else if (line.startsWith('+'))
      lines.push(chalk.bgGreen(line))
    else
      lines.push(chalk.gray(line))
  }

  return lines.join('\n')
}
