<script lang="ts" setup>
import type { LinkProps } from './link.props'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import { useLinkStyle } from './link.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<LinkProps>(), {
  color: 'primary',
  ariaCurrentValue: 'page',
  activeClass: '',
  inactiveClass: '',
  disabled: false,
})

const ui = computed(() => useLinkStyle(props))
</script>

<template>
  <NuxtLink v-bind="{ ...$attrs }" :class="cn(ui, props.class)">
    <slot>{{ text }}</slot>
  </NuxtLink>
</template>
