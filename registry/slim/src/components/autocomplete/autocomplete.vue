<script lang="ts" setup>
import type { AutocompleteContentProps } from 'reka-ui'
import type { AutocompleteEmits, AutocompleteProps, AutocompleteValue } from './autocomplete.props'
import { reactiveOmit } from '@vueuse/core'
import { defu } from 'defu'
import { AnimatePresence, Motion } from 'motion-v'
import {
  AutocompleteAnchor,
  AutocompleteCancel,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteItemIndicator,
  AutocompleteLabel,
  AutocompletePortal,
  AutocompleteRoot,
  AutocompleteSeparator,
  AutocompleteTrigger,
  AutocompleteViewport,
  useForwardExpose,
  useForwardProps,
} from 'reka-ui'
import { computed, onMounted, onUnmounted, ref, toRef, useSlots } from 'vue'
import { useFormFieldBindings, useFormFieldContext } from '~/composables/use-form-field-context'
import { useGroupItems } from '~/composables/use-group-items'
import { usePopoverContent } from '~/composables/use-popover-content'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useAutocompleteStyle } from './autocomplete.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<AutocompleteProps>(), {
  variant: 'soft',
  size: 'md',
  radius: 'md',
  loadingIcon: 'ri:loader-line',
  suffixIcon: 'ri:expand-up-down-line',
  itemIndicatorIcon: 'ri:check-line',
  clearIcon: 'ri:close-line',
})

const emits = defineEmits<AutocompleteEmits>()
const delegated = reactiveOmit(props, 'items', 'variant', 'size', 'radius', 'prefix', 'suffix', 'prefixIcon', 'suffixIcon', 'loading', 'loadingIcon', 'clearIcon', 'clearable', 'itemIndicatorIcon', 'portalProps', 'contentProps', 'placeholder', 'emptyText', 'emptyIcon', 'reference', 'unstyled', 'class', 'ui')
const forwarded = useForwardProps(delegated)

const portalProps = toRef(() => props.portalProps)
const contentProps = toRef(
  () => defu(
    props.contentProps,
    {
      align: 'start',
      side: 'bottom',
      collisionPadding: 6,
      position: 'popper',
    },
  ) as AutocompleteContentProps,
)

const bindings = useFormFieldBindings()
const formFieldContext = useFormFieldContext()

const id = computed(() => props.id ?? formFieldContext.fieldId.value)
const loading = computed(() => props.loading ?? formFieldContext.loading.value)
const disabled = computed(() => props.disabled ?? formFieldContext.disabled.value)
const invalid = computed(() => props.invalid ?? formFieldContext.invalid.value)
const dataAttributes = computed(() => formFieldContext.dataAttributes.value)

const modelValue = computed(() => props.modelValue)

const { groupedItems, selectedItem } = useGroupItems(props.items ?? [], modelValue)
const { forwardRef, currentElement } = useForwardExpose()

const selectedIcon = computed(() => selectedItem.value?.selectedIcon || selectedItem.value?.icon)

const slots = useSlots()

const hasPrefix = computed(() => !!selectedIcon.value || !!props.prefix || !!props.prefixIcon || !!slots.prefix)
const hasClean = computed(() => !disabled.value && props.clearable && modelValue.value !== undefined)

const open = ref(false)

const morph = usePopoverContent({
  open,
  height: 'auto',
  side: contentProps.value.side,
  sideOffset: contentProps.value.sideOffset,
})

let unregister: (() => void) | undefined

onMounted(() => {
  unregister = formFieldContext.registryControl({
    id: () => id.value,
    element: () => currentElement.value,
    getValue: () => modelValue.value,
  })
})

onUnmounted(() => {
  unregister?.()
})

const ui = computed(() => useAutocompleteStyle({
  variant: props.variant,
  size: props.size,
  radius: props.radius,
  disabled: disabled.value,
  loading: loading.value,
  invalid: invalid.value,
  unstyled: toBoolValue(props.unstyled),
}))

function handleUpdate(value?: AutocompleteValue) {
  if (value === undefined)
    return

  emits('update:modelValue', value)
  emits('change', value)
}

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
  <AutocompleteRoot
    :ref="forwardRef"
    v-bind="{ ...forwarded, ...dataAttributes }"
    v-model:open="open"
    :data-slot="$attrs['data-slot'] ?? 'autocomplete'"
    :class="cn(ui.root(), props.ui?.root, props.class)"
    @update:model-value="handleUpdate"
  >
    <AutocompleteAnchor :reference="reference" :class="cn(ui.anchor(), props.ui?.anchor)">
      <span v-if="hasPrefix" :class="cn(ui.prefix(), props.ui?.prefix)">
        <slot name="prefix">
          <Icon
            v-if="selectedIcon || prefixIcon"
            :name="selectedIcon || prefixIcon || ''"
            :class="cn(ui.prefixIcon(), props.ui?.prefixIcon, selectedItem?.iconClass)"
          />
          <template v-else>{{ prefix }}</template>
        </slot>
      </span>

      <AutocompleteInput
        v-bind="bindings"
        :placeholder="placeholder"
        :class="cn(ui.input(), props.ui?.input)"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <AutocompleteCancel v-if="hasClean" :class="cn(ui.clearBtn(), props.ui?.clearBtn)">
        <Icon :name="clearIcon" />
      </AutocompleteCancel>

      <AutocompleteTrigger :class="cn(ui.suffix(), props.ui?.suffix)">
        <slot name="suffix">
          <Icon v-if="loading" :name="loadingIcon" :class="cn(ui.suffixIcon(), props.ui?.suffixIcon)" />
          <Icon v-else-if="suffixIcon" :name="suffixIcon" :class="cn(ui.suffixIcon(), props.ui?.suffixIcon)" />
          <template v-else>
            {{ suffix }}
          </template>
        </slot>
      </AutocompleteTrigger>
    </AutocompleteAnchor>

    <AutocompletePortal v-bind="portalProps">
      <AnimatePresence>
        <AutocompleteContent
          v-bind="contentProps"
          data-slot="autocomplete-content"
          :class="cn(ui.content(), props.ui?.content)"
          as-child
        >
          <Motion :initial="morph.initial" :animate="morph.animate" :transition="morph.transition">
            <AutocompleteViewport :class="cn(ui.viewport(), props.ui?.viewport)">
              <template v-if="groupedItems.length === 0">
                <AutocompleteEmpty :class="cn(ui.empty(), props.ui?.empty)">
                  <slot name="empty">
                    <Icon v-if="emptyIcon" :name="emptyIcon" :class="cn(ui.emptyIcon(), props.ui?.emptyIcon)" />
                    {{ emptyText }}
                  </slot>
                </AutocompleteEmpty>
              </template>

              <template v-else>
                <template v-for="(group, gIdx) in groupedItems" :key="`g-${gIdx}`">
                  <AutocompleteGroup :class="cn(ui.group(), props.ui?.group)">
                    <template v-for="(item, idx) in group" :key="`g-${gIdx}-${idx}`">
                      <AutocompleteSeparator
                        v-if="item.type === 'separator'"
                        :class="cn(ui.separator(), props.ui?.separator)"
                      />

                      <AutocompleteLabel v-else-if="item.type === 'label'" :class="cn(ui.label(), props.ui?.label)">
                        <slot name="label">
                          {{ item.label }}
                        </slot>
                      </AutocompleteLabel>

                      <AutocompleteItem
                        v-else
                        v-slot="{ selected }"
                        :value="item.value"
                        :class="cn(ui.item(), props.ui?.item, item.class)"
                        @select="item.onSelect?.(item.value)"
                      >
                        <slot name="item" :item="item" :selected="selected">
                          <slot name="item-icon" :item="item" :selected="selected">
                            <Icon v-if="selected && (item.selectedIcon || item.icon)" :name="item.selectedIcon || item.icon || ''" :class="cn(ui.itemIcon(), props.ui?.itemIcon)" />
                            <Icon v-else-if="item.icon" :name="item.icon" :class="cn(ui.itemIcon(), props.ui?.itemIcon, item.iconClass)" />
                          </slot>

                          <span v-if="item.label" :class="cn(ui.itemLabel(), props.ui?.itemLabel)">{{ item.label }}</span>

                          <AutocompleteItemIndicator :class="cn(ui.itemIndicator(), props.ui?.itemIndicator)" as-child>
                            <Icon :name="itemIndicatorIcon" />
                          </AutocompleteItemIndicator>
                        </slot>
                      </AutocompleteItem>
                    </template>
                  </AutocompleteGroup>
                </template>
              </template>
            </AutocompleteViewport>
          </Motion>
        </AutocompleteContent>
      </AnimatePresence>
    </AutocompletePortal>
  </AutocompleteRoot>
</template>
