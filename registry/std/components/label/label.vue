<script lang="ts" setup>
import type { LabelProps } from './label.props'
import { reactiveOmit } from '@vueuse/core'
import { Label } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import { useLabelStyle } from './label.style'

const props = defineProps<LabelProps>()
const delegated = reactiveOmit(props, 'class', 'ui', 'hint')

const ui = computed(() => useLabelStyle())
</script>

<template>
  <Label v-bind="delegated" :class="cn(ui.root(), props.ui?.root, props.class)" data-slot="label">
    <slot />
    <span v-if="!!$slots.hint || !!hint" :class="cn(ui.hint(), props.ui?.hint)" data-slot="label-hint">
      <slot name="hint">
        {{ hint }}
      </slot>
    </span>
  </Label>
</template>
