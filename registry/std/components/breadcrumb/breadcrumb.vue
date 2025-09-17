<script lang="ts" setup>
import type { BreadcrumbProps } from './breadcrumb.props'
import { reactiveOmit as reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useBreadcrumbStyle } from './breadcrumb.style'

const props = withDefaults(defineProps<BreadcrumbProps>(), {
  as: 'ul',
  separator: '/',
})

const delegated = reactivePick(props, 'as', 'asChild')
const ui = computed(() => useBreadcrumbStyle(props))

const isLatest = (index: number) => props.items && index === props.items.length - 1
</script>

<template>
  <Primitive v-bind="delegated" :class="cn(ui.base(), props.class, props.ui?.base)">
    <li v-for="(item, index) in items" :key="index" :class="cn(ui.item(), item.class, props.ui?.item)">
      <slot name="item" v-bind="{ item, index }">
        <Icon v-if="item.icon" :name="item.icon" :class="cn(ui.icon(), props.ui?.icon)" />
        <a v-if="item.to" :href="item.to" :class="cn(ui.label({ latest: isLatest(index) }), props.ui?.label)">
          {{ item.label }}
        </a>
        <span v-else :class="cn(ui.label({ latest: isLatest(index) }), props.ui?.label)">
          {{ item.label }}
        </span>
      </slot>

      <span v-if="separator && !isLatest(index)" :class="cn(ui.separator(), props.ui?.separator)">
        <slot name="separator">
          {{ separator }}
        </slot>
      </span>
    </li>
  </Primitive>
</template>
