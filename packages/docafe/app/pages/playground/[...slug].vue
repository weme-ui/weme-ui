<script lang="ts" setup>
const config = useConfig()
const { page } = useContent()

definePageMeta({
  layout: 'playground',
})

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
  <AppPage v-slot="{ ui }" :page>
    <ContentRenderer
      v-if="page"
      :class="ui"
      :value="page"
    />
  </AppPage>
</template>
