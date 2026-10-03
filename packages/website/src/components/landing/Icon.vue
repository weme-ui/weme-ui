<script setup lang="ts">
import type { IconifyIcon } from '@iconify/types'
import { Icon as IconifyIconComponent } from '@iconify/vue'

withDefaults(defineProps<{
  icon: IconifyIcon | string
  width?: string | number
  height?: string | number
  label?: string
}>(), {
  width: '1em',
  height: '1em',
})
</script>

<template>
  <IconifyIconComponent
    :icon="icon"
    :width="width"
    :height="height"
    :ssr="true"
    :aria-hidden="label ? undefined : true"
    :aria-label="label"
    role="img"
  />
</template>
