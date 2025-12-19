<script lang="ts" setup>
import type { TooltipContentProps } from 'reka-ui'
import type { TooltipEmits, TooltipProps } from './tooltip.props'
import { reactivePick } from '@vueuse/core'
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipRoot, TooltipTrigger, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useTooltipStyle } from './tooltip.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TooltipProps>(), {
  side: 'top',
  radius: 'md',
  loading: false,
  triggerProps: () => ({ asChild: true }),
  contentProps: () => ({ sideOffset: 8, collisionPadding: 8 }),
})

const emits = defineEmits<TooltipEmits>()
const delegated = reactivePick(props, 'defaultOpen', 'open', 'disabled', 'delayDuration', 'disableHoverableContent', 'disableClosingTrigger', 'ignoreNonKeyboardFocus')
const forwarded = useForwardPropsEmits(delegated, emits)

const side = computed(() => {
  if (props.side.includes('-')) {
    return props.side.split('-')[0] as TooltipContentProps['side']
  }

  return props.side as TooltipContentProps['side']
})

const align = computed(() => {
  if (props.side.includes('-')) {
    return props.side.split('-')[1] === 'left' ? 'end' : 'start'
  }

  return 'center'
})

const ui = computed(() => useTooltipStyle({
  radius: props.radius,
}))
</script>

<template>
  <TooltipRoot v-slot="{ open }" v-bind="forwarded">
    <TooltipTrigger v-bind="triggerProps" :class="cn(ui.base(), props.ui?.base, props.class)">
      <slot :open="open" />
    </TooltipTrigger>

    <TooltipPortal v-bind="portalProps">
      <TooltipContent
        v-bind="{ ...contentProps, ...$attrs }"
        :side="side"
        :align="align"
        :class="cn(ui.content(), props.ui?.content)"
      >
        <div :class="cn(ui.contentWrapper(), props.ui?.contentWrapper)">
          <Icon v-if="loading" name="loading" :class="cn(ui.loading(), props.ui?.loading)" />
          <slot name="content">
            {{ content }}
          </slot>
        </div>

        <TooltipArrow
          v-if="!!arrow"
          v-bind="typeof arrow === 'object' ? arrow : undefined"
          :class="cn(ui.arrow(), props.ui?.arrow)"
        />
      </TooltipContent>
    </TooltipPortal>
  </TooltipRoot>
</template>
