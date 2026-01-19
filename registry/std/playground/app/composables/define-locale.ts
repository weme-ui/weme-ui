import type { Locale, LocaleDirection } from '~/types/locale'
import type { DeepPartial } from '~/types/utils'
import { defu } from 'defu'

interface DefineLocaleOptions<M> {
  name: string
  code: string
  timezone: string
  dir?: LocaleDirection
  messages: M
}

/* @__NO_SIDE_EFFECTS__ */
export function defineLocale<M>(options: DefineLocaleOptions<M>) {
  return defu<DefineLocaleOptions<M>, [{ dir: LocaleDirection }]>(options, { dir: 'ltr' })
}

/* @__NO_SIDE_EFFECTS__ */
export function extendLocale<M>(locale: Locale<M>, options: Partial<DefineLocaleOptions<DeepPartial<M>>>): Locale<M> {
  return defu<Locale<M>, [DefineLocaleOptions<M>]>(options, locale)
}
