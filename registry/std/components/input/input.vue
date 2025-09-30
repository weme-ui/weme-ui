<script lang="ts" setup>
import type { InputEmits, InputProps, InputValue } from './input.props'
import { Primitive } from 'reka-ui'
import { computed, useTemplateRef } from 'vue'
import { toBoolValue } from '~/utils/props'
import Icon from '../icon/icon.vue'
import { useInputStyle } from './input.style'

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  color: 'accent',
  variant: 'normal',
  radius: 'sm',
  size: 'md',
  readonly: false,
  disabled: false,
  error: false,
  loading: false,
})

const emits = defineEmits<InputEmits>()

const isFocused = ref(false)
const isLoading = computed(() => toBoolValue(props.loading))
const isDisabled = computed(() => toBoolValue(props.disabled) || isLoading.value)
const isError = computed(() => toBoolValue(props.error))
const isReadonly = computed(() => toBoolValue(props.readonly))
const isShowCount = computed(() => toBoolValue(props.showCount) && props.maxLength)

const ui = computed(() => useInputStyle(props))

const inputRef = useTemplateRef('input')

const [
  modelValue,
  modelModifiers,
] = defineModel<InputValue>()

function updateInput(value: string | null) {
  if (modelModifiers.trim)
    value = value?.trim() ?? null

  if (modelModifiers.number || props.type === 'number') {
    const n = Number.parseFloat(value as any)
    value = Number.isNaN(n) ? value : n as any
  }

  if (modelModifiers.nullify)
    value ||= null

  modelValue.value = value as InputValue
}

function onInput(e: Event) {
  if (!modelModifiers.lazy)
    updateInput((e.target as HTMLInputElement).value)
}

function onChange(e: Event) {
  const value = (e.target as HTMLInputElement).value

  if (modelModifiers.lazy)
    updateInput(value)

  if (modelModifiers.trim)
    (e.target as HTMLInputElement).value = value.trim()

  emits('change', e)
}

function onFocus(e: FocusEvent) {
  isFocused.value = true
  emits('focus', e)
}

function onBlur(e: FocusEvent) {
  isFocused.value = false
  emits('blur', e)
}

function onClear() {
  const value = modelValue.value

  if (value) {
    updateInput(null)
    emits('clear', value)

    isFocused.value = true
    inputRef.value?.focus()
  }
}

function onEnter(e: KeyboardEvent) {
  const value = (e.target as HTMLInputElement).value

  if (value)
    emits('enter', value.trim())
}

defineExpose({
  inputRef,
  isFocused,
})
</script>

<template>
  <Primitive
    :as="as"
    :data-error="isError ? '' : undefined"
    :data-focused="isFocused ? '' : undefined"
    :data-disabled="isDisabled ? '' : undefined"
    :data-readonly="isReadonly ? '' : undefined"
    :class="ui.base({ class: [props.class, props.ui?.base] })"
  >
    <span v-if="leadingIcon || $slots.leading" :class="ui.leading({ class: props.ui?.leading })">
      <slot name="leading">
        <Icon v-if="leadingIcon" :name="leadingIcon" />
      </slot>
    </span>

    <span v-if="prepend || $slots.prepend" :class="ui.prepend({ class: props.ui?.prepend })">
      <slot name="prepend">
        {{ prepend }}
      </slot>
    </span>

    <input
      :id="id"
      ref="input"
      v-bind="{ ...$attrs }"
      :type="type"
      :name="name"
      :value="modelValue"
      :placeholder="placeholder"
      :maxlength="maxLength"
      :autofocus="autofocus"
      :required="required"
      :readonly="isReadonly"
      :disabled="isDisabled"
      :data-error="isError ? '' : undefined"
      :data-focused="isFocused ? '' : undefined"
      :data-disabled="isDisabled ? '' : undefined"
      :data-readonly="isReadonly ? '' : undefined"
      :class="ui.input({ class: props.ui?.input })"
      @input="onInput"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
      @keydown.enter="onEnter"
    >

    <slot />

    <button v-if="showClear" :class="ui.clear({ class: props.ui?.clear })" @click="onClear">
      <Icon name="close" />
    </button>

    <span v-if="isShowCount" :class="cn(ui.count(), props.ui?.count)">
      {{ (modelValue as string || '').length }}/{{ maxLength }}
    </span>

    <span v-if="append || $slots.append" :class="ui.append({ class: props.ui?.append })">
      <slot name="append">
        {{ append }}
      </slot>
    </span>

    <span v-if="trailingIcon || $slots.trailing" :class="ui.trailing({ class: props.ui?.trailing })">
      <Icon v-if="loading" name="loading" class="animate-spin" />
      <slot v-else-if="trailingIcon" name="trailing">
        <Icon :name="trailingIcon" />
      </slot>
    </span>
  </Primitive>
</template>
