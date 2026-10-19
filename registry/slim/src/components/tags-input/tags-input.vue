<script lang="ts" setup>
import type { TagsInputEmits, TagsInputProps } from './tags-input.props'
import { reactiveOmit } from '@vueuse/core'
import { TagsInputClear, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText, TagsInputRoot, useForwardExpose, useForwardPropsEmits } from 'reka-ui'
import { computed, onMounted, onUnmounted, useSlots } from 'vue'
import { useFormFieldBindings, useFormFieldContext } from '~/composables/use-form-field-context'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useTagsInputStyle } from './tags-input.style'

const props = withDefaults(defineProps<TagsInputProps>(), {
  variant: 'soft',
  radius: 'md',
  size: 'md',
  clearIcon: 'ri:close-line',
})

const emits = defineEmits<TagsInputEmits>()
const delegated = reactiveOmit(props, 'variant', 'radius', 'size', 'prefix', 'prefixIcon', 'clearIcon', 'clearable', 'unstyled', 'class', 'ui', 'required', 'disabled', 'invalid')
const forwarded = useForwardPropsEmits(delegated, emits)

const bindings = useFormFieldBindings()
const formFieldContext = useFormFieldContext()
const { forwardRef, currentElement } = useForwardExpose()

const id = computed(() => props.id ?? formFieldContext.fieldId.value)
const inputValue = computed(() => props.modelValue ?? [])
const disabled = computed(() => props.disabled ?? formFieldContext.disabled.value)
const invalid = computed(() => props.invalid ?? formFieldContext.invalid.value)
const dataAttributes = computed(() => formFieldContext.dataAttributes.value)

const slots = useSlots()

const hasPrefix = computed(() => !!props.prefix || !!props.prefixIcon || !!slots.prefix)
const hasClean = computed(() => !disabled.value && props.clearable && inputValue.value.length > 0)

const ui = computed(() => useTagsInputStyle({
  variant: props.variant,
  radius: props.radius,
  size: props.size,
  disabled: disabled.value,
  invalid: invalid.value,
  unstyled: toBoolValue(props.unstyled),
  hasPrefix: hasPrefix.value,
}))

let unregister: (() => void) | undefined

onMounted(() => {
  unregister = formFieldContext.registryControl({
    id: () => id.value,
    element: () => currentElement.value,
    getValue: () => inputValue.value,
  })
})

onUnmounted(() => {
  unregister?.()
})

function handleFocus(e: FocusEvent) {
  if (formFieldContext.focused.value)
    return

  formFieldContext.handleControlFocus()
  emits('focus', e)
}

function handleBlur(e: FocusEvent) {
  if (!formFieldContext.focused.value)
    return

  const value = (e.target as HTMLInputElement).value
  formFieldContext.handleControlBlur({ value })
  emits('blur', e)
}
</script>

<template>
  <TagsInputRoot
    v-bind="{ ...forwarded, ...dataAttributes }"
    :ref="forwardRef"
    :data-slot="$attrs['data-slot'] ?? 'tags-input'"
    :class="cn(ui.root(), props.ui?.root, props.class)"
  >
    <span v-if="hasPrefix" :class="cn(ui.prefix(), props.ui?.prefix)">
      <slot name="prefix">
        <Icon v-if="prefixIcon" :name="prefixIcon" :class="cn(ui.prefixIcon(), props.ui?.prefixIcon)" />
        <template v-else>{{ prefix }}</template>
      </slot>
    </span>

    <TagsInputItem
      v-for="item in inputValue"
      :key="item"
      :value="item"
      :class="cn(ui.item(), props.ui?.item)"
    >
      <TagsInputItemText :class="cn(ui.itemText(), props.ui?.itemText)">
        {{ item }}
      </TagsInputItemText>

      <TagsInputItemDelete :class="cn(ui.itemDelete(), props.ui?.itemDelete)">
        <Icon :name="clearIcon" />
      </TagsInputItemDelete>
    </TagsInputItem>

    <TagsInputInput
      v-bind="bindings"
      :placeholder="placeholder"
      :class="cn(ui.input(), props.ui?.input)"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <TagsInputClear v-if="hasClean" :class="cn(ui.clear(), props.ui?.clear)">
      <slot name="cleanIcon">
        <Icon :name="clearIcon" />
      </slot>
    </TagsInputClear>
  </TagsInputRoot>
</template>
