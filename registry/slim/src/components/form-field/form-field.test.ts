import { describe, expect, it } from 'vitest'
import { useFormFieldStyle } from './form-field.style'

describe('form-field', () => {
  it('applies default vertical orientation and base slots', () => {
    const ui = useFormFieldStyle({})

    expect(ui.root()).toContain('flex')
    expect(ui.root()).toContain('gap-2')
    expect(ui.root()).toContain('flex-col')
    expect(ui.header()).toContain('flex-(~ col)')
    expect(ui.labelWrapper()).toContain('flex')
    expect(ui.labelWrapper()).toContain('gap-1')
    expect(ui.label()).toContain('text-(base highlighted nowrap)')
    expect(ui.label()).toContain('font-medium')
    expect(ui.description()).toContain('text-(subtle sm)')
    expect(ui.required()).toContain('text-red')
    expect(ui.content()).toContain('flex-(~ col)')
    expect(ui.hint()).toContain('text-(muted xs)')
    expect(ui.help()).toContain('text-(muted xs)')
    expect(ui.errors()).toContain('text-(error xs)')
  })

  it('applies orientation variants', () => {
    const vertical = useFormFieldStyle({ orientation: 'vertical' })
    expect(vertical.root()).toContain('flex-col')
    expect(vertical.description()).not.toContain('items-center')

    const horizontal = useFormFieldStyle({ orientation: 'horizontal' })
    expect(horizontal.root()).not.toContain('flex-col')
    expect(horizontal.description()).toContain('items-center')
  })

  it('applies loading and disabled states', () => {
    expect(useFormFieldStyle({ loading: true }).root()).toContain('is-loading')
    expect(useFormFieldStyle({ disabled: true }).content()).toContain('is-disabled')
  })
})
