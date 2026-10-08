<script lang="ts" setup>
import type { ButtonGroupEmits, ButtonGroupProps } from './button-group.props'
import { reactivePick } from '@vueuse/core'
import { RovingFocusGroup, RovingFocusItem, useForwardPropsEmits } from 'reka-ui'
import { computed, useSlots } from 'vue'
import { getChildrenSlots, toBoolAriaValue, toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import { useButtonGroupStyle } from './button-group.style'

const props = withDefaults(defineProps<ButtonGroupProps>(), { orientation: 'horizontal', gap: 'md', variant: 'outline' })
const emits = defineEmits<ButtonGroupEmits>()
const delegated = reactivePick(props, 'as', 'currentTabStopId', 'defaultCurrentTabStopId', 'dir', 'loop', 'orientation', 'defaultCurrentTabStopId')
const forwarded = useForwardPropsEmits(delegated, emits)

const slots = useSlots()
const children = computed(() => {
  return getChildrenSlots(slots.default?.())
})

const ui = computed(() => useButtonGroupStyle({
  orientation: props.orientation,
  gap: props.gap,
  separator: toBoolValue(props.separator),
  disabled: toBoolValue(props.disabled),
}))
</script>

<template>
  <RovingFocusGroup
    v-bind="forwarded"
    role="group"
    data-slot="button-group"
    :aria-orientation="orientation"
    :aria-disabled="toBoolAriaValue(disabled)"
    :class="cn(ui.root(), props.ui?.root, props.class)"
  >
    <template v-for="(child, index) in children" :key="index">
      <RovingFocusItem :focusable="!disabled && !child.props?.disabled" as-child>
        <component
          :is="child"
          :data-order="index === 0 ? 'first' : index === children.length - 1 ? 'last' : 'between'"
          :size="size"
          :variant="variant ?? child.props?.variant"
          :radius="radius"
          :disabled="child.props?.disabled ?? disabled"
          :scalable="gap !== 'none'"
          :class="cn(ui.item(), props.ui?.item)"
        />
      </RovingFocusItem>
      <template v-if="separator && index < children.length - 1">
        <div :class="cn(ui.separator(), props.ui?.separator)" />
      </template>
    </template>
  </RovingFocusGroup>
</template>
