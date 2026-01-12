<script lang="ts" setup generic="T extends TagsInputValue">
import type { TagsInputEmits, TagsInputProps, TagsInputValue } from './tags-input.props'
import { reactiveOmit } from '@vueuse/core'
import { TagsInputClear, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText, TagsInputRoot, useForwardPropsEmits } from 'reka-ui'
import { computed, onMounted, ref, toRef, useTemplateRef } from 'vue'
import { useFormField } from '~/composables/use-form-field'
import { toBoolDataAttrValue, toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useTagsInputStyle } from './tags-input.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TagsInputProps<T>>(), {
  variant: 'soft',
  deleteIcon: 'close',
  clearIcon: 'lucide:trash',
  loadingIcon: 'loading',
})

const emits = defineEmits<TagsInputEmits<T>>()
const delegated = reactiveOmit(props, 'id', 'name', 'required', 'disabled', 'class', 'ui', 'maxLength', 'placeholder', 'autoFocus', 'icon', 'loading', 'loadingIcon', 'variant', 'size', 'radius', 'deleteIcon', 'clearIcon', 'invalid', 'clear')
const forwarded = useForwardPropsEmits(delegated, emits)
const inputRef = useTemplateRef('input')

const { id, name, size, radius, disabled, required } = useFormField<TagsInputProps<T>>(props)

const isFocused = ref(false)

const ui = computed(() => useTagsInputStyle({
  variant: props.variant,
  size: size.value,
  radius: radius.value,
  invalid: toBoolValue(props.invalid),
  disabled: toBoolValue(disabled.value),
  loading: toBoolValue(props.loading),
  focused: isFocused.value,
}))

function handleAutoFocus() {
  if (props.autoFocus) {
    inputRef.value?.$el?.focus()
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
  handleAutoFocus()
})

defineExpose({
  inputRef: toRef(() => inputRef.value?.$el as HTMLInputElement),
})
</script>

<template>
  <TagsInputRoot
    :id="id"
    v-slot="{ modelValue: tags }"
    v-bind="forwarded"
    :name="name"
    :required="required"
    :disabled="disabled"
    data-slot="tags-input"
    :model-value="modelValue"
    :class="cn(ui.root(), props.ui?.root, props.class)"
    :data-focused="toBoolDataAttrValue(isFocused)"
    @update:model-value="emits('change', [...$event])"
  >
    <slot v-if="!!$slots.loading || loading" name="loading">
      <Icon :name="loadingIcon" :class="cn(ui.icon(), props.ui?.icon)" />
    </slot>
    <slot v-else-if="$slots.icon || !!icon" name="icon">
      <Icon v-if="!!icon" :name="icon" :class="cn(ui.icon(), props.ui?.icon)" />
    </slot>

    <TagsInputItem
      v-for="(tag, index) in tags"
      :key="index"
      data-slot="tags-input-item"
      :value="tag"
      :class="cn(ui.item(), props.ui?.item)"
    >
      <TagsInputItemText data-slot="tags-input-item-text" :class="cn(ui.itemText(), props.ui?.itemText)">
        {{ tag }}
      </TagsInputItemText>
      <TagsInputItemDelete
        data-slot="tags-input-item-delete"
        :disabled="disabled"
        :class="cn(ui.itemDelete(), props.ui?.itemDelete)"
      >
        <Icon :name="deleteIcon" />
      </TagsInputItemDelete>
    </TagsInputItem>

    <TagsInputInput
      ref="input"
      v-bind="{ ...$attrs }"
      data-slot="tags-input-value"
      :auto-focus="autoFocus"
      :max-length="maxLength"
      :placeholder="placeholder"
      :class="cn(ui.input(), props.ui?.input)"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <TagsInputClear v-if="!!clear && tags.length" data-slot="tags-input-clear" :class="cn(ui.clear(), props.ui?.clear)">
      <slot name="clear">
        <Icon :name="clearIcon" />
      </slot>
    </TagsInputClear>
  </TagsInputRoot>
</template>
