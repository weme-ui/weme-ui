<script lang="ts" setup>
import type { SkeletonProps } from './skeleton.props'
import { reactiveOmit } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import { useSkeletonStyle } from './skeleton.style'

const props = defineProps<SkeletonProps>()
const delegated = reactiveOmit(props, 'class')

const ui = computed(() => useSkeletonStyle(props))
</script>

<template>
  <Primitive
    v-bind="delegated"
    :class="cn(ui, props.class)"
  >
    <slot />
  </Primitive>
</template>
