<script lang="ts" setup>
import type { TextareaEmits, TextareaProps } from './textarea.props'
import { reactivePick } from '@vueuse/core'
import { Primitive, useForwardPropsEmits } from 'reka-ui'
import { computed, nextTick, onMounted, ref, useTemplateRef, watch } from 'vue'
import { cn } from '~/utils/styles'
import { useTextareaStyle } from './textarea.style'

const props = withDefaults(defineProps<TextareaProps>(), {
  variant: 'soft',
  radius: 'sm',
  rows: 3,
  autoSize: true,
})

const emits = defineEmits<TextareaEmits>()
const delegated = reactivePick(props, 'id', 'name', 'placeholder', 'rows', 'readonly', 'required', 'disabled')
const forwarded = useForwardPropsEmits(delegated, emits)

const modelValue = defineModel<string>()
const textareaRef = useTemplateRef<HTMLTextAreaElement>('textarea')

const isFocused = ref(false)

const ui = computed(() => useTextareaStyle({
  variant: props.variant,
  radius: props.radius,
  disabled: toBoolValue(props.disabled),
  focused: isFocused.value,
  invalid: toBoolValue(props.invalid),
}))

function onResize() {
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

function onFocus(event: FocusEvent) {
  isFocused.value = true
  emits('focus', event)
}

function onBlur(event: FocusEvent) {
  isFocused.value = false
  emits('blur', event)
}

onMounted(() => {
  watch(
    modelValue,
    () => {
      nextTick(onResize)
    },
    { immediate: true },
  )
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
      ref="textarea"
      v-model="modelValue"
      v-bind="{ ...forwarded, ...$attrs }"
      :class="cn(ui.textarea(), props.ui?.textarea)"
      data-slot="textarea-value"
      @focus="onFocus"
      @blur="onBlur"
      @change="emits('change', $event)"
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
