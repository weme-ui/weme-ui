export interface UiDependencyBadge {
  label: string
  href: string
}

/**
 * UI-facing libraries shown as header badges.
 * Utility packages (clsx, defu, vue, …) are intentionally excluded.
 */
const UI_DEPENDENCY_BADGES: Array<{
  match: (pkg: string) => boolean
  label: string
  href: string
}> = [
  {
    match: pkg => pkg === '@iconify/vue' || pkg.startsWith('@iconify/'),
    label: 'Iconify',
    href: 'https://iconify.design/',
  },
  {
    match: pkg => pkg === 'reka-ui' || pkg.startsWith('reka-ui/') || pkg.startsWith('@reka-ui/'),
    label: 'Reka UI',
    href: 'https://reka-ui.com/',
  },
]

function packageName(entry: string): string {
  // "vue^3.0.0" | "@iconify/vue@latest" | "@iconify/vue"
  const at = entry.lastIndexOf('@')
  if (entry.startsWith('@') && at > 0)
    return entry.slice(0, at)
  if (!entry.startsWith('@') && at > 0)
    return entry.slice(0, at)
  return entry.replace(/[\^~>=<].*$/, '')
}

export function resolveUiDependencyBadges(dependencies: string[] = []): UiDependencyBadge[] {
  const badges: UiDependencyBadge[] = []
  const seen = new Set<string>()

  for (const entry of dependencies) {
    const name = packageName(entry.trim())
    if (!name)
      continue

    for (const rule of UI_DEPENDENCY_BADGES) {
      if (!rule.match(name) || seen.has(rule.label))
        continue
      seen.add(rule.label)
      badges.push({ label: rule.label, href: rule.href })
    }
  }

  return badges
}
