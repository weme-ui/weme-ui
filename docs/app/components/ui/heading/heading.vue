<script lang="ts" setup>
import type { HeadingProps } from './heading.props'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import { useHeadingStyle } from './heading.style'

const props = withDefaults(defineProps<HeadingProps>(), {
  as: 'h2',
  color: 'accent',
  weight: 'bold',
})

const ui = computed(() => useHeadingStyle({
  ...props,
  size: props.as,
}))
</script>

<template>
  <Primitive :as="as" :class="cn(ui, props.class)">
    <slot />
  </Primitive>
</template>
