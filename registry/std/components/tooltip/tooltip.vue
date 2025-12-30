<script lang="ts" setup>
import type { TooltipContentProps } from 'reka-ui'
import type { TooltipEmits, TooltipProps } from './tooltip.props'
import { reactivePick } from '@vueuse/core'
import { defu } from 'defu'
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipRoot, TooltipTrigger, useForwardPropsEmits } from 'reka-ui'
import { computed, toRef } from 'vue'
import { usePortal } from '~/composables/use-portal'
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
})

const emits = defineEmits<TooltipEmits>()
const delegated = reactivePick(props, 'defaultOpen', 'open', 'disabled', 'delayDuration', 'disableHoverableContent', 'disableClosingTrigger', 'ignoreNonKeyboardFocus')
const forwarded = useForwardPropsEmits(delegated, emits)

const triggerProps = toRef(() => props.trigger)
const portalProps = usePortal(toRef(() => props.portal))
const contentProps = toRef(() => defu(props.content, { sideOffset: 8, collisionPadding: 8 }) as TooltipContentProps)

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
    <TooltipTrigger v-bind="triggerProps" :class="cn(ui.trigger(), props.ui?.trigger, props.class)" data-slot="tooltip-trigger">
      <slot :open="open" />
    </TooltipTrigger>

    <TooltipPortal v-bind="portalProps">
      <TooltipContent
        v-bind="{ ...contentProps, ...$attrs }"
        :side="side"
        :align="align"
        :class="cn(ui.content(), props.ui?.content)"
        data-slot="tooltip-content"
      >
        <div :class="cn(ui.contentWrapper(), props.ui?.contentWrapper)" data-slot="tooltip-content-wrapper">
          <Icon v-if="loading" name="loading" :class="cn(ui.loading(), props.ui?.loading)" />
          <slot name="content" v-bind="{ open }">
            {{ text }}
          </slot>
        </div>

        <TooltipArrow
          v-if="!!arrow"
          v-bind="typeof arrow === 'object' ? arrow : undefined"
          :class="cn(ui.arrow(), props.ui?.arrow)"
          :rounded="radius !== 'none'"
          data-slot="tooltip-arrow"
        />
      </TooltipContent>
    </TooltipPortal>
  </TooltipRoot>
</template>
