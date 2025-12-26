<script lang="ts" setup>
import type { OverflowProps } from './overflow.props'
import { reactiveOmit } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed, useSlots } from 'vue'
import { getChildrenSlots } from '~/utils/slots'
import { cn } from '~/utils/styles'
import { useOverflowStyle } from './overflow.style'

const props = withDefaults(defineProps<OverflowProps>(), {
  gap: 'sm',
})

const slots = useSlots()
const delegated = reactiveOmit(props, 'class', 'ui', 'max', 'gap')

const children = computed(() => {
  return getChildrenSlots(slots.default?.())
})

const collapsed = computed(() => props.max && (children.value?.length || 0) > props.max)
const list = computed(() => collapsed.value ? children.value?.slice(0, props.max) : children.value)
const number = computed(() => collapsed.value ? (children.value?.length || 0) - (props.max || 0) : 0)

const ui = computed(() => useOverflowStyle({
  gap: props.gap,
}))
</script>

<template>
  <Primitive v-bind="delegated" data-slot="root" :class="cn(ui.root(), props.ui?.root, props.class)">
    <template v-for="(item, index) in list" :key="index">
      <component :is="item" :class="cn(ui.item(), props.ui?.item)" data-slot="item" />
    </template>

    <slot name="overflow" :number="number">
      <span v-if="!!collapsed" data-slot="overflow" :class="cn(ui.overflow(), props.ui?.overflow)">{{ number }}+</span>
    </slot>
  </Primitive>
</template>
