<script lang="ts" setup>
import type { ToggleEmits, ToggleProps } from './toggle.props'
import { reactiveOmit } from '@vueuse/core'
import { Toggle, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useToggleStyle } from './toggle.style'

const props = withDefaults(defineProps<ToggleProps>(), {
  color: 'accent',
  orientation: 'horizontal',
  radius: 'sm',
  size: 'sm',
  loading: false,
})

const emits = defineEmits<ToggleEmits>()

const delegated = reactiveOmit(props, 'class', 'icon', 'text', 'color', 'orientation', 'radius', 'size', 'loading')
const forwarded = useForwardPropsEmits(delegated, emits)

const ui = computed(() => useToggleStyle(props))
</script>

<template>
  <Toggle
    v-slot="{ modelValue, state, pressed, disabled }"
    v-bind="forwarded"
    :class="cn(ui, props.class)"
  >
    <slot v-bind="{ modelValue, state, pressed, disabled, loading }">
      <Icon v-if="loading" name="loading" class="animate-spin" />
      <Icon v-else-if="icon" :name="icon" />
      <span v-if="text">{{ text }}</span>
    </slot>
  </Toggle>
</template>
