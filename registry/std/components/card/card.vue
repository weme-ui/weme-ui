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
  <Primitive :as="as" :class="cn(ui.base(), props.ui?.base, props.class)">
    <div :class="cn(ui.wrapper(), props.ui?.wrapper)">
      <slot name="start" />
      <slot name="header">
        <div v-if="title || description" :class="cn(ui.header(), props.ui?.header)">
          <slot v-if="$slots.icon || icon" name="icon">
            <Icon v-if="icon" :name="icon" :class="cn(ui.headerIcon(), props.ui?.headerIcon)" />
          </slot>
          <div class="flex-1">
            <slot v-if="$slots.title || title" name="title">
              <h3 :class="cn(ui.headerTitle(), props.ui?.headerTitle)">
                {{ title }}
              </h3>
            </slot>
            <slot v-if="$slots.description || description" name="description">
              <p :class="cn(ui.headerDescription(), props.ui?.headerDescription)">
                {{ description }}
              </p>
            </slot>
          </div>
          <slot name="action" />
        </div>
      </slot>
      <div :class="cn(ui.body(), props.ui?.body)">
        <slot />
      </div>
      <div v-if="$slots.footer" :class="cn(ui.footer(), props.ui?.footer)">
        <slot name="footer" />
      </div>
      <slot name="end" />
    </div>
  </Primitive>
</template>
