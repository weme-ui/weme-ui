<script lang="ts" setup>
import type { EmptyProps } from './empty.props'
import { reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useEmptyStyle } from './empty.style'

const props = withDefaults(defineProps<EmptyProps>(), {
  size: 'md',
})

const delegated = reactivePick(props, 'as', 'asChild')

const iconMap = {
  default: {
    empty: 'weme:empty',
    notfound: 'weme:notfound',
    forbidden: 'weme:forbidden',
    search: 'weme:search',
  },
  simple: {
    empty: 'lucide:inbox',
    notfound: 'lucide:frown',
    forbidden: 'lucide:construction',
    search: 'lucide:search',
  },
}

const resolvedIcon = computed(() => {
  if (props.icon) {
    return props.icon
  }
  else if (props.src || !props.type) {
    return null
  }

  return props.simple
    ? iconMap.simple[props.type]
    : iconMap.default[props.type]
})

const ui = computed(() => useEmptyStyle(props))
</script>

<template>
  <Primitive v-bind="delegated" :class="cn(ui.base(), props.class, props.ui?.base)">
    <slot name="image">
      <Icon v-if="resolvedIcon" :name="resolvedIcon" :class="cn(ui.image(), props.ui?.image)" />
      <img v-else-if="src" :src="src" :class="cn(ui.image(), props.ui?.image)">
    </slot>

    <p v-if="description" :class="cn(ui.description(), props.ui?.description)">
      {{ description }}
    </p>

    <div v-if="$slots.default">
      <slot />
    </div>
  </Primitive>
</template>
