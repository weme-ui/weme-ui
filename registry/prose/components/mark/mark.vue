<script lang="ts" setup>
import type { MarkProps } from './mark.props'
import { reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import { useMarkStyle } from './mark.style'

const props = withDefaults(defineProps<MarkProps>(), {
  as: 'mark',
  color: 'primary',
  variant: 'solid',
  radius: 'md',
})

const delegated = reactivePick(props, 'as', 'asChild')
const ui = computed(() => useMarkStyle(props))
</script>

<template>
  <Primitive v-bind="delegated" :class="cn(ui.base(), props.ui?.base, props.class)">
    <slot />
  </Primitive>
</template>
