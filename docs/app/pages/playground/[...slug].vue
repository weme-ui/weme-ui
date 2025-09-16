<script lang="ts" setup>
const page = usePage()
const config = useConfig()

definePageMeta({
  layout: 'playground',
})

useSeoMeta({
  titleTemplate: config.value.titleTemplate,
  title: page.value?.title || config.value.title,
  description: page.value?.description || config.value.description,
})

useHead({
  htmlAttrs: {
    lang: config.value.lang,
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
