<script lang="ts" setup>
import type { HighlightProps } from './highlight.props'
import { computed } from 'vue'
import { useHighlight } from '~/composables/use-highlight'
import { cn } from '~/utils/styles'
import { useHighlightStyle } from './highlight.style'

const props = withDefaults(defineProps<HighlightProps>(), {
  color: 'primary',
  variant: 'soft',
  radius: 'md',
  ignoreCase: false,
  matchAll: false,
  exactMatch: false,
})

if (typeof props.text !== 'string') {
  throw new TypeError('Highlight text must be a string')
}

const chunks = useHighlight(props)
const ui = computed(() => useHighlightStyle(props))
</script>

<template>
  <template v-for="chunk in chunks" :key="chunk.text">
    <mark v-if="chunk.match" data-highlight :class="cn(ui.mark(), props.class)">{{ chunk.text }}</mark>
    <template v-else>
      {{ chunk.text }}
    </template>
  </template>
</template>
