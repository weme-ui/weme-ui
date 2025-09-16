<script lang="ts" setup>
import type { TocLink } from '@nuxt/content'
import { usePageOutlineStyle } from './outline.style'

defineProps<{
  title?: string
  items?: TocLink[]
}>()

const ui = usePageOutlineStyle()
</script>

<template>
  <div v-if="items" :class="ui.base()">
    <h2 :class="ui.title()">
      <AppIcon name="lucide:list-tree" :class="ui.icon()" />
      {{ title }}
    </h2>

    <AppPageOutlineTree v-if="items" :items="items" :class="ui.tree()" />
  </div>
</template>
