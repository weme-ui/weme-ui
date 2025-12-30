<script lang="ts" setup>
import type { HighlightProps } from './highlight.props'
import { useHighlight } from '~/composables/use-highlight'
import Mark from '../mark/mark.vue'

const props = withDefaults(defineProps<HighlightProps>(), {
  ignoreCase: undefined,
  matchAll: undefined,
  exactMatch: undefined,
})

if (typeof props.text !== 'string') {
  throw new TypeError('Highlight text must be a string')
}

const chunks = useHighlight(props)
</script>

<template>
  <template v-for="chunk in chunks">
    <Mark v-if="chunk.match" :key="chunk.text" v-bind="mark">{{ chunk.text }}</Mark>
    <template v-else>
      {{ chunk.text }}
    </template>
  </template>
</template>
