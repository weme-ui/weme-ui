<script lang="ts" setup>
import type { ButtonProps } from './button.props'
import { useMousePressed } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed, ref, toRef, useTemplateRef } from 'vue'
import { toBoolAriaValue, toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useButtonStyle } from './button.style'

const props = withDefaults(defineProps<ButtonProps>(), {
  as: 'button',
  type: 'button',
  loadingIcon: 'ri:loader-line',
  scalable: true,
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
  scalable: toBoolValue(props.scalable),
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
  <Primitive
    ref="buttonRef"
    data-slot="button"
    :as="as"
    :as-child="asChild"
    :type="type"
    :aria-pressed="toBoolAriaValue(pressed)"
    :aria-busy="toBoolAriaValue(isLoading)"
    :aria-disabled="toBoolAriaValue(isDisabled)"
    :tabindex="tabIndex || 0"
    :disabled="isDisabled"
    :class="cn(ui.root(), props.ui?.root, props.class)"
    @click="handleClick"
  >
    <template v-if="isLoading">
      <slot name="loading-icon" v-bind="{ loadingIcon }">
        <Icon :name="loadingIcon" :class="cn(ui.icon(), props.ui?.icon)" />
      </slot>
      <template v-if="loadingText || label">
        <slot name="loading-text" v-bind="{ label, loadingText }">
          {{ loadingText || label }}
        </slot>
      </template>
    </template>
    <template v-else>
      <slot name="icon" :icon="icon">
        <Icon v-if="icon" :name="icon" :class="cn(ui.icon(), props.ui?.icon)" />
      </slot>
      <slot :label="label">
        {{ label }}
      </slot>
    </template>
  </Primitive>
</template>
