<script lang="ts" generic="M extends boolean = false, V = M extends false ? ListboxValue : ListboxValue[]" setup>
import type { ListboxEmits, ListboxProps, ListboxValue } from './listbox.props'
import { reactiveOmit } from '@vueuse/core'
import {
  ListboxContent,
  ListboxFilter,
  ListboxGroup,
  ListboxGroupLabel,
  ListboxItem,
  ListboxItemIndicator,
  ListboxRoot,
  useFilter,
  useForwardPropsEmits,
} from 'reka-ui'
import { computed, onMounted, onUnmounted } from 'vue'
import { useFormFieldBindings, useFormFieldContext } from '~/composables/use-form-field-context'
import { useGroupItems } from '~/composables/use-group-items'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Empty from '../empty/empty.vue'
import Icon from '../icon/icon.vue'
import { useListboxStyle } from './listbox.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ListboxProps<M>>(), {
  variant: 'soft',
  size: 'md',
  radius: 'md',
  itemIndicatorIcon: 'ri:check-line',
  orientation: 'vertical',
  emptyText: '无数据',
  emptyIcon: 'ri:inbox-2-line',
  multiple: false as any,
})

const emits = defineEmits<ListboxEmits<M, V>>()
const delegated = reactiveOmit(props, 'id', 'name', 'items', 'variant', 'size', 'radius', 'filter', 'placeholder', 'emptyText', 'emptyIcon', 'itemIndicatorIcon', 'unstyled', 'class', 'ui')
const forwarded = useForwardPropsEmits(delegated, emits)

const bindings = useFormFieldBindings()
const formFieldContext = useFormFieldContext()

const filterTerm = defineModel<string>('filter', { default: '' })

const id = computed(() => props.id ?? formFieldContext.fieldId.value)
const disabled = computed(() => props.disabled ?? formFieldContext.disabled.value)
const invalid = computed(() => props.invalid ?? formFieldContext.invalid.value)
const dataAttributes = computed(() => formFieldContext.dataAttributes.value)
const computedValues = computed(() => props.modelValue)

const { contains } = useFilter({ sensitivity: 'base' })
const { groupedItems } = useGroupItems<ListboxValue, M>(props.items ?? [], computedValues)

const filteredItems = computed(() => {
  const term = filterTerm.value
  if (!term)
    return groupedItems.value

  return groupedItems.value
    .map((group) => {
      const matched = group.filter((item) => {
        if (item.type === 'label' || item.type === 'separator')
          return false
        const text = [item.label, item.description].filter(Boolean).join(' ')
          || String(item.value)
        return contains(text, term)
      })
      if (!matched.length)
        return []
      const groupLabel = group.find(i => i.type === 'label')
      return groupLabel ? [groupLabel, ...matched] : matched
    })
    .filter(group => group.length > 0)
})

const ui = computed(() => useListboxStyle({
  variant: props.variant,
  size: props.size,
  radius: props.radius,
  orientation: props.orientation,
  unstyled: toBoolValue(props.unstyled),
  disabled: disabled.value,
  invalid: invalid.value,
}))

let unregister: (() => void) | undefined

onMounted(() => {
  unregister = formFieldContext.registryControl({
    id: () => id.value,
  })
})

onUnmounted(() => {
  unregister?.()
})

function handleUpdate(value: any) {
  emits('update:modelValue', value)
  emits('change', value)
}

function handleFilterUpdate(value: string) {
  emits('update:filter', value)
}

function handleFocus(e: FocusEvent) {
  formFieldContext.handleControlFocus()
  emits('focus', e)
}

function handleBlur(e: FocusEvent) {
  formFieldContext.handleControlBlur()
  emits('blur', e)
}
</script>

<template>
  <ListboxRoot
    v-bind="forwarded"
    :data-slot="$attrs['data-slot'] ?? 'listbox'"
    :class="cn(ui.root(), props.ui?.root, props.class)"
    @update:model-value="handleUpdate"
  >
    <div v-bind="dataAttributes" :class="cn(ui.filter(), props.ui?.filter)">
      <ListboxFilter
        v-bind="bindings"
        v-model="filterTerm"
        :placeholder="placeholder"
        :class="cn(ui.filterInput(), props.ui?.filterInput)"
        @update:model-value="handleFilterUpdate"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </div>

    <ListboxContent :class="cn(ui.content(), props.ui?.content)">
      <template v-if="filteredItems.length === 0">
        <slot name="empty">
          <Empty :class="cn(ui.empty(), props.ui?.empty)" :icon="emptyIcon" :title="emptyText" />
        </slot>
      </template>

      <template v-else>
        <ListboxGroup v-for="(group, gIdx) in filteredItems" :key="`g-${gIdx}`" :class="cn(ui.group(), props.ui?.group)">
          <template v-for="(item, idx) in group" :key="`g-${gIdx}-${idx}`">
            <ListboxGroupLabel v-if="item.type === 'label'" :class="cn(ui.groupLabel(), props.ui?.groupLabel)">
              <slot name="group-label">
                {{ item.label }}
              </slot>
            </ListboxGroupLabel>

            <div v-else-if="item.type === 'separator'" :class="cn(ui.separator(), props.ui?.separator)" />

            <ListboxItem
              v-else
              v-slot="{ selected }"
              :value="item.value"
              :class="cn(ui.item({ hasDescription: !!item.description }), props.ui?.item, item.class)"
              @select="item.onSelect?.(item.value)"
            >
              <slot name="item" :item="item" :selected="selected">
                <slot name="item-icon" :item="item" :selected="selected">
                  <Icon
                    v-if="selected && (item.selectedIcon || item.icon)"
                    :name="item.selectedIcon || item.icon || ''"
                    :class="cn(
                      ui.itemIcon({ hasDescription: !!item.description }),
                      props.ui?.itemIcon,
                      item.iconClass,
                    )"
                  />
                  <Icon
                    v-else-if="item.icon"
                    :name="item.icon"
                    :class="cn(
                      ui.itemIcon({ hasDescription: !!item.description }),
                      props.ui?.itemIcon,
                      item.iconClass,
                    )"
                  />
                </slot>

                <slot name="item-content" :item="item" :selected="selected">
                  <div v-if="item.label && item.description" :class="cn(ui.itemContent({ hasDescription: true }), props.ui?.itemContent)">
                    <span :class="cn(ui.itemLabel(), props.ui?.itemLabel)">{{ item.label }}</span>
                    <p :class="cn(ui.itemDescription(), props.ui?.itemDescription)">
                      {{ item.description }}
                    </p>
                  </div>

                  <template v-else>
                    <span v-if="item.label" :class="cn(ui.itemLabel(), props.ui?.itemLabel)">{{ item.label }}</span>
                    <p v-if="item.description" :class="cn(ui.itemDescription(), props.ui?.itemDescription)">
                      {{ item.description }}
                    </p>
                  </template>
                </slot>
              </slot>

              <ListboxItemIndicator :class="cn(ui.itemIndicator(), props.ui?.itemIndicator)" as-child>
                <Icon :name="itemIndicatorIcon" />
              </ListboxItemIndicator>
            </ListboxItem>
          </template>
        </ListboxGroup>
      </template>
    </ListboxContent>
  </ListboxRoot>
</template>
