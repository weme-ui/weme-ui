<script lang="ts" setup>
const route = useRoute()
const pageId = computed(
  () => route.path === '/'
    ? 'landing'
    : route.path
        .replace(/^\//, '')
        .replace(/\//g, '-'),
)

const { data: page } = await useAsyncData(
  pageId,
  () => queryCollection('docs').path(route.path).first(),
)

const { data: navigation } = await useAsyncData(
  'navigation',
  () => queryCollectionNavigation('docs'),
)

provide('page', page)
provide('navigation', navigation)
</script>

<template>
  <Html data-theme="default">
    <NuxtLoadingIndicator color="var(--ui-accent)" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Html>
</template>

<style>
html,
body,
#__nuxt {
  height: 100%;
}
</style>
