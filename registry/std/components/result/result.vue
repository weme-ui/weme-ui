<script lang="ts" setup>
import type { ResultProps } from './result.props'
import { reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useResultStyle } from './result.style'

const props = withDefaults(defineProps<ResultProps>(), { size: 'md' })
const delegated = reactivePick(props, 'as', 'asChild')
const ui = computed(() => useResultStyle(props))
</script>

<template>
  <Primitive v-bind="delegated" data-slot="result" :class="cn(ui.root(), props.ui?.root, props.class)">
    <slot name="indicator">
      <Icon v-if="icon" :name="icon" :class="cn(ui.indicator(), props.ui?.indicator)" />
    </slot>
    <slot name="title">
      <h3 v-if="title" data-slot="result-title" :class="cn(ui.title(), props.ui?.title)">
        {{ title }}
      </h3>
    </slot>
    <slot name="description">
      <p v-if="description" data-slot="result-description" :class="cn(ui.description(), props.ui?.description)">
        {{ description }}
      </p>
    </slot>
    <slot />
  </Primitive>
</template>
