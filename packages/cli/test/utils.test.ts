import { describe, expect, it } from 'vitest'
import { resolveRepoPath } from '../src/utils/utilities'

describe('utils', () => {
  it('should resolve repo path', () => {
    [
      ['@weme-ui/weme-ui', 'gh:weme-ui/weme-ui'],
      ['gh:weme-ui/weme-ui', 'gh:weme-ui/weme-ui'],
      ['https://github.com/weme-ui/weme-ui', 'gh:weme-ui/weme-ui'],
      ['https://gitlab.com/weme-ui/weme-ui', 'gitlab:weme-ui/weme-ui'],
      ['https://bitbucket.com/weme-ui/weme-ui', 'bitbucket:weme-ui/weme-ui'],
    ].forEach(([name, result]) => {
      expect(resolveRepoPath(name as string)).toEqual(result)
    })
  })
})
