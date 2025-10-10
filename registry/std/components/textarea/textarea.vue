<script lang="ts" setup>
import type { TextareaEmits, TextareaProps } from './textarea.props'
import { reactivePick } from '@vueuse/core'
import { Primitive, useForwardPropsEmits } from 'reka-ui'
import { computed, nextTick, onMounted, useTemplateRef, watch } from 'vue'
import { useTextareaStyle } from './textarea.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TextareaProps>(), {
  color: 'accent',
  variant: 'normal',
  radius: 'sm',
  autoSize: true,
  rows: 3,
})

const emits = defineEmits<TextareaEmits>()
const forwarded = useForwardPropsEmits(
  reactivePick(props, 'id', 'name', 'placeholder', 'rows', 'required', 'readonly', 'disabled'),
  emits,
)

const isFocused = ref(false)

const modelValue = defineModel<string>()
const textareaRef = useTemplateRef('textarea')

const ui = computed(() => useTextareaStyle(props))

function autoResize() {
  if (props.autoSize && textareaRef.value) {
    textareaRef.value.rows = props.rows

    const styles = window.getComputedStyle(textareaRef.value)
    const paddingTop = Number.parseInt(styles.paddingTop)
    const paddingBottom = Number.parseInt(styles.paddingBottom)
    const lineHeight = Number.parseInt(styles.lineHeight)

    const { scrollHeight } = textareaRef.value
    const rows = (scrollHeight - paddingTop - paddingBottom) / lineHeight

    if (rows > props.rows) {
      textareaRef.value.rows = props.maxRows ? Math.min(rows, props.maxRows) : rows
    }
  }
}

function onFocus(e: FocusEvent) {
  isFocused.value = true
  emits('focus', e)
}

function onBlur(e: FocusEvent) {
  isFocused.value = false
  emits('blur', e)
}

watch(modelValue, () => {
  nextTick(autoResize)
}, {
  immediate: true,
})

onMounted(() => {
  autoResize()
})

defineExpose({
  textareaRef,
})
</script>

<template>
  <Primitive
    :data-focused="isFocused ? '' : undefined"
    :class="ui.base({ class: props.ui?.base })"
  >
    <textarea
      ref="textarea"
      v-model="modelValue"
      v-bind="{ ...forwarded, ...$attrs }"
      :maxlength="maxLength"
      :class="ui.textarea({ class: [props.class, props.ui?.textarea] })"
      @focus="onFocus"
      @blur="onBlur"
      @change="$emit('change', $event)"
    />
    <span v-if="showCount && maxLength" :class="ui.count({ class: [props.ui?.count, modelValue?.length === maxLength ? 'text-highlighted' : ''] })">
      {{ modelValue?.length || 0 }} / {{ maxLength }}
    </span>
  </Primitive>
</template>
