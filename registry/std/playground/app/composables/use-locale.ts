import type { InjectionKey, Ref } from 'vue'
import type { Locale, LocaleMessages } from '~/types/locale'
import { createSharedComposable } from '@vueuse/core'
import { computed, inject, toRef } from 'vue'
import en from '~/locales/en'
import { buildLocaleContext } from '~/utils/locale'

export const localeContextInjectionKey: InjectionKey<Ref<Locale<unknown> | undefined>> = Symbol.for('weme-ui.locale-context')

function _useLocale(localeOverrides?: Ref<Locale<LocaleMessages> | undefined>) {
  const locale = localeOverrides || toRef(inject<Locale<LocaleMessages>>(localeContextInjectionKey, en))

  return buildLocaleContext<LocaleMessages>(computed(() => locale.value || en))
}

export const useLocale = /* @__PURE__ */ import.meta.client ? createSharedComposable(_useLocale) : _useLocale
