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
  <Primitive v-bind="delegated" :class="cn(ui.base(), props.ui?.base, props.class)">
    <span v-if="animate" :class="cn(ui.wrapper(), props.ui?.wrapper)">
      <span :class="cn(ui.indicator(), props.ui?.indicator)" />
    </span>
    <span v-else :class="cn(ui.indicator(), props.ui?.indicator)" />
    <span v-if="$slots.default || label" :class="cn(ui.label(), props.ui?.label)">
      <slot>{{ label }}</slot>
    </span>
  </Primitive>
</template>
