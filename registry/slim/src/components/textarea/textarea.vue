<script lang="ts" setup>
import type { TextareaEmits, TextareaProps } from './textarea.props'
import { useVModel } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed, nextTick, useTemplateRef, watch } from 'vue'
import { useFormFieldBindings, useFormFieldContext } from '~/composables/use-form-field-context'
import { toBoolDataAttrValue, toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useTextareaStyle } from './textarea.style'

const props = withDefaults(defineProps<TextareaProps>(), {
  variant: 'soft',
  size: 'md',
  radius: 'md',
  rows: 3,
  loadingIcon: 'ri:loader-line',
})

const emits = defineEmits<TextareaEmits>()

const modelValue = useVModel<TextareaProps, 'modelValue', 'update:modelValue'>(props, 'modelValue', emits, { defaultValue: props.defaultValue })

const bindings = useFormFieldBindings()
const formFieldContext = useFormFieldContext()

const textareaRef = useTemplateRef<HTMLTextAreaElement>('textareaRef')

const loading = computed(() => formFieldContext.loading.value || !!props.loading)
const disabled = computed(() => formFieldContext.disabled.value || !!props.disabled)
const readonly = computed(() => formFieldContext.readonly.value || !!props.readonly)
const invalid = computed(() => formFieldContext.invalid.value || !!props.invalid)
const dataAttributes = computed(() => formFieldContext.dataAttributes.value)

const hasCounter = computed(() => !!props.countable && props.maxLength !== undefined)
const countLength = computed(() => modelValue.value ? modelValue.value.toString().length : 0)
const overcount = computed(() => props.maxLength !== undefined && countLength.value > props.maxLength)

const ui = computed(() => useTextareaStyle({
  variant: props.variant,
  size: props.size,
  radius: props.radius,
  disabled: disabled.value,
  loading: loading.value,
  overcount: overcount.value,
  invalid: invalid.value,
  autosize: toBoolValue(props.autoSize),
  unstyled: toBoolValue(props.unstyled),
}))

watch(
  modelValue,
  () => {
    nextTick(() => {
      handleResize()
    })
  },
  { immediate: true },
)

function updateValue(value: string | null | undefined) {
  if (props.modelModifiers?.trim && (typeof value === 'string' || value === null || value === undefined))
    value = value?.toString().trim() ?? null

  if (props.modelModifiers?.nullable)
    value ||= null

  if (props.modelModifiers?.optional && !props.modelModifiers?.nullable && value !== null)
    value ||= undefined

  modelValue.value = value
}

function handleInput(e: Event) {
  if (!props.modelModifiers?.lazy) {
    const value = (e.target as HTMLTextAreaElement).value
    updateValue(value)
  }

  nextTick(() => {
    handleResize()
  })
}

function handleChange(e: Event) {
  const value = (e.target as HTMLTextAreaElement).value

  if (props.modelModifiers?.lazy)
    updateValue(value)

  if (props.modelModifiers?.trim)
    (e.target as HTMLTextAreaElement).value = value.trim()

  emits('change', (e.target as HTMLTextAreaElement).value)
}

function handleFocus(e: FocusEvent) {
  formFieldContext.handleControlFocus()
  emits('focus', e)
}

function handleBlur(e: FocusEvent) {
  formFieldContext.handleControlBlur()
  emits('blur', e)
}

function handleResize() {
  if (!!props.autoSize && textareaRef.value) {
    textareaRef.value.rows = props.rows

    const styles = window.getComputedStyle(textareaRef.value)
    const paddingTop = Number.parseInt(styles.paddingTop)
    const paddingBottom = Number.parseInt(styles.paddingBottom)
    const lineHeight = Number.parseInt(styles.lineHeight)

    const { scrollHeight } = textareaRef.value
    const rows = (scrollHeight - paddingTop - paddingBottom) / lineHeight

    if (rows > props.rows) {
      textareaRef.value.rows = props.maxRows
        ? Math.min(rows, props.maxRows)
        : rows
    }
  }
}

defineExpose({
  textareaRef,
})
</script>

<template>
  <Primitive
    v-bind="dataAttributes"
    data-slot="textarea"
    :data-readonly="toBoolDataAttrValue(readonly)"
    :as="as"
    :class="cn(ui.root(), props.ui?.root, props.class)"
  >
    <textarea
      ref="textareaRef"
      v-bind="bindings"
      :value="modelValue"
      :rows="rows"
      :placeholder="placeholder"
      :readonly="readonly"
      :class="cn(ui.textarea(), props.ui?.textarea)"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <div v-if="hasCounter || loading" :class="cn(ui.innerWrapper(), props.ui?.innerWrapper)">
      <span v-if="hasCounter" :class="cn(ui.counter(), props.ui?.counter)">
        <slot name="counter" v-bind="{ count: countLength }">
          {{ countLength }} / {{ maxLength }}
        </slot>
      </span>

      <slot name="loader" v-bind="{ loading }">
        <Icon v-if="loading" :name="loadingIcon" :class="cn(ui.loader(), props.ui?.loader)" />
      </slot>
    </div>
  </Primitive>
</template>
