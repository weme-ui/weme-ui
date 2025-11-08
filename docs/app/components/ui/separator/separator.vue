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
})

const delegated = reactiveOmit(props, 'class', 'ui', 'text')
const ui = computed(() => useSeparatorStyle(props))
</script>

<template>
  <Separator
    v-bind="delegated"
    :class="cn(ui.base(), props.class, props.ui?.base)"
  >
    <span v-if="text || $slots.default" :class="cn(ui.text(), props.ui?.text)">
      <slot>
        {{ text }}
      </slot>
    </span>
  </Separator>
</template>
