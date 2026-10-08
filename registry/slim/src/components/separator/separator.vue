<script lang="ts" setup>
import type { SeparatorProps } from './separator.props'
import { reactiveOmit } from '@vueuse/core'
import { Separator } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import { useSeparatorStyle } from './separator.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SeparatorProps>(), {
  color: 'base',
  variant: 'solid',
  orientation: 'horizontal',
  labelPosition: 'center',
})

const delegated = reactiveOmit(props, 'class', 'ui', 'label', 'color', 'variant', 'labelPosition')

const labelPosition = computed(
  () => props.labelPosition !== 'none'
    ? props.label ? props.labelPosition : 'none'
    : props.labelPosition,
)

const ui = computed(() => useSeparatorStyle({
  color: props.color,
  variant: props.variant,
  orientation: props.orientation,
  labelPosition: labelPosition.value,
}))
</script>

<template>
  <div v-if="label" v-bind="$attrs" :class="cn(ui.root(), props.ui?.root, props.class)">
    <Separator
      v-if="labelPosition !== 'start'"
      v-bind="delegated"
      :class="cn(ui.line({ labelPosition: 'end' }), props.ui?.line)"
    />
    <span :class="cn(ui.label(), props.ui?.label)">
      {{ label }}
    </span>
    <Separator
      v-if="labelPosition !== 'end'"
      v-bind="delegated"
      :class="cn(ui.line({ labelPosition: 'start' }), props.ui?.line)"
    />
  </div>
  <Separator
    v-else
    v-bind="{ ...delegated, ...$attrs }"
    :class="cn(ui.line(), props.ui?.line, props.class)"
  />
</template>
