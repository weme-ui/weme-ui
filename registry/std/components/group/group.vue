<script lang="ts" setup>
import type { GroupProps } from './group.props'
import { reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed, useSlots } from 'vue'
import { toBoolValue } from '~/utils/props'
import { getChildrenSlots } from '~/utils/slots'
import { cn } from '~/utils/styles'
import { useGroupStyle } from './group.style'

const props = withDefaults(defineProps<GroupProps>(), {
  gap: 'sm',
  grow: false,
})

const slots = useSlots()
const delegated = reactivePick(props, 'as', 'asChild')
const children = computed(() => {
  return getChildrenSlots(slots.default?.())
})

const ui = computed(() => useGroupStyle({
  gap: props.gap,
  grow: toBoolValue(props.grow),
}))
</script>

<template>
  <Primitive v-bind="delegated" data-slot="group" role="group" :class="cn(ui.root(), props.ui?.root, props.class)">
    <template v-for="(child, index) in children" :key="index">
      <component
        :is="child"
        :class="cn(ui.item(), props.ui?.item)"
        :data-order="index === 0
          ? 'first'
          : index === children.length - 1
            ? 'last'
            : 'middle'"
      />
    </template>
  </Primitive>
</template>
