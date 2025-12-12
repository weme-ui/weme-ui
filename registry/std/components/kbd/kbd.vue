<script lang="ts" setup>
import type { KbdProps } from './kbd.props'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { useKbd } from '~/composables/use-kbd'
import { cn } from '~/utils/styles'
import { useKbdStyle } from './kbd.style'

const props = withDefaults(defineProps<KbdProps>(), {
  as: 'kbd',
  color: 'primary',
  variant: 'soft',
  size: 'md',
  radius: 'sm',
})

const { getKbdKey } = useKbd()
const ui = computed(() => useKbdStyle(props))
</script>

<template>
  <Primitive :as="as" :class="cn(ui.base(), props.ui?.base, props.class)">
    <slot>{{ getKbdKey(value) }}</slot>
  </Primitive>
</template>
