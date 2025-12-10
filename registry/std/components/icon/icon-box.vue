<script lang="ts" setup>
import type { IconBoxProps } from './icon-box.props'
import { reactiveOmit } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import { useIconBoxStyle } from './icon-box.style'

const props = defineProps<IconBoxProps>()
const delegated = reactiveOmit(props, 'class', 'ui')

const ui = computed(() => useIconBoxStyle(props))
</script>

<template>
  <Primitive v-bind="delegated" :class="cn(ui.base(), props.ui?.base, props.class)">
    <slot />
  </Primitive>
</template>
