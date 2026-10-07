<script lang="ts" setup>
import type { LinkOverlayProps } from './link-overlay.props'
import { Primitive } from 'reka-ui'
import { cn } from '~/utils/styles'
import { useLinkOverlayStyle } from './link-overlay.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<LinkOverlayProps>(), { as: 'a' })
const ui = useLinkOverlayStyle()
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...$attrs }"
    :class="cn(ui.base(), props.class)"
  >
    <slot />
  </Primitive>
</template>
