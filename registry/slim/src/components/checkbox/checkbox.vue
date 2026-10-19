<script lang="ts" generic="T extends boolean = boolean" setup>
import type { CheckboxEmits, CheckboxProps } from './checkbox.props'
import { reactiveOmit } from '@vueuse/core'
import { CheckboxIndicator, CheckboxRoot, Label, useForwardPropsEmits, VisuallyHidden } from 'reka-ui'
import { computed, onMounted, onUnmounted, useSlots } from 'vue'
import { useFormFieldBindings, useFormFieldContext } from '~/composables/use-form-field-context'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useCheckboxStyle } from './checkbox.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<CheckboxProps<T>>(), {
  variant: 'soft',
  size: 'md',
  radius: 'md',
  indicator: 'start',
  checkedIcon: 'ri:check-line',
  indeterminateIcon: 'ri:subtract-line',
})

const emits = defineEmits<CheckboxEmits<T>>()
const delegated = reactiveOmit(props, 'variant', 'size', 'radius', 'align', 'indicator', 'checkedIcon', 'indeterminateIcon', 'checkedIconClass', 'indeterminateIconClass', 'label', 'description', 'unstyled', 'class', 'ui')
const forwarded = useForwardPropsEmits(delegated, emits)

const bindings = useFormFieldBindings(props)
const formFieldContext = useFormFieldContext()

const id = computed(() => props.id ?? formFieldContext.fieldId.value)
const disabled = computed(() => props.disabled ?? formFieldContext.disabled.value)
const dataAttributes = computed(() => formFieldContext.dataAttributes.value)

const slots = useSlots()

const hasLabel = computed(() => !!props.label || !!slots.label)
const hasDescription = computed(() => !!props.description || !!slots.description)
const hasContent = computed(() => hasLabel.value || hasDescription.value)

let unregister: (() => void) | undefined

onMounted(() => {
  unregister = formFieldContext.registryControl({
    id: () => id.value,
  })
})

onUnmounted(() => {
  unregister?.()
})

const ui = computed(() => useCheckboxStyle({
  variant: props.variant,
  size: props.size,
  radius: props.radius,
  align: props.align,
  disabled: disabled.value,
  unstyled: toBoolValue(props.unstyled),
  inverted: toBoolValue(props.inverted),
}))

function getState(checked: boolean | 'indeterminate') {
  return checked === 'indeterminate'
    ? 'indeterminate'
    : checked
      ? 'checked'
      : 'unchecked'
}

function handleUpdate(value: boolean | 'indeterminate') {
  emits('change', value as T)
}
</script>

<template>
  <CheckboxRoot
    v-slot="{ state }"
    v-bind="{ ...forwarded, ...bindings, ...dataAttributes }"
    :data-slot="$attrs['data-slot'] ?? 'checkbox'"
    :data-indicator="indicator"
    :class="cn(ui.root(), props.ui?.root, props.class)"
    @update:model-value="handleUpdate"
  >
    <div
      v-if="indicator === 'start'"
      :data-state="getState(state)"
      :class="cn(ui.indicator(), props.ui?.indicator)"
    >
      <CheckboxIndicator as-child>
        <slot name="indicator" :state="getState(state)">
          <Icon
            :name="state === 'indeterminate' ? indeterminateIcon : checkedIcon"
            :class="cn(
              state === 'indeterminate' ? ui.indeterminateIcon() : ui.checkedIcon(),
              state === 'indeterminate' ? props.ui?.indeterminateIcon : props.ui?.checkedIcon,
              state === 'indeterminate' ? props.indeterminateIconClass : props.checkedIconClass,
            )"
          />
        </slot>
      </CheckboxIndicator>
    </div>

    <div v-if="hasContent" :data-state="getState(state)" :class="cn(ui.content(), props.ui?.content)">
      <slot v-if="hasLabel" name="label" :state="getState(state)">
        <Label :for="id" :class="cn(ui.label(), props.ui?.label)">
          {{ label }}
        </Label>
      </slot>

      <slot v-if="hasDescription" name="description" :state="getState(state)">
        <p :class="cn(ui.description(), props.ui?.description)">
          {{ description }}
        </p>
      </slot>
    </div>

    <div
      v-if="indicator === 'end'"
      :data-state="getState(state)"
      :class="cn(ui.indicator(), props.ui?.indicator)"
    >
      <CheckboxIndicator as-child>
        <slot name="indicator" :state="getState(state)">
          <Icon
            :name="state === 'indeterminate' ? indeterminateIcon : checkedIcon"
            :class="cn(
              state === 'indeterminate' ? ui.indeterminateIcon() : ui.checkedIcon(),
              state === 'indeterminate' ? props.ui?.indeterminateIcon : props.ui?.checkedIcon,
              state === 'indeterminate' ? props.indeterminateIconClass : props.checkedIconClass,
            )"
          />
        </slot>
      </CheckboxIndicator>
    </div>

    <VisuallyHidden v-if="indicator === 'none'">
      <CheckboxIndicator class="sr-only" />
    </VisuallyHidden>
  </CheckboxRoot>
</template>
