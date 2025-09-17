<script lang="ts" setup>
import type { TooltipContentProps } from 'reka-ui'
import type { TooltipEmits, TooltipProps } from './tooltip.props'
import { reactiveOmit, reactivePick } from '@vueuse/core'
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useTooltipStyle } from './tooltip.style'

const props = withDefaults(defineProps<TooltipProps>(), {
  radius: 'md',
  side: 'top',
  sideOffset: 6,
  showArrow: false,
  loading: false,
})

const emits = defineEmits<TooltipEmits>()

const providerProps = reactivePick(
  props,
  'delayDuration',
  'disableClosingTrigger',
  'disabled',
  'disableHoverableContent',
  'ignoreNonKeyboardFocus',
  'skipDelayDuration',
)

const rootProps = reactiveOmit(
  props,
  'class',
  'content',
  'ui',
  'radius',
  'showArrow',
  'loading',
  'side',
  'sideOffset',
  'skipDelayDuration',
)

const forwarded = useForwardPropsEmits(rootProps, emits)

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
  side: side.value,
  radius: props.radius,
}))
</script>

<template>
  <TooltipProvider v-bind="providerProps">
    <TooltipRoot v-bind="forwarded">
      <TooltipTrigger as="span" :class="cn(ui.base(), props.ui?.base)">
        <slot />
      </TooltipTrigger>

      <TooltipPortal>
        <TooltipContent
          v-bind="$attrs"
          :side="side"
          :align="align"
          :side-offset="sideOffset"
          :class="cn(ui.content(), props.class, props.ui?.content)"
        >
          <div class="flex-(~ center) gap-x-1.5">
            <Icon v-if="loading" name="loading" :class="cn(ui.loading(), props.ui?.loading)" />
            {{ content }}
          </div>

          <TooltipArrow v-show="showArrow" :class="cn(ui.arrow(), props.ui?.arrow)" />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>
