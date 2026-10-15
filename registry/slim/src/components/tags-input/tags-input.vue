<script lang="ts" setup>
import type { TagsInputEmits, TagsInputProps } from './tags-input.props'
import { reactiveOmit } from '@vueuse/core'
import { TagsInputClear, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText, TagsInputRoot, useForwardExpose, useForwardPropsEmits } from 'reka-ui'
import { computed, useSlots } from 'vue'
import { useFormFieldBindings, useFormFieldContext } from '~/composables/use-form-field-context'
import { toBoolDataAttrValue, toBoolValue } from '~/utils/props'
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
const delegated = reactiveOmit(props, 'variant', 'radius', 'size', 'prefix', 'prefixIcon', 'clearIcon', 'clearable', 'unstyled', 'class', 'ui', 'required', 'disabled', 'readonly', 'invalid')
const forwarded = useForwardPropsEmits(delegated, emits)

const bindings = useFormFieldBindings()
const formFieldContext = useFormFieldContext()

const inputValue = computed(() => props.modelValue ?? [])
const disabled = computed(() => formFieldContext.disabled.value || props.disabled)
const readonly = computed(() => formFieldContext.readonly.value || props.readonly)
const invalid = computed(() => formFieldContext.invalid.value || props.invalid)
const dataAttributes = computed(() => formFieldContext.dataAttributes.value)

const slots = useSlots()

const hasPrefix = computed(() => props.prefix || props.prefixIcon || !!slots.prefix)
const hasClean = computed(() => !disabled.value && props.clearable && inputValue.value.length > 0)

const ui = computed(() => useTagsInputStyle({
  variant: props.variant,
  radius: props.radius,
  size: props.size,
  disabled: disabled.value,
  invalid: invalid.value,
  unstyled: toBoolValue(props.unstyled),
}))

function handleFocus(e: FocusEvent) {
  formFieldContext.handleControlFocus()
  emits('focus', e)
}

function handleBlur(e: FocusEvent) {
  formFieldContext.handleControlBlur()
  emits('blur', e)
}

useForwardExpose()
</script>

<template>
  <TagsInputRoot
    v-bind="{ ...forwarded, ...dataAttributes }"
    data-slot="tags-input"
    :data-readonly="toBoolDataAttrValue(readonly)"
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
      :readonly="readonly"
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
