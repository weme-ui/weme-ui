<script lang="ts" setup>
import type { DataListProps } from './data-list.props'
import { reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import { useDataListStyle } from './data-list.style'

const props = withDefaults(defineProps<DataListProps>(), {
  as: 'dl',
  variant: 'normal',
  size: 'md',
  orientation: 'vertical',
  items: () => [],
})

const delegated = reactivePick(props, 'as', 'asChild')
const ui = computed(() => useDataListStyle(props))
</script>

<template>
  <Primitive
    v-bind="delegated"
    :data-orientation="orientation"
    :class="cn(ui.root(), props.ui?.root, props.class)"
    data-slot="root"
  >
    <div v-for="(item, index) in items" :key="index" :class="cn(ui.item(), props.ui?.item, item.class)" data-slot="item">
      <dt :class="cn(ui.label(), props.ui?.label, item.ui?.label)" data-slot="label">
        <slot name="label" v-bind="{ item, index }">
          {{ item.label }}
        </slot>
      </dt>
      <dd :class="cn(ui.value(), props.ui?.value, item.ui?.value)" data-slot="value">
        <slot name="value" v-bind="{ item, index }">
          {{ item.value }}
        </slot>
      </dd>
    </div>
  </Primitive>
</template>
