<script lang="ts" setup>
import type { BadgeProps } from './badge.props'
import { reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useBadgeStyle } from './badge.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<BadgeProps>(), {
  color: 'primary',
  variant: 'soft',
  size: 'sm',
  radius: 'sm',
  disabled: false,
  clickable: false,
})

const delegated = reactivePick(props, 'href', 'target', 'rel')
const tag = computed(() => props.href ? 'a' : 'span')
const ui = computed(() => useBadgeStyle({
  ...props,
  disabled: toBoolValue(props.disabled),
  clickable: toBoolValue(props.clickable),
}))
</script>

<template>
  <Primitive v-bind="delegated" :as="tag" :class="cn(ui.base(), props.ui?.base, props.class)">
    <slot v-if="$slots.icon || icon" name="icon">
      <Icon v-if="icon" :name="icon" :class="cn(ui.icon(), props.ui?.icon)" />
    </slot>
    <slot>{{ label }}</slot>
  </Primitive>
</template>
