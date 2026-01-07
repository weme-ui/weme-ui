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
  <Primitive v-bind="delegated" data-slot="stat" :class="cn(ui.root(), props.ui?.root, props.class)">
    <dt data-slot="stat-label" :class="cn(ui.label(), props.ui?.label)">
      <slot name="label">
        {{ label }}
      </slot>
    </dt>
    <dd data-slot="stat-value" :class="cn(ui.value(), props.ui?.value)">
      <slot name="value">
        {{ value }}
      </slot>
    </dd>
    <dt v-if="trend !== 'none'" data-slot="stat-indicator" :class="cn(ui.indicator(), props.ui?.indicator)">
      <slot name="indicator" v-bind="{ trend }">
        <Icon
          :name="trend === 'up' ? trendUpIcon : trendDownIcon"
          :class="cn(ui.indicatorIcon(), props.ui?.indicatorIcon)"
        />
      </slot>
      <span data-slot="stat-indicator-value" :class="cn(ui.indicatorValue(), props.ui?.indicatorValue)">
        <slot name="indicatorValue">
          {{ indicatorValue }}
        </slot>
      </span>
    </dt>
    <p v-if="$slots.description || description" data-slot="stat-description" :class="cn(ui.description(), props.ui?.description)">
      <slot name="description">
        {{ description }}
      </slot>
    </p>
    <slot />
  </Primitive>
</template>
