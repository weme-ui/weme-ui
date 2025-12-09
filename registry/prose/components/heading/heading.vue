<script lang="ts" setup>
import type { HeadingProps } from './heading.props'
import { reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import { useHeadingStyle } from './heading.style'

const props = withDefaults(defineProps<HeadingProps>(), {
  as: 'h2',
  size: 'xl',
})
const delegated = reactivePick(props, 'as', 'asChild')
const ui = computed(() => useHeadingStyle(props))
</script>

<template>
  <Primitive v-bind="delegated" :class="cn(ui.base(), props.ui?.base, props.class)">
    <slot />
  </Primitive>
</template>
