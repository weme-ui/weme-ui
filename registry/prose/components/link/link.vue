<script lang="ts" setup>
import type { LinkProps } from './link.props'
import { reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import { useLinkStyle } from './link.style'

const props = withDefaults(defineProps<LinkProps>(), {
  as: 'a',
  color: 'primary',
  variant: 'plain',
})

const delegated = reactivePick(props, 'as', 'asChild')
const ui = computed(() => useLinkStyle(props))
</script>

<template>
  <Primitive v-bind="{ ...delegated, ...$attrs }" :class="cn(ui.base(), props.ui?.base, props.class)">
    <slot />
  </Primitive>
</template>
