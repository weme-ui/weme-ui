<script lang="ts" setup>
import type { DocsCollectionItem } from '@nuxt/content'
import { usePageOutlineStyle } from './page-outline.style'

defineProps<{
  page?: DocsCollectionItem
}>()

const config = useConfig()
const ui = usePageOutlineStyle()
</script>

<template>
  <div :class="ui.base()">
    <h2 :class="ui.title()">
      <AppIcon name="lucide:list-tree" :class="ui.titleIcon()" />
      {{ config.outline?.title }}
    </h2>

    <AppPageOutlineTree
      v-if="page?.body?.toc"
      :items="page?.body?.toc.links"
      :class="ui.tree()"
    />
  </div>
</template>
