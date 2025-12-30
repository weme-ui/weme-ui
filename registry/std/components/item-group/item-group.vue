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
  <Primitive v-bind="delegated" :class="cn(ui.root(), props.ui?.root, props.class)" role="group" data-slot="item-group">
    <div
      v-if="!!$slots.title || !!title || !!$slots.description || !!description"
      :class="cn(ui.header(), props.ui?.header)"
      data-slot="item-group-header"
    >
      <div :class="cn(ui.titleWrapper(), props.ui?.titleWrapper)" data-slot="item-group-title-wrapper">
        <slot name="title">
          <h3 v-if="title" :class="cn(ui.title(), props.ui?.title)" data-slot="item-group-title">
            {{ title }}
          </h3>
          <p v-if="description" :class="cn(ui.description(), props.ui?.description)" data-slot="item-group-description">
            {{ description }}
          </p>
        </slot>
      </div>
      <div v-if="$slots.actions" :class="cn(ui.actions(), props.ui?.actions)" data-slot="item-group-actions">
        <slot name="actions" />
      </div>
    </div>
    <div :class="cn(ui.body(), props.ui?.body)" data-slot="item-group-body">
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
    <div v-if="$slots.footer" :class="cn(ui.footer(), props.ui?.footer)" data-slot="item-group-footer">
      <slot name="footer" />
    </div>
  </Primitive>
</template>
