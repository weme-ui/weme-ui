<script lang="ts" setup>
import type { BlockquoteProps } from './blockquote.props'
import { reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed, useSlots } from 'vue'
import { cn } from '~/utils/styles'
import { useBlockquoteStyle } from './blockquote.style'

const props = withDefaults(defineProps<BlockquoteProps>(), {
  as: 'blockquote',
  color: 'primary',
  variant: 'solid',
  align: 'start',
})

const hasIcon = computed(() => {
  return !!useSlots().icon?.()
})

const delegated = reactivePick(props, 'as', 'asChild')
const ui = computed(() => useBlockquoteStyle({
  ...props,
  icon: hasIcon.value,
}))
</script>

<template>
  <figure :class="cn(ui.root(), props.ui?.root, props.class)" data-slot="root">
    <div v-if="$slots.icon" :class="cn(ui.icon(), props.ui?.icon)" data-slot="icon">
      <slot name="icon" />
    </div>
    <Primitive v-bind="delegated" :class="cn(ui.content(), props.ui?.content)" data-slot="content">
      <slot />
    </Primitive>
    <figcaption v-if="$slots.caption" :class="cn(ui.caption(), props.ui?.caption)" data-slot="caption">
      <slot name="caption" />
    </figcaption>
  </figure>
</template>
