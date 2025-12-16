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
  <Primitive v-bind="delegated" :class="cn(ui.base(), props.ui?.base, props.class)">
    <div :class="cn(ui.header(), props.ui?.header)">
      <div :class="cn(ui.titleWrapper(), props.ui?.titleWrapper)">
        <slot name="title">
          <h3 v-if="title" :class="cn(ui.title(), props.ui?.title)">
            {{ title }}
          </h3>
          <p v-if="description" :class="cn(ui.description(), props.ui?.description)">
            {{ description }}
          </p>
        </slot>
      </div>
      <div v-if="$slots.actions" :class="cn(ui.actions(), props.ui?.actions)">
        <slot name="actions" />
      </div>
    </div>
    <div :class="cn(ui.body(), props.ui?.body)">
      <template v-for="(child, index) in children" :key="index">
        <component
          :is="child"
          :variant="variant === 'card' ? index === children.length - 1 ? 'plain' : 'underline' : 'outline'"
          :size="size"
          :ui="{
            item: cn(ui.item(), props.ui?.item),
          }"
          radius="none"
          class="group"
        />
      </template>
    </div>
    <div v-if="$slots.footer" :class="cn(ui.footer(), props.ui?.footer)">
      <slot name="footer" />
    </div>
  </Primitive>
</template>
