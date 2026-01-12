<script lang="ts" setup>
import type { TextareaEmits, TextareaProps } from './textarea.props'
import { reactivePick } from '@vueuse/core'
import { Primitive, useForwardPropsEmits } from 'reka-ui'
import { computed, nextTick, onMounted, ref, useTemplateRef, watch } from 'vue'
import { useFormField } from '~/composables/use-form-field'
import { cn } from '~/utils/styles'
import { useTextareaStyle } from './textarea.style'

const props = withDefaults(defineProps<TextareaProps>(), {
  variant: 'soft',
  rows: 3,
  autoSize: true,
})

const emits = defineEmits<TextareaEmits>()
const delegated = reactivePick(props, 'placeholder', 'rows', 'readonly')
const forwarded = useForwardPropsEmits(delegated, emits)

const { id, name, radius, disabled, required } = useFormField<TextareaProps>(props)

const modelValue = defineModel<string>()
const textareaRef = useTemplateRef<HTMLTextAreaElement>('textarea')

const isFocused = ref(false)

const ui = computed(() => useTextareaStyle({
  variant: props.variant,
  radius: radius.value === 'full' ? 'xl' : radius.value,
  disabled: toBoolValue(disabled.value),
  focused: isFocused.value,
  invalid: toBoolValue(props.invalid),
}))

function handleResize() {
  if (props.autoSize && textareaRef.value) {
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

function handleFocus(event: FocusEvent) {
  isFocused.value = true
  emits('focus', event)
}

function handleBlur(event: FocusEvent) {
  isFocused.value = false
  emits('blur', event)
}

onMounted(() => {
  watch(
    modelValue,
    () => {
      nextTick(handleResize)
    },
    { immediate: true },
  )

  watch(modelValue, (value) => {
    emits('change', value)
  })
})

defineExpose({
  textareaRef,
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(ui.root(), props.ui?.root, props.class)"
    :data-focused="toBoolDataAttrValue(isFocused)"
    data-slot="textarea"
  >
    <textarea
      :id="id"
      ref="textarea"
      v-model="modelValue"
      :name="name"
      :disabled="disabled"
      :required="required"
      v-bind="{ ...forwarded, ...$attrs }"
      :class="cn(ui.textarea(), props.ui?.textarea)"
      data-slot="textarea-value"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <span
      v-if="counter && maxLength"
      :class="cn(ui.counter({ overcount: (modelValue?.length || 0) > maxLength }), props.ui?.counter)"
      data-slot="textarea-counter"
    >
      {{ modelValue?.length || 0 }} / {{ maxLength }}
    </span>
  </Primitive>
</template>
