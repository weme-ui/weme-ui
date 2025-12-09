<script lang="ts" setup>
import type { EmProps } from './em.props'
import { reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import { useEmStyle } from './em.style'

const props = withDefaults(defineProps<EmProps>(), {
  as: 'em',
})
const delegated = reactivePick(props, 'as', 'asChild')
const ui = computed(() => useEmStyle(props))
</script>

<template>
  <Primitive v-bind="delegated" :class="cn(ui.base(), props.ui?.base, props.class)">
    <slot />
  </Primitive>
</template>
