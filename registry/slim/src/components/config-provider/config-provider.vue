<script lang="ts" setup>
import type { ConfigProviderProps } from './config-provider.props'
import { ConfigProvider } from 'reka-ui'
import { useId } from 'vue'

const props = withDefaults(defineProps<ConfigProviderProps>(), {
  scrollBody: true,
  teleportTo: 'body',
  useId: () => useId(),
})
</script>

<template>
  <ConfigProvider v-bind="props">
    <slot />
  </ConfigProvider>
</template>
