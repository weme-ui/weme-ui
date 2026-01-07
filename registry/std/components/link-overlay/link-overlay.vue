<script lang="ts" setup>
import type { LinkOverlayProps } from './link-overlay.props'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import { useLinkOverlayStyle } from './link-overlay.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<LinkOverlayProps>(), { as: 'a' })
const ui = computed(() => useLinkOverlayStyle(props))
</script>

<template>
  <Primitive :as="as" :as-child="asChild" data-slot="link-overlay" v-bind="{ ...$attrs }" :class="cn(ui.base(), props.ui?.base, props.class)">
    <slot />
  </Primitive>
</template>
