<script lang="ts" setup>
import { useProsePreStyle } from '~/styles/prose-pre.style'

const { meta } = defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
})

const expanded = ref(false)

const parsedMeta = computed(() => {
  const parsed = new Map<string, string | undefined>()
  const parts = meta?.split(' ') || []

  parts.forEach((part) => {
    const [key, value] = part.split('=')
    parsed.set(key!, value)
  })

  return parsed
})

const ui = computed(() => useProsePreStyle({
  inset: parsedMeta.value.has('inset'),
  expanded: expanded.value,
}))
</script>

<template>
  <div :class="ui.base()">
    <div v-if="filename" :class="ui.header()">
      <AppIcon v-if="language" :name="language" class="size-4" />
      <span :class="ui.title()">
        {{ filename }}
      </span>

      <CopyButton v-if="code" :code="code" />
    </div>

    <div v-if="!filename && code" class="abs right-5 top-4 z-1">
      <CopyButton
        :inset="parsedMeta.has('inset')"
        :code="code"
      />
    </div>

    <div :class="ui.wrapper()" :style="(parsedMeta.has('height') && !expanded) && `height: ${parsedMeta.get('height')}px`">
      <pre :class="cn(ui.code(), $props.class)"><slot /></pre>

      <div v-if="parsedMeta.has('height')" :class="ui.collapse()">
        <button :class="ui.collapseButton()">
          {{ expanded ? 'Collapse' : 'Expand' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.shiki .line.highlight {
  display: block;
  width: calc(100% + 48px);
  margin: 0 -24px;
  padding: 0 24px;
  background-color: var(--ui-neutral-5);
}
</style>
