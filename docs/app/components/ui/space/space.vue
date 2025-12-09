<script lang="ts" setup>
import type { SpaceProps, SpaceSlots } from './space.props'
import { reactiveOmit as reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed, useSlots } from 'vue'
import { getChildrenSlots } from '~/utils/slots'
import { cn } from '~/utils/styles'
import { useSpaceStyle } from './space.style'

const props = withDefaults(defineProps<SpaceProps>(), {
  align: 'center',
  orientation: 'horizontal',
  size: 'sm',
  wrap: false,
})

defineSlots<SpaceSlots>()

const slots = useSlots()
const delegated = reactivePick(props, 'as', 'asChild')

const ui = computed(() => useSpaceStyle({
  ...props,
  wrap: !!props.wrap,
}))

const children = computed(() => {
  return getChildrenSlots(slots.default?.())
})

const separator = computed(() => {
  const children = getChildrenSlots(slots.separator?.())

  return children?.length
    ? children[0]
    : undefined
})
</script>

<template>
  <Primitive
    v-bind="delegated"
    :class="cn(ui.base(), props.class, props.ui?.base)"
  >
    <template v-for="(child, index) in children" :key="index">
      <component :is="child" :class="cn(ui.item(), props.ui?.item)" />

      <component
        :is="separator"
        v-if="separator && index < children.length - 1"
        :orientation="props.orientation === 'vertical' ? 'horizontal' : 'vertical'"
        :class="cn(ui.separator(), props.ui?.separator)"
      />
    </template>
  </Primitive>
</template>
