#!/usr/bin/env bun

import type { ColorKind, ColorMode } from '../src/colors'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import Color from 'colorjs.io'
import {
  ADDITIONAL_ACCENT_COLORS,
  ADDITIONAL_NEUTRAL_COLORS,
  RADIX_COLOR_NAMES,
  resolveRadixColorScales,
} from '../src/colors'
import { DEFAULT_COLOR_ALIASES, DEFAULT_TOKENS } from '../src/tokens'

interface Palette {
  name: string
  color: string
  kind?: ColorKind
}

interface ColorToken {
  value: string
  type: 'color'
  description: string
}

type PaletteTokens = Record<string, ColorToken>
type ColorExport = Record<string, PaletteTokens>

const SCALE_DESCRIPTIONS = [
  'App background',
  'Subtle background',
  'UI element background',
  'Hovered UI element background',
  'Active / Selected UI element background',
  'Subtle borders and separators',
  'UI element border and focus rings',
  'Hovered UI element border',
  'Solid backgrounds',
  'Hovered solid backgrounds',
  'Low-contrast text',
  'High-contrast text',
] as const

const palettes: Palette[] = [
  ...RADIX_COLOR_NAMES.map(name => ({ name, color: name })),
  { name: 'black', color: 'black' },
  { name: 'white', color: 'white' },
  ...Object.entries(ADDITIONAL_ACCENT_COLORS).map(([name, color]) => ({
    name,
    color,
    kind: 'accent' as const,
  })),
  ...Object.entries(ADDITIONAL_NEUTRAL_COLORS).map(([name, color]) => ({
    name,
    color,
    kind: 'neutral' as const,
  })),
]

const outputDir = join(import.meta.dirname, 'output')
const modes: ColorMode[] = ['light', 'dark']

function toHex(oklch: string): string {
  const hex = new Color(oklch).to('srgb').toString({ format: 'hex' })
  const value = hex.slice(1)

  if (value.length === 3 || value.length === 4) {
    return `#${[...value].map(ch => ch + ch).join('')}`.toUpperCase()
  }

  return hex.toUpperCase()
}

function exportMode(mode: ColorMode): ColorExport {
  const result: ColorExport = {}

  for (const palette of palettes) {
    const { oklch } = resolveRadixColorScales({
      color: palette.color,
      mode,
      kind: palette.kind,
    })
    const tokens: PaletteTokens = {}

    SCALE_DESCRIPTIONS.forEach((description, index) => {
      const value = oklch[index]
      if (value == null) {
        return
      }

      tokens[`--${palette.name}-${index + 1}`] = {
        value: toHex(value),
        type: 'color',
        description,
      }
    })

    result[palette.name] = tokens
  }

  return result
}

function studioAlias(group: string, step: number): string {
  return `{${group}.--${group}-${step}}`
}

function exportTokens(): ColorExport {
  const result: ColorExport = {}

  for (const [alias, palette] of Object.entries(DEFAULT_COLOR_ALIASES)) {
    const tokens: PaletteTokens = {}

    SCALE_DESCRIPTIONS.forEach((description, index) => {
      const step = index + 1
      tokens[`--${alias}-${step}`] = {
        value: studioAlias(palette, step),
        type: 'color',
        description,
      }
    })

    result[alias] = tokens
  }

  for (const [group, variants] of Object.entries(DEFAULT_TOKENS)) {
    const tokens: PaletteTokens = {}

    for (const [variant, ref] of Object.entries(variants)) {
      if (typeof ref !== 'string') {
        continue
      }

      const [refGroup, refStep] = ref.split('.')
      const step = Number(refStep)
      const description = SCALE_DESCRIPTIONS[step - 1]

      if (refGroup == null || Number.isNaN(step) || description == null) {
        continue
      }

      tokens[`--${group}-${variant}`] = {
        value: studioAlias(refGroup, step),
        type: 'color',
        description,
      }
    }

    result[group] = tokens
  }

  return result
}

function writeJson(filename: string, data: ColorExport) {
  writeFileSync(join(outputDir, filename), `${JSON.stringify(data, null, 2)}\n`, 'utf-8')
  console.log(`  ⇢ ${filename}`)
}

mkdirSync(outputDir, { recursive: true })

console.log('')
console.log('Exporting unocss-preset colors...')
console.log('')

for (const mode of modes) {
  writeJson(`${mode}.json`, exportMode(mode))
}

writeJson('tokens.json', exportTokens())

console.log('')
console.log('Done.')
console.log('')
