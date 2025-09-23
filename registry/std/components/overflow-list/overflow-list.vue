<script lang="ts" setup>
import type { OverflowListProps } from './overflow-list.props'
import { reactiveOmit } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import { useOverflowListStyle } from './overflow-list.style'

const props = defineProps<OverflowListProps>()
const delegated = reactiveOmit(props, 'class', 'ui', 'max', 'gap')

const slots = useSlots()
const children = slots.default?.()

const collapsed = computed(() => props.max && (children?.length || 0) > props.max)
const list = computed(() => collapsed.value ? children?.slice(0, props.max) : children)
const number = computed(() => collapsed.value ? (children?.length || 0) - (props.max || 0) : 0)

const ui = computed(() => useOverflowListStyle(props))
</script>

<template>
  <Primitive v-bind="delegated" :class="cn(ui.base(), props.class, props.ui?.base)">
    <template v-for="(item, index) in list" :key="index">
      <component :is="item" :class="cn(ui.item(), props.ui?.item)" />
    </template>

    <slot v-if="collapsed" name="overflow" :number="number">
      {{ number }}+
    </slot>
  </Primitive>
</template>
