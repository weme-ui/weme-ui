<script lang="ts" setup>
import type { ButtonProps } from './button.props'
import { useMousePressed } from '@vueuse/core'
import { computed, ref, toRef, useTemplateRef } from 'vue'
import { toBoolDataAttrValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useButtonStyle } from './button.style'

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'button',
  loadingIcon: 'ri:loader-line',
})

const buttonRef = useTemplateRef<HTMLButtonElement>('buttonRef')
const { pressed } = useMousePressed({ target: buttonRef })

const loadingState = ref(false)
const isLoading = toRef(() => !!props.loading || loadingState.value)
const isDisabled = toRef(() => !!props.disabled || isLoading.value)

const ui = computed(() => useButtonStyle({
  variant: props.variant,
  size: props.size,
  radius: props.radius,
  disabled: isDisabled.value,
  loading: isLoading.value,
}))

async function handleClick(event: MouseEvent) {
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
  <button
    ref="buttonRef"
    :data-pressed="toBoolDataAttrValue(pressed)"
    :type="type"
    :disabled="isDisabled"
    :class="cn(ui.root(), props.ui?.root, props.class)"
    @click="handleClick"
  >
    <template v-if="isLoading">
      <slot name="loading-icon" :loading-icon="loadingIcon">
        <Icon :name="loadingIcon" :class="cn(ui.icon(), props.ui?.icon)" />
      </slot>
      <span v-if="loadingText || label" :class="cn(ui.label(), props.ui?.label)">
        <slot name="loading-text" :label="label" :loading-text="loadingText">
          {{ loadingText || label }}
        </slot>
      </span>
    </template>
    <template v-else>
      <slot name="icon" :icon="icon">
        <Icon v-if="props.icon" :name="props.icon" :class="cn(ui.icon(), props.ui?.icon)" />
      </slot>
      <span v-if="props.label" :class="cn(ui.label(), props.ui?.label)">
        <slot name="label" :label="label">
          {{ props.label }}
        </slot>
      </span>
    </template>
  </button>
</template>
