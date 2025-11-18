<script lang="ts" setup>
import type { KbdProps } from './kbd.props'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { useKbd } from '~/composables/use-kbd'
import { cn } from '~/utils/styles'
import { useKbdStyle } from './kbd.style'

const props = withDefaults(defineProps<KbdProps>(), {
  as: 'kbd',
  color: 'accent',
  variant: 'soft',
  size: 'md',
  radius: 'sm',
})

const { getKbdKey } = useKbd()
const ui = computed(() => useKbdStyle(props))
</script>

<template>
  <Primitive :as :class="cn(ui, props.class)">
    <slot>{{ getKbdKey(value) }}</slot>
  </Primitive>
</template>
