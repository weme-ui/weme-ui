import { describe, expect, it } from 'vitest'
import { aria } from '~/theme/aria'

describe('aria', () => {
  it('maps common aria states to attribute selectors', () => {
    expect(aria).toEqual({
      busy: 'busy="true"',
      checked: 'checked="true"',
      disabled: 'disabled="true"',
      expanded: 'expanded="true"',
      hidden: 'hidden="true"',
      pressed: 'pressed="true"',
      readonly: 'readonly="true"',
      required: 'required="true"',
      selected: 'selected="true"',
    })
  })
})
