<script lang="ts" setup>
import type { HoverCardEmits, HoverCardProps } from './hover-card.props'
import { reactiveOmit } from '@vueuse/core'
import { HoverCardArrow, HoverCardContent, HoverCardPortal, HoverCardRoot, HoverCardTrigger, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import { useHoverCardStyle } from './hover-card.style'

const props = withDefaults(defineProps<HoverCardProps>(), {
  side: 'bottom',
  radius: 'lg',
  translucent: false,
  showArrow: false,
})

const emits = defineEmits<HoverCardEmits>()

const delegated = reactiveOmit(props, 'class', 'ui', 'side', 'radius', 'translucent', 'portal', 'content', 'asChild')
const forwarded = useForwardPropsEmits(delegated, emits)

const contentProps = computed(() => ({
  ...props.content,
  side: props.side,
  sideOffset: props.content?.sideOffset ?? 6,
}))

const ui = computed(() => useHoverCardStyle(props))
</script>

<template>
  <HoverCardRoot v-bind="forwarded">
    <HoverCardTrigger :class="cn(ui.trigger(), props.ui?.trigger)" :as-child="asChild">
      <slot name="trigger" :open="open" />
    </HoverCardTrigger>

    <HoverCardPortal v-bind="portal">
      <HoverCardContent v-bind="contentProps" :class="cn(ui.base(), props.class, props.ui?.base)">
        <slot />

        <HoverCardArrow v-if="showArrow" :class="cn(ui.arrow(), props.ui?.arrow)" />
      </HoverCardContent>
    </HoverCardPortal>
  </HoverCardRoot>
</template>
