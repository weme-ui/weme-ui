import { describe, expect, it } from 'vitest'
import { loadPackageJson } from '../../src/utils/schema/package'

describe('utils/schema/package', () => {
  it('should load package.json', () => {
    const result = loadPackageJson('packages/cli/test/fixtures/project')

    expect(result.isOk()).toBe(true)
    expect(result.unwrap().name).toBe('test')
  })

  it('should return error if package.json not found', () => {
    const result = loadPackageJson('packages/cli/test/fixtures/empty')

    expect(result.isErr()).toBe(true)
  })
})
