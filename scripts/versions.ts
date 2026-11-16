import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export const versionFiles = [
  'package.json',
  'packages/cli/package.json',
  'packages/colors/package.json',
  'packages/schema/package.json',
  'packages/unocss-preset/package.json',
  'packages/utilities/package.json',
] as const

export const changelogFiles = [
  'packages/cli/CHANGELOG.md',
  'packages/colors/CHANGELOG.md',
  'packages/schema/CHANGELOG.md',
  'packages/unocss-preset/CHANGELOG.md',
  'packages/utilities/CHANGELOG.md',
] as const

export const publishDirectories = [
  'packages/colors',
  'packages/schema',
  'packages/utilities',
  'packages/unocss-preset',
  'packages/cli',
] as const

export const publishedVersionFloor = '5.0.1'

const tagPattern = /^v[0-9]+\.[0-9]+\.[0-9]+(?:-[0-9A-Za-z.]+)?$/
const versionPattern = /^v?(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?$/

interface SemVer {
  major: number
  minor: number
  patch: number
  prerelease: string[]
}

export function readPackageVersion(rootDir: string, file: string): string {
  const manifest = JSON.parse(readFileSync(join(rootDir, file), 'utf8')) as { version?: string }
  if (!manifest.version) {
    throw new Error(`${file} 缺少 version`)
  }

  return manifest.version
}

export function readTrackedVersions(rootDir: string): string[] {
  return versionFiles.map((file) => readPackageVersion(rootDir, file))
}

export function versionsMatch(versions: readonly string[]): boolean {
  const [first] = versions
  return first !== undefined && versions.every((version) => version === first)
}

export function parseVersion(value: string): SemVer | undefined {
  const match = versionPattern.exec(value)
  if (!match) {
    return undefined
  }

  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
    prerelease: match[4] ? match[4].split('.') : [],
  }
}

export function compareVersions(left: SemVer, right: SemVer): number {
  if (left.major !== right.major) {
    return left.major - right.major
  }

  if (left.minor !== right.minor) {
    return left.minor - right.minor
  }

  if (left.patch !== right.patch) {
    return left.patch - right.patch
  }

  if (left.prerelease.length === 0 && right.prerelease.length === 0) {
    return 0
  }

  if (left.prerelease.length === 0) {
    return 1
  }

  if (right.prerelease.length === 0) {
    return -1
  }

  const length = Math.max(left.prerelease.length, right.prerelease.length)
  for (let index = 0; index < length; index += 1) {
    const leftPart = left.prerelease[index]
    const rightPart = right.prerelease[index]
    if (leftPart === undefined) {
      return -1
    }

    if (rightPart === undefined) {
      return 1
    }

    const leftNumber = /^\d+$/.test(leftPart)
    const rightNumber = /^\d+$/.test(rightPart)
    if (leftNumber && rightNumber) {
      const diff = Number(leftPart) - Number(rightPart)
      if (diff !== 0) {
        return diff
      }

      continue
    }

    if (leftNumber !== rightNumber) {
      return leftNumber ? -1 : 1
    }

    if (leftPart !== rightPart) {
      return leftPart < rightPart ? -1 : 1
    }
  }

  return 0
}

export function versionFromTag(tag: string): string | undefined {
  if (!tagPattern.test(tag)) {
    return undefined
  }

  return tag.slice(1)
}

export function distTag(version: string): string {
  const match = /^[0-9]+\.[0-9]+\.[0-9]+(?:-([0-9A-Za-z-]+))?/.exec(version)
  return match?.[1] ?? 'latest'
}

export function changelogHasVersion(markdown: string, version: string): boolean {
  return markdown.split('\n').includes(`## v${version}`)
}
