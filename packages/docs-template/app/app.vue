<script lang="ts" setup>
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('docs').path(route.path).first()
})

const { data: navigation } = await useAsyncData('navigation', () => {
  return queryCollectionNavigation('docs')
})

provide('page', page)
provide('navigation', navigation)
</script>

<template>
  <Html lang="zh-CN" data-theme="default">
    <NuxtLoadingIndicator color="var(--ui-accent)" />
    <LayoutHeader />
    <NuxtPage />
    <LayoutFooter v-if="page?.footer" />
  </Html>
</template>
