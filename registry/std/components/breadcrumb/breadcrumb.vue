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
  <Primitive v-bind="delegated" :class="cn(ui.root(), props.ui?.root, props.class)" data-slot="breadcrumb">
    <ul :class="cn(ui.list(), props.ui?.list)" data-slot="breadcrumb-list">
      <li v-for="(item, index) in items" :key="index" :class="cn(ui.item(), props.ui?.item)" data-slot="breadcrumb-item">
        <slot name="item" v-bind="{ item, index }">
          <Primitive
            :as="item.to ? 'a' : 'span'"
            :href="item.to"
            :class="cn(ui.link({
              disabled: item.disabled,
              to: !!item.to,
              active: items && index === items?.length - 1,
            }), props.ui?.link)"
            data-slot="breadcrumb-link"
          >
            <Icon v-if="item.icon" :name="item.icon" :class="cn(ui.icon(), props.ui?.icon)" />
            {{ item.label }}
          </Primitive>
        </slot>
        <slot v-if="items && index < items.length - 1" name="separator" v-bind="{ item, index }">
          <Icon v-if="separatorIcon" :name="separatorIcon" :class="cn(ui.separatorIcon(), props.ui?.separatorIcon)" />
          <span v-else :class="cn(ui.separator(), props.ui?.separator)" data-slot="breadcrumb-separator">{{ separator }}</span>
        </slot>
      </li>
    </ul>
  </Primitive>
</template>
