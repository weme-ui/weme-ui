<script lang="ts" setup>
import type { IconButtonProps } from './icon-button.props'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Button from '../button/button.vue'
import { useIconButtonStyle } from './icon-button.style'

const props = withDefaults(defineProps<IconButtonProps>(), {
  size: 'md',
})

const delegated = reactiveOmit(props, 'class', 'ui')
const ui = computed(() => useIconButtonStyle({
  size: props.size,
}))
</script>

<template>
  <Button
    v-bind="delegated"
    :class="cn(ui.root(), props.ui?.root, props.class)"
    :ui="{
      icon: ui.icon(),
      loading: ui.loading(),
    }"
  />
</template>
