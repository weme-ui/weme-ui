import { describe, expect, it } from 'vitest'
import { questionMark } from '~/rules/question-mark'
import { createRuleContext, matchRule } from './_utils'

describe('question mark rules', () => {
  it('emits the debug animation only in development', () => {
    const dev = {
      generator: {
        ...createRuleContext().generator,
        userConfig: { envMode: 'dev' },
      },
    }

    expect(matchRule(questionMark, '?', dev)).toContain('@keyframes __un_qm')
    expect(matchRule(questionMark, 'where', dev)).toContain('__un_qm 0.5s ease-in-out alternate infinite')
    expect(matchRule(questionMark, '?')).toBeUndefined()
    expect(matchRule(questionMark, 'where')).toBeUndefined()
  })
})
