<script lang="ts" setup>
import type { BadgeProps } from './badge.props'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import LinkOverlay from '../link-overlay/link-overlay.vue'
import { useBadgeStyle } from './badge.style'

const props = withDefaults(defineProps<BadgeProps>(), {
  color: 'primary',
  variant: 'soft',
  size: 'sm',
  radius: 'sm',
  disabled: false,
  clickable: false,
})

const clickable = computed(() => !!props.href)

const ui = computed(() => useBadgeStyle({
  ...props,
  disabled: toBoolValue(props.disabled),
  clickable: clickable.value,
}))
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cn(ui.root(), props.ui?.root, props.class)" data-slot="root">
    <slot v-if="$slots.icon || icon" name="icon">
      <Icon v-if="icon" :name="icon" :class="cn(ui.icon(), props.ui?.icon)" data-slot="icon" />
    </slot>
    <slot>{{ label }}</slot>
    <LinkOverlay v-if="clickable && !disabled" :href="href" :target="target" :rel="rel" data-slot="link-overlay" />
  </Primitive>
</template>
