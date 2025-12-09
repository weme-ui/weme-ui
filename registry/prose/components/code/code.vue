<script lang="ts" setup>
import type { CodeProps } from './code.props'
import { reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import { useCodeStyle } from './code.style'

const props = withDefaults(defineProps<CodeProps>(), {
  as: 'code',
  color: 'primary',
  variant: 'soft',
  size: 'sm',
  radius: 'sm',
})

const delegated = reactivePick(props, 'as', 'asChild')
const ui = computed(() => useCodeStyle(props))
</script>

<template>
  <Primitive v-bind="delegated" :class="cn(ui.base(), props.ui?.base, props.class)">
    <slot />
  </Primitive>
</template>
