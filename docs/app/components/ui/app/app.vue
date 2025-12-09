<script lang="ts" setup>
import type { AppProps } from './app.props'
import { reactiveOmit } from '@vueuse/core'
import { ConfigProvider, TooltipProvider } from 'reka-ui'
import { toRef, useId } from 'vue'
import ToastProvider from '../toast/toast-provider.vue'

const props = withDefaults(defineProps<AppProps>(), {
  useId: () => useId(),
  toaster: null,
})

const configProviderProps = reactiveOmit(props, 'tooltip', 'toaster')
const tooltipProviderProps = toRef(() => props.tooltip)
const toastProviderProps = toRef(() => props.toaster)
</script>

<template>
  <ConfigProvider v-bind="configProviderProps">
    <TooltipProvider v-bind="tooltipProviderProps">
      <ToastProvider v-if="toaster !== null" v-bind="toastProviderProps">
        <slot />
      </ToastProvider>
      <slot v-else />
    </TooltipProvider>
  </ConfigProvider>
</template>
