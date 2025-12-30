<script lang="ts" setup>
import type { ListProps } from './list.props'
import { reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import { useListStyle } from './list.style'

const props = withDefaults(defineProps<ListProps>(), {
  as: 'ul',
  color: 'primary',
  variant: 'marker',
})

const delegated = reactivePick(props, 'as', 'asChild')
const ui = computed(() => useListStyle(props))
</script>

<template>
  <Primitive v-bind="delegated" role="list" :class="cn(ui.root(), props.ui?.root, props.class)" data-slot="root">
    <li v-for="(item, index) in items" :key="index" :class="cn(ui.item(), item.ui?.item)" data-slot="item">
      <span v-if="item.indicator" :class="cn(ui.indicator(), item.ui?.indicator)" data-slot="indicator">
        <slot name="indicator" v-bind="{ item, index }" />
      </span>
      <slot v-bind="{ item, index }">
        {{ item.text }}
      </slot>
    </li>
  </Primitive>
</template>
