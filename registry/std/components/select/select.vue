<script lang="ts" setup generic="T extends AcceptableValue">
import type { AcceptableValue, SelectContentProps } from 'reka-ui'
import type { SelectEmits, SelectOption, SelectProps } from './select.props'
import { reactivePick } from '@vueuse/core'
import { defu } from 'defu'
import {
  SelectContent,
  SelectGroup,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPortal,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectViewport,
  useForwardPropsEmits,
} from 'reka-ui'
import { computed, toRef } from 'vue'
import { useFormField } from '~/composables/use-form-field'
import { usePortal } from '~/composables/use-portal'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useSelectStyle } from './select.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SelectProps<T>>(), {
  triggerIcon: 'select',
  loadingIcon: 'loading',
  selectedIcon: 'check',
  scrollUpIcon: 'up',
  scrollDownIcon: 'down',
  portal: true,
})

const emits = defineEmits<SelectEmits<T>>()

const { id, name, size, radius, disabled, required } = useFormField<SelectProps<T>>(props)

const rootProps = useForwardPropsEmits(reactivePick(props, 'autocomplete', 'by', 'defaultOpen', 'defaultValue', 'dir', 'modelValue', 'multiple', 'open'), emits)
const portalProps = usePortal(toRef(() => props.portal))
const contentProps = toRef(() => defu(props.content, { side: 'bottom', sideOffset: 8, collisionPadding: 8, position: 'popper' } as SelectContentProps))

const ui = computed(() => useSelectStyle({
  variant: props.variant,
  size: size.value,
  radius: radius.value,
  disabled: toBoolValue(disabled.value),
  invalid: toBoolValue(props.invalid),
}))

const groups = computed<SelectOption<T>[][]>(() => {
  if (!props.options?.length)
    return []

  return Array.isArray(props.options) && Array.isArray(props.options[0])
    ? props.options as SelectOption<T>[][]
    : [props.options] as SelectOption<T>[][]
})

const flatOptions = computed<SelectOption<T>[]>(() => {
  return groups.value.flat().filter(opt => opt.type !== 'separator' && opt.type !== 'label')
})

function displaySelectedIcon() {
  const sync = toBoolValue(props.syncIcon)

  if (!sync)
    return props.icon || ''

  return flatOptions.value.find(opt => opt.value === props.modelValue)?.icon
    ?? props.icon
    ?? ''
}
</script>

<template>
  <SelectRoot
    :id="id"
    v-slot="{ modelValue, open }"
    v-bind="rootProps"
    :name="name"
    :disabled="disabled"
    :required="required"
  >
    <SelectTrigger
      v-bind="$attrs"
      data-slot="select"
      :reference="reference"
      :disabled="disabled"
      :class="cn(ui.base(), props.ui?.base, props.class)"
    >
      <slot name="trigger" v-bind="{ open, modelValue }">
        <span
          v-if="icon || !!$slots.prefix"
          data-slot="select-prefix"
          :data-state="open ? 'open' : 'closed'"
          :class="cn(ui.prefix(), props.ui?.prefix)"
        >
          <slot name="prefix" v-bind="{ open, modelValue }">
            <Icon v-if="icon" :name="displaySelectedIcon()" />
          </slot>
        </span>
        <SelectValue
          v-slot="{ selectedLabel }"
          data-slot="select-trigger-value"
          :data-state="open ? 'open' : 'closed'"
          :placeholder="placeholder"
          :class="cn(ui.value(), props.ui?.value)"
        >
          <slot name="value" v-bind="{ selectedLabel, modelValue, open }" />
        </SelectValue>
        <SelectIcon data-slot="select-trigger-icon" as-child>
          <slot v-if="loading" name="loading">
            <Icon :name="loadingIcon" class="animate-spin" />
          </slot>
          <slot v-else name="trigger-icon" v-bind="{ open }">
            <Icon :name="triggerIcon" :class="cn(ui.triggerIcon(), props.ui?.triggerIcon)" />
          </slot>
        </SelectIcon>
      </slot>
    </SelectTrigger>
    <SelectPortal v-bind="portalProps">
      <SelectContent
        v-bind="contentProps"
        data-slot="select-content"
        :class="cn(ui.content(), props.ui?.content)"
      >
        <slot name="content-top" />

        <SelectScrollUpButton data-slot="select-scroll-up" :class="cn(ui.scrollUp(), props.ui?.scrollUp)">
          <slot name="scroll-up-icon">
            <Icon :name="scrollUpIcon" />
          </slot>
        </SelectScrollUpButton>

        <SelectViewport data-slot="select-viewport" :class="cn(ui.viewport(), props.ui?.viewport)">
          <SelectItem v-if="loading" data-slot="select-loading" :class="cn(ui.loading(), props.ui?.loading)" value="loading">
            <Icon :name="loadingIcon" class="animate-spin" />
          </SelectItem>

          <template v-else>
            <SelectGroup
              v-for="(group, gIdx) in groups"
              :key="`g-${gIdx}`"
              data-slot="select-group"
              :class="cn(ui.group(), props.ui?.group)"
            >
              <template v-for="(option, opIdx) in group" :key="`g-${gIdx}-${opIdx}`">
                <SelectLabel v-if="option.type === 'label'" data-slot="select-label" :class="cn(ui.label(), props.ui?.label)">
                  <slot name="label" v-bind="{ option }">
                    <Icon v-if="option.icon" :name="option.icon" />
                    {{ option.label }}
                  </slot>
                </SelectLabel>

                <SelectSeparator
                  v-else-if="option.type === 'separator'"
                  data-slot="select-separator"
                  :class="cn(ui.separator(), props.ui?.separator)"
                />

                <SelectItem
                  v-else
                  data-slot="select-item"
                  :value="option.value"
                  :text-value="option.label"
                  :disabled="option.disabled"
                  :class="cn(ui.item(), props.ui?.item, option.class)"
                  @select="option.onSelect?.(option.value)"
                >
                  <span v-if="option.icon || !!$slots['item-icon']" data-slot="select-item-icon" :class="cn(ui.itemIcon(), props.ui?.itemIcon, option.ui?.itemIcon)">
                    <slot name="item-icon" v-bind="{ option }">
                      <Icon v-if="option.icon" :name="option.icon" />
                    </slot>
                  </span>

                  <SelectItemText
                    v-if="option.label"
                    data-slot="select-item-text"
                    :class="cn(ui.itemText(), props.ui?.itemText, option.ui?.itemText)"
                  >
                    <slot name="item-label" v-bind="{ option }">
                      {{ option.label }}
                    </slot>
                  </SelectItemText>

                  <SelectItemIndicator
                    data-slot="select-item-indicator"
                    :class="cn(ui.itemIndicator(), props.ui?.itemIndicator, option.ui?.itemIndicator)"
                    as-child
                  >
                    <slot name="item-indicator" v-bind="{ option }">
                      <Icon :name="selectedIcon" />
                    </slot>
                  </SelectItemIndicator>
                </SelectItem>
              </template>
            </SelectGroup>
          </template>
        </SelectViewport>

        <SelectScrollDownButton data-slot="select-scroll-down" :class="cn(ui.scrollDown(), props.ui?.scrollDown)">
          <slot name="scroll-down-icon">
            <Icon :name="scrollDownIcon" />
          </slot>
        </SelectScrollDownButton>

        <slot name="content-bottom" />
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
