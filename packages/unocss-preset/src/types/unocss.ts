import type {
  PresetWind4Theme as Theme,
  Preflight as UnoPreflight,
  Rule as UnoRule,
  Variant as UnoVariant,
  UserShortcuts,
} from 'unocss'

type Rule = UnoRule<Theme>
type Variant = UnoVariant<Theme>
type Preflight = UnoPreflight<Theme>
type Shortcuts = UserShortcuts<Theme>

export type { Preflight, Rule, Shortcuts, Theme, Variant }
