<script lang="ts" setup>
import type { LinkProps } from './link.props'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import { useLinkStyle } from './link.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<LinkProps>(), {
  color: 'accent',
  ariaCurrentValue: 'page',
  activeClass: '',
  inactiveClass: '',
  disabled: false,
})

const delegated = reactiveOmit(props, 'class', 'color', 'text', 'prefetch')

const ui = computed(() => useLinkStyle(props))
</script>

<template>
  <NuxtLink
    v-bind="{ ...delegated, ...$attrs }"
    :class="cn(ui, props.class)"
  >
    <slot>{{ text }}</slot>
  </NuxtLink>
</template>
