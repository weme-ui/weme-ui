import type { ChangelogConfig } from 'changelogen'

export default {
  types: {
    feat: { title: '🚀 Enhancements', semver: 'minor' },
    fix: { title: '🩹 Fixes', semver: 'patch' },
    perf: { title: '🔥 Performance', semver: 'patch' },
    refactor: { title: '💅 Refactors', semver: 'patch' },
    docs: { title: '📖 Documentation', semver: 'patch' },
    types: { title: '🌊 Types', semver: 'patch' },
    chore: false,
    test: false,
    style: false,
    ci: false,
    build: false,
  },
  scopeMap: {
    color: 'colors',
    utilitie: 'utilities',
  },
} satisfies Partial<ChangelogConfig>
