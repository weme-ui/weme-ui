<script lang="ts" setup>
import type { OverflowProps } from './overflow.props'
import { reactiveOmit } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import { useOverflowStyle } from './overflow.style'

const props = withDefaults(defineProps<OverflowProps>(), {
  gap: 'sm',
})

const delegated = reactiveOmit(props, 'class', 'ui', 'max', 'gap')

const slots = useSlots()
const children = slots.default?.()

const collapsed = computed(() => props.max && (children?.length || 0) > props.max)
const list = computed(() => collapsed.value ? children?.slice(0, props.max) : children)
const number = computed(() => collapsed.value ? (children?.length || 0) - (props.max || 0) : 0)

const ui = computed(() => useOverflowStyle(props))
</script>

<template>
  <Primitive v-bind="delegated" :class="cn(ui.base(), props.ui?.base, props.class)">
    <template v-for="(item, index) in list" :key="index">
      <component :is="item" :class="cn(ui.item(), props.ui?.item)" />
    </template>

    <slot v-if="collapsed" name="overflow" :number="number">
      <span :class="cn(ui.overflow(), props.ui?.overflow)">{{ number }}+</span>
    </slot>
  </Primitive>
</template>
