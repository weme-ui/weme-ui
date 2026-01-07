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
      data-slot="context-menu-item-indicator"
      :class="cn(ui.itemIndicator(), override?.itemIndicator)"
    >
      <Icon :name="checkedIcon" />
    </ContextMenuItemIndicator>

    <Icon v-if="!!item.loading" :name="loadingIcon" :class="cn(ui.loading(), override?.loading)" />
    <Icon v-if="item.icon" :name="item.icon" :class="cn(ui.itemIcon(), override?.itemIcon)" />

    <label data-slot="context-menu-item-label" :class="cn(ui.itemLabel(), override?.itemLabel)">
      {{ item.label }}
      <Icon
        v-if="item.target === '_blank' && item.rel === 'noopener noreferrer'"
        :name="externalIcon"
        :class="cn(ui.itemExternalIcon(), override?.itemExternalIcon)"
      />
    </label>

    <span data-slot="context-menu-item-command" :class="cn(ui.itemCommand(), override?.itemCommand)">
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
      :data-slot="sub ? 'context-menu-sub-content' : 'context-menu-content'"
      :class="cn(ui.content({ indent: !!sub }))"
    >
      <slot name="top" />

      <div data-slot="context-menu-viewport" :class="cn(ui.viewport(), override?.viewport)">
        <ContextMenuGroup
          v-for="(group, groupIdx) in items" :key="`g-${groupIdx}`"
          data-slot="context-menu-group"
          :class="cn(ui.group(), override?.group)"
        >
          <template v-for="(item, itemIdx) in group" :key="`g-${groupIdx}-${itemIdx}`">
            <ContextMenuLabel
              v-if="item.type === 'label'"
              data-slot="context-menu-label"
              :class="cn(ui.label({ indent }), override?.label)"
            >
              <!-- @vue-ignore -->
              <ReuseContextMenuItem :item="item" />
            </ContextMenuLabel>

            <ContextMenuSeparator
              v-else-if="item.type === 'separator'"
              data-slot="context-menu-separator"
              :class="cn(ui.separator(), override?.separator)"
            />

            <ContextMenuSub v-else-if="!!item.children?.length">
              <ContextMenuSubTrigger
                data-slot="context-menu-sub-trigger"
                :disabled="item.disabled"
                :text-value="item.value"
                :class="cn(ui.item({ indent }), override?.item)"
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
              data-slot="context-menu-checkbox-item"
              :model-value="item.checked"
              :disabled="item.disabled"
              :text-value="item.value"
              :class="cn(ui.item({ indent }), override?.item)"
              @update:model-value="item.onCheck"
              @select="item.onSelect"
            >
              <!-- @vue-ignore -->
              <ReuseContextMenuItem :item="item" />
            </ContextMenuCheckboxItem>

            <ContextMenuItem
              v-else
              data-slot="context-menu-item"
              :disabled="item.disabled"
              :text-value="item.value"
              :class="cn(ui.item({ indent }), override?.item)"
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
        data-slot="context-menu-arrow"
        :class="cn(ui.arrow(), override?.arrow)"
      />
    </component>
  </ContextMenuPortal>
</template>
