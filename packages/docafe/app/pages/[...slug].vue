<script lang="ts" setup>
import { usePageStyle } from '~/styles/page.style'

const route = useRoute()
const config = useConfig()
const { page } = useContent()

const ui = computed(() => usePageStyle({
  custom: !!page.value?.theme?.custom,
}))

useSeoMeta({
  titleTemplate: config.value.site?.titleTemplate,
  title: page?.value?.seo.title || page?.value?.title || config.value.site?.title,
  description: page?.value?.seo.description || page?.value?.description || config.value.site?.description,
})

useHead({
  htmlAttrs: {
    lang: config.value.site?.lang,
  },
})
</script>

<template>
  <div :class="ui.base()">
    <AppNavigation v-if="!page?.theme?.custom" />

    <main :class="ui.wrapper()">
      <template v-if="page">
        <AppBreadcrumb v-if="!page?.theme?.custom" :path="route.path" />

        <AppPageTitle
          v-if="!page?.theme?.custom"
          :title="page?.title"
          :description="page?.description"
          :links="page?.links"
        />

        <ContentRenderer v-if="page" :value="page" :class="ui.content()" />

        <!-- Surrounding -->
      </template>
    </main>

    <aside v-if="!page?.theme?.custom || !!page?.outline?.enable" class="p-6 w-75">
      Outline
    </aside>
  </div>
</template>
