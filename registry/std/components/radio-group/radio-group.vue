<script lang="ts" setup>
import type { RadioGroupEmits, RadioGroupProps } from './radio-group.props'
import { reactivePick } from '@vueuse/core'
import { Label, RadioGroupIndicator, RadioGroupItem, RadioGroupRoot, useForwardPropsEmits, VisuallyHidden } from 'reka-ui'
import { computed } from 'vue'
import { useFormField } from '~/composables/use-form-field'
import { cn } from '~/utils/styles'
import { useRadioGroupStyle } from './radio-group.style'

const props = withDefaults(defineProps<RadioGroupProps>(), {
  orientation: 'vertical',
  indicator: 'start',
})

const emits = defineEmits<RadioGroupEmits>()
const delegated = reactivePick(props, 'as', 'asChild', 'defaultValue', 'dir', 'loop', 'modelValue', 'orientation')
const forwarded = useForwardPropsEmits(delegated, emits)

const { name, size, radius, disabled: rootDisabled, required: rootRequired } = useFormField<RadioGroupProps>(props)

const ui = computed(() => useRadioGroupStyle({
  color: props.color,
  variant: props.variant,
  orientation: props.orientation,
  align: props.align,
  size: size.value,
  radius: radius.value,
}))

function getState(checked: boolean) {
  return checked
    ? 'checked'
    : 'unchecked'
}
</script>

<template>
  <RadioGroupRoot
    v-bind="forwarded"
    data-slot="radio-group"
    :name="name"
    :disabled="rootDisabled"
    :required="rootRequired"
    :class="cn(ui.root(), props.ui?.root, props.class)"
  >
    <template v-for="(item, index) in items" :key="index">
      <RadioGroupItem
        :id="item.id"
        v-slot="{ checked, required, disabled }"
        data-slot="radio-item"
        :name="item.name"
        :value="item.value"
        :disabled="item.disabled || disabled"
        :class="cn(ui.item(), props.ui?.item, item.class)"
        @select="item.onSelect"
      >
        <div
          v-if="!!$slots.leading"
          data-slot="radio-leading"
          :class="cn(ui.leading(), props.ui?.leading, item.ui?.leading)"
        >
          <slot name="leading" v-bind="{ checked, required, disabled }" />
        </div>

        <div
          v-if="indicator === 'start'"
          data-slot="radio-indicator-wrapper"
          :data-state="getState(checked)"
          :class="cn(ui.indicatorWrapper(), props.ui?.indicatorWrapper)"
        >
          <RadioGroupIndicator
            data-slot="radio-indicator"
            :class="cn(ui.indicator(), props.ui?.indicator, item.ui?.indicator)"
            :force-mount="false"
          >
            <slot name="indicator" v-bind="{ checked, required, disabled }" />
          </RadioGroupIndicator>
        </div>

        <div
          v-if="item.label || item.description || !!$slots.label || !!$slots.description"
          data-slot="radio-wrapper"
          :data-state="getState(checked)"
          :class="cn(ui.wrapper(), props.ui?.wrapper)"
        >
          <Label
            v-if="item.label || !!$slots.label"
            data-slot="radio-label"
            :data-state="getState(checked)"
            :for="item.id || item.name"
            :class="cn(ui.label(), props.ui?.label, item.ui?.label)"
          >
            <slot name="label" v-bind="{ label: item.label, checked, required, disabled }">
              {{ item.label }}
            </slot>
          </Label>
          <p
            v-if="item.description || !$slots.description"
            data-slot="radio-description"
            :data-state="getState(checked)"
            :class="cn(ui.description(), props.ui?.description, item.ui?.description)"
          >
            <slot name="description" v-bind="{ description: item.description, checked, required, disabled }">
              {{ item.description }}
            </slot>
          </p>
          <slot v-bind="{ checked, required, disabled }" />
        </div>

        <div
          v-if="indicator === 'end'"
          data-slot="radio-indicator-wrapper"
          :data-state="getState(checked)"
          :class="cn(ui.indicatorWrapper(), props.ui?.indicatorWrapper)"
        >
          <RadioGroupIndicator
            data-slot="radio-indicator"
            :class="cn(ui.indicator(), props.ui?.indicator, item.ui?.indicator)"
            :force-mount="false"
          >
            <slot name="indicator" v-bind="{ checked, required, disabled }" />
          </RadioGroupIndicator>
        </div>

        <div
          v-if="!!$slots.trailing"
          data-slot="radio-trailing"
          :class="cn(ui.trailing(), props.ui?.trailing, item.ui?.trailing)"
        >
          <slot name="trailing" v-bind="{ checked, required, disabled }" />
        </div>

        <VisuallyHidden v-if="indicator === 'none'">
          <RadioGroupIndicator class="sr-only" />
        </VisuallyHidden>
      </RadioGroupItem>
    </template>
  </RadioGroupRoot>
</template>
