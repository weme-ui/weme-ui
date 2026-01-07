<script lang="ts" setup>
import type { CardProps } from './card.props'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useCardStyle } from './card.style'

const props = withDefaults(defineProps<CardProps>(), {
  variant: 'normal',
  size: 'md',
  radius: 'lg',
  translucent: false,
})

const ui = computed(() => useCardStyle(props))
</script>

<template>
  <Primitive :as="as" data-slot="card" :class="cn(ui.root(), props.ui?.root, props.class)">
    <slot name="start" />
    <div data-slot="card-wrapper" :class="cn(ui.wrapper(), props.ui?.wrapper)">
      <slot name="header">
        <div v-if="!!$slots.title || !!title || !!$slots.description || !!description" data-slot="card-header" :class="cn(ui.header(), props.ui?.header)">
          <slot v-if="!!$slots.icon || !!icon" name="icon">
            <Icon v-if="!!icon" :name="icon" :class="cn(ui.headerIcon(), props.ui?.headerIcon)" />
          </slot>
          <div class="flex-1">
            <slot v-if="!!$slots.title || !!title" name="title">
              <h3 data-slot="card-title" :class="cn(ui.headerTitle(), props.ui?.headerTitle)">
                {{ title }}
              </h3>
            </slot>
            <slot v-if="!!$slots.description || !!description" name="description">
              <p data-slot="card-description" :class="cn(ui.headerDescription(), props.ui?.headerDescription)">
                {{ description }}
              </p>
            </slot>
          </div>
          <slot name="action" />
        </div>
      </slot>
      <div data-slot="card-body" :class="cn(ui.body(), props.ui?.body)">
        <slot />
      </div>
      <div v-if="!!$slots.footer" data-slot="card-footer" :class="cn(ui.footer(), props.ui?.footer)">
        <slot name="footer" />
      </div>
    </div>
    <slot name="end" />
  </Primitive>
</template>
