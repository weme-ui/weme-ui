<script lang="ts" setup>
import type { CheckboxEmits, CheckboxProps } from './checkbox.props'
import { reactivePick } from '@vueuse/core'
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits, VisuallyHidden } from 'reka-ui'
import { computed, useId } from 'vue'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useCheckboxStyle } from './checkbox.style'

const props = withDefaults(defineProps<CheckboxProps>(), {
  color: 'accent',
  align: 'start',
  radius: 'sm',
  size: 'md',
  indicator: 'start',
})

const emits = defineEmits<CheckboxEmits>()

const delegated = reactivePick(props, 'as', 'defaultValue', 'disabled', 'id', 'modelValue', 'name', 'required', 'value')
const forwarded = useForwardPropsEmits(delegated, emits)

const id = props.name ?? useId()

const ui = computed(() => useCheckboxStyle({
  ...props,
  fill: toBoolValue(props.fill),
}))
</script>

<template>
  <CheckboxRoot
    v-bind="forwarded"
    :id="id"
    v-slot="{ modelValue: value, state }"
    :class="ui.base({ class: cn(props.class, props.ui?.base) })"
    @update:model-value="emits('change', $event)"
  >
    <div v-if="$slots.leading" :class="ui.leading({ class: props.ui?.leading })">
      <slot name="leading" v-bind="{ value, state }" />
    </div>

    <div
      v-if="indicator === 'start'"
      :data-state="state === 'indeterminate' ? 'indeterminate' : value ? 'checked' : 'unchecked'"
      :class="ui.indicatorWrapper({ class: props.ui?.indicatorWrapper })"
    >
      <CheckboxIndicator :class="ui.indicator({ class: props.ui?.indicator })" :force-mount="false" as-child>
        <slot name="indicator" v-bind="{ value, state }">
          <Icon :name="value === 'indeterminate' ? 'minus' : 'check'" />
        </slot>
      </CheckboxIndicator>
    </div>

    <div :class="ui.wrapper({ class: props.ui?.wrapper })">
      <label v-if="label || $slots.label" :for="id" :class="ui.label({ class: props.ui?.label })">
        <slot name="label" v-bind="{ value, state }">
          {{ label }}
        </slot>
      </label>

      <p v-if="description || $slots.description" :class="ui.description({ class: props.ui?.description })">
        <slot name="description" v-bind="{ value, state }">
          {{ description }}
        </slot>
      </p>
    </div>

    <div
      v-if="indicator === 'end'"
      :data-state="state === 'indeterminate' ? 'indeterminate' : value ? 'checked' : 'unchecked'"
      :class="ui.indicatorWrapper({ class: props.ui?.indicatorWrapper })"
    >
      <CheckboxIndicator :class="ui.indicator({ class: props.ui?.indicator })" :force-mount="false" as-child>
        <slot name="indicator" v-bind="{ value, state }">
          <Icon :name="value === 'indeterminate' ? 'minus' : 'check'" />
        </slot>
      </CheckboxIndicator>
    </div>

    <div v-if="$slots.trailing" :class="ui.trailing({ class: props.ui?.trailing })">
      <slot name="trailing" v-bind="{ value, state }" />
    </div>

    <VisuallyHidden v-if="indicator === 'none'">
      <CheckboxIndicator class="sr-only" />
    </VisuallyHidden>
  </CheckboxRoot>
</template>
