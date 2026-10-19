<script lang="ts" setup>
import type { RangeInputEmits, RangeInputProps, RangeInputValue } from './range-input.props'
import { useVModel } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed, onMounted, onUnmounted, useSlots } from 'vue'
import { useFormFieldBindings, useFormFieldContext } from '~/composables/use-form-field-context'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useRangeInputStyle } from './range-input.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<RangeInputProps>(), {
  variant: 'soft',
  size: 'md',
  radius: 'md',
  separator: '-',
})

const emits = defineEmits<RangeInputEmits>()

const modelValue = useVModel<RangeInputProps, 'modelValue', 'update:modelValue'>(props, 'modelValue', emits, { defaultValue: props.defaultValue })

const bindings = useFormFieldBindings()
const formFieldContext = useFormFieldContext()

const fromModelValue = computed(() => modelValue.value?.[0] ?? null)
const toModelValue = computed(() => modelValue.value?.[1] ?? null)

const fromPlaceholder = computed(() => props.fromPlaceholder)
const toPlaceholder = computed(() => props.toPlaceholder)

const id = computed(() => props.id ?? formFieldContext.fieldId.value)
const disabled = computed(() => formFieldContext.disabled.value || props.disabled)
const invalid = computed(() => formFieldContext.invalid.value || props.invalid)
const dataAttributes = computed(() => formFieldContext.dataAttributes.value)

const slots = useSlots()

const hasFromIcon = computed(() => !!slots.fromIcon || !!props.fromIcon)
const hasToIcon = computed(() => !!slots.toIcon || !!props.toIcon)

const ui = computed(() => useRangeInputStyle({
  variant: props.variant,
  size: props.size,
  radius: props.radius,
  disabled: disabled.value,
  invalid: invalid.value,
  unstyled: toBoolValue(props.unstyled),
}))

let unregister: (() => void) | undefined

onMounted(() => {
  unregister = formFieldContext.registryControl({
    id: () => id.value,
  })
})

onUnmounted(() => {
  unregister?.()
})

function transformValue(range: 'from' | 'to', value: string | number | null | undefined): RangeInputValue {
  const n = Number.parseFloat(value as any)
  value = Number.isNaN(n) ? null : n

  if (value !== null) {
    if (props.min !== undefined)
      value = Math.max(props.min, value)

    if (props.max !== undefined)
      value = Math.min(props.max, value)
  }

  return range === 'from'
    ? [value as number | null, toModelValue.value]
    : [fromModelValue.value, value as number | null]
}

function handleInput(range: 'from' | 'to', e: Event) {
  const value = (e.target as HTMLInputElement).value

  modelValue.value = transformValue(range, value)
}

function handleChange(range: 'from' | 'to', e: Event) {
  const value = (e.target as HTMLInputElement).value
  const next = transformValue(range, value)

  modelValue.value = next

  emits('change', next)
}

function handleFocus(e: FocusEvent) {
  formFieldContext.handleControlFocus()
  emits('focus', e)
}

function handleBlur(e: FocusEvent) {
  formFieldContext.handleControlBlur()
  emits('blur', e)
}
</script>

<template>
  <Primitive
    v-bind="dataAttributes"
    :data-slot="$attrs['data-slot'] ?? 'range-input'"
    :as="as"
    :as-child="asChild"
    :class="cn(ui.root(), props.ui?.root, props.class)"
  >
    <div :class="cn(ui.from(), props.ui?.from)">
      <span v-if="hasFromIcon" :class="cn(ui.fromIcon(), props.ui?.fromIcon)">
        <slot name="from-icon">
          <Icon v-if="fromIcon" :name="fromIcon" />
        </slot>
      </span>

      <input
        v-bind="{
          ...bindings,
          value: fromModelValue,
          placeholder: fromPlaceholder,
        }"
        :class="cn(ui.fromInput(), props.ui?.fromInput)"
        @input="handleInput('from', $event)"
        @change="handleChange('from', $event)"
        @focus="handleFocus"
        @blur="handleBlur"
      >
    </div>

    <div :class="cn(ui.separator(), props.ui?.separator)">
      <slot name="separator">
        <Icon v-if="separatorIcon" :name="separatorIcon" />
        <template v-else>
          {{ separator }}
        </template>
      </slot>
    </div>

    <div :class="cn(ui.to(), props.ui?.to)">
      <input
        v-bind="{
          ...bindings,
          id: undefined,
          name: undefined,
          value: toModelValue,
          placeholder: toPlaceholder,
        }"
        :class="cn(ui.fromInput(), props.ui?.fromInput)"
        @input="handleInput('to', $event)"
        @change="handleChange('to', $event)"
        @focus="handleFocus"
        @blur="handleBlur"
      >

      <span v-if="hasToIcon" :class="cn(ui.toIcon(), props.ui?.toIcon)">
        <slot name="to-icon">
          <Icon v-if="toIcon" :name="toIcon" />
        </slot>
      </span>
    </div>
  </Primitive>
</template>
