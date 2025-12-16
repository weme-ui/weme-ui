<script lang="ts" setup>
import type { TableProps } from './table.props'
import { reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import { useTableStyle } from './table.style'

const props = defineProps<TableProps>()
const delegated = reactivePick(props, 'as', 'asChild')
const ui = computed(() => useTableStyle(props))
</script>

<template>
  <Primitive v-bind="delegated" :class="cn(ui.base(), props.ui?.base, props.class)">
    <slot />
  </Primitive>
</template>
