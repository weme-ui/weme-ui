<script lang="ts" setup>
import type { RadioGroupEmits, RadioGroupProps, RadioItem } from './radio-group.props'
import { reactivePick } from '@vueuse/core'
import { RadioGroupIndicator, RadioGroupItem, RadioGroupRoot, useForwardPropsEmits, VisuallyHidden } from 'reka-ui'
import { computed, useId } from 'vue'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import { useRadioGroupStyle } from './radio-group.style'

const props = withDefaults(defineProps<RadioGroupProps>(), {
  color: 'accent',
  variant: 'normal',
  orientation: 'vertical',
  align: 'start',
  radius: 'sm',
  size: 'md',
  indicator: 'start',
})

const emits = defineEmits<RadioGroupEmits>()
const delegated = reactivePick(props, 'as', 'asChild', 'defaultValue', 'dir', 'disabled', 'loop', 'modelValue', 'name', 'orientation', 'required')
const forwarded = useForwardPropsEmits(delegated, emits)

const ui = computed(() => useRadioGroupStyle({
  ...props,
  fill: toBoolValue(props.fill),
}))

const id = props.name ?? useId()
const items = computed(() => props.items?.map(item => ({
  ...item,
  id: item.id ?? `${id}-${item.value}`,
} as RadioItem)))

const indicator = computed(() =>
  props.variant === 'capsule'
    ? 'none'
    : props.indicator,
)
</script>

<template>
  <RadioGroupRoot
    v-bind="forwarded"
    :class="ui.base({ class: cn(props.class, props.ui?.base) })"
    @update:model-value="emits('change', $event)"
  >
    <template v-for="item in items" :key="item.id">
      <RadioGroupItem v-slot="{ checked }" v-bind="item" :class="ui.item({ class: props.ui?.item })">
        <div v-if="indicator === 'start'" :class="ui.indicatorWrapper({ class: props.ui?.indicatorWrapper })">
          <RadioGroupIndicator :class="ui.indicator({ class: props.ui?.indicator })" />
        </div>

        <div v-if="$slots.leading" :class="ui.leading({ class: props.ui?.leading })">
          <slot name="leading" v-bind="{ item, checked }" />
        </div>

        <div :class="ui.wrapper({ class: props.ui?.wrapper })">
          <label v-if="item.label || $slots.label" :class="ui.label({ class: props.ui?.label })">
            <slot name="label" v-bind="{ item, checked }">
              {{ item.label }}
            </slot>
          </label>

          <p v-if="item.description || $slots.description" :class="ui.description({ class: props.ui?.description })">
            <slot name="description" v-bind="{ item, checked }">
              {{ item.description }}
            </slot>
          </p>
        </div>

        <div v-if="$slots.trailing" :class="ui.trailing({ class: props.ui?.trailing })">
          <slot name="trailing" v-bind="{ item, checked }" />
        </div>

        <div v-if="indicator === 'end'" :class="ui.indicatorWrapper({ class: props.ui?.indicatorWrapper })">
          <RadioGroupIndicator :class="ui.indicator({ class: props.ui?.indicator })" />
        </div>

        <VisuallyHidden v-else-if="indicator === 'none'">
          <RadioGroupIndicator class="sr-only" />
        </VisuallyHidden>
      </RadioGroupItem>
    </template>
  </RadioGroupRoot>
</template>
