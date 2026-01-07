<script lang="ts" setup>
import type { BreadcrumbProps } from './breadcrumb.props'
import { reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useBreadcrumbStyle } from './breadcrumb.style'

const props = withDefaults(defineProps<BreadcrumbProps>(), {
  as: 'nav',
  size: 'md',
  separator: '/',
})

const delegated = reactivePick(props, 'as', 'asChild')

const ui = computed(() => useBreadcrumbStyle({
  size: props.size,
}))
</script>

<template>
  <Primitive
    v-bind="delegated"
    data-slot="breadcrumb"
    :class="cn(ui.root(), props.ui?.root, props.class)"
  >
    <ul data-slot="breadcrumb-list" :class="cn(ui.list(), props.ui?.list)">
      <li
        v-for="(item, index) in items"
        :key="index"
        data-slot="breadcrumb-item"
        :class="cn(ui.item(), props.ui?.item)"
      >
        <slot name="item" v-bind="{ item, index }">
          <Primitive
            :as="item.to ? 'a' : 'span'"
            data-slot="breadcrumb-link"
            :href="item.to"
            :class="cn(ui.link({
              disabled: item.disabled,
              to: !!item.to,
              active: items && index === items?.length - 1,
            }), props.ui?.link)"
          >
            <Icon v-if="item.icon" :name="item.icon" :class="cn(ui.icon(), props.ui?.icon)" />
            {{ item.label }}
          </Primitive>
        </slot>
        <slot v-if="items && index < items.length - 1" name="separator" v-bind="{ item, index }">
          <Icon v-if="separatorIcon" :name="separatorIcon" :class="cn(ui.separatorIcon(), props.ui?.separatorIcon)" />
          <span v-else data-slot="breadcrumb-separator" :class="cn(ui.separator(), props.ui?.separator)">{{ separator }}</span>
        </slot>
      </li>
    </ul>
  </Primitive>
</template>
