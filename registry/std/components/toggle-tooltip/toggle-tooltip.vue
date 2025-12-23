<script lang="ts" setup>
import type { PopoverArrowProps, PopoverContentProps } from 'reka-ui'
import type { ToggleTooltipEmits, ToggleTooltipProps } from './toggle-tooltip.props'
import { reactivePick } from '@vueuse/core'
import { defu } from 'defu'
import { PopoverArrow, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger, useForwardPropsEmits } from 'reka-ui'
import { computed, toRef } from 'vue'
import { usePortal } from '~/composables/use-portal'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useToggleTooltipStyle } from './toggle-tooltip.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ToggleTooltipProps>(), {
  side: 'top',
  radius: 'md',
  loading: false,
})

const emits = defineEmits<ToggleTooltipEmits>()
const delegated = reactivePick(props, 'defaultOpen', 'modal', 'open')
const forwarded = useForwardPropsEmits(delegated, emits)

const contentProps = toRef(() => defu(props.content, { sideOffset: 8, collisionPadding: 8 }) as PopoverContentProps)
const portalProps = usePortal(toRef(props, 'portal'))
const arrowProps = toRef(() => props.arrow as PopoverArrowProps)

const side = computed(() => {
  if (props.side.includes('-')) {
    return props.side.split('-')[0] as PopoverContentProps['side']
  }
  return props.side as PopoverContentProps['side']
})

const align = computed(() => {
  if (props.side.includes('-')) {
    return props.side.split('-')[1] === 'left' ? 'end' : 'start'
  }
  return 'center'
})

const ui = computed(() => useToggleTooltipStyle(props))
</script>

<template>
  <PopoverRoot v-slot="{ open }" v-bind="forwarded">
    <PopoverTrigger :class="cn(ui.trigger(), props.ui?.trigger, props.class)" as-child>
      <slot :open="open" />
    </PopoverTrigger>

    <PopoverPortal v-bind="portalProps">
      <PopoverContent
        v-bind="{ ...contentProps, ...$attrs }"
        :side="side"
        :align="align"
        :class="cn(ui.content(), props.ui?.content)"
      >
        <div :class="cn(ui.contentWrapper(), props.ui?.contentWrapper)">
          <Icon v-if="loading" name="loading" :class="cn(ui.loading(), props.ui?.loading)" />
          <slot name="content" :open="open">
            {{ text }}
          </slot>
        </div>

        <PopoverArrow
          v-if="!!arrow"
          v-bind="arrowProps"
          :class="cn(ui.arrow(), props.ui?.arrow)"
          :rounded="radius !== 'none'"
        />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
