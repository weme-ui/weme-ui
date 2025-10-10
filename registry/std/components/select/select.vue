<script lang="ts" setup>
import type { AcceptableValue, SelectContentProps } from 'reka-ui'
import type { SelectEmits, SelectItem, SelectProps } from './select.props'
import { reactivePick } from '@vueuse/core'
import { defu } from 'defu'
import { useForwardPropsEmits } from 'reka-ui'
import { Select } from 'reka-ui/namespaced'
import { computed, toRef } from 'vue'
import { cn } from '~/utils/styles'
import Avatar from '../avatar/avatar.vue'
import Chip from '../chip/chip.vue'
import Empty from '../empty/empty.vue'
import Icon from '../icon/icon.vue'
import ScrollArea from '../scroll-area/scroll-area.vue'
import { useSelectStyle } from './select.style'

const props = withDefaults(defineProps<SelectProps>(), {
  placeholder: '',
  trailingIcon: 'select',
  indicatorIcon: 'check',
  color: 'accent',
  variant: 'normal',
  radius: 'sm',
  size: 'md',
})

const emits = defineEmits<SelectEmits>()

const rootProps = useForwardPropsEmits(
  reactivePick(props, 'autocomplete', 'by', 'defaultOpen', 'defaultValue', 'dir', 'disabled', 'modelValue', 'multiple', 'name', 'open', 'required'),
  emits,
)

const contentProps = toRef(() => defu(props.contentProps, {
  side: 'bottom',
  align: 'start',
  position: 'popper',
  collisionPadding: 8,
  sideOffset: 8,
} as SelectContentProps))

const ui = computed(() => useSelectStyle(props))

const grouped = computed<SelectItem[][]>(() => {
  if (!props.items?.length) {
    return []
  }

  if (Array.isArray(props.items) && Array.isArray(props.items[0])) {
    return props.items as SelectItem[][]
  }

  return [props.items as SelectItem[]]
})

const items = computed(() => grouped.value.flatMap(g => g) as SelectItem[])

function displayValue(value?: AcceptableValue | AcceptableValue[]) {
  if (props.multiple && Array.isArray(value))
    return value.sort().map(v => items.value.find(i => i.value === v)?.label).join(', ')

  return items.value.find(i => i.value === value)?.label
}
</script>

<template>
  <Select.Root v-slot="{ open, modelValue: value }" v-bind="rootProps">
    <Select.Trigger v-bind="$attrs" :id="id" :class="ui.trigger({ class: cn(props.class, props.ui?.trigger) })">
      <span v-if="loading || leadingIcon || $slots.leading" :class="ui.leading({ class: props.ui?.leading })">
        <Icon v-if="loading" name="loading" class="animate-spin" />
        <slot v-else-if="leadingIcon || $slots.leading" name="leading" v-bind="{ open, value }">
          <Icon v-if="leadingIcon" :name="leadingIcon" :class="ui.leadingIcon({ class: props.ui?.leadingIcon })" />
        </slot>
      </span>

      <slot name="trigger" v-bind="{ open, value }">
        <span v-if="(value && !Array.isArray(value)) || (Array.isArray(value) && value.length)" :class="ui.value({ class: props.ui?.value })">
          {{ displayValue(value) }}
        </span>
      </slot>

      <span v-if="placeholder && !value || (Array.isArray(value) && !value.length)" :class="ui.placeholder({ class: props.ui?.placeholder })">
        {{ placeholder }}
      </span>

      <span :class="ui.trailing({ class: props.ui?.trailing })">
        <slot name="trailing" v-bind="{ open, value }">
          <Icon :name="trailingIcon" :class="ui.trailingIcon({ class: props.ui?.trailingIcon })" />
        </slot>
      </span>
    </Select.Trigger>

    <Select.Portal v-bind="portalProps" :disabled="disabled">
      <Select.Content v-bind="contentProps" :class="ui.content({ class: props.ui?.content })">
        <slot name="content-top" />

        <ScrollArea role="presentation" :class="ui.scrollArea({ class: props.ui?.scrollArea })">
          <div :class="ui.viewport({ class: props.ui?.viewport })">
            <template v-if="grouped.length">
              <Select.Group
                v-for="(group, groupIdx) in grouped"
                :key="`g-${groupIdx}`"
                :class="ui.group({ class: props.ui?.group })"
              >
                <template v-for="(item, idx) in group" :key="`g-${groupIdx}-${idx}`">
                  <Select.Label v-if="item.type === 'label'" :class="ui.label({ class: props.ui?.label })">
                    {{ item.label }}
                  </Select.Label>

                  <Select.Separator v-else-if="item.type === 'separator'" :class="ui.separator({ class: props.ui?.separator })" />

                  <Select.Item
                    v-else
                    :text-value="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                    :class="ui.item({ class: cn(item.class, props.ui?.item) })"
                    @select="item.onSelect"
                  >
                    <slot name="item" v-bind="{ item, value }">
                      <span v-if="item.icon || item.avatar || item.chip || $slots['item-leading']" :class="ui.itemLeading({ class: props.ui?.itemLeading })">
                        <slot name="item-leading" v-bind="{ item, value }">
                          <Icon v-if="item.icon" :name="item.icon" :class="ui.itemIcon({ class: props.ui?.itemIcon })" />
                          <Avatar v-else-if="item.avatar" v-bind="item.avatar" :class="ui.itemAvatar({ class: props.ui?.itemAvatar })" size="xs" />
                          <Chip v-else-if="item.chip" v-bind="item.chip" :class="ui.itemChip({ class: props.ui?.itemChip })" :ui="{ chip: 'size-2.5' }" standalone />
                        </slot>
                      </span>

                      <Select.ItemText :class="ui.itemText({ class: props.ui?.itemText })">
                        <slot name="item-text" v-bind="{ item, value }">
                          {{ item.label }}
                        </slot>
                      </Select.ItemText>

                      <span :class="ui.itemTrailing({ class: props.ui?.itemTrailing })">
                        <slot name="item-trailing" v-bind="{ item, value }" />

                        <Select.ItemIndicator :class="ui.indicator({ class: props.ui?.indicator })" as-child>
                          <Icon :name="indicatorIcon" />
                        </Select.ItemIndicator>
                      </span>
                    </slot>
                  </Select.Item>
                </template>
              </Select.Group>
            </template>

            <div v-else :class="ui.empty({ class: props.ui?.empty })">
              <slot name="empty">
                <Empty
                  type="empty"
                  :description="loading ? loadingText : emptyText"
                  :ui="{
                    image: 'size-8',
                    description: 'text-xs',
                  }"
                  simple
                />
              </slot>
            </div>
          </div>
        </ScrollArea>

        <slot name="content-bottom" />
      </Select.Content>
    </Select.Portal>
  </Select.Root>
</template>
