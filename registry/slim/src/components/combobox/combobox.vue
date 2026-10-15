<script lang="ts" generic="M extends boolean = false, V = M extends false ? ComboboxValue : ComboboxValue[]" setup>
import type { ComboboxContentProps } from 'reka-ui'
import type { ComboboxEmits, ComboboxProps, ComboboxValue } from './combobox.props'
import type { GroupItem } from '~/composables/use-group-items'
import { reactiveOmit } from '@vueuse/core'
import { defu } from 'defu'
import { AnimatePresence, Motion } from 'motion-v'
import {
  ComboboxAnchor,
  ComboboxCancel,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxLabel,
  ComboboxPortal,
  ComboboxRoot,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxViewport,
  useForwardProps,
} from 'reka-ui'
import { computed, ref, toRef, useSlots } from 'vue'
import { useFormFieldBindings, useFormFieldContext } from '~/composables/use-form-field-context'
import { useGroupItems } from '~/composables/use-group-items'
import { usePopoverContent } from '~/composables/use-popover-content'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useComboboxStyle } from './combobox.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ComboboxProps<M>>(), {
  variant: 'soft',
  size: 'md',
  radius: 'md',
  loadingIcon: 'ri:loader-line',
  suffixIcon: 'ri:expand-up-down-line',
  itemIndicatorIcon: 'ri:check-line',
  clearIcon: 'ri:close-line',
  multiple: false as any,
})

const emits = defineEmits<ComboboxEmits<M, V>>()
const delegated = reactiveOmit(props, 'id', 'name', 'items', 'variant', 'size', 'radius', 'prefix', 'suffix', 'prefixIcon', 'suffixIcon', 'loading', 'loadingIcon', 'clearIcon', 'clearable', 'itemIndicatorIcon', 'portalProps', 'contentProps', 'placeholder', 'emptyText', 'emptyIcon', 'reference', 'unstyled', 'class', 'ui')
const forwarded = useForwardProps(delegated)

const portalProps = toRef(() => props.portalProps)
const contentProps = toRef(() => defu(props.contentProps, {
  align: 'start',
  side: 'bottom',
  collisionPadding: 6,
  position: 'popper',
}) as ComboboxContentProps)

const bindings = useFormFieldBindings()
const formFieldContext = useFormFieldContext()

const loading = computed(() => formFieldContext.loading.value || props.loading)
const disabled = computed(() => formFieldContext.disabled.value || props.disabled)
const invalid = computed(() => formFieldContext.invalid.value || props.invalid)
const dataAttributes = computed(() => formFieldContext.dataAttributes.value)

const computedValues = computed(() => props.modelValue)
const computedValuesCount = computed(() => Array.isArray(computedValues.value) ? computedValues.value.length : 0)
const isMultiple = computed(() => toBoolValue(props.multiple))

const {
  flattenedItems,
  groupedItems,
  selectedItem,
} = useGroupItems<ComboboxValue, M>(props.items ?? [], computedValues)

const selectedIcon = selectItemProp(item => item.selectedIcon || item.icon)
const selectedIconClass = selectItemProp(item => item.iconClass)
const selectedLabel = selectItemProp(item => item.label)

const slots = useSlots()

const hasValues = computed(() => computedValuesCount.value > 0)
const hasPrefix = computed(() => !!selectedIcon.value || !!props.prefix || !!props.prefixIcon || !!slots.prefix)
const hasSuffix = computed(() => !!loading.value || !!props.suffix || !!props.suffixIcon || !!slots.suffix)
const hasClean = computed(() => !disabled.value && props.clearable && hasValues.value)

const open = ref(false)

const morph = usePopoverContent({
  open,
  height: 'auto',
  side: contentProps.value.side,
  sideOffset: contentProps.value.sideOffset,
})

const ui = computed(() => useComboboxStyle({
  variant: props.variant,
  size: props.size,
  radius: props.radius,
  disabled: disabled.value,
  loading: loading.value,
  invalid: invalid.value,
  unstyled: toBoolValue(props.unstyled),
}))

function selectItem(value: ComboboxValue) {
  return flattenedItems.value.find(item => item.value === value)
}

function selectItemProp<R>(selector: (item: GroupItem<ComboboxValue>) => R) {
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
  <ComboboxRoot
    v-bind="{ ...forwarded, ...dataAttributes }"
    v-model:open="open"
    data-slot="combobox"
    :class="cn(ui.root(), props.ui?.root, props.class)"
    @update:model-value="handleUpdate"
  >
    <ComboboxAnchor :reference="reference" :class="cn(ui.anchor(), props.ui?.anchor)" @click="open = !open">
      <span v-if="hasPrefix && !hasValues" :class="cn(ui.prefix(), props.ui?.prefix)">
        <slot name="prefix">
          <Icon
            v-if="selectedIcon || prefixIcon"
            :name="selectedIcon || prefixIcon || ''"
            :class="cn(ui.prefixIcon(), props.ui?.prefixIcon, selectedIconClass)"
          />
          <template v-else>{{ prefix }}</template>
        </slot>
      </span>

      <div v-if="isMultiple" :class="cn(ui.values(), props.ui?.values)">
        <template v-if="hasValues">
          <span v-for="(value, idx) in computedValues" :key="value" :class="cn(ui.value(), props.ui?.value)">
            <Icon v-if="selectItem(value)?.icon" :name="selectItem(value)?.icon || ''" :class="cn(ui.valueIcon(), props.ui?.valueIcon, selectItem(value)?.iconClass)" />
            <template v-if="idx === (Array.isArray(computedValues) ? computedValues.length : 1) - 1">
              {{ selectItem(value)?.label }}
            </template>
          </span>
          <span v-if="computedValuesCount > 1" :class="cn(ui.valueCount(), props.ui?.valueCount)">
            {{ computedValuesCount }}
          </span>
        </template>
        <template v-else>
          {{ placeholder }}
        </template>
      </div>

      <template v-else>
        {{ selectedLabel }}
      </template>

      <ComboboxCancel v-if="hasClean" :class="cn(ui.clearBtn(), props.ui?.clearBtn)">
        <Icon :name="clearIcon" />
      </ComboboxCancel>

      <ComboboxTrigger v-if="hasSuffix" :class="cn(ui.suffix(), props.ui?.suffix)" @click.stop>
        <slot name="suffix">
          <Icon v-if="loading" :name="loadingIcon" :class="cn(ui.suffixIcon(), props.ui?.suffixIcon)" />
          <Icon v-else-if="suffixIcon" :name="suffixIcon" :class="cn(ui.suffixIcon(), props.ui?.suffixIcon)" />
          <template v-else>
            {{ suffix }}
          </template>
        </slot>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxPortal v-bind="portalProps">
      <AnimatePresence>
        <ComboboxContent
          v-bind="contentProps"
          data-slot="combobox-content"
          :class="cn(ui.content(), props.ui?.content)"
          as-child
        >
          <Motion :initial="morph.initial" :animate="morph.animate" :transition="morph.transition">
            <ComboboxViewport :class="cn(ui.viewport(), props.ui?.viewport)">
              <template v-if="groupedItems.length === 0">
                <ComboboxEmpty :class="cn(ui.empty(), props.ui?.empty)">
                  <slot name="empty">
                    <Icon v-if="emptyIcon" :name="emptyIcon" :class="cn(ui.emptyIcon(), props.ui?.emptyIcon)" />
                    {{ emptyText }}
                  </slot>
                </ComboboxEmpty>
              </template>

              <template v-else>
                <ComboboxInput
                  v-bind="bindings"
                  value=""
                  :placeholder="placeholder"
                  :class="cn(ui.filterInput(), props.ui?.filterInput)"
                  @focus="handleFocus"
                  @blur="handleBlur"
                />

                <template v-for="(group, gIdx) in groupedItems" :key="gIdx">
                  <ComboboxGroup :class="cn(ui.group(), props.ui?.group)">
                    <template v-for="(item, idx) in group" :key="`${gIdx}-${idx}`">
                      <ComboboxSeparator
                        v-if="item.type === 'separator'"
                        :class="cn(ui.separator(), props.ui?.separator)"
                      />

                      <ComboboxLabel v-else-if="item.type === 'label'" :class="cn(ui.label(), props.ui?.label)">
                        <slot name="label">
                          {{ item.label }}
                        </slot>
                      </ComboboxLabel>

                      <ComboboxItem
                        v-else
                        v-slot="{ selected }"
                        :value="item.value"
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
                              :name="item.icon"
                              :class="cn(
                                ui.itemIcon({ hasDescription: !!item.description }),
                                props.ui?.itemIcon,
                                item.iconClass,
                              )"
                            />
                          </slot>

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

                          <ComboboxItemIndicator :class="cn(ui.itemIndicator(), props.ui?.itemIndicator)" as-child>
                            <Icon :name="itemIndicatorIcon" />
                          </ComboboxItemIndicator>
                        </slot>
                      </ComboboxItem>
                    </template>
                  </ComboboxGroup>
                </template>
              </template>
            </ComboboxViewport>
          </Motion>
        </ComboboxContent>
      </AnimatePresence>
    </ComboboxPortal>
  </ComboboxRoot>
</template>
