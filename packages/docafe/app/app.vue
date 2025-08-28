<script lang="ts" setup>
const route = useRoute()
const pageId = computed(() => normalizePath('page', route.path))

const { data: page } = await useAsyncData(
  pageId,
  () => queryCollection('docs').path(route.path).first(),
)

const { data: navigation } = await useAsyncData(
  '__navigation',
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
