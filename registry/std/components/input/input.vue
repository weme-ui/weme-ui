<script lang="ts" setup>
import type { InputEmits, InputProps, InputSlots, InputValue } from './input.props'
import { reactivePick } from '@vueuse/core'
import { Primitive, useForwardPropsEmits } from 'reka-ui'
import { computed, ref, useSlots, useTemplateRef } from 'vue'
import { toBoolDataAttrValue, toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useInputStyle } from './input.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  variant: 'soft',
  size: 'md',
  radius: 'sm',
  clearIcon: 'close',
})

const emits = defineEmits<InputEmits>()

defineSlots<InputSlots>()

const slots = useSlots()
const delegated = reactivePick(props, 'as', 'asChild')
const forwarded = useForwardPropsEmits(delegated, emits)

const [
  modelValue,
  modelModifiers,
] = defineModel<InputValue>()

const inputRef = useTemplateRef('input')
const isFocused = ref(false)

const ui = computed(() => useInputStyle({
  variant: props.variant,
  size: props.size,
  radius: props.radius,
  prepend: !!props.prepend || !!slots?.prepend,
  append: !!props.append || !!slots?.append,
  disabled: toBoolValue(props.disabled),
  invalid: toBoolValue(props.invalid),
  focused: isFocused.value,
  clear: toBoolValue(props.clear)
    && !!modelValue.value
    && !props.disabled
    && !props.readonly,
}))

function updateValue(value: InputValue) {
  if (modelModifiers.trim)
    value = value?.toString().trim() ?? null

  if (modelModifiers.number || props.type === 'number') {
    const n = Number.parseFloat(value as any)
    value = Number.isNaN(n) ? value : n as any
  }

  if (modelModifiers.nullify)
    value ||= null

  modelValue.value = value
}

function onInput(event: Event) {
  if (!modelModifiers.lazy)
    updateValue((event.target as HTMLInputElement).value)
}

function onChange(event: Event) {
  const value = (event.target as HTMLInputElement).value

  if (modelModifiers.lazy)
    updateValue(value)

  if (modelModifiers.trim)
    (event.target as HTMLInputElement).value = value.trim()

  emits('change', event)
}

function onFocus(event: FocusEvent) {
  isFocused.value = true
  emits('focus', event)
}

function onBlur(event: FocusEvent) {
  isFocused.value = false
  emits('blur', event)
}

function onClear() {
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

function onEnter(event: KeyboardEvent) {
  const value = (event.target as HTMLInputElement).value

  if (value)
    emits('enter', value.trim())
}

defineExpose({
  input: inputRef,
})
</script>

<template>
  <Primitive
    v-bind="forwarded"
    :class="cn(ui.root(), props.ui?.root, props.class)"
    data-slot="input"
  >
    <div
      v-if="!!$slots.prepend || !!prepend"
      :class="cn(ui.prepend(), props.ui?.prepend)"
      data-slot="input-prepend"
    >
      <slot name="prepend">
        {{ prepend }}
      </slot>
    </div>
    <div
      :class="cn(ui.wrapper(), props.ui?.wrapper)"
      :data-focused="toBoolDataAttrValue(isFocused)"
      data-slot="input-wrapper"
    >
      <span
        v-if="!!$slots.prefix || !!prefix || !!prefixIcon"
        :class="cn(ui.prefix(), props.ui?.prefix)"
        data-slot="input-prefix"
      >
        <slot name="prefix">
          <template v-if="!!prefixIcon">
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
        :class="cn(ui.input(), props.ui?.input)"
        :aria-required="toBoolValue(required) || undefined"
        :aria-invalid="toBoolValue(invalid) || undefined"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
        @change="onChange"
        @keydown.enter="onEnter"
      >
      <slot />
      <button
        v-if="!!clear"
        :class="cn(ui.clear(), props.ui?.clear)"
        data-slot="input-clear"
        @click="onClear"
      >
        <slot name="clear">
          <Icon :name="clearIcon" />
        </slot>
      </button>
      <span
        v-if="!!counter"
        :class="cn(ui.counter({ overcount: modelValue ? String(modelValue)?.length > (maxLength || 0) : false }), props.ui?.counter)"
        data-slot="input-counter"
      >
        <slot name="counter" v-bind="{ length: modelValue ? String(modelValue)?.length : 0, maxLength }">
          {{ modelValue ? String(modelValue)?.length : 0 }}/{{ maxLength }}
        </slot>
      </span>
      <span
        v-if="!!$slots.suffix || !!suffix || !!suffixIcon"
        :class="cn(ui.suffix(), props.ui?.suffix)"
        data-slot="input-suffix"
      >
        <slot name="suffix">
          <template v-if="!!suffixIcon">
            <Icon :name="suffixIcon" :class="cn(ui.icon(), props.ui?.icon)" />
          </template>
          <template v-else>
            {{ suffix }}
          </template>
        </slot>
      </span>
    </div>
    <div
      v-if="!!$slots.append || !!append"
      :class="cn(ui.append(), props.ui?.append)"
      data-slot="input-append"
    >
      <slot name="append">
        {{ append }}
      </slot>
    </div>
  </Primitive>
</template>
