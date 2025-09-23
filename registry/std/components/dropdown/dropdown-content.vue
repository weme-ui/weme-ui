<script lang="ts" setup>
import type { DropdownContentProps } from './dropdown-content.props'
import type { DropdownItem } from './dropdown.props'
import { createReusableTemplate, reactiveOmit } from '@vueuse/core'
import { DropdownMenu } from 'reka-ui/namespaced'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import Kbd from '../kbd/kbd.vue'
import DropdownSubContent from './dropdown-content.vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DropdownContentProps>(), {
  sideOffset: 8,
  collisionPadding: 8,
})

const delegated = reactiveOmit(props, 'items', 'class', 'override', 'ui')

const groups = computed<DropdownItem[][]>(() => {
  if (!props.items?.length) {
    return []
  }

  return (Array.isArray(props.items) && Array.isArray(props.items[0]))
    ? props.items as DropdownItem[][]
    : [props.items]
})

const [
  DefineDropdownMenuItem,
  ReuseDropdownMenuItem,
] = createReusableTemplate<{ item: DropdownItem }>()

function pick<D extends object, K extends keyof D>(
  data: D,
  keys: K[],
): Pick<D, K> {
  const result = {} as Pick<D, K>

  for (const key of keys) {
    result[key] = data[key]
  }

  return result
}
</script>

<template>
  <DefineDropdownMenuItem v-slot="{ item }">
    <DropdownMenu.ItemIndicator v-if="item.type === 'checkbox'" as-child>
      <span :class="cn(ui.indicator(), override?.indicator)">
        <Icon name="check" />
      </span>
    </DropdownMenu.ItemIndicator>

    <Icon v-if="item.loading" name="loading" :class="cn(ui.loading(), override?.loading)" />
    <Icon v-else-if="item.icon" :name="item.icon" :class="(cn(ui.icon(), override?.icon))" />

    <label v-if="item.label" class="flex-(~ 1 y-center) gap-1 truncate">
      {{ item.label }}
      <Icon v-if="item.target === '_blank'" name="external" :class="cn(ui.external(), override?.external)" />
    </label>

    <span :class="cn(ui.extras(), override?.extras)">
      {{ item.append }}
      <Icon v-if="item.children?.length" name="right" />
      <Kbd
        v-for="(value, idx) in item.shortcuts"
        :key="idx"
        v-bind="typeof value === 'string' ? { value } : value"
      />
    </span>
  </DefineDropdownMenuItem>

  <DropdownMenu.Portal v-bind="portalProps">
    <component
      :is="sub ? DropdownMenu.SubContent : DropdownMenu.Content"
      v-bind="{ ...delegated, ...$attrs }"
      :class="cn(ui.base(), props.class, override?.base)"
    >
      <slot name="top" />

      <div :class="cn(ui.viewport(), override?.viewport)">
        <DropdownMenu.Group v-for="(group, groupIdx) in groups" :key="`g-${groupIdx}`" :class="cn(ui?.group(), override?.group)">
          <template v-for="(item, idx) in group" :key="`g-${groupIdx}-${idx}`">
            <DropdownMenu.Label v-if="item.type === 'label'" :class="cn(ui?.label(), override?.label)">
              <ReuseDropdownMenuItem :item="item" />
            </DropdownMenu.Label>

            <DropdownMenu.Separator v-else-if="item.type === 'separator'" :class="cn(ui?.separator(), override?.separator)" />

            <DropdownMenu.Sub v-else-if="item.children?.length">
              <DropdownMenu.SubTrigger
                :disabled="item.disabled"
                :text-value="item.value"
                :class="cn(ui?.item(), override?.item)"
              >
                <ReuseDropdownMenuItem :item="item" />
              </DropdownMenu.SubTrigger>

              <DropdownSubContent
                v-bind="{ ...$attrs, ...props }"
                :class="props.class"
                :items="item.children"
                side="right"
                sub
              />
            </DropdownMenu.Sub>

            <DropdownMenu.CheckboxItem
              v-else-if="item.type === 'checkbox'"
              :model-value="item.checked"
              :disabled="item.disabled"
              :text-value="item.value"
              :class="cn(ui?.item(), override?.item)"
              @update:model-value="item.onCheck"
              @select="item.onSelect"
            >
              <ReuseDropdownMenuItem :item="item" />
            </DropdownMenu.CheckboxItem>

            <DropdownMenu.Item
              v-else
              :disabled="item.disabled"
              :text-value="item.value"
              :class="cn(ui?.item(), override?.item)"
              as-child
              @select="item.onSelect"
            >
              <NuxtLink v-bind="pick(item, ['href', 'target', 'rel'])" as="button">
                <ReuseDropdownMenuItem :item="item" />
              </NuxtLink>
            </DropdownMenu.Item>
          </template>
        </DropdownMenu.Group>
      </div>

      <slot />
      <slot name="bottom" />
    </component>
  </DropdownMenu.Portal>
</template>
