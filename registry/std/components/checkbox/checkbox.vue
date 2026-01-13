<script lang="ts" setup>
import type { CheckboxEmits, CheckboxProps } from './checkbox.props'
import { reactiveOmit } from '@vueuse/core'
import { CheckboxIndicator, CheckboxRoot, Label, useForwardPropsEmits, VisuallyHidden } from 'reka-ui'
import { computed } from 'vue'
import { useFormField } from '~/composables/use-form-field'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useCheckboxStyle } from './checkbox.style'

const props = withDefaults(defineProps<CheckboxProps>(), {
  indicator: 'start',
  checkedIcon: 'check',
  indeterminateIcon: 'minus',
})

const emits = defineEmits<CheckboxEmits>()
const delegated = reactiveOmit(props, 'id', 'name', 'disabled', 'required', 'class', 'ui', 'label', 'description', 'indicator', 'checkedIcon', 'indeterminateIcon', 'color', 'size', 'radius', 'align')
const forwarded = useForwardPropsEmits(delegated, emits)

const { id, name, radius, size, disabled, required } = useFormField<CheckboxProps>(props)

const ui = computed(() => useCheckboxStyle({
  color: props.color,
  size: size.value,
  radius: radius.value,
  align: props.align,
  disabled: toBoolValue(disabled.value),
}))

function getState(checked: boolean | 'indeterminate') {
  return checked === 'indeterminate'
    ? 'indeterminate'
    : checked
      ? 'checked'
      : 'unchecked'
}
</script>

<template>
  <CheckboxRoot
    v-bind="forwarded"
    :id="id"
    v-slot="{ state }"
    data-slot="checkbox"
    :data-indicator="indicator"
    :name="name"
    :disabled="toBoolValue(disabled)"
    :required="toBoolValue(required)"
    :class="cn(ui.root(), props.ui?.root, props.class)"
  >
    <div
      v-if="!!$slots.leading"
      data-slot="checkbox-leading"
      :data-state="getState(state)"
      :class="cn(ui.leading(), props.ui?.leading)"
    >
      <slot name="leading" v-bind="{ state }" />
    </div>

    <div
      v-if="indicator === 'start'"
      data-slot="checkbox-indicator-wrapper"
      :data-state="getState(state)"
      :class="cn(ui.indicatorWrapper(), props.ui?.indicatorWrapper)"
    >
      <CheckboxIndicator
        data-slot="checkbox-indicator"
        :class="cn(ui.indicator(), props.ui?.indicator)"
        :force-mount="false"
        as-child
      >
        <slot name="indicator" v-bind="{ state }">
          <Icon :name="state === 'indeterminate' ? indeterminateIcon : checkedIcon" />
        </slot>
      </CheckboxIndicator>
    </div>

    <div
      v-if="label || description || !!$slots.label || !!$slots.description"
      data-slot="checkbox-wrapper"
      :data-state="getState(state)"
      :class="cn(ui.wrapper(), props.ui?.wrapper)"
    >
      <Label
        v-if="label || !!$slots.label"
        data-slot="checkbox-label"
        :data-state="getState(state)"
        :for="id"
        :class="cn(ui.label(), props.ui?.label)"
      >
        <slot name="label" v-bind="{ state }">
          {{ label }}
        </slot>
      </Label>
      <p
        v-if="description || !$slots.description"
        data-slot="checkbox-description"
        :data-state="getState(state)"
        :class="cn(ui.description(), props.ui?.description)"
      >
        <slot name="description" v-bind="{ state }">
          {{ description }}
        </slot>
      </p>
    </div>

    <div
      v-if="indicator === 'end'"
      data-slot="checkbox-indicator-wrapper"
      :data-state="getState(state)"
      :class="cn(ui.indicatorWrapper(), props.ui?.indicatorWrapper)"
    >
      <CheckboxIndicator
        data-slot="checkbox-indicator"
        :class="cn(ui.indicator(), props.ui?.indicator)"
        :force-mount="false"
        as-child
      >
        <slot name="indicator" v-bind="{ state }">
          <Icon :name="state === 'indeterminate' ? indeterminateIcon : checkedIcon" />
        </slot>
      </CheckboxIndicator>
    </div>

    <slot />

    <div
      v-if="!!$slots.trailing"
      data-slot="checkbox-trailing"
      :data-state="getState(state)"
      :class="cn(ui.trailing(), props.ui?.trailing)"
    >
      <slot name="trailing" v-bind="{ state }" />
    </div>

    <VisuallyHidden v-if="indicator === 'none'">
      <CheckboxIndicator class="sr-only" />
    </VisuallyHidden>
  </CheckboxRoot>
</template>
