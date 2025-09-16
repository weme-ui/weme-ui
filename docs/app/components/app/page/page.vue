<script lang="ts" setup>
import type { DocsCollectionItem } from '@nuxt/content'
import { usePageStyle } from './page.style'

const { page } = defineProps<{
  page?: DocsCollectionItem
}>()

const config = useConfig()

const ui = computed(() => usePageStyle({
  custom: !!page?.theme?.custom,
}))
</script>

<template>
  <div :class="ui.base()">
    <aside :class="ui.sidebar()">
      <AppPageNavigation v-if="!page?.theme?.custom" :page />
    </aside>

    <main :class="ui.wrapper()">
      <AppPageBreadcrumb v-if="!page?.theme?.custom" :path="page?.path || ''" />

      <AppPageTitle
        v-if="!page?.theme?.custom"
        :title="page?.seo?.title || page?.title"
        :description="page?.seo?.description || page?.description"
        :links="page?.links || []"
      />

      <slot :ui="ui.content()" />

      <AppPageSurround v-if="!page?.theme?.custom" />
    </main>

    <aside v-if="!page?.theme?.custom && page?.theme?.outline" class="w-75">
      <AppPageOutline
        :title="config.outline?.title || 'Outline'"
        :items="page?.body?.toc?.links || []"
      />
    </aside>
  </div>
</template>
