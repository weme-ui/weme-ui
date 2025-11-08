<script lang="ts" setup>
import type { TooltipContentProps } from 'reka-ui'
import type { TooltipEmits, TooltipProps } from './tooltip.props'
import { reactiveOmit } from '@vueuse/core'
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipRoot, TooltipTrigger, useForwardPropsEmits } from 'reka-ui'
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

const delegated = reactiveOmit(props, 'class', 'content', 'ui', 'radius', 'showArrow', 'loading', 'side', 'sideOffset', 'skipDelayDuration')
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
  side: side.value,
  radius: props.radius,
}))
</script>

<template>
  <TooltipRoot v-bind="forwarded">
    <TooltipTrigger v-bind="$attrs" :class="cn(ui.base(), props.ui?.base, props.class)" as-child>
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
</template>
