<script lang="ts" setup>
import type { EmptyStateProps } from './empty-state.props'
import { reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useEmptyStateStyle } from './empty-state.style'

const props = withDefaults(defineProps<EmptyStateProps>(), { size: 'md' })
const delegated = reactivePick(props, 'as', 'asChild')
const ui = computed(() => useEmptyStateStyle(props))
</script>

<template>
  <Primitive v-bind="delegated" :class="cn(ui.base(), props.ui?.base, props.class)">
    <slot name="indicator">
      <Icon v-if="icon" :name="icon" :class="cn(ui.indicator(), props.ui?.indicator)" />
    </slot>
    <slot name="title">
      <h3 v-if="title" :class="cn(ui.title(), props.ui?.title)">
        {{ title }}
      </h3>
    </slot>
    <slot name="description">
      <p v-if="description" :class="cn(ui.description(), props.ui?.description)">
        {{ description }}
      </p>
    </slot>
    <slot />
  </Primitive>
</template>
