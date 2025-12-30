import type { Rule } from 'unocss'
import type { Theme, WemePresetResolvedOptions } from '../types'
import { resolveColor, trackProperty } from '../utils'

const properties = {
  'gradient-position': trackProperty('--un-gradient-position'),
  'gradient-from': trackProperty('--un-gradient-from', { syntax: '<color>', initialValue: '#0000' }),
  'gradient-via': trackProperty('--un-gradient-via', { syntax: '<color>', initialValue: '#0000' }),
  'gradient-to': trackProperty('--un-gradient-to', { syntax: '<color>', initialValue: '#0000' }),
  'gradient-stops': trackProperty('--un-gradient-stops'),
  'gradient-via-stops': trackProperty('--un-gradient-via-stops'),
  'gradient-from-position': trackProperty('--un-gradient-from-position', { syntax: '<length-percentage>', initialValue: '0%' }),
  'gradient-via-position': trackProperty('--un-gradient-via-position', { syntax: '<length-percentage>', initialValue: '50%' }),
  'gradient-to-position': trackProperty('--un-gradient-to-position', { syntax: '<length-percentage>', initialValue: '100%' }),
}

export function gradientColors(options: WemePresetResolvedOptions): Rule<Theme>[] {
  return [
    [
      /^(from|via|to|stops)-(.+)$/,
      function* ([, p, c]) {
        const result = resolveColor(`--un-gradient-${p}`, 'bg', c, options)

        if (result) {
          switch (p) {
            case 'from':
              yield {
                ...result,
                '--un-gradient-stops': 'var(--un-gradient-via-stops, var(--un-gradient-position), var(--un-gradient-from) var(--un-gradient-from-position), var(--un-gradient-to) var(--un-gradient-to-position))',
              }
              break
            case 'via':
              yield {
                ...result,
                '--un-gradient-via-stops': `var(--un-gradient-position), var(--un-gradient-from) var(--un-gradient-from-position), var(--un-gradient-via) var(--un-gradient-via-position), var(--un-gradient-to) var(--un-gradient-to-position)`,
                '--un-gradient-stops': `var(--un-gradient-via-stops)`,
              }
              break
            case 'to':
              yield {
                ...result,
                '--un-gradient-stops': 'var(--un-gradient-via-stops, var(--un-gradient-position), var(--un-gradient-from) var(--un-gradient-from-position), var(--un-gradient-to) var(--un-gradient-to-position))',
              }
              break
            case 'stops':
              yield {
                ...result,
              }
              break
          }

          for (const p of Object.values(properties))
            yield p
        }
      },
      {
        autocomplete: [
          '(from|via|to|stops)-<color>',
          '(from|via|to|stops)-<color>-<scale>',
          '(from|via|to|stops)-<color>-<scale>/<percent>',
        ],
      },
    ],
  ]
}
