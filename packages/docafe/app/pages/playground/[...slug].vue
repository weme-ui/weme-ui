<script lang="ts" setup>
import { usePageStyle } from '~/styles/page.style'

const config = useConfig()
const { page } = useContent()

const ui = computed(() => usePageStyle({
  custom: !!page.value?.theme?.custom,
}))

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
  <div :class="ui.base()">
    <main :class="ui.wrapper()">
      <ContentRenderer v-if="page" :value="page" :class="ui.content()" />
    </main>
  </div>
</template>
