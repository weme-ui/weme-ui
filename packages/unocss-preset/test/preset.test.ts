import { createGenerator } from '@unocss/core'
import { describe, expect, it } from 'vitest'
import presetWemeUI from '../src'

describe('preset weme-ui', () => {
  it('should parse colors', async () => {
    const uno = await createGenerator({
      envMode: 'dev',
      presets: [presetWemeUI({ reset: false })],
    })

    const themeColors = [
      'gray',
      'mauve',
      'slate',
      'sage',
      'olive',
      'sand',
      'tomato',
      'red',
      'ruby',
      'crimson',
      'pink',
      'plum',
      'purple',
      'violet',
      'iris',
      'indigo',
      'blue',
      'cyan',
      'sky',
      'teal',
      'jade',
      'green',
      'mint',
      'grass',
      'lime',
      'bronze',
      'gold',
      'brown',
      'orange',
      'amber',
      'yellow',
    ]

    const { css } = await uno.generate(themeColors.map((color) => `bg-${color}`).join(' '))

    for (const color of themeColors) {
      expect(css).toContain(`--${color}-9:`)
      expect(css).toContain(`var(--${color}-9)`)
      expect(css).toContain(`.bg-${color}`)
    }

    expect(css).toContain(':root,:where([data-theme="default"])')
    expect(css).toContain('@supports (color: color(display-p3 1 1 1)) {')
  })

  it('should parse color aliases', async () => {
    const uno = await createGenerator({
      envMode: 'dev',
      presets: [presetWemeUI({ reset: false })],
    })

    const colorAlias = ['accent', 'neutral', 'info', 'success', 'warning', 'error']

    const { css } = await uno.generate(
      colorAlias
        .map((color) =>
          Array.from({ length: 12 })
            .map((_, index) => `bg-${color}-${index + 1}`)
            .join(' '),
        )
        .join(' '),
    )

    for (const color of colorAlias) {
      for (const scale of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) {
        expect(css).toContain(`--${color}-${scale}:`)
        expect(css).toContain(`var(--${color}-${scale})`)
        expect(css).toContain(`.bg-${color}-${scale}`)
      }
    }
  })

  it('should parse custom tokens', async () => {
    const uno = await createGenerator({
      envMode: 'dev',
      presets: [presetWemeUI({ reset: false })],
    })

    const { css } = await uno.generate(
      [
        // text
        'text-default text-highlighted text-muted text-subtle text-inverted',
        'text-bg-default text-bg-muted text-bg-elevated text-bg-inverted',
        'text-border-default text-border-elevated text-border-inverted',
        // background
        'bg-default bg-muted bg-elevated bg-inverted',
        'bg-text bg-border bg-text-inverted bg-border-inverted',
        // border
        'border-default border-elevated border-inverted b-default b-elevated b-inverted',
      ].join(' '),
    )

    for (const varName of [
      'text-highlighted',
      'text',
      'text-subtle',
      'text-muted',
      'text-inverted',
      'bg',
      'bg-muted',
      'bg-elevated',
      'bg-inverted',
      'border',
      'border-elevated',
      'border-inverted',
    ]) {
      expect(css).toContain(`--${varName}`)
      expect(css).toContain(`var(--${varName})`)
      expect(css).toContain(`.${varName}`)
    }

    expect(css).toContain('.text-default')
    expect(css).toContain('.bg-default')
    expect(css).toContain('.border-default')
  })

  it('should parse custom css variables', async () => {
    const uno = await createGenerator({
      envMode: 'dev',
      presets: [
        presetWemeUI({
          reset: false,
          cssVars: {
            test: {
              background: '#000',
              base: '#000',
              default: '#f00',
              border: '#000',
              color: '#fff',
              muted: 'neutral.3',
              width: '100px',
              height: '100px',
            },
          },
        }),
      ],
    })

    const classes = [
      // background
      'bg-test bg-test-muted',
      // text
      'text-test c-test color-test text-test-muted',
      // border
      'border-test b-test b-test-muted',
      // ring
      'ring-test',
      // outline
      'outline-test',
      // shadow
      'shadow-test',
      // fill
      'fill-test',
      // stroke
      'stroke-test',
      // accent
      'accent-test',
      // caret
      'caret-test',
      // decoration
      'decoration-test',
      // underline
      'underline-test',
      // divide
      'divide-test',
      // drop-shadow-color
      'drop-shadow-color-test',
      // drop-shadow
      'drop-shadow-test',
      // rule
      'rule-test',
      // inset-ring
      'inset-ring-test',
      // placeholder
      'placeholder-test',
      // gradient
      'from-test to-test via-test mask-linear-from-test',
    ]
      .join(' ')
      .trim()

    const { css } = await uno.generate(classes)

    expect(css).toContain('--test: #000;')
    expect(css).toContain('--test-bg: #000;')
    expect(css).toContain('--test-border: #000;')
    expect(css).toContain('--test-muted: var(--neutral-3);')
    expect(css).toContain('--test-width: 100px;')
    expect(css).toContain('--test-height: 100px;')

    for (const cls of classes.split(' ')) {
      expect(css).toContain(`.${cls}`)
    }
  })

  it('should parse special custom css variables', async () => {
    const uno = await createGenerator({
      envMode: 'dev',
      presets: [
        presetWemeUI({
          reset: false,
          cssVars: {
            test: {
              width: '100px',
              height: '100px',
            },
          },
        }),
      ],
    })

    const { css } = await uno.generate('w-test h-test size-test b-t')

    expect(css).toContain('--test-width: 100px;')
    expect(css).toContain('--test-height: 100px;')
    expect(css).toContain('.w-test')
    expect(css).toContain('.h-test')
    expect(css).toContain('.size-test')
    expect(css).toContain('.b-t{border-top-width:1px;}')
  })
})
