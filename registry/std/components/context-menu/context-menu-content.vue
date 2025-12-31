<script lang="ts" setup generic="T extends DropdownItem">
import type { DropdownItem } from '../dropdown/dropdown.props'
import type { ContextMenuContentEmits, ContextMenuContentProps } from './context-menu-content.props'
import { createReusableTemplate, reactiveOmit } from '@vueuse/core'
import {
  ContextMenuArrow,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuItemIndicator,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent as RekaContextMenuSubContent,
  useForwardPropsEmits,
} from 'reka-ui'
import { computed, toRef } from 'vue'
import { usePortal } from '~/composables/use-portal'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import Kbd from '../kbd/kbd.vue'
import LinkOverlay from '../link-overlay/link-overlay.vue'
import ContextMenuSubContent from './context-menu-content.vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ContextMenuContentProps<T>>(), {
  sub: false,
  portal: true,
})

const emits = defineEmits<ContextMenuContentEmits>()
const delegated = reactiveOmit(props, 'class', 'ui', 'items', 'checkedIcon', 'loadingIcon', 'externalIcon', 'portal', 'arrow', 'sub')
const forwarded = useForwardPropsEmits(delegated, emits)
const portalProps = usePortal(toRef(() => props.portal))

const items = computed<T[][]>(() => {
  if (!props.items?.length)
    return []

  return Array.isArray(props.items) && Array.isArray(props.items[0])
    ? props.items as T[][]
    : [props.items] as T[][]
})

const indent = computed(() => items.value.flat().some(
  item => item.type === 'checkbox' || item.type === 'radio',
))

const [
  DefineContextMenuItem,
  ReuseContextMenuItem,
] = createReusableTemplate<{ item: T }>()
</script>

<template>
  <DefineContextMenuItem v-slot="{ item }">
    <ContextMenuItemIndicator
      v-if="item.type === 'checkbox' || item.type === 'radio'"
      :class="cn(ui.itemIndicator(), override?.itemIndicator)"
      data-slot="context-menu-item-indicator"
    >
      <Icon :name="checkedIcon" />
    </ContextMenuItemIndicator>

    <Icon v-if="!!item.loading" :name="loadingIcon" :class="cn(ui.loading(), override?.loading)" />
    <Icon v-if="item.icon" :name="item.icon" :class="cn(ui.itemIcon(), override?.itemIcon)" />

    <label :class="cn(ui.itemLabel(), override?.itemLabel)" data-slot="context-menu-item-label">
      {{ item.label }}
      <Icon
        v-if="item.target === '_blank' && item.rel === 'noopener noreferrer'"
        :name="externalIcon"
        :class="cn(ui.itemExternalIcon(), override?.itemExternalIcon)"
      />
    </label>

    <span :class="cn(ui.itemCommand(), override?.itemCommand)" data-slot="context-menu-item-command">
      {{ item.suffix }}
      <Kbd
        v-for="(value, index) in item.shortcut"
        :key="index"
        v-bind="typeof value === 'string' ? { value } : value"
        :variant="typeof value === 'object' ? value.variant : 'plain'"
        size="sm"
      />
      <Icon
        v-if="!!item.children?.length"
        name="right"
        :class="cn(ui.itemArrowIcon(), override?.itemArrowIcon)"
      />
    </span>
  </DefineContextMenuItem>

  <ContextMenuPortal v-bind="portalProps">
    <component
      :is="sub ? RekaContextMenuSubContent : ContextMenuContent"
      v-bind="forwarded"
      :class="cn(ui.content({ indent: !!sub }))"
      :data-slot="sub ? 'context-menu-sub-content' : 'context-menu-content'"
    >
      <slot name="top" />

      <div :class="cn(ui.viewport(), override?.viewport)" data-slot="context-menu-viewport">
        <ContextMenuGroup
          v-for="(group, groupIdx) in items" :key="`g-${groupIdx}`"
          :class="cn(ui.group(), override?.group)"
          data-slot="context-menu-group"
        >
          <template v-for="(item, itemIdx) in group" :key="`g-${groupIdx}-${itemIdx}`">
            <ContextMenuLabel
              v-if="item.type === 'label'"
              :class="cn(ui.label({ indent }), override?.label)"
              data-slot="context-menu-label"
            >
              <!-- @vue-ignore -->
              <ReuseContextMenuItem :item="item" />
            </ContextMenuLabel>

            <ContextMenuSeparator
              v-else-if="item.type === 'separator'"
              :class="cn(ui.separator(), override?.separator)"
              data-slot="context-menu-separator"
            />

            <ContextMenuSub v-else-if="!!item.children?.length">
              <ContextMenuSubTrigger
                :disabled="item.disabled"
                :text-value="item.value"
                :class="cn(ui.item({ indent }), override?.item)"
                data-slot="context-menu-sub-trigger"
              >
                <!-- @vue-ignore -->
                <ReuseContextMenuItem :item="item" />
              </ContextMenuSubTrigger>

              <ContextMenuSubContent
                v-bind="{ ...$attrs, ...props }"
                :items="item.children"
                side="right"
                sub
              />
            </ContextMenuSub>

            <ContextMenuCheckboxItem
              v-else-if="item.type === 'checkbox'"
              :model-value="item.checked"
              :disabled="item.disabled"
              :text-value="item.value"
              :class="cn(ui.item({ indent }), override?.item)"
              data-slot="context-menu-checkbox-item"
              @update:model-value="item.onCheck"
              @select="item.onSelect"
            >
              <!-- @vue-ignore -->
              <ReuseContextMenuItem :item="item" />
            </ContextMenuCheckboxItem>

            <ContextMenuItem
              v-else
              :disabled="item.disabled"
              :text-value="item.value"
              :class="cn(ui.item({ indent }), override?.item)"
              data-slot="context-menu-item"
              @select="item.onSelect"
            >
              <!-- @vue-ignore -->
              <ReuseContextMenuItem :item="item" />

              <LinkOverlay v-if="item.href" :href="item.href" :target="item.target" :rel="item.rel" :as-child="!!$slots['link-overlay']">
                <slot name="link-overlay" />
              </LinkOverlay>
            </ContextMenuItem>
          </template>
        </ContextMenuGroup>
      </div>

      <slot name="bottom" />

      <ContextMenuArrow
        v-if="!!arrow"
        v-bind="typeof arrow === 'object' ? arrow : {}"
        :class="cn(ui.arrow(), override?.arrow)"
        data-slot="context-menu-arrow"
      />
    </component>
  </ContextMenuPortal>
</template>
