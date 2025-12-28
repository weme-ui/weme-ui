<script lang="ts" setup>
import type { StackProps } from './stack.props'
import { reactiveOmit } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { getChildrenSlots } from '~/utils/slots'
import { cn } from '~/utils/styles'
import { useStackStyle } from './stack.style'

const props = withDefaults(defineProps<StackProps>(), {
  orientation: 'vertical',
})

const slots = defineSlots<{
  default: () => any
  separator: () => any
}>()

const delegated = reactiveOmit(props, 'class', 'ui', 'orientation')

const children = computed(() => {
  return getChildrenSlots(slots.default?.())
})
const separator = computed(() => {
  const children = getChildrenSlots(slots.separator?.())

  return children?.length
    ? children[0]
    : undefined
})

const ui = computed(() => useStackStyle({
  orientation: props.orientation,
}))
</script>

<template>
  <Primitive v-bind="delegated" :data-orientation="orientation" :class="cn(ui.root(), props.ui?.root, props.class)" data-slot="root">
    <template v-for="(child, index) in children" :key="index">
      <component
        :is="child"
        :class="cn(ui.item(), props.ui?.item)"
        :data-order="index === 0
          ? 'first'
          : index === children.length - 1
            ? 'last'
            : 'middle'"
        data-slot="item"
      />

      <component
        :is="separator"
        v-if="separator && index < children.length - 1"
        :orientation="orientation === 'vertical' ? 'horizontal' : 'vertical'"
        :class="cn(ui.separator(), props.ui?.separator)"
        data-slot="separator"
      />
    </template>
  </Primitive>
</template>
