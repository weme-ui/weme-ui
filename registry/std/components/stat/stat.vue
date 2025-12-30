<script lang="ts" setup>
import type { StatProps } from './stat.props'
import { reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useStatStyle } from './stat.style'

const props = withDefaults(defineProps<StatProps>(), {
  as: 'dl',
  trend: 'none',
  size: 'sm',
  trendUpIcon: 'trendUp',
  trendDownIcon: 'trendDown',
})

const delegated = reactivePick(props, 'as', 'asChild')
const ui = computed(() => useStatStyle(props))
</script>

<template>
  <Primitive v-bind="delegated" :class="cn(ui.root(), props.ui?.root, props.class)" data-slot="stat">
    <dt :class="cn(ui.label(), props.ui?.label)" data-slot="stat-label">
      <slot name="label">
        {{ label }}
      </slot>
    </dt>
    <dd :class="cn(ui.value(), props.ui?.value)" data-slot="stat-value">
      <slot name="value">
        {{ value }}
      </slot>
    </dd>
    <dt v-if="trend !== 'none'" :class="cn(ui.indicator(), props.ui?.indicator)" data-slot="stat-indicator">
      <slot name="indicator" v-bind="{ trend }">
        <Icon
          :name="trend === 'up' ? trendUpIcon : trendDownIcon"
          :class="cn(ui.indicatorIcon(), props.ui?.indicatorIcon)"
        />
      </slot>
      <span :class="cn(ui.indicatorValue(), props.ui?.indicatorValue)" data-slot="stat-indicator-value">
        <slot name="indicatorValue">
          {{ indicatorValue }}
        </slot>
      </span>
    </dt>
    <p v-if="$slots.description || description" :class="cn(ui.description(), props.ui?.description)" data-slot="stat-description">
      <slot name="description">
        {{ description }}
      </slot>
    </p>
    <slot />
  </Primitive>
</template>
