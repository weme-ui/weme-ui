<script lang="ts" setup>
import type { ButtonProps } from './button.props'
import { reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed, ref } from 'vue'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useButtonStyle } from './button.style'

const props = withDefaults(defineProps<ButtonProps>(), {
  as: 'button',
  type: 'button',
  loadingIcon: 'loading',
  color: 'primary',
  variant: 'solid',
  size: 'md',
  radius: 'sm',
  disabled: false,
  loading: false,
})

const loadingState = ref(false)
const isLoading = computed(() => !!props.loading || loadingState.value)
const isDisabled = computed(() => !!props.disabled || isLoading.value)
const delegated = reactivePick(props, 'as', 'asChild', 'type')

const ui = computed(() => useButtonStyle({
  ...props,
  disabled: toBoolValue(isDisabled.value),
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
    data-slot="root"
    :disabled="isDisabled"
    :class="cn(ui.root(), props.ui?.root, props.class)"
    @click="onClick"
  >
    <template v-if="isLoading">
      <Icon data-slot="loading" :name="loadingIcon" :class="cn(ui.icon(), ui.loading(), props.ui?.loading)" />
      {{ loadingText || label }}
    </template>
    <template v-else>
      <Icon v-if="icon" data-slot="icon" :name="icon" :class="cn(ui.icon(), props.ui?.icon)" />
      <slot>{{ label }}</slot>
    </template>
  </Primitive>
</template>
