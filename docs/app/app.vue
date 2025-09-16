<script lang="ts" setup>
const route = useRoute()
const pageId = computed(() => normalizePath('page', route.path))

const { data: page } = await useAsyncData(
  pageId,
  () => queryCollection('docs').path(route.path).first(),
)

const { data: navigation } = await useAsyncData(
  '__navigation',
  () => queryCollectionNavigation('docs', ['badge', 'icon', 'redirect']),
)

provide('page', page)
provide('navigation', navigation)
</script>

<template>
  <Html>
    <NuxtLoadingIndicator color="var(--accent)" />
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
