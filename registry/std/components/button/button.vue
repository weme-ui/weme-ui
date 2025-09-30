<script lang="ts" setup>
import type { ButtonProps } from './button.props'
import { reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useButtonStyle } from './button.style'

const props = withDefaults(defineProps<ButtonProps>(), {
  as: 'button',
  type: 'button',
  color: 'accent',
  variant: 'solid',
  size: 'md',
  radius: 'sm',
  loading: false,
  disabled: false,
  square: false,
})

const slots = useSlots()

const loadingState = ref(false)
const isLoading = computed(() => !!props.loading || loadingState.value)
const isDisabled = computed(() => !!props.disabled || isLoading.value)
const isSquare = computed(() => props.square || (!(props.text || slots.default?.()) && !!props.icon))

const delegated = reactivePick(props, 'as', 'asChild', 'type')

const ui = computed(() => useButtonStyle({
  ...props,
  loading: isLoading.value,
  disabled: isDisabled.value,
  square: isSquare.value,
}))

async function onClick(event: MouseEvent) {
  loadingState.value = true

  const callbacks = Array.isArray(props.onClick)
    ? props.onClick
    : [props.onClick]

  try {
    await Promise.all(callbacks.map(fn => fn?.(event)))
  }
  finally {
    loadingState.value = false
  }
}
</script>

<template>
  <Primitive
    v-bind="delegated"
    :disabled="isDisabled"
    :aria-disabled="isDisabled"
    :class="cn(ui.base(), props.class, props.ui?.base)"
    @click="onClick"
  >
    <Icon v-if="isLoading" name="loading" :class="cn(ui.icon(), ui.loading(), props.ui?.loading)" />
    <Icon v-else-if="icon" :name="icon" :class="cn(ui.icon(), props.ui?.icon)" />
    <slot>{{ text }}</slot>
  </Primitive>
</template>
