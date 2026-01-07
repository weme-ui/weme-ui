<script lang="ts" setup>
import type { StatusProps } from './status.props'
import { reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import { useStatusStyle } from './status.style'

const props = withDefaults(defineProps<StatusProps>(), {
  as: 'span',
  color: 'primary',
  size: 'sm',
  animate: false,
})

const delegated = reactivePick(props, 'as', 'asChild')
const animate = computed(() => toBoolValue(props.animate))
const ui = computed(() => useStatusStyle({
  ...props,
  animate: animate.value,
}))
</script>

<template>
  <Primitive v-bind="delegated" data-slot="status" :class="cn(ui.root(), props.ui?.root, props.class)">
    <span v-if="!!animate" data-slot="status-wrapper" :class="cn(ui.wrapper(), props.ui?.wrapper)">
      <span data-slot="status-indicator" :class="cn(ui.indicator(), props.ui?.indicator)" />
    </span>
    <span v-else data-slot="status-indicator" :class="cn(ui.indicator(), props.ui?.indicator)" />
    <span v-if="!!$slots.default || !!label" data-slot="status-label" :class="cn(ui.label(), props.ui?.label)">
      <slot>{{ label }}</slot>
    </span>
  </Primitive>
</template>
