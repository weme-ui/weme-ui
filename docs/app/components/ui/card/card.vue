<script lang="ts" setup>
import type { CardProps } from './card.props'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useCardStyle } from './card.style'

const props = withDefaults(defineProps<CardProps>(), {
  variant: 'normal',
  radius: 'lg',
  bordered: false,
  translucent: false,
})

const ui = computed(() => useCardStyle(props))
</script>

<template>
  <div :class="cn(ui.base(), props.ui?.base)">
    <div :class="cn(ui.wrapper(), props.ui?.wrapper)">
      <slot name="header">
        <div v-if="title || description" :class="cn(ui.header(), props.ui?.header)">
          <slot v-if="$slots.icon || icon" name="icon">
            <Icon v-if="icon" :name="icon" :class="cn(ui.icon(), props.ui?.icon)" />
          </slot>
          <div class="flex-1">
            <slot v-if="$slots.title || title" name="title">
              <h3 :class="cn(ui.title(), props.ui?.title)">
                {{ title }}
              </h3>
            </slot>
            <slot v-if="$slots.description || description" name="description">
              <p :class="cn(ui.description(), props.ui?.description)">
                {{ description }}
              </p>
            </slot>
          </div>
          <slot name="action" />
        </div>
      </slot>

      <div :class="cn(ui.content(), props.class, props.ui?.content)">
        <slot />
      </div>

      <div v-if="$slots.footer" :class="cn(ui.footer(), props.ui?.footer)">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
