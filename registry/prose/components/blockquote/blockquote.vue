<script lang="ts" setup>
import type { BlockquoteProps } from './blockquote.props'
import { reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
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
  <figure :class="cn(ui.base(), props.ui?.base, props.class)">
    <div v-if="$slots.icon" :class="cn(ui.icon(), props.ui?.icon)">
      <slot name="icon" />
    </div>
    <Primitive v-bind="delegated" :class="cn(ui.content(), props.ui?.content)">
      <slot />
    </Primitive>
    <figcaption v-if="$slots.caption" :class="cn(ui.caption(), props.ui?.caption)">
      <slot name="caption" />
    </figcaption>
  </figure>
</template>
