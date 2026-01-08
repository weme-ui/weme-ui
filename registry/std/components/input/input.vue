<script lang="ts" setup generic="T extends InputValue">
import type { InputEmits, InputProps, InputValue } from './input.props'
import { useVModel } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed, onMounted, ref, useSlots, useTemplateRef, watch } from 'vue'
import { toBoolDataAttrValue, toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useInputStyle } from './input.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<InputProps<T>>(), {
  type: 'text',
  variant: 'soft',
  size: 'md',
  radius: 'sm',
  clearIcon: 'close',
  loadingIcon: 'loading',
  autocomplete: 'off',
})

const emits = defineEmits<InputEmits<T>>()
const slots = useSlots()

const modelValue = useVModel<InputProps<T>, 'modelValue', 'update:modelValue'>(props, 'modelValue', emits, { defaultValue: props.defaultValue })
const isFocused = ref(false)

let preValue = modelValue.value

watch(modelValue, (_, oldValue) => {
  preValue = oldValue
})

const ui = computed(() => useInputStyle({
  variant: props.variant,
  size: props.size,
  radius: props.radius,
  prepend: !!props.prepend || !!slots?.prepend,
  prefix: !!props.prefix || !!props.prefixIcon || !!slots?.prefix,
  suffix: !!props.suffix || !!props.suffixIcon || !!slots?.suffix,
  append: !!props.append || !!slots?.append,
  loading: toBoolValue(props.loading),
  disabled: toBoolValue(props.disabled),
  invalid: toBoolValue(props.invalid),
  focused: isFocused.value,
  counter: toBoolValue(props.counter),
  overcount: modelValue.value ? String(modelValue.value)?.length > (props.maxLength || 0) : false,
  clear: toBoolValue(props.clear)
    && !!modelValue.value
    && !props.disabled
    && !props.readonly,
}))

const inputRef = useTemplateRef('input')

function updateValue(value: string | null | undefined) {
  if (props.modelModifiers?.trim)
    value = value?.toString().trim() ?? null

  if (props.modelModifiers?.number || props.type === 'number') {
    const n = Number.parseFloat(value as any)
    value = Number.isNaN(n) ? value : n as any
  }

  if (props.modelModifiers?.nullable)
    value ||= null

  if (props.modelModifiers?.optional)
    value ||= undefined

  modelValue.value = value as T
}

function handleInput(e: Event) {
  if (!props.modelModifiers?.lazy) {
    const value = (e.target as HTMLInputElement).value
    updateValue(value)
  }
}

function handleChange(e: Event) {
  const value = (e.target as HTMLInputElement).value

  if (preValue === value)
    return

  if (props.modelModifiers?.lazy)
    updateValue(value)

  if (props.modelModifiers?.trim)
    (e.target as HTMLInputElement).value = value.trim()

  emits('change', value as T)
}

function handleFocus(e: FocusEvent) {
  isFocused.value = true
  emits('focus', e)
}

function handleBlur(e: FocusEvent) {
  isFocused.value = false
  emits('blur', e)
}

function handleClear() {
  const value = modelValue.value

  if (value) {
    updateValue(null)
    emits('clear', value)

    // Focus the input after clearing
    if (inputRef.value) {
      inputRef.value.focus()
    }

    isFocused.value = true
  }
}

function handleEnter(e: KeyboardEvent) {
  const value = (e.target as HTMLInputElement).value

  if (value)
    emits('enter', value.trim() as T)
}

function handleMousedown(e: MouseEvent) {
  if (inputRef.value && e.target !== inputRef.value) {
    e.preventDefault()
    inputRef.value.focus()
  }
}

onMounted(() => {
  if (props.autoFocus && inputRef.value) {
    inputRef.value.focus()
  }
})

defineExpose({
  inputRef,
})
</script>

<template>
  <Primitive :as="as" data-slot="input" :class="cn(ui.root(), props.ui?.root, props.class)">
    <div
      v-if="!!$slots.prepend || prepend"
      data-slot="input-prepend"
      :class="cn(ui.prepend(), props.ui?.prepend)"
    >
      <slot name="prepend">
        {{ prepend }}
      </slot>
    </div>
    <div
      data-slot="input-wrapper"
      :class="cn(ui.wrapper(), props.ui?.wrapper)"
      :data-focused="toBoolDataAttrValue(isFocused)"
      @mousedown="handleMousedown"
    >
      <span
        v-if="!!$slots.prefix || prefix || prefixIcon"
        data-slot="input-prefix"
        :class="cn(ui.prefix(), props.ui?.prefix)"
      >
        <slot name="prefix">
          <template v-if="prefixIcon">
            <Icon :name="prefixIcon" :class="cn(ui.icon(), props.ui?.icon)" />
          </template>
          <template v-else>
            {{ prefix }}
          </template>
        </slot>
      </span>
      <input
        ref="input"
        v-bind="$attrs"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :class="cn(ui.input(), props.ui?.input)"
        :aria-required="toBoolValue(required) || undefined"
        :aria-invalid="toBoolValue(invalid) || undefined"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
        @change="handleChange"
        @keydown.enter="handleEnter"
      >
      <slot />
      <button
        v-if="clear && modelValue"
        data-slot="input-clear"
        :class="cn(ui.clear(), props.ui?.clear)"
        @click="handleClear"
      >
        <slot name="clear">
          <Icon :name="clearIcon" />
        </slot>
      </button>
      <span
        v-if="counter"
        data-slot="input-counter"
        :class="cn(ui.counter(), props.ui?.counter)"
      >
        <slot name="counter" v-bind="{ length: modelValue ? String(modelValue)?.length : 0, maxLength }">
          {{ modelValue ? String(modelValue)?.length : 0 }}/{{ maxLength }}
        </slot>
      </span>
      <span
        v-if="!!$slots.suffix || suffix || suffixIcon || loading || loadingIcon"
        data-slot="input-suffix"
        :class="cn(ui.suffix(), props.ui?.suffix)"
      >
        <slot name="suffix">
          <template v-if="suffixIcon || loading || loadingIcon">
            <Icon v-if="loading" :name="loadingIcon" :class="cn('animate-spin', ui.icon(), props.ui?.icon)" />
            <Icon v-else-if="suffixIcon" :name="suffixIcon" :class="cn(ui.icon(), props.ui?.icon)" />
          </template>
          <template v-else>
            {{ suffix }}
          </template>
        </slot>
      </span>
    </div>
    <div
      v-if="!!$slots.append || append"
      data-slot="input-append"
      :class="cn(ui.append(), props.ui?.append)"
    >
      <slot name="append">
        {{ append }}
      </slot>
    </div>
  </Primitive>
</template>
