<script lang="ts" setup>
import type { SegmentedControlEmits, SegmentedControlItem, SegmentedControlProps } from './segmented-control.props'
import { reactivePick, useResizeObserver } from '@vueuse/core'
import { RovingFocusGroup, RovingFocusItem, useForwardExpose, useForwardPropsEmits } from 'reka-ui'
import { computed, ref, watch, watchPostEffect } from 'vue'
import { useFormField } from '~/composables/use-form-field'
import { toBoolDataAttrValue, toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useSegmentedControlStyle } from './segmented-control.style'

const props = withDefaults(defineProps<SegmentedControlProps>(), { orientation: 'horizontal', loop: true })
const emits = defineEmits<SegmentedControlEmits>()
const delegated = reactivePick(props, 'as', 'asChild', 'currentTabStopId', 'defaultCurrentTabStopId', 'dir', 'loop', 'orientation', 'preventScrollOnEntryFocus')
const forwarded = useForwardPropsEmits(delegated, emits)

const { forwardRef, currentElement } = useForwardExpose()
const { id, name, size, radius, disabled, required } = useFormField<SegmentedControlProps>(props)

const ui = computed(() => useSegmentedControlStyle({
  color: props.color,
  orientation: props.orientation,
  size: size.value,
  radius: radius.value,
  disabled: toBoolValue(disabled.value),
}))

const modelValue = defineModel<string>()
const indicatorStyle = ref<{ size: number | null, position: number | null }>({
  size: null,
  position: null,
})

const value = computed({
  get() {
    return modelValue.value ?? props.defaultValue
  },
  set(value) {
    modelValue.value = value
  },
})

const itemElements = ref<HTMLButtonElement[]>([])

watch(
  value,
  () => {
    updateIndicatorStyle()
  },
  { immediate: true, flush: 'post' },
)

watchPostEffect(() => {
  itemElements.value = Array.from(currentElement.value?.querySelectorAll<HTMLButtonElement>('[data-slot="segmented-control-item"]') || [])
})

useResizeObserver(itemElements, () => {
  updateIndicatorStyle()
})

function getState(val: string) {
  return val === value.value
    ? 'checked'
    : 'unchecked'
}

function updateIndicatorStyle() {
  const checkedItem = currentElement.value?.querySelector<HTMLButtonElement>('[data-state="checked"]')

  if (!checkedItem)
    return

  if (props.orientation === 'horizontal') {
    indicatorStyle.value = {
      size: checkedItem.offsetWidth,
      position: checkedItem.offsetLeft,
    }
  }
  else {
    indicatorStyle.value = {
      size: checkedItem.offsetHeight,
      position: checkedItem.offsetTop,
    }
  }
}

function handleSelect(item: SegmentedControlItem, e: Event) {
  if (item.disabled || disabled.value || value.value === item.value)
    return

  if (item.onSelect)
    item.onSelect(e)

  value.value = item.value
  emits('change', item.value)
}
</script>

<template>
  <RovingFocusGroup
    :id="id"
    :ref="forwardRef"
    v-bind="forwarded"
    data-slot="segmented-control"
    role="radiogroup"
    :name="name"
    :data-disabled="toBoolDataAttrValue(disabled)"
    :aria-orientation="orientation"
    :aria-disabled="disabled"
    :aria-required="required"
    :class="cn(ui.root(), props.ui?.root, props.class)"
  >
    <div
      v-if="typeof indicatorStyle.size === 'number'"
      data-slot="segmented-control-indicator"
      :data-orientation="orientation"
      :style="{
        '--segmented-control-indicator-size': `${indicatorStyle.size}px`,
        '--segmented-control-indicator-position': `${indicatorStyle.position}px`,
      }"
      :class="cn(ui.indicator(), props.ui?.indicator)"
    />
    <template v-for="(item, index) in items" :key="index">
      <RovingFocusItem
        :focusable="!disabled && !item.disabled"
        :active="value === item.value"
        as-child
      >
        <button
          data-slot="segmented-control-item"
          role="radio"
          type="button"
          :value="item.value"
          :aria-checked="getState(item.value) === 'checked'"
          :data-state="getState(item.value)"
          :data-disabled="toBoolDataAttrValue(item.disabled || disabled)"
          :disabled="item.disabled || disabled"
          :class="cn(ui.item(), props.ui?.item, item.class)"
          @mousedown.left="(event) => {
            if (!disabled && !item.disabled && event.ctrlKey === false) {
              handleSelect(item, event)
            }
            else {
              event.preventDefault()
            }
          }"
          @keydown.enter.space="handleSelect(item, $event)"
          @focus="handleSelect(item, $event)"
          @click="handleSelect(item, $event)"
        >
          <slot
            v-if="item.icon || !!$slots.icon"
            name="icon"
            v-bind="{ value, icon: item.icon, disabled: item.disabled, state: getState(item.value) }"
          >
            <Icon v-if="item.icon" :name="item.icon" :class="cn(ui.icon(), props.ui?.icon, item.ui?.icon)" />
          </slot>
          <span
            v-if="item.label || !!$slots.label"
            data-slot="segmented-control-item-label"
            :class="cn(ui.label(), props.ui?.label, item.ui?.label)"
          >
            <slot name="label" v-bind="{ value, label: item.label, disabled: item.disabled, state: getState(item.value) }">
              {{ item.label }}
            </slot>
          </span>
          <slot name="append" v-bind="{ value, disabled: item.disabled, state: getState(item.value) }" />
        </button>
      </RovingFocusItem>
    </template>
  </RovingFocusGroup>
</template>
