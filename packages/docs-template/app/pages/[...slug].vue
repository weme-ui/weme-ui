<script lang="ts" setup>
const config = useConfig()
const { page } = useContent()

useSeoMeta({
  titleTemplate: config.value.site?.titleTemplate,
  title: page?.value?.title || config.value.site?.title,
  description: page?.value?.description,
})
</script>

<template>
  <div>
    <ContentRenderer v-if="page?.body" :value="page" />
  </div>
</template>
