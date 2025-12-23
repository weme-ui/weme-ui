<script lang="ts" setup generic="T extends LocaleMessages">
import type { AppProps } from './app.props'
import type { LocaleMessages } from '~/types/locale'
import { reactivePick } from '@vueuse/core'
import { ConfigProvider, TooltipProvider } from 'reka-ui'
import { provide, toRef, useId } from 'vue'
import { localeContextInjectionKey } from '~/composables/use-locale'
import { portalContextInjectKey } from '~/composables/use-portal'
import ToastProvider from '../toast/toast-provider.vue'

const props = withDefaults(defineProps<AppProps<T>>(), {
  scrollBody: true,
  portal: 'body',
  useId: () => useId(),
})

const configProviderProps = reactivePick(props, 'scrollBody')
const tooltipProviderProps = toRef(() => props.tooltip)
const toastProviderProps = toRef(() => props.toast)

const locale = toRef(() => props.locale)
provide(localeContextInjectionKey, locale)

const portal = toRef(() => props.portal)
provide(portalContextInjectKey, portal)
</script>

<template>
  <ConfigProvider
    v-bind="configProviderProps"
    :use-id="useId"
    :dir="dir || locale?.dir"
    :locale="locale?.code"
  >
    <TooltipProvider v-bind="tooltipProviderProps">
      <ToastProvider v-if="toast !== null" v-bind="toastProviderProps">
        <slot />
      </ToastProvider>
      <template v-else>
        <slot />
      </template>
    </TooltipProvider>
  </ConfigProvider>
</template>
