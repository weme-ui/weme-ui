<script lang="ts" setup>
import type { DocsCollectionItem } from '@nuxt/content'
import { usePageStyle } from './page.style'

const { page } = defineProps<{
  page?: DocsCollectionItem
}>()

const ui = computed(() => usePageStyle({
  custom: !!page?.theme?.custom,
}))
</script>

<template>
  <div :class="ui.base()">
    <AppNavigation v-if="!page?.theme?.custom" />

    <main :class="ui.wrapper()">
      <AppPageTitle
        v-if="!page?.theme?.custom"
        :title="page?.seo.title"
        :description="page?.seo.description"
        :links="page?.links"
      />

      <slot :ui="ui.content()" />

      <AppPageSurroundings v-if="!page?.theme?.custom" :page="page" />
    </main>

    <AppPageOutline
      v-if="!page?.theme?.custom && page?.outline?.enable"
      :page="page"
      class="w-75"
    />
  </div>
</template>
