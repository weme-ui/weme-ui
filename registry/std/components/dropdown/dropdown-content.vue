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
})

const emits = defineEmits<DropdownContentEmits>()
const delegated = reactiveOmit(props, 'class', 'ui', 'items', 'checkedIcon', 'loadingIcon', 'externalIcon', 'portal', 'arrow', 'sub')
const forwarded = useForwardPropsEmits(delegated, emits)

const items = computed<T[][]>(() => {
  if (!props.items?.length)
    return []

  return Array.isArray(props.items) && Array.isArray(props.items[0])
    ? props.items as T[][]
    : [props.items] as T[][]
})

const [
  DefineDropdownMenuItem,
  ReuseDropdownMenuItem,
] = createReusableTemplate<{ item: T }>()
</script>

<template>
  <DefineDropdownMenuItem v-slot="{ item }">
    <DropdownMenuItemIndicator
      v-if="item.type === 'checkbox' || item.type === 'radio'"
      :class="cn(ui.itemIndicator(), override?.itemIndicator)"
    >
      <Icon :name="checkedIcon" />
    </DropdownMenuItemIndicator>

    <Icon v-if="!!item.loading" :name="loadingIcon" :class="cn(ui.loading(), override?.loading)" />
    <Icon v-if="item.icon" :name="item.icon" :class="cn(ui.itemIcon(), override?.itemIcon)" />

    <label :class="cn(ui.itemLabel(), override?.itemLabel)">
      {{ item.label }}
      <Icon
        v-if="item.target === '_blank' && item.rel === 'noopener noreferrer'"
        :name="externalIcon"
        :class="cn(ui.itemExternalIcon(), override?.itemExternalIcon)"
      />
    </label>

    <span :class="cn(ui.itemCommand(), override?.itemCommand)">
      {{ item.suffix }}
      <Kbd
        v-for="(value, index) in item.shortcut"
        :key="index"
        v-bind="typeof value === 'string' ? { value } : value"
        size="sm"
      />
      <Icon
        v-if="!!item.children?.length"
        name="right"
        :class="cn(ui.itemArrowIcon(), override?.itemArrowIcon)"
      />
    </span>
  </DefineDropdownMenuItem>

  <DropdownMenuPortal v-bind="portal">
    <component
      :is="sub ? DropdownMenuSubContent : DropdownMenuContent"
      v-bind="forwarded"
      :class="cn(ui.content({ indent: !!sub }))"
    >
      <slot name="top" />

      <div :class="cn(ui.viewport(), override?.viewport)">
        <DropdownMenuGroup
          v-for="(group, groupIdx) in items" :key="`g-${groupIdx}`"
          :class="cn(ui.group(), override?.group)"
        >
          <template v-for="(item, itemIdx) in group" :key="`g-${groupIdx}-${itemIdx}`">
            <DropdownMenuLabel
              v-if="item.type === 'label'"
              :class="cn(ui.label(), override?.label)"
            >
              <!-- @vue-ignore -->
              <ReuseDropdownMenuItem :item="item" />
            </DropdownMenuLabel>

            <DropdownMenuSeparator
              v-else-if="item.type === 'separator'"
              :class="cn(ui.separator(), override?.separator)"
            />

            <DropdownMenuSub v-else-if="!!item.children?.length">
              <DropdownMenuSubTrigger :disabled="item.disabled" :text-value="item.value" :class="cn(ui.item(), override?.item)">
                <!-- @vue-ignore -->
                <ReuseDropdownMenuItem :item="item" />
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
              :disabled="item.disabled"
              :text-value="item.value"
              :class="cn(ui.item(), override?.item)"
              @update:model-value="item.onCheck"
              @select="item.onSelect"
            >
              <!-- @vue-ignore -->
              <ReuseDropdownMenuItem :item="item" />
            </DropdownMenuCheckboxItem>

            <DropdownMenuItem
              v-else
              :disabled="item.disabled"
              :text-value="item.value"
              :class="cn(ui.item(), override?.item)"
              @select="item.onSelect"
            >
              <!-- @vue-ignore -->
              <ReuseDropdownMenuItem :item="item" />

              <LinkOverlay
                v-if="item.href"
                :href="item.href"
                :target="item.target"
                :rel="item.rel"
              />
            </DropdownMenuItem>
          </template>
        </DropdownMenuGroup>
      </div>

      <slot name="bottom" />

      <DropdownMenuArrow
        v-if="!!arrow"
        v-bind="typeof arrow === 'object' ? arrow : {}"
        :class="cn(ui.arrow(), override?.arrow)"
      />
    </component>
  </DropdownMenuPortal>
</template>
