<script lang="ts" setup>
import { useClipboard } from '@vueuse/core'
import { usePreStyle } from '~/styles/prose'

const { filename } = defineProps<{
  icon?: string
  code?: string
  language?: string
  filename?: string
  highlights?: number[]
  hideHeader?: boolean
  meta?: string
  class?: string
}>()

const ui = usePreStyle({
  standalone: !!filename,
})

const { copy } = useClipboard()
</script>

<template>
  <div :class="ui.base()">
    <div v-if="!hideHeader && filename" :class="ui.header()">
      <CodeIcon :icon="icon" :filename="filename" :class="ui.headerIcon()" />
      <span>{{ filename }}</span>
    </div>

    <UiButton
      icon="lucide:copy"
      color="neutral"
      variant="link"
      :class="ui.copy()"
      @click="copy(code || '')"
    />

    <pre v-bind="$attrs" :class="ui.code({ class: $props.class })"><slot /></pre>
  </div>
</template>

<style>
.shiki span.line {
  display: block;
}

.shiki span.line.highlight {
  margin: 0 -16px;
  padding: 0 16px;
  background-color: color-mix(in oklab, var(--accent-8) 30%, transparent);
}
</style>
