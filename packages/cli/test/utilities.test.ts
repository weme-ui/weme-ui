import { describe, expect, it } from 'vitest'
import { resolveCommandArgs } from '../src/utils/utilities'

describe('utilities', () => {
  it('should resolve command args', async () => {
    const args: Record<string, any> = {
      cwd: 'test',
    }

    await resolveCommandArgs(args, () => {
      args.type = 'test'
    })

    expect(args.type).toBe('test')
  })
})
