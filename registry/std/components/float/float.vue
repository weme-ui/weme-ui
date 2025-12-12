<script lang="ts" setup>
import type { FloatProps } from './float.props'
import { reactiveOmit } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import { useFloatStyle } from './float.style'

const props = withDefaults(defineProps<FloatProps>(), { placement: 'top-end', offset: '0' })
const delegated = reactiveOmit(props, 'class', 'ui', 'offset', 'offsetX', 'offsetY', 'placement')
const ui = computed(() => useFloatStyle(props))
</script>

<template>
  <Primitive
    v-bind="delegated"
    :class="cn(ui.base(), props.ui?.base, props.class)"
    :style="{
      '--offset': offset,
      '--offset-y': `var(--offset, ${offsetY || offset})`,
      '--offset-x': `var(--offset, ${offsetX || offset})`,
    }"
  >
    <slot />
  </Primitive>
</template>
