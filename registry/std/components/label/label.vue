<script lang="ts" setup>
import type { LabelProps } from './label.props'
import { reactiveOmit } from '@vueuse/core'
import { Label } from 'reka-ui'
import { computed } from 'vue'
import { useLabelStyle } from './label.style'

const props = defineProps<LabelProps>()
const delegated = reactiveOmit(props, 'class', 'hint')

const ui = computed(() => useLabelStyle(props))
</script>

<template>
  <Label v-bind="delegated" :class="ui.base({ class: [props.class, props.ui?.base] })">
    <slot />
    <span v-if="hint || $slots.hint" :class="ui.hint({ class: props.ui?.hint })">
      <slot name="hint">
        {{ hint }}
      </slot>
    </span>
  </Label>
</template>
