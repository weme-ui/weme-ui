<script lang="ts" setup>
import type { ItemGroupProps } from './item-group.props'
import { reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed, useSlots } from 'vue'
import { getChildrenSlots } from '~/utils/slots'
import { cn } from '~/utils/styles'
import { useItemGroupStyle } from './item-group.style'

const props = withDefaults(defineProps<ItemGroupProps>(), {
  variant: 'card',
  size: 'md',
  radius: 'lg',
})

const slots = useSlots()
const delegated = reactivePick(props, 'as', 'asChild')
const ui = computed(() => useItemGroupStyle(props))

const children = computed(() => {
  return getChildrenSlots(slots.default?.())
})
</script>

<template>
  <Primitive v-bind="delegated" data-slot="item-group" role="group" :class="cn(ui.root(), props.ui?.root, props.class)">
    <div
      v-if="!!$slots.title || !!title || !!$slots.description || !!description"
      data-slot="item-group-header"
      :class="cn(ui.header(), props.ui?.header)"
    >
      <div data-slot="item-group-title-wrapper" :class="cn(ui.titleWrapper(), props.ui?.titleWrapper)">
        <slot name="title">
          <h3 v-if="title" data-slot="item-group-title" :class="cn(ui.title(), props.ui?.title)">
            {{ title }}
          </h3>
          <p v-if="description" data-slot="item-group-description" :class="cn(ui.description(), props.ui?.description)">
            {{ description }}
          </p>
        </slot>
      </div>
      <div v-if="$slots.actions" data-slot="item-group-actions" :class="cn(ui.actions(), props.ui?.actions)">
        <slot name="actions" />
      </div>
    </div>
    <div data-slot="item-group-body" :class="cn(ui.body(), props.ui?.body)">
      <template v-for="(child, index) in children" :key="index">
        <component
          :is="child"
          :variant="variant === 'card' ? index === children.length - 1 ? 'plain' : 'underline' : 'outline'"
          :size="size"
          :align="align"
          :radius="variant === 'card' ? 'none' : radius"
          :class="cn('group', ui.item(), props.ui?.item, child.props?.class)"
        />
      </template>
    </div>
    <div v-if="$slots.footer" data-slot="item-group-footer" :class="cn(ui.footer(), props.ui?.footer)">
      <slot name="footer" />
    </div>
  </Primitive>
</template>
