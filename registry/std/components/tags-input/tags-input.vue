<script lang="ts" setup generic="T extends TagsInputValue">
import type { TagsInputEmits, TagsInputProps, TagsInputValue } from './tags-input.props'
import { reactiveOmit } from '@vueuse/core'
import { TagsInputClear, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText, TagsInputRoot, useForwardPropsEmits } from 'reka-ui'
import { computed, onMounted, ref, toRef, useTemplateRef } from 'vue'
import { toBoolDataAttrValue, toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useTagsInputStyle } from './tags-input.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TagsInputProps<T>>(), {
  variant: 'soft',
  size: 'md',
  radius: 'sm',
  deleteIcon: 'close',
  clearIcon: 'lucide:trash',
  loadingIcon: 'loading',
})

const emits = defineEmits<TagsInputEmits<T>>()
const delegated = reactiveOmit(props, 'class', 'ui', 'maxLength', 'placeholder', 'autoFocus', 'icon', 'loading', 'loadingIcon', 'variant', 'size', 'radius', 'deleteIcon', 'clearIcon', 'invalid', 'clear')
const forwarded = useForwardPropsEmits(delegated, emits)
const inputRef = useTemplateRef('input')

const isFocused = ref(false)

const ui = computed(() => useTagsInputStyle({
  variant: props.variant,
  size: props.size,
  radius: props.radius,
  invalid: toBoolValue(props.invalid),
  disabled: toBoolValue(props.disabled),
  loading: toBoolValue(props.loading),
  focused: isFocused.value,
}))

function onAutoFocus() {
  if (props.autoFocus) {
    inputRef.value?.$el?.focus()
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
  onAutoFocus()
})

defineExpose({
  inputRef: toRef(() => inputRef.value?.$el as HTMLInputElement),
})
</script>

<template>
  <TagsInputRoot
    v-slot="{ modelValue: tags }"
    v-bind="forwarded"
    :model-value="modelValue"
    :class="cn(ui.root(), props.ui?.root, props.class)"
    :data-focused="toBoolDataAttrValue(isFocused)"
    data-slot="tags-input"
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
      :value="tag"
      :class="cn(ui.item(), props.ui?.item)"
      data-slot="tags-input-item"
    >
      <TagsInputItemText :class="cn(ui.itemText(), props.ui?.itemText)" data-slot="tags-input-item-text">
        {{ tag }}
      </TagsInputItemText>
      <TagsInputItemDelete
        :class="cn(ui.itemDelete(), props.ui?.itemDelete)"
        :disabled="disabled"
        data-slot="tags-input-item-delete"
      >
        <Icon :name="deleteIcon" />
      </TagsInputItemDelete>
    </TagsInputItem>

    <TagsInputInput
      ref="input"
      v-bind="{ ...$attrs }"
      :auto-focus="autoFocus"
      :max-length="maxLength"
      :placeholder="placeholder"
      :class="cn(ui.input(), props.ui?.input)"
      data-slot="tags-input-value"
      @focus="onFocus"
      @blur="onBlur"
    />

    <TagsInputClear v-if="!!clear && tags.length" :class="cn(ui.clear(), props.ui?.clear)" data-slot="tags-input-clear">
      <slot name="clear">
        <Icon :name="clearIcon" />
      </slot>
    </TagsInputClear>
  </TagsInputRoot>
</template>
