<script lang="ts" generic="M extends boolean = false, V = M extends false ? SelectValue : SelectValue[]" setup>
import type { SelectContentProps } from 'reka-ui'
import type { SelectEmits, SelectProps, SelectValue } from './select.props'
import type { GroupItem } from '~/composables/use-group-items'
import { reactiveOmit } from '@vueuse/core'
import { defu } from 'defu'
import { AnimatePresence, Motion } from 'motion-v'
import {
  SelectContent,
  SelectGroup,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectLabel,
  SelectPortal,
  SelectRoot,
  SelectSeparator,
  SelectTrigger,
  SelectViewport,
  useForwardProps,
} from 'reka-ui'
import { computed, onMounted, onUnmounted, ref, toRef, useSlots, watch } from 'vue'
import { useFormFieldBindings, useFormFieldContext } from '~/composables/use-form-field-context'
import { useGroupItems } from '~/composables/use-group-items'
import { usePopoverContent } from '~/composables/use-popover-content'
import { toBoolDataAttrValue, toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Empty from '../empty/empty.vue'
import Icon from '../icon/icon.vue'
import { useSelectStyle } from './select.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SelectProps<M>>(), {
  variant: 'soft',
  size: 'md',
  radius: 'md',
  loadingIcon: 'ri:loader-line',
  suffixIcon: 'ri:expand-up-down-line',
  indicatorIcon: 'ri:check-line',
  multiple: false as any,
})

const emits = defineEmits<SelectEmits<M, V>>()
const delegated = reactiveOmit(props, 'id', 'name', 'items', 'variant', 'size', 'radius', 'prefix', 'suffix', 'prefixIcon', 'suffixIcon', 'loading', 'loadingIcon', 'indicatorIcon', 'portalProps', 'contentProps', 'placeholder', 'emptyText', 'emptyIcon', 'reference', 'unstyled', 'class', 'ui', 'emptyText', 'emptyIcon')
const forwarded = useForwardProps(delegated)

const portalProps = toRef(() => props.portalProps)
const contentProps = toRef(() => defu(props.contentProps, {
  align: 'start',
  side: 'bottom',
  collisionPadding: 6,
  position: 'popper',
}) as SelectContentProps)

const bindings = useFormFieldBindings()
const formFieldContext = useFormFieldContext()

const id = computed(() => props.id ?? formFieldContext.fieldId.value)
const loading = computed(() => props.loading ?? formFieldContext.loading.value)
const disabled = computed(() => props.disabled ?? formFieldContext.disabled.value)
const invalid = computed(() => props.invalid ?? formFieldContext.invalid.value)
const dataAttributes = computed(() => formFieldContext.dataAttributes.value)

const computedValues = computed(() => props.modelValue)
const computedValuesCount = computed(() => Array.isArray(computedValues.value) ? computedValues.value.length : computedValues.value !== '' ? 1 : 0)
const isMultiple = computed(() => toBoolValue(props.multiple))

const {
  flattenedItems,
  groupedItems,
  selectedItem,
} = useGroupItems<SelectValue, M>(props.items ?? [], computedValues)

const selectedIcon = selectItemProp(item => item.selectedIcon || item.icon)
const selectedIconClass = selectItemProp(item => item.iconClass)
const selectedLabel = selectItemProp(item => item.label)

const slots = useSlots()

const hasValues = computed(() => computedValuesCount.value > 0)
const hasPrefix = computed(() => !!selectedIcon.value || !!props.prefix || !!props.prefixIcon || !!slots.prefix)
const hasSuffix = computed(() => !!loading.value || !!props.suffix || !!props.suffixIcon || !!slots.suffix)

const open = ref(false)

const morph = usePopoverContent({
  open,
  height: 'auto',
  side: contentProps.value.side,
  sideOffset: contentProps.value.sideOffset,
})

const ui = computed(() => useSelectStyle({
  variant: props.variant,
  size: props.size,
  radius: props.radius,
  loading: loading.value,
  disabled: disabled.value,
  invalid: invalid.value,
  unstyled: toBoolValue(props.unstyled),
}))

watch(open, (value) => {
  emits('update:open', value)
})

let unregister: (() => void) | undefined

onMounted(() => {
  unregister = formFieldContext.registryControl({
    id: () => id.value,
  })
})

onUnmounted(() => {
  unregister?.()
})

function selectItem(value: SelectValue) {
  return flattenedItems.value.find(item => item.value === value)
}

function selectItemProp<R>(selector: (item: GroupItem<SelectValue>) => R) {
  return computed(() => {
    const item = selectedItem.value
    if (isMultiple.value || !item || Array.isArray(item))
      return undefined
    return selector(item)
  })
}

function handleUpdate(value: any) {
  emits('update:modelValue', value)
  emits('change', value)
}
</script>

<template>
  <SelectRoot
    v-bind="forwarded"
    v-model:open="open"
    @update:model-value="handleUpdate"
  >
    <SelectTrigger
      v-bind="{ ...dataAttributes, ...bindings }"
      :data-slot="$attrs['data-slot'] ?? 'select'"
      :reference="reference"
      :class="cn(ui.trigger(), props.ui?.trigger, props.class)"
    >
      <span v-if="hasPrefix" :class="cn(ui.prefix(), props.ui?.prefix)">
        <slot name="prefix">
          <Icon
            v-if="selectedIcon || prefixIcon"
            :name="selectedIcon || prefixIcon || ''"
            :class="cn(ui.prefixIcon(), props.ui?.prefixIcon, selectedIconClass)"
          />
          <template v-else>{{ prefix }}</template>
        </slot>
      </span>

      <div :data-placeholder="toBoolDataAttrValue(!hasValues)" :class="cn(ui.value(), props.ui?.value)">
        <template v-if="hasValues">
          <template v-if="isMultiple">
            <template v-for="(value, idx) in computedValues" :key="value">
              <span :class="cn(ui.valueWrapper(), props.ui?.valueWrapper)">
                <Icon v-if="selectItem(value)?.icon" :name="selectItem(value)?.icon || ''" :class="cn(ui.valueIcon(), props.ui?.valueIcon, selectItem(value)?.iconClass)" />
                <template v-if="idx === (Array.isArray(computedValues) ? computedValues.length : 1) - 1">
                  {{ selectItem(value)?.label }}
                </template>
              </span>
            </template>

            <span v-if="computedValuesCount > 1" :class="cn(ui.valueCount(), props.ui?.valueCount)">
              {{ computedValuesCount }}
            </span>
          </template>

          <template v-else>
            {{ selectedLabel }}
          </template>
        </template>

        <template v-else>
          {{ placeholder }}
        </template>
      </div>

      <SelectIcon v-if="hasSuffix" :class="cn(ui.suffix(), props.ui?.suffix)" @click.stop.prevent>
        <slot name="suffix">
          <Icon v-if="loading" :name="loadingIcon" :class="cn(ui.suffixIcon(), props.ui?.suffixIcon)" />
          <Icon v-else-if="suffixIcon" :name="suffixIcon" :class="cn(ui.suffixIcon(), props.ui?.suffixIcon)" />
          <template v-else>
            {{ suffix }}
          </template>
        </slot>
      </SelectIcon>
    </SelectTrigger>

    <SelectPortal v-bind="portalProps">
      <AnimatePresence>
        <SelectContent
          v-bind="contentProps"
          data-slot="select-content"
          :class="cn(ui.content(), props.ui?.content)"
          as-child
        >
          <Motion :initial="morph.initial" :animate="morph.animate" :transition="morph.transition">
            <SelectViewport :class="cn(ui.viewport(), props.ui?.viewport)">
              <template v-if="groupedItems.length === 0">
                <slot name="empty">
                  <Empty
                    :icon="emptyIcon"
                    :title="emptyText"
                    :class="cn(ui.empty(), props.ui?.empty)"
                  />
                </slot>
              </template>

              <template v-else>
                <SelectGroup v-for="(group, gIdx) in groupedItems" :key="`g-${gIdx}`" :class="cn(ui.group(), props.ui?.group)">
                  <template v-for="(item, idx) in group" :key="`${gIdx}-${idx}`">
                    <SelectSeparator v-if="item.type === 'separator'" :class="cn(ui.separator(), props.ui?.separator)" />

                    <SelectLabel v-else-if="item.type === 'label'" :class="cn(ui.groupLabel(), props.ui?.groupLabel)">
                      {{ item.label }}
                    </SelectLabel>

                    <SelectItem
                      v-else
                      v-slot="{ selected }"
                      :value="item.value"
                      :disabled="item.disabled"
                      :class="cn(ui.item({ hasDescription: !!item.description }), props.ui?.item)"
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
                            :name="item.icon || ''"
                            :class="cn(
                              ui.itemIcon({ hasDescription: !!item.description }),
                              props.ui?.itemIcon,
                              item.iconClass,
                            )"
                          />
                        </slot>

                        <div
                          v-if="item.label && item.description"
                          :class="cn(ui.itemContent({ hasDescription: true }), props.ui?.itemContent)"
                        >
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

                        <SelectItemIndicator :class="cn(ui.itemIndicator(), props.ui?.itemIndicator)" as-child>
                          <Icon :name="indicatorIcon" />
                        </SelectItemIndicator>
                      </slot>
                    </SelectItem>
                  </template>
                </SelectGroup>
              </template>
            </SelectViewport>
          </Motion>
        </SelectContent>
      </AnimatePresence>
    </SelectPortal>
  </SelectRoot>
</template>
