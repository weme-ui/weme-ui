import { describe, expect, it } from 'vitest'
import { loadPackageJson } from '../../src/utils/schema/package'

describe('utils/schema/package', () => {
  it('should load package.json', () => {
    const result = loadPackageJson('test/fixtures/project')

    expect(result.isOk()).toBe(true)
    expect(result.unwrap().name).toBe('test')
  })

  it('should return error if package.json not found', () => {
    const result = loadPackageJson('test/fixtures/empty')

    expect(result.isErr()).toBe(true)
  })
})
