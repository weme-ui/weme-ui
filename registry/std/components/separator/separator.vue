<script lang="ts" setup>
import type { SeparatorProps } from './separator.props'
import { reactiveOmit } from '@vueuse/core'
import { Separator } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import { useSeparatorStyle } from './separator.style'

const props = withDefaults(defineProps<SeparatorProps>(), {
  variant: 'solid',
  orientation: 'horizontal',
  size: 'xs',
  labelPlacement: 'center',
})

const delegated = reactiveOmit(props, 'class', 'ui', 'label', 'size', 'variant', 'labelPlacement')
const ui = computed(() => useSeparatorStyle({
  variant: props.variant,
  orientation: props.orientation,
  size: props.size,
  hasLabel: !!props.label,
}))
</script>

<template>
  <div v-if="label" :class="cn(ui.base(), props.ui?.base, props.class)">
    <Separator v-if="labelPlacement !== 'start'" v-bind="delegated" :class="cn(ui.separator({ labelPlacement: 'end' }), props.ui?.separator)" />
    <span :class="cn(ui.label(), props.ui?.label)">
      {{ label }}
    </span>
    <Separator v-if="labelPlacement !== 'end'" v-bind="delegated" :class="cn(ui.separator({ labelPlacement: 'start' }), props.ui?.separator)" />
  </div>
  <Separator v-else v-bind="delegated" :class="cn(ui.separator(), props.ui?.separator, props.class)" />
</template>
