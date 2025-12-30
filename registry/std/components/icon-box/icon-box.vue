<script lang="ts" setup>
import type { IconBoxProps } from './icon-box.props'
import { reactiveOmit, reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useIconBoxStyle } from './icon-box.style'

const props = withDefaults(defineProps<IconBoxProps>(), {
  color: 'primary',
  variant: 'soft',
  radius: 'sm',
  size: 'md',
})

const rootProps = reactivePick(props, 'as', 'asChild')
const iconProps = reactiveOmit(props, 'as', 'asChild', 'ui', 'class')
const ui = computed(() => useIconBoxStyle(props))
</script>

<template>
  <Primitive v-bind="rootProps" :class="cn(ui.root(), props.ui?.root, props.class)" data-slot="icon-box">
    <slot>
      <Icon v-bind="iconProps" :class="cn(ui.icon(), props.ui?.icon)" />
    </slot>
  </Primitive>
</template>
