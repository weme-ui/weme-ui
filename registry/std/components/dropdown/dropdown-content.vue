<script lang="ts" setup generic="T extends DropdownItem">
import type { DropdownContentEmits, DropdownContentProps } from './dropdown-content.props'
import type { DropdownItem } from './dropdown.props'
import { createReusableTemplate, reactiveOmit } from '@vueuse/core'
import {
  DropdownMenuArrow,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuItemIndicator,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  useForwardPropsEmits,
} from 'reka-ui'
import { computed, toRef } from 'vue'
import { usePortal } from '~/composables/use-portal'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import Kbd from '../kbd/kbd.vue'
import LinkOverlay from '../link-overlay/link-overlay.vue'
import DropdownSubContent from './dropdown-content.vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DropdownContentProps<T>>(), {
  sub: false,
  portal: true,
})

const emits = defineEmits<DropdownContentEmits>()
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
  DefineDropdownItem,
  ReuseDropdownItem,
] = createReusableTemplate<{ item: T }>()
</script>

<template>
  <DefineDropdownItem v-slot="{ item }">
    <DropdownMenuItemIndicator
      v-if="item.type === 'checkbox' || item.type === 'radio'"
      data-slot="dropdown-item-indicator"
      :class="cn(ui.itemIndicator(), override?.itemIndicator)"
    >
      <Icon :name="checkedIcon" />
    </DropdownMenuItemIndicator>

    <Icon v-if="!!item.loading" :name="loadingIcon" :class="cn(ui.loading(), override?.loading)" />
    <Icon v-if="item.icon" :name="item.icon" :class="cn(ui.itemIcon(), override?.itemIcon)" />

    <label data-slot="dropdown-item-label" :class="cn(ui.itemLabel(), override?.itemLabel)">
      {{ item.label }}
      <Icon
        v-if="item.target === '_blank' && item.rel === 'noopener noreferrer'"
        :name="externalIcon"
        :class="cn(ui.itemExternalIcon(), override?.itemExternalIcon)"
      />
    </label>

    <span data-slot="dropdown-item-command" :class="cn(ui.itemCommand(), override?.itemCommand)">
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
  </DefineDropdownItem>

  <DropdownMenuPortal v-bind="portalProps">
    <component
      :is="sub ? DropdownMenuSubContent : DropdownMenuContent"
      v-bind="forwarded"
      :data-slot="sub ? 'dropdown-sub-content' : 'dropdown-content'"
      :class="cn(ui.content({ indent: !!sub }))"
    >
      <slot name="top" />

      <div data-slot="dropdown-viewport" :class="cn(ui.viewport(), override?.viewport)">
        <DropdownMenuGroup
          v-for="(group, groupIdx) in items" :key="`g-${groupIdx}`"
          data-slot="dropdown-group"
          :class="cn(ui.group(), override?.group)"
        >
          <template v-for="(item, itemIdx) in group" :key="`g-${groupIdx}-${itemIdx}`">
            <DropdownMenuLabel
              v-if="item.type === 'label'"
              data-slot="dropdown-label"
              :class="cn(ui.label({ indent }), override?.label)"
            >
              <!-- @vue-ignore -->
              <ReuseDropdownItem :item="item" />
            </DropdownMenuLabel>

            <DropdownMenuSeparator
              v-else-if="item.type === 'separator'"
              data-slot="dropdown-separator"
              :class="cn(ui.separator(), override?.separator)"
            />

            <DropdownMenuSub v-else-if="!!item.children?.length">
              <DropdownMenuSubTrigger
                data-slot="dropdown-sub-trigger"
                :disabled="item.disabled"
                :text-value="item.value"
                :class="cn(ui.item({ indent }), override?.item)"
              >
                <!-- @vue-ignore -->
                <ReuseDropdownItem :item="item" />
              </DropdownMenuSubTrigger>

              <DropdownSubContent
                v-bind="{ ...$attrs, ...props }"
                :items="item.children"
                side="right"
                sub
              />
            </DropdownMenuSub>

            <DropdownMenuCheckboxItem
              v-else-if="item.type === 'checkbox'"
              :model-value="item.checked"
              data-slot="dropdown-checkbox-item"
              :disabled="item.disabled"
              :text-value="item.value"
              :class="cn(ui.item({ indent }), override?.item)"
              @update:model-value="item.onCheck"
              @select="item.onSelect"
            >
              <!-- @vue-ignore -->
              <ReuseDropdownItem :item="item" />
            </DropdownMenuCheckboxItem>

            <DropdownMenuItem
              v-else
              data-slot="dropdown-item"
              :disabled="item.disabled"
              :text-value="item.value"
              :class="cn(ui.item({ indent }), override?.item)"
              @select="item.onSelect"
            >
              <!-- @vue-ignore -->
              <ReuseDropdownItem :item="item" />

              <LinkOverlay v-if="!!item.href" :href="item.href" :target="item.target" :rel="item.rel" :as-child="!!$slots['link-overlay']">
                <slot name="link-overlay" />
              </LinkOverlay>
            </DropdownMenuItem>
          </template>
        </DropdownMenuGroup>
      </div>

      <slot name="bottom" />

      <DropdownMenuArrow
        v-if="!!arrow"
        v-bind="typeof arrow === 'object' ? arrow : {}"
        data-slot="dropdown-arrow"
        :class="cn(ui.arrow(), override?.arrow)"
      />
    </component>
  </DropdownMenuPortal>
</template>
