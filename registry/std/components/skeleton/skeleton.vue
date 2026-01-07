<script lang="ts" setup>
import type { SkeletonProps } from './skeleton.props'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import { useSkeletonStyle } from './skeleton.style'

const props = withDefaults(defineProps<SkeletonProps>(), { lines: 1, variant: 'rect', radius: 'md' })
const ui = computed(() => useSkeletonStyle(props))
</script>

<template>
  <div v-if="variant === 'text'" data-slot="skeleton-text" :class="cn(ui.textWrapper(), props.ui?.textWrapper, props.class)">
    <template v-for="line in lines" :key="line">
      <Primitive
        :as="as"
        data-slot="skeleton-text-line"
        :class="cn(ui.base({ lineEnd: lines > 1 && line === lines }), props.ui?.base)"
      />
    </template>
  </div>
  <Primitive v-else :as="as" data-slot="skeleton" :class="cn(ui.base(), props.ui?.base, props.class)" />
</template>
