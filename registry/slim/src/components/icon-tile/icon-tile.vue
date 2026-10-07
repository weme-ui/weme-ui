<script lang="ts" setup>
import type { IconTileProps } from './icon-tile.props'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useIconTileStyle } from './icon-tile.style'

const props = withDefaults(defineProps<IconTileProps>(), {
  as: 'span',
  color: 'neutral',
  variant: 'solid',
  size: 'md',
  radius: 'md',
})

const ui = computed(() => useIconTileStyle({
  color: props.color,
  variant: props.variant,
  size: props.size,
  radius: props.radius,
}))
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cn(ui.root(), props.ui?.root, props.class)" aria-hidden="true">
    <slot>
      <Icon v-if="icon" :name="icon" :class="cn(ui.icon(), props.ui?.icon)" />
    </slot>
  </Primitive>
</template>
