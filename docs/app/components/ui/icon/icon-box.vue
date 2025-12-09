<script lang="ts" setup>
import type { IconBoxProps } from './icon-box.props'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import { useIconBoxStyle } from './icon-box.style'
import Icon from './icon.vue'

const props = withDefaults(defineProps<IconBoxProps>(), {
  color: 'primary',
  variant: 'soft',
  radius: 'sm',
  size: 'md',
})
const ui = computed(() => useIconBoxStyle(props))
</script>

<template>
  <Primitive :as="as" :class="cn(ui.base(), props.class, props.ui?.base)">
    <slot>
      <Icon :name="name" :mode="mode" :class="cn(ui.icon(), props.ui?.icon)" />
    </slot>
  </Primitive>
</template>
