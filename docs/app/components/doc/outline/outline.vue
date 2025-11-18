<script lang="ts" setup>
import type { TocLink } from '@nuxt/content'
import { useOutlineStyle } from './outline.style'

defineProps<{
  items?: TocLink[]
}>()

const ui = useOutlineStyle()
</script>

<template>
  <nav :class="ui.base()">
    <h2 :class="ui.title()">
      <ProseIcon name="lucide:list-tree" />
      大纲
    </h2>

    <DocOutlineTree v-if="items" :items="items" :class="ui.tree()" />
  </nav>
</template>
